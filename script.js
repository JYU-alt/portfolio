document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".video-card");

    cards.forEach(card => {
        const iframe = card.querySelector("iframe");

        if (!iframe || typeof Vimeo === "undefined") return;

        const player = new Vimeo.Player(iframe);

        // 静音，确保浏览器允许自动播放
        player.setVolume(0).catch(() => {});

        // 视频进入屏幕时播放，离开时暂停
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
                        player.play().catch(() => {});
                    } else {
                        player.pause().catch(() => {});
                    }
                });
            },
            {
                threshold: [0, 0.55, 1]
            }
        );

        observer.observe(card);
    });
});


// 图片放大
function openLightbox(imageSrc) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    lightbox.style.display = "block";
    lightboxImg.src = imageSrc;
}


// 关闭图片放大
function closeLightbox() {
    const lightbox = document.getElementById("lightbox");

    lightbox.style.display = "none";
}
