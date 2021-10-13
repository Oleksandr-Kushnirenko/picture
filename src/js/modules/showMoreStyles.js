import { getResource } from "../services/requests";

const showMoreStyles = (trigger, wrapper) => {
    const btn = document.querySelector(trigger);
    /* 
    cards.forEach(card => {
        card.classList.add('animated', 'fadeInUp');
    });

    btn.addEventListener('click', () => {
        cards.forEach(card => {
            card.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');
            card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
        });
        // btn.style.display = "none";
        btn.remove();
    }); */

    function addMessage() { 
        let statusMessage = document.createElement('div');
        // statusMessage.classList.add('status');
        statusMessage.textContent = "Что-то пошло не так... сервер не отвечает ... сайт не может подгрузить дополнительные стили!!!";
        statusMessage.style.cssText = 'text-align: center; font-size: 24px; color: red;';
        document.querySelector(wrapper).appendChild(statusMessage);
    }

    btn.addEventListener('click', function() {
        // getResource('http://localhost:3000/styles')  // если через джейсон-сервер
        getResource('assets/db.json')
            // .then(res => createCards(res))
            .then(res => createCards(res.styles))   // простоб через запрос на файл
            // .catch(error => console.log(error));
            .catch(error => addMessage());

        this.remove();  // удаляем кнопку "Посмотреть больше стилей"
    });

    function createCards(respons) {
        respons.forEach(({src, title, link}) => {
            let card = document.createElement('div');

            card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
            
            card.innerHTML = `
                <div class = 'styles-block'>
                    <img src = ${src} alt = 'style'>
                    <h4>${title}</h4>
                    <a href = ${link}>Подробнее</a>
		        </div>
            `;

            document.querySelector(wrapper).appendChild(card);
        });
    }
};

export default showMoreStyles;