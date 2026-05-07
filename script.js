// ==== Общий JS для сайта SELF ====

document.addEventListener('DOMContentLoaded', function () {

    // --- Dropdown ---
    document.querySelectorAll('.nav__dropdown-item').forEach(function (item) {
        item.addEventListener('click', function () {
            var menu = this.closest('.nav__dropdown-menu');
            if (menu) menu.style.display = 'none';
            setTimeout(function () { if (menu) menu.style.display = ''; }, 300);
        });
    });

    // --- Карусель ---
    document.querySelectorAll('.carousel').forEach(function (carousel) {
        var track = carousel.querySelector('.carousel__track');
        var leftBtn = carousel.querySelector('.carousel__arrow--left');
        var rightBtn = carousel.querySelector('.carousel__arrow--right');
        if (!track) return;
        var scrollAmount = track.offsetWidth;
        if (rightBtn) rightBtn.addEventListener('click', function () {
            track.scrollBy({ left: scrollAmount / 2, behavior: 'smooth' });
        });
        if (leftBtn) leftBtn.addEventListener('click', function () {
            track.scrollBy({ left: -scrollAmount / 2, behavior: 'smooth' });
        });
    });

    // --- Форма контактов ---
    document.querySelectorAll('.contact__form').forEach(function (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var phone = form.querySelector('[name="phone"]');
            var name = form.querySelector('[name="name"]');
            if (phone && !phone.value.trim()) {
                alert('Пожалуйста, укажите номер телефона.');
                phone.focus();
                return;
            }
            if (name && !name.value.trim()) {
                alert('Пожалуйста, укажите имя и фамилию.');
                name.focus();
                return;
            }
            alert('Спасибо! Мы свяжемся с вами в течение суток.');
            form.reset();
        });
    });

    // --- Форма Email/вопрос на about.html (если есть в будущем) ---
    document.querySelectorAll('.contact__form-email').forEach(function (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var email = form.querySelector('[name="email"]');
            var question = form.querySelector('[name="question"]');
            if (email && !email.value.trim()) { alert('Укажите email.'); email.focus(); return; }
            if (question && !question.value.trim()) { alert('Введите ваш вопрос.'); question.focus(); return; }
            alert('Спасибо! Мы ответим на ваш email.');
            form.reset();
        });
    });

    // --- Cookie-баннер ---
    initCookieBanner();

    // --- Карта (Leaflet) ---
    initMap();
});

// === Cookie-баннер ===
function initCookieBanner() {
    var banner = document.getElementById('cookieBanner');
    if (!banner) return;

    var stored;
    try { stored = localStorage.getItem('selfCookieConsent'); } catch (e) {}

    if (stored) {
        banner.style.display = 'none';
        return;
    }

    function save(value) {
        try { localStorage.setItem('selfCookieConsent', value); } catch (e) {}
        banner.style.display = 'none';
    }

    var btnAll = document.getElementById('cookieAcceptAll');
    var btnReject = document.getElementById('cookieReject');
    var btnSettings = document.getElementById('cookieSettings');

    if (btnAll) btnAll.addEventListener('click', function () { save('all'); });
    if (btnReject) btnReject.addEventListener('click', function () { save('rejected'); });
    if (btnSettings) btnSettings.addEventListener('click', function () {
        alert('Здесь должна быть модалка с детальными настройками cookie. В демо — упрощённо.');
        save('custom');
    });
}

// === Карта OpenStreetMap (Leaflet) ===
function initMap() {
    var el = document.getElementById('selfMap');
    if (!el || typeof L === 'undefined') return;

    // Москва, Большая Дмитровка, 7/5с2 — реальный адрес-заглушка для маркера
    var lat = 55.761511;
    var lng = 37.612847;

    var map = L.map(el, { scrollWheelZoom: false }).setView([lat, lng], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);
    L.marker([lat, lng]).addTo(map)
        .bindPopup('<b>SELF — Фотостудия автопортрета</b><br>Город Н, Велесский район,<br>ул. Вассермана, 30/2,<br>2 этаж, офис № 1000')
        .openPopup();
}
