"use strict";

/**
 * Служебные переменные
 */
const vars = {
    input: 0,          //Промеуточная переменная для пользовательского ввода
    buffer: 0,         //Оперативная переменная
    result: 0,         //Результат вычислений
    operationID: 0,    //ID фрифметической операции
}


/**
* Функция очистки тем
*/
function clearTheme() {
    $('#calc-body')
        .removeClass('calc-body-theme-2')
        .removeClass('calc-body-theme-3')
        .removeClass('calc-body-theme-4')
        .addClass('calc-body-theme-1');
}


/**
 * Панель переключения тем (отрисовка на экране в span)
 */
const themesPanel = {
    one: function () {
        $('.theme-active').removeClass('theme-active').addClass('theme');
        $('#theme-1').removeClass('theme').addClass('theme-active');
        clearTheme();
    },
    two: function () {
        $('.theme-active').removeClass('theme-active').addClass('theme');
        $('#theme-2').removeClass('theme').addClass('theme-active');
        clearTheme();
        $('.calc-body-theme-1').removeClass('calc-body-theme-1').addClass('calc-body-theme-2');
    },
    three: function () {
        $('.theme-active').removeClass('theme-active').addClass('theme');
        $('#theme-3').removeClass('theme').addClass('theme-active');
        clearTheme();
        $('.calc-body-theme-1').removeClass('calc-body-theme-1').addClass('calc-body-theme-3');
    },
    four: function () {
        $('.theme-active').removeClass('theme-active').addClass('theme');
        $('#theme-4').removeClass('theme').addClass('theme-active');
        clearTheme();
        $('.calc-body-theme-1').removeClass('calc-body-theme-1').addClass('calc-body-theme-4');
    },
}

/**
* Цифровая панель (отрисовка выводимых значений на экране калькулятора)
*/
const numberPanel = {
    one: function () {
        $('#input-text').text($('#input-text').text() + '1');
        funcPanel.init(1);
    },
    two: function () {
        $('#input-text').text($('#input-text').text() + '2');
        funcPanel.init(2);
    },
    three: function () {
        $('#input-text').text($('#input-text').text() + '3');
        funcPanel.init(3);
    },
    four: function () {
        $('#input-text').text($('#input-text').text() + '4');
        funcPanel.init(4);
    },
    five: function () {
        $('#input-text').text($('#input-text').text() + '5');
        funcPanel.init(5);
    },
    six: function () {
        $('#input-text').text($('#input-text').text() + '6');
        funcPanel.init(6);
    },
    seven: function () {
        $('#input-text').text($('#input-text').text() + '7');
        funcPanel.init(7);
    },
    eigth: function () {
        $('#input-text').text($('#input-text').text() + '8');
        funcPanel.init(8);
    },
    nine: function () {
        $('#input-text').text($('#input-text').text() + '9');
        funcPanel.init(9);
    },
    zero: function () {
        $('#input-text').text($('#input-text').text() + '0');
        funcPanel.init(0);
    },
    dot: function (e) {
        // Нельзя вводить точку дважды       
        if (!Number.isInteger(+vars.input)) {
            e.preventDefault();
            return;
        }
        $('#input-text').text($('#input-text').text() + '.');
        funcPanel.init('.');
        console.log($('#input-text').text().toString());
        return;
    },
}
/**
 * Арифметические операции.
 * Init - принимает пользовательские числа. Включено поддержка отрицательных значений(ОЗн).
 * 4 основных арифметических операции. В начале идет завершение предыдущей операции
 * по ID и далее уже устанавливается свой ID и выполняется непосредственно 
 * выбранная. Экранировки ОЗн в цепочке операций нет - происходит смена типа операции 
 * на вычитание.
 */
const funcPanel = {
    init: function (userInput) {
        if (userInput != undefined) {
            vars.input += userInput.toString();
            return;
        }
    },
    division: function () {
        equalBlock.commonEqual();
        vars.operationID = 1;
        if (+vars.buffer === 0 && +vars.input === 0) {
            if ($('#input-text').html().includes('&#247;')) {
                $('#input-text').text('');
                return;
            } else {
                $('#input-text').html('&#247;');
                return;
            }
        }
        equalBlock.equalDiv();
        $('#input-text').html('&#247;');
        vars.buffer = +vars.input;
        vars.input = 0;
        return;
    },
    multiply: function () {
        equalBlock.commonEqual();
        vars.operationID = 2;
        if (+vars.buffer === 0 && +vars.input === 0) {
            /* if ($('#input-text').text().includes('*')) {
                $('#input-text').text('');
                return;
            } else {
                $('#input-text').text(`*`);
                return;
            } */
            $('#input-text').text(`*`);
            return;
        }
        $('#input-text').text('');
        equalBlock.equalMult();
        $('#input-text').text('*');
        vars.buffer = vars.input;
        vars.input = 0;
        return;
    },
    substruction: function () {
        equalBlock.commonEqual();
        vars.operationID = 3;
        if (+vars.buffer === 0 && +vars.input === 0 && vars.result === 0) {
            if ($('#input-text').text().includes(`-`)) {
                $('#input-text').text('');
                return;
            } else {
                $('#input-text').text(`- `);
                vars.input = '-0';
                vars.buffer = vars.input;
                vars.result = +vars.buffer;
                vars.input = 0;
                return;
            }
        }
        if (+vars.buffer === 0 && +vars.input === 0 && vars.result !== 0) {
            $('#input-text').text(`-`);
            vars.buffer = vars.result;
            return;
        }
        if (+vars.buffer === 0 && +vars.input !== 0) {
            $('#input-text').text(`- `);
            vars.result = +vars.buffer;
            vars.buffer = vars.input;
            $('#result-text').text(vars.result);
            vars.input = 0;
            return;
        }
        $('#input-text').text('-');
        if (+vars.buffer === 0) {
            vars.buffer = vars.input;
            vars.input = 0;
        } else {
            equalBlock.equalSub();
            vars.input = 0;
            vars.buffer = 0;
            $('#input-text').text('');
        }
        return;
    },
    summary: function () {
        equalBlock.commonEqual();
        vars.operationID = 4;
        if (+vars.buffer === 0 && +vars.input === 0) {
            /* if ($('#input-text').text().includes(`+`)) {
                $('#input-text').text('');
                return;
            } else {
                $('#input-text').text(`+`);
                return;
            } */
            $('#input-text').text(`+`);
            return;
        }
        $('#input-text').text('');
        if (+vars.buffer === 0) {
            vars.buffer = +vars.input;
            vars.input = 0;
        } else {
            equalBlock.equalSum();
            vars.input = 0;
            vars.buffer = 0;
            $('#input-text').text('');
        }
        return;
    },

    erase: function () {
        $('#input-text').text('');
        vars.input = 0;
        return vars.result;
    },
    reset: function () {
        $('#input-text').text('');
        $('#result-text').text('');

        return vars.input = 0,
            vars.buffer = 0,
            vars.result = 0,
            vars.operationID = 0;
    },
}
/**
 * Вывод итогового значения при нажатии кнопки "равно" состоит, фактически,
 * из двух блоков: общее равно (выбор операции по ID операции) и блока расчета 
 * результата. При этом во втором блоке
 * вариант берется согласно ID проводимой операции. 
 * Сам ID задается в переменной vars.operationID в начале каждой арифметической
 * операции и сохраняется до выбора следующей операции. 
 */
const equalBlock = {
    /***
    * Модуль выбора операции по ее ID.
    */
    commonEqual: function () {
        switch (vars.operationID) {
            case 1:
                equalBlock.equalDiv();
                break;
            case 2:
                equalBlock.equalMult();
                break;
            case 3:
                equalBlock.equalSub();
                break;
            case 4:
                equalBlock.equalSum();
                break;
            default:
                if (vars.result === 0 && vars.buffer === 0) {
                    vars.result = +vars.input;
                    $('#input-text').text('');
                    $('#result-text').text(vars.result);
                    vars.input = 0;
                    return;
                }
        }
    },
    /**
     * Выбранные по ID операции
     */
    equalDiv: function () {   /* !!! Прописать кнопки округления чисел в случае десятичных дробей */
        if (vars.buffer === 0 && +vars.input === 0) {
            return;
        }
        if (vars.buffer === 0 && vars.result === 0) {
            return;
        }
        if (+vars.buffer === 0 && +vars.input === 0 && vars.result !== 0) {
            vars.buffer = +vars.result;
            $('#result-text').text('')
                .text(vars.result);
            $('#input-text').text('');
            vars.input = 0;
            return;
        }
        if (+vars.buffer === 0 && +vars.input !== 0 && vars.result !== 0) {
            vars.buffer = +vars.result;
            vars.result = +vars.buffer / +vars.input;
            if (+vars.buffer % +vars.input !== 0) {
                vars.result = vars.result.toFixed(4);
            }
            $('#result-text').text('')
                .text(vars.result);
            $('#input-text').text('');
            vars.input = 0;
            vars.buffer = 0;
            return;
        }
        if (+vars.input !== 0) {
            vars.result = +vars.buffer / +vars.input;
            if (+vars.buffer % +vars.input) {
                vars.result = vars.result.toFixed(4);
            }
            $('#result-text').text('')
                .text(vars.result);
            $('#input-text').text('');
            vars.input = 0;
            vars.buffer = 0;
            return;
        }
        //Проверка на деление на ноль и прерывание операции
        if (+vars.input === 0) {
            $('#result-text')
                .html('<span style="color: red">ERROR!</span>');
            setTimeout(() => { $('#result-text').text(''); }, 1500);
            if (+vars.input === 0) {
                e.preventDefault();
            }
            return;
        }
    },
    equalMult: function () {
        if (vars.buffer === 0 && +vars.input === 0) {
            return;
        }
        if (vars.buffer === 0 && vars.result === 0) {
            return;
        }
        if (+vars.buffer === 0 && +vars.input !== 0 && vars.result !== 0) {
            vars.buffer = vars.result;
            vars.result = +vars.buffer * +vars.input;
            vars.result = vars.result;
            $('#result-text').text('')
                .text(vars.result);
            $('#input-text').text('');
            vars.input = 0;
            vars.buffer = 0;
            return;
        } else {
            vars.result = +vars.buffer * +vars.input;
            $('#result-text').text('')
                .text(vars.result);
            $('#input-text').text('');
            vars.input = 0;
            vars.buffer = 0;
            return;
        }
    },
    equalSub: function () {
        if (vars.buffer === 0 && +vars.input === 0) {
            return;
        }
        if (vars.buffer === 0 && vars.result === 0) {
            return;
        }
        if (+vars.buffer === 0 && +vars.input !== 0 && vars.result !== 0) {
            vars.buffer = vars.result;
            vars.result = +vars.buffer - +vars.input;
            vars.result = vars.result.toFixed(4);
            $('#result-text').text('')
                .text(vars.result);
            vars.input = 0;
            vars.buffer = 0;
            return;
        }
        if (+vars.buffer === 0 && +vars.input === 0 && vars.result === 0) {
            $('#input-text').text('-');
            return;
        } else {
            vars.result = +vars.buffer - +vars.input;
            vars.result = vars.result;
            $('#result-text').text('')
                .text(vars.result);
            $('#input-text').text('');
            vars.input = 0;
            vars.buffer = 0;
            return;
        }
    },
    equalSum: function () {
        if (+vars.buffer === 0 && +vars.input === 0) {
            return;
        }
        if (+vars.buffer === 0) {
            vars.buffer = vars.result;
        }
        vars.result = +vars.buffer + +vars.input;
        $('#result-text').text('')
            .text(vars.result);
        $('#input-text').text('');
        vars.input = 0;
        vars.buffer = 0;
        return;
    },
}

//const memory = {
//    ms: function () {
/* alert(`Запись в память в разработке.`); */
/* $('#result-text')
    .html('<span style="color: red">Функция временно недоступна!</span>'); */
//    },
//    mr: function () {
/* alert(`Чтение из памяти в разработке.`); */
/* $('#result-text')
    .html('<span style="color: red">Функция временно недоступна!</span>'); */
//    },
//    mc: function () {
/* alert(`Очистка памяти в разработке.`); */
/* $('#result-text')
    .html('<span style="color: red">Функция временно недоступна!</span>'); */
//    },
//}

//Функционал переключения тем
$('#theme-1').on('click', themesPanel.one);
$('#theme-2').on('click', themesPanel.two);
$('#theme-3').on('click', themesPanel.three);
$('#theme-4').on('click', themesPanel.four);

//Функционал числовой панели
$('#1').on('click', numberPanel.one);
$('#2').on('click', numberPanel.two);
$('#3').on('click', numberPanel.three);
$('#4').on('click', numberPanel.four);
$('#5').on('click', numberPanel.five);
$('#6').on('click', numberPanel.six);
$('#7').on('click', numberPanel.seven);
$('#8').on('click', numberPanel.eigth);
$('#9').on('click', numberPanel.nine);
$('#0').on('click', numberPanel.zero);
$('#dot').on('click', numberPanel.dot);

//Функциональная панель
$('#eql').on('click', equalBlock.commonEqual);
$('#division').on('click', funcPanel.division);
$('#multiply').on('click', funcPanel.multiply);
$('#substruction').on('click', funcPanel.substruction);
$('#sum').on('click', funcPanel.summary);

//reset button
$('#btn-erase').on('click', funcPanel.erase);
$('#btn-reset').on('click', funcPanel.reset);

//memory buttons
/* $('#ms').on('click', memory.ms);
$('#mr').on('click', memory.mr);
$('#mc').on('click', memory.mc);
*/