document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".site-header");

    function updateHeader() {
        header.classList.toggle("scrolled", window.scrollY > 30);
    }

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    // Scroll reveal
    const revealItems = document.querySelectorAll(".video-card, .gallery button, .skill");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal", "visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealItems.forEach((item) => revealObserver.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add("reveal", "visible"));
    }

    // Vimeo: autoplay only the first featured project to keep the page light.
    const featuredCard = document.querySelector(".video-card");
    const featuredIframe = featuredCard?.querySelector("iframe");

    if (featuredIframe && typeof Vimeo !== "undefined") {
        const player = new Vimeo.Player(featuredIframe);
        player.setVolume(0).catch(() => {});

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
                    player.play().catch(() => {});
                } else {
                    player.pause().catch(() => {});
                }
            });
        }, { threshold: [0, 0.55, 1] });

        observer.observe(featuredCard);
    }
});

// Image lightbox
function openLightbox(imageSrc) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    lightboxImg.src = imageSrc;
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");

    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
});
