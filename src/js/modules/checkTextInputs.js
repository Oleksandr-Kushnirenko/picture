/* 
const checkTextInputs = (selector) => {
    const txtInputs = document.querySelectorAll(selector);

    txtInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key.match(/[^а-яё 0-9]/ig)) { // значение клавиши которую пользователь нажал
                e.preventDefault();
            }
        });
    });
};
export default checkTextInputs; */

// вариант с удалением автозаполнения

const checkTextInputs = (selector) => {
    const txtInputs = document.querySelectorAll(selector);
    txtInputs.forEach(input => {
        let value = input.value;
        input.addEventListener('input', () => {
            if (input.value.match(/[^а-яё 0-9]/ig)) {
                input.value = value;
            } else {
                value = input.value;
            }
        });
    });
};
export default checkTextInputs;