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

    // --- Бургер-меню ---
    var burger = document.getElementById('mBurger');
    if (burger) {
        // ссылки меню
        var links = [
            { href: 'index.html',       text: 'Главная' },
            { href: 'about.html',       text: 'О студии' },
            { href: 'certificates.html',text: 'Сертификаты' },
            { href: 'room-small.html',  text: 'Малый зал' },
            { href: 'room-big.html',    text: 'Большой зал' }
        ];

        // текущая страница (для подсветки)
        var current = location.pathname.split('/').pop() || 'index.html';

        // строим панель
        var nav = document.createElement('nav');
        nav.className = 'm-nav';
        var ul = document.createElement('ul');
        ul.className = 'm-nav__list';
        links.forEach(function (l) {
            var li = document.createElement('li');
            li.className = 'm-nav__item';
            var a = document.createElement('a');
            a.href = l.href;
            a.textContent = l.text;
            if (l.href === current) a.className = 'is-active';
            li.appendChild(a);
            ul.appendChild(li);
        });
        nav.appendChild(ul);
        document.body.appendChild(nav);

        // открытие / закрытие
        burger.addEventListener('click', function () {
            var open = nav.classList.toggle('is-open');
            burger.classList.toggle('is-open', open);
        });

        // закрытие по клику вне меню
        document.addEventListener('click', function (e) {
            if (nav.classList.contains('is-open') &&
                !nav.contains(e.target) && !burger.contains(e.target)) {
                nav.classList.remove('is-open');
                burger.classList.remove('is-open');
            }
        });
    }
});
