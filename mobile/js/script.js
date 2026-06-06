// ============================================================
// SELF — Мобильный JS
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

    // --- Карусель: прокрутка стрелками ---
    var track = document.getElementById('mCarouselTrack');
    if (track) {
        var leftBtn = document.querySelector('.m-carousel__arrow--left');
        var rightBtn = document.querySelector('.m-carousel__arrow--right');
        var step = 260;             // ширина фото (без gap)
        if (leftBtn) leftBtn.addEventListener('click', function () {
            track.scrollBy({ left: -step, behavior: 'smooth' });
        });
        if (rightBtn) rightBtn.addEventListener('click', function () {
            track.scrollBy({ left: step, behavior: 'smooth' });
        });
    }

    // --- Бургер (логика временно отключена) ---
    /*
    var burger = document.getElementById('mBurger');
    ...
    */
});
