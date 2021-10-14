// когда данные берем из статисной верстки
/* 
const calc = (size, material, options, promocode, result) => {
    const sizeBlock = document.querySelector(size),
          materialBlock = document.querySelector(material),
          optionsBlock = document.querySelector(options),
          promocodeBlock = document.querySelector(promocode),
          resultBlock = document.querySelector(result);

    let sum = 0;

    const calcFunc = () => {
        sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));

        if (sizeBlock.value == '' || materialBlock.value == '') {
            resultBlock.textContent = "Пожалуйста, выберите размер и материал картины";
        } else if (promocodeBlock.value === 'IWANTPOPART') {
            resultBlock.textContent = Math.round(sum * 0.7);
        } else {
            resultBlock.textContent = sum;
        }
    };

    sizeBlock.addEventListener('change', calcFunc);
    materialBlock.addEventListener('change', calcFunc);
    optionsBlock.addEventListener('change', calcFunc);
    promocodeBlock.addEventListener('input', calcFunc);

};

export default calc; 
*/

import { getResource } from "../services/requests";

// когда данные берем из БД

const calc = (size, material, options, promocode, result) => {
    const sizeBlock = document.querySelector(size),
          materialBlock = document.querySelector(material),
          optionsBlock = document.querySelector(options),
          promocodeBlock = document.querySelector(promocode),
          resultBlock = document.querySelector(result);

    let sum = 0, sizeValue = "", materialValie = "0", optionsValue = "0";
    let state;

    getResource('assets/calcPrice.json')
        .then(res => {
            state = res;
        })
        .catch(e => console.log(e));

    function changePrice(event, elem) {
        elem.addEventListener(event, (e) => {
            const target = e.target,
                  select = target.id;

            function calcFunc(state) {
                for (let key in state[select]) {
                    if (elem.value === key) {
                        switch(select) {
                            case "size":
                                sizeValue = state[select][key];
                                break;
                            case "material":
                                materialValie = state[select][key];
                                break;
                            case "options":
                                optionsValue = state[select][key];
                                break;
                        }
                    }
                    // console.log(state[select][key]);
                }
                sum = Math.round((+sizeValue) * (+materialValie) + (+optionsValue));
                if (sizeBlock.value == '' || materialBlock.value == '') {
                    resultBlock.value = "Пожалуйста, выберите размер и материал картины";
                } else if (promocodeBlock.value === 'IWANTPOPART') {
                    resultBlock.value = Math.round(sum * 0.7);
                } else {
                    resultBlock.value = sum;
                }
                // console.log(resultBlock.value);
            }
            calcFunc(state);
        });
    }


    changePrice('change', sizeBlock);
    changePrice('change', materialBlock);
    changePrice('change', optionsBlock);
    changePrice('input', promocodeBlock);

};

export default calc; 