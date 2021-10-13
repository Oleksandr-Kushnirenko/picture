// import checkNumInputs from "./checkNumInputs";

import { postData } from "../services/requests";

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          upload = document.querySelectorAll('[name="upload"]');

    // checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: 'Загрузка... ',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...',
        spiner: "assets/img/spinner.gif",
        ok: "assets/img/ok.png",
        fail: "assets/img/fail.png"
    };

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    };

    // написание запроса

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = "";
        });
        upload.forEach(item => {
            item.previousElementSibling.textContent = "Файл не выбран";
        });
    };

    upload.forEach(item => {
        item.addEventListener('input', () => {
            console.log(item.files[0]);
            let dots;
            // "fdshdgfdsdf.jpg" => ['fdshdgfdsdf', 'jpg']
            const arr =  item.files[0].name.split('.');
            arr[0].length > 6 ? dots = "..." : dots = '.';
            const name = arr[0].substring(0, 6) + dots + arr[1];
            item.previousElementSibling.textContent = name;
        });
    });

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();  // отмена стандартного поведения браузера, при отправки данных страница перегружаться не будет
            
            let statusMessage = document.createElement('div'); // блок для помещения сообщения (оповещения)
            statusMessage.classList.add('status'); // назначаем класс
            item.parentNode.appendChild(statusMessage);

            item.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                item.style.display = "none";
            }, 400);

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spiner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.appendChild(statusImg);

            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);

            const formData = new FormData(item); // собираем все данные которые есть у нас у форме
            // ДЗ
            if (item.getAttribute('data-calc') === 'calc') {
                for (let key in state) {
                    FormData.append(key, state[key]);
                }
            }

            let api;
            item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;
            console.log(api);

            postData(api, formData)   // отправляем запрос на сервер c данными которые получил FormData
                .then(res => {
                    console.log(res);
                    statusImg.setAttribute('src', message.ok);
                    textMessage.textContent = message.success;
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail);
                    textMessage.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs();           // очистка инпутов которые были у форме
                    setTimeout(() => {
                        statusMessage.remove();
                        item.style.display = "block";
                        item.classList.remove('fadeOutUp');
                        item.classList.add('fadeInUp');
                    }, 5000);
                });
        });
    });
};
export default forms;
