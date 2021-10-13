const modals = () => {
    let btnPressed = false; // переменная которая следит была ли нажата хоть какая-то кнопка

    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll("[data-modal]"),
              scroll = calcScroll();

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {     // проверяем на обьект ивента - существует ли тот елемент на который кликнул пользователь
                    e.preventDefault();   // отменяем стандартное поведение браузера
                }

                btnPressed = true; // пользователь кликнул хоть на одну кнопку

                if (destroy) {   // при клике на подарок появляется МО, а сам подарок исчезает
                    item.remove();
                }

                windows.forEach(item => {     // когда кликаем на крестик или подложку - закрываем все модальные окна
                    item.style.display = "none";
                    item.classList.add("animated", "fadeIn"); // добавляем css-анимацию
                });

                modal.style.display = "block";            // открываем модальное окно
                document.body.style.overflow = "hidden";  // замораживаем страницу при открытом модальном окне
                // document.body.classList.add('modal-open');  // при помощи css свойств
                document.body.style.marginRight = `${scroll}px`;
            });

            if (item.classList.contains('popup_calc_button') || item.classList.contains('popup_calc_profile_button')) {  //делаем не активными кнопки если поля не заполнены
                item.disabled = true;
            }
        });

        close.addEventListener("click", () => {
            windows.forEach(item => {        // когда кликаем на крестик или подложку - закрываем все модальные окна
                item.style.display = "none";
            });
            modal.style.display = "none";            // закрываем модальное окно      
            document.body.style.overflow = ""; 
           // document.body.classList.remove('modal-open');  // при помощи css свойств
           document.body.style.marginRight = `0px`;
        });

        // если кликаем вне нашего модального окна (на подложку) то оно тоже будет закрываться
        modal.addEventListener('click', (e) => {
            if (e.target == modal) {
                windows.forEach(item => {        // когда кликаем на крестик или подложку - закрываем все модальные окна
                    item.style.display = "none";
                });
                modal.style.display = "none";
                document.body.style.overflow = "";
                // document.body.classList.remove('modal-open');  // при помощи css свойств
                document.body.style.marginRight = `0px`;
            }
        });
    }

    // автоматически показываем модальное окно на странице если пользователь на странице какое то время
    function showModalByTime(selector, time) {
        setTimeout(function() {
            let display;

            document.querySelectorAll('[data-modal]').forEach(item => {  // перебираем все мо и в даный момент вычисляем - показывается оно пользователю или нет
                if (getComputedStyle(item).display !== 'none') {
                    display = "block";
                }
            });

            if (!display) {    // если ни одно модальное окно в даный момент не показываетсяб то мы показываем пользователю окно которое нам нужно                                 
                document.querySelector(selector).style.display = "block";
                document.body.style.overflow = "hidden";

                let scroll = calcScroll();  // убираем прыжки страницы при закрытии МО
                document.body.style.marginRight = `${scroll}px`;
            }
        }, time);
    }

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = "50px";
        div.style.height = "50px";
        div.style.overflowY = "scroll";
        div.style.visibility = "hidden";

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    function openByScroll(selector) {
        window.addEventListener('scroll', () => {   // проверяем долистал ли пользователь до концас траницы
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight); // для поддержки старых браузеров

            if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)) {  // если пользователь не кликнул ни на одну кнопку и долистал до конца страницы
                document.querySelector(selector).click(); // ручное использование событий. програмно "кликаем" на подарок
            } 
        });
    }


    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    openByScroll('.fixed-gift');

    // showModalByTime(".popup-consultation", 60000);
};    

export default modals;