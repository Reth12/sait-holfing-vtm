document.getElementById('requestForm').onsubmit = async function(e) {
    e.preventDefault();
    const form = e.target;

    // Получаем код страны
    const country = form.country.value;
    const phone = form.phone.value.trim();

    // Динамическая проверка длины
    let phoneLength = 10;
    if (country === '+7') phoneLength = 11; // Россия
    if (country === '+7kz') phoneLength = 10; // Казахстан (если у вас отдельный пункт)
    if (country === '+375') phoneLength = 12;
    if (country === '+380') phoneLength = 12;
    if (country === '+993') phoneLength = 11;
    if (country === '+998') phoneLength = 12;
    if (country === '+996') phoneLength = 12; 
    if (country === '+994') phoneLength = 12; 
    if (country === '+995') phoneLength = 12;
    if (country === '+373') phoneLength = 11;
    if (country === '+48') phoneLength = 11;

    // Проверка: только цифры, пробелы, тире, нужная длина
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length !== phoneLength) {
        alert(`Для выбранной страны номер должен содержать ${phoneLength} цифр`);
        form.phone.focus();
        return;
    }

    // Проверка email: стандартная валидация
    const email = form.email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Введите корректный email');
        form.email.focus();
        return;
    }

    const data = {
        name: form.name.value,
        country: country,
        phone: phone,
        email: email,
        details: form.details.value
    };
    const res = await fetch('/request', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    if (res.ok) {
        alert('Заявка отправлена!');
        form.reset();
    } else {
        alert('Ошибка отправки!');
    }
};document.addEventListener("DOMContentLoaded", () => {
    // ---- MERCH SLIDER ----
    const merchTrack = document.querySelector(".slider-track");
    const merchPrev = document.querySelector(".slider-btn.prev");
    const merchNext = document.querySelector(".slider-btn.next");
    let merchIndex = 0;

    if (merchTrack && merchPrev && merchNext) {
        const merchItems = merchTrack.children.length;
        const visibleMerch = 4; // 4 карточки видно одновременно
        merchNext.addEventListener("click", () => {
            if (merchIndex < merchItems - visibleMerch) {
                merchIndex++;
                merchTrack.style.transform = `translateX(-${merchIndex * 25}%)`;
            }
        });
        merchPrev.addEventListener("click", () => {
            if (merchIndex > 0) {
                merchIndex--;
                merchTrack.style.transform = `translateX(-${merchIndex * 25}%)`;
            }
        });
    }

    // ---- REVIEWS SLIDER ----
    const reviewsTrack = document.querySelector('.reviews-track');
    const reviewsItems = document.querySelectorAll('.review-card');
    const reviewsPrev = document.querySelector('.reviews-btn.prev');
    const reviewsNext = document.querySelector('.reviews-btn.next');
    let reviewsIndex = 0;

    function showReviewSlide(idx) {
        if (reviewsItems.length > 0) {
            const width = reviewsItems[0].offsetWidth;
            reviewsTrack.style.transform = `translateX(${-idx * width}px)`;
        }
    }

    if (reviewsTrack && reviewsPrev && reviewsNext) {
        reviewsPrev.onclick = () => {
            reviewsIndex = (reviewsIndex - 1 + reviewsItems.length) % reviewsItems.length;
            showReviewSlide(reviewsIndex);
        };
        reviewsNext.onclick = () => {
            reviewsIndex = (reviewsIndex + 1) % reviewsItems.length;
            showReviewSlide(reviewsIndex);
        };
        showReviewSlide(reviewsIndex);
    }

    // FAQ раскрытие
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.onclick = function() {
            const answer = this.nextElementSibling;
            const plus = this.querySelector('.faq-plus');
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                plus.textContent = '+';
            } else {
                document.querySelectorAll('.faq-answer').forEach(a => a.style.maxHeight = null);
                document.querySelectorAll('.faq-plus').forEach(p => p.textContent = '+');
                answer.style.maxHeight = answer.scrollHeight + "px";
                plus.textContent = '−';
            }
        };
    });

    // Слайдер
    const track = document.querySelector('.slider-track');
    const items = document.querySelectorAll('.slider-item');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const visibleCount = 4; // сколько карточек видно одновременно
    let current = 0;

    function showSlide(idx) {
        const width = items[0].offsetWidth;
        track.style.transform = `translateX(${-idx * width}px)`;
    }

    // Цикличное листание
    prevBtn.onclick = () => {
        current = (current - 1 + items.length) % items.length;
        showSlide(current);
    };
    nextBtn.onclick = () => {
        current = (current + 1) % items.length;
        showSlide(current);
    };

    // Инициализация
    showSlide(current);

    // ---- SIXTH SECTION SLIDER ----
    const sixthTrack = document.querySelector('.sixth-slider-track');
    const sixthItems = document.querySelectorAll('.sixth-slider-item');
    const sixthPrev = document.querySelector('.sixth-slider-btn.prev');
    const sixthNext = document.querySelector('.sixth-slider-btn.next');
    const sixthVisible = 4; // сколько карточек видно одновременно
    let sixthIndex = 0;

    function showSixthSlide(idx) {
        if (sixthItems.length > 0) {
            const width = sixthItems[0].offsetWidth;
            sixthTrack.style.transform = `translateX(${-idx * width}px)`;
        }
    }

    if (sixthTrack && sixthPrev && sixthNext) {
        sixthPrev.onclick = () => {
            sixthIndex = (sixthIndex - 1 + sixthItems.length) % sixthItems.length;
            showSixthSlide(sixthIndex);
        };
        sixthNext.onclick = () => {
            sixthIndex = (sixthIndex + 1) % sixthItems.length;
            showSixthSlide(sixthIndex);
        };
        showSixthSlide(sixthIndex);
    }

    // ---- MOBILE SLIDER ----
    const mobileTrack = document.querySelector('.mobile-slider-track');
    const mobileItems = document.querySelectorAll('.mobile-slider-item');
    const mobilePrevBtn = document.querySelector('.mobile-slider-btn.prev');
    const mobileNextBtn = document.querySelector('.mobile-slider-btn.next');
    let mobileCurrent = 0;

    function showMobileSlide(idx) {
        mobileTrack.style.transform = `translateX(-${idx * 80}vw)`;
    }

    mobilePrevBtn.onclick = () => {
        if (mobileCurrent > 0) mobileCurrent--;
        showMobileSlide(mobileCurrent);
    };
    mobileNextBtn.onclick = () => {
        if (mobileCurrent < mobileItems.length - 1) mobileCurrent++;
        showMobileSlide(mobileCurrent);
    };

    showMobileSlide(mobileCurrent);

    // Tabs for form and call
    const formTab = document.getElementById('formTab');
    const callTab = document.getElementById('callTab');
    const formBlock = document.getElementById('formBlock');
    const callBlock = document.getElementById('callBlock');

    formTab.onclick = function() {
        formTab.classList.add('active');
        callTab.classList.remove('active');
        formBlock.style.display = '';
        callBlock.style.display = 'none';
    };
    callTab.onclick = function() {
        callTab.classList.add('active');
        formTab.classList.remove('active');
        formBlock.style.display = 'none';
        callBlock.style.display = '';
    };
});