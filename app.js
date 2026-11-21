(() => {
  "use strict";

  const config = window.STUDIO_CONFIG || {};
  const projects = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];
  const featuredProject = window.FEATURED_PROJECT;
  const projectGrid = document.querySelector("#project-grid");
  const emptyMessage = document.querySelector("#portfolio-empty");
  const dialog = document.querySelector("#project-lightbox");
  const modalContent = document.querySelector("#modal-content");
  const filterButtons = [...document.querySelectorAll(".filter-button")];
  const whatsappUrl = `https://wa.me/${encodeURIComponent(config.whatsappNumber || "TUNUMERO")}?text=${encodeURIComponent(config.whatsappMessage || "¡Hola! Bienvenido a Código Creativo Studio. Contanos tu idea con tranquilidad y confianza así podemos organizar una reunión y hacer realidad tu proyecto.")}`;
  let activeGalleryProject = null;
  let activeGalleryIndex = 0;

  document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
    link.href = whatsappUrl;
  });
  document.querySelectorAll("[data-facebook-link]").forEach((link) => {
    link.href = config.facebookUrl || "https://www.facebook.com/share/1FmYfrEkW4/";
  });
  document.querySelector("#current-year").textContent = new Date().getFullYear();

  function createProjectCard(project, index) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "project-card reveal";
    card.dataset.category = project.category;
    card.setAttribute("aria-label", `Ver proyecto: ${project.title}`);

    const cover = document.createElement("span");
    cover.className = "project-cover";
    const media = project.media || {};
    const coverImage = project.image || (media.type === "image" ? media.src : "");
    if (media.type === "video" && !coverImage && media.src) {
      const preview = document.createElement("video");
      preview.src = media.src;
      preview.poster = media.poster || "";
      preview.muted = true;
      preview.playsInline = true;
      preview.preload = "metadata";
      cover.append(preview);
    } else if (coverImage) {
      const image = document.createElement("img");
      image.src = coverImage;
      image.alt = "";
      image.loading = "lazy";
      image.decoding = "async";
      cover.append(image);
    } else {
      const placeholder = document.createElement("span");
      placeholder.className = "project-cover-placeholder";
      placeholder.setAttribute("aria-hidden", "true");
      placeholder.textContent = "✳";
      cover.append(placeholder);
    }

    if (["video", "youtube", "facebook"].includes(media.type)) {
      const play = document.createElement("span");
      play.className = "project-play";
      play.setAttribute("aria-hidden", "true");
      play.innerHTML = '<svg viewBox="0 0 24 24"><path d="m9 6 10 6-10 6V6Z" fill="currentColor"/></svg>';
      cover.append(play);
    }

    const meta = document.createElement("span");
    meta.className = "project-meta";
    const category = document.createElement("span");
    category.className = "project-category";
    category.textContent = project.categoryLabel || "Proyecto";
    const tag = document.createElement("span");
    tag.className = "project-tag";
    tag.textContent = project.tag || "";
    meta.append(category, tag);

    const title = document.createElement("span");
    title.className = "project-title";
    title.textContent = project.title;
    const description = document.createElement("span");
    description.className = "project-description";
    description.textContent = project.description || "";
    const footer = document.createElement("span");
    footer.className = "project-footer";
    footer.append(meta, title, description);
    const arrow = document.createElement("span");
    arrow.className = "project-open";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";
    footer.append(arrow);
    card.append(cover, footer);
    card.style.setProperty("--card-index", index);
    card.addEventListener("click", () => openProject(project, card));
    return card;
  }

  function renderProjects(filter = "all") {
    const visibleProjects = projects.filter((project) => filter === "all" || project.category === filter);
    projectGrid.replaceChildren(...visibleProjects.map(createProjectCard));
    emptyMessage.hidden = visibleProjects.length > 0;
    const allCount = document.querySelector('[data-filter-count="all"]');
    allCount.textContent = String(projects.length).padStart(2, "0");
    observeReveals(projectGrid);
  }

  function createMedia(project, selectedMedia) {
    const media = selectedMedia || project.media || { type: "image", src: project.image, alt: project.title };
    if (media.type === "video") {
      const video = document.createElement("video");
      video.src = media.src;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      video.preload = "metadata";
      return video;
    }
    if (media.type === "youtube" || media.type === "facebook") {
      const frame = document.createElement("iframe");
      frame.src = media.type === "youtube" ? youtubeEmbedUrl(media.src) : facebookEmbedUrl(media.src);
      frame.title = `Video: ${project.title}`;
      frame.allow = "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share";
      frame.allowFullscreen = true;
      frame.referrerPolicy = "strict-origin-when-cross-origin";
      return frame;
    }
    const image = document.createElement("img");
    image.src = media.src || project.image || "";
    image.alt = media.alt || project.title;
    return image;
  }

  function youtubeEmbedUrl(url) {
    try {
      const parsed = new URL(url);
      let videoId = "";
      if (parsed.hostname.endsWith("youtu.be")) {
        videoId = parsed.pathname.slice(1);
      } else if (parsed.hostname.endsWith("youtube.com")) {
        videoId = parsed.searchParams.get("v") || parsed.pathname.split("/").pop();
      }
      if (!/^[\w-]{11}$/.test(videoId || "")) return url;
      return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
    } catch {
      return url;
    }
  }

  function facebookEmbedUrl(url) {
    try {
      const parsed = new URL(url);
      if (!parsed.hostname.endsWith("facebook.com") && !parsed.hostname.endsWith("fb.watch")) return url;
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&autoplay=true`;
    } catch {
      return url;
    }
  }

  function openProject(project, trigger) {
    activeGalleryProject = project;
    activeGalleryIndex = 0;
    renderModalMedia();
    document.querySelector("#modal-title").textContent = project.title;
    document.querySelector("#modal-description").textContent = project.description || "";
    document.querySelector("#modal-category").textContent = project.categoryLabel || "";
    dialog.showModal();
    dialog.dataset.trigger = trigger ? "project-card" : "";
  }

  function renderModalMedia() {
    const project = activeGalleryProject;
    if (!project) return;

    const gallery = Array.isArray(project.gallery) ? project.gallery : [];
    if (gallery.length < 2) {
      modalContent.replaceChildren(createMedia(project));
      return;
    }

    const frame = document.createElement("div");
    frame.className = "modal-gallery";
    frame.append(createMedia(project, gallery[activeGalleryIndex]));

    const previous = document.createElement("button");
    previous.type = "button";
    previous.className = "modal-gallery-nav modal-gallery-prev";
    previous.textContent = "Anterior";
    previous.setAttribute("aria-label", "Ver imagen anterior");
    previous.addEventListener("click", () => moveGallery(-1));

    const next = document.createElement("button");
    next.type = "button";
    next.className = "modal-gallery-nav modal-gallery-next";
    next.textContent = "Siguiente";
    next.setAttribute("aria-label", "Ver imagen siguiente");
    next.addEventListener("click", () => moveGallery(1));

    const counter = document.createElement("span");
    counter.className = "modal-gallery-counter";
    counter.setAttribute("aria-live", "polite");
    counter.textContent = `${activeGalleryIndex + 1} / ${gallery.length}`;

    frame.append(previous, next, counter);
    modalContent.replaceChildren(frame);
  }

  function moveGallery(direction) {
    const gallery = activeGalleryProject?.gallery;
    if (!Array.isArray(gallery) || gallery.length < 2) return;
    const focusedControl = document.activeElement?.classList.contains("modal-gallery-prev")
      ? ".modal-gallery-prev"
      : document.activeElement?.classList.contains("modal-gallery-next")
        ? ".modal-gallery-next"
        : "";
    activeGalleryIndex = (activeGalleryIndex + direction + gallery.length) % gallery.length;
    renderModalMedia();
    if (focusedControl) modalContent.querySelector(focusedControl).focus();
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle("is-active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      renderProjects(button.dataset.filter);
    });
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    modalContent.replaceChildren();
    activeGalleryProject = null;
    activeGalleryIndex = 0;
  });
  dialog.querySelector(".modal-close").addEventListener("click", () => dialog.close());
  const featuredGalleryButton = document.querySelector("[data-open-featured-gallery]");
  if (featuredGalleryButton && featuredProject) {
    featuredGalleryButton.addEventListener("click", () => openProject(featuredProject, featuredGalleryButton));
  }
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveGallery(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      moveGallery(1);
    }
  });

  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector("#primary-menu");
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    menuToggle.setAttribute("aria-label", expanded ? "Abrir menú" : "Cerrar menú");
    navMenu.classList.toggle("is-open", !expanded);
  });
  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
      navMenu.classList.remove("is-open");
    });
  });

  let revealObserver;
  function observeReveals(root = document) {
    const targets = root.querySelectorAll(".reveal:not(.is-visible)");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
    }
    targets.forEach((target) => revealObserver.observe(target));
  }

  renderProjects();
  observeReveals();
})();
