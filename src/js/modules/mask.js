const mask = (selector) => {

    let  setCursorPosition = (pos, elem) => {
        elem.focus();    // вручную устанавливаем фокус на елементе

        if (elem.setSelectionRange) {
            // elem.setSelectionRange(pos, pos);

            elem.addEventListener('click', () => {  // курсор ставится в конце +7
                elem.setSelectionRange(pos, pos);
            });

        } else if (elem.createTextRange) {
            let range = elem.createTextRange();

            range.collaps(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }

    };

    function createMask(event) {
        let matrix = '+7 (___) ___ __ __',
            i = 0,
            def = matrix.replace(/\D/g, ""),   // значение, статичное, которое работает на основании матрици
            val = this.value.replace(/\D/g, "");   // значение, динамическое, которое работает на основании того что ввел пользователь
        
        if (def.length >= val.length) {
            val = def;
        }

        this.value = matrix.replace(/./g, function(a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });
        
        if (event.type === 'blur') {
            if (this.value.length == 2) {
                this.value = "";
            }
        } else {
            setCursorPosition(this.value.length, this);
        }

    }

    let inputs = document.querySelectorAll(selector);

    inputs.forEach(input => {
        input.addEventListener('input', createMask);
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
    });


};

export default mask;