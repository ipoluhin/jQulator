"use strict";

/**
 * Служебные переменные
 */
const vars = {
    input: 0,          //Промеуточная переменная для пользовательского ввода
    buffer: 0,         //Оперативная переменная
    result: 0,         //Результат вычислений
    operationID: 0,    //ID фрифметической операции
    numAfterDot: 3,    //Знаков после запятой
    memory: 'empty',         //Число в памяти
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
        funcPanel.init(1);
    },
    two: function () {
        funcPanel.init(2);
    },
    three: function () {
        funcPanel.init(3);
    },
    four: function () {
        funcPanel.init(4);
    },
    five: function () {
        funcPanel.init(5);
    },
    six: function () {
        funcPanel.init(6);
    },
    seven: function () {
        funcPanel.init(7);
    },
    eigth: function () {
        funcPanel.init(8);
    },
    nine: function () {
        funcPanel.init(9);
    },
    zero: function () {
        funcPanel.init(0);
    },
    dot: function (e) {
        // Нельзя вводить точку дважды       
        if (!Number.isInteger(+vars.input)) {
            e.preventDefault();
            return;
        }
        funcPanel.init('.');
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
            vars.input = vars.input.toString();
            if (vars.input.length < 10) {
                vars.input += userInput.toString();
                $('#input-text').text($('#input-text').text() + `${userInput}`);
                return;
            }
        }
    },
    random: function () {
        equalBlock.commonEqual();
        vars.buffer = +vars.input;
        vars.input = (Math.random() * 10).toFixed(0);
        console.log(vars.input);
        $('#input-text').text(vars.input);
        return;
    },

    division: function () {
        equalBlock.endOfEqually();
        vars.operationID = 1;
        if ($('#input-text').text().includes(`/`)) {
            $('#input-text').text('');
        } else {
            $('#input-text').text(`/`);
        }
    },
    multiply: function () {
        equalBlock.endOfEqually();
        vars.operationID = 2;
        if ($('#input-text').text().includes(`*`)) {
            $('#input-text').text('');
        } else {
            $('#input-text').text(`*`);
        }
    },
    substruction: function () {
        equalBlock.endOfEqually();
        vars.operationID = 3;
        if ($('#input-text').text().includes(`-`)) {
            $('#input-text').text('');
        } else {
            $('#input-text').text(`-`);
        }
    },
    summary: function () {
        equalBlock.endOfEqually();
        vars.operationID = 4;
        /* if (vars.operationID === 0 || vars.operationID !== 0 && vars.operationID !== 4) {
            equalBlock.endOfEqually();
            vars.operationID = 4;
        } else {
            equalBlock.endOfEqually();
        } */
        if ($('#input-text').text().includes(`+`)) {
            $('#input-text').text('');
        } else {
            $('#input-text').text(`+`);
        }
    },

    erase: function () {
        $('#input-text').text('');
        vars.input = 0;
        return vars.result;
    },
    reset: function () {
        $('#input-text').text('');
        $('#result-text').text('0');
        vars.input = 0;
        vars.buffer = 0;
        vars.result = 0;
        vars.operationID = 0;
        return;
    },
    /**Проверка результата на форму вывода(целое-дробное, количество знаков-округление) */
    checkResult: function () {
        if (Number.isInteger(vars.result)) {
            $('#result-text').text('')
                .text(vars.result);
            $('#input-text').text('');
        } else {
            $('#result-text').text('')
                .text((+vars.result).toFixed(vars.numAfterDot));
            $('#input-text').text('');
        }
        if (vars.result.toString().length < 13) {
            $('#result-text').text('')
                .text(vars.result);
            $('#input-text').text('');
        } else {
            $('#result-text').text('')
                .text((+vars.result).toFixed(vars.numAfterDot));
            /* $('#result-text')
                .html('<span style="color: red; font-size: 16px">error-long number</span>');
            setTimeout(() => { $('#result-text').text(''); }, 1500); */
            $('#input-text').text('');
        }
    },
}

const round = {
    toNormal: function () {
        let lastNumAfterDot = vars.numAfterDot;
        vars.numAfterDot = 6;
        if (vars.numAfterDot !== lastNumAfterDot) {
            $('.round-vol-active')
                .removeClass('round-vol-active');
            $('#normal').addClass('round-vol-active');
            if (Number.isInteger(vars.result)) {
                $('#result-text').text('')
                    .text(vars.result);
            } else {
                $('#result-text').text('')
                    .text((+vars.result).toFixed(vars.numAfterDot));
                $('#input-text').text('');
            }
        }
    },
    toMilli: function () {
        let lastNumAfterDot = vars.numAfterDot;
        vars.numAfterDot = 2;
        if (vars.numAfterDot !== lastNumAfterDot) {
            $('.round-vol-active')
                .removeClass('round-vol-active');
            $('#ml').addClass('round-vol-active');
            if (Number.isInteger(vars.result)) {
                $('#result-text').text('')
                    .text(vars.result);
            } else {
                $('#result-text').text('')
                    .text((+vars.result).toFixed(vars.numAfterDot));
                $('#input-text').text('');
            }
        }
    },
    toMickro: function () {
        let lastNumAfterDot = vars.numAfterDot;
        vars.numAfterDot = 3;
        if (vars.numAfterDot !== lastNumAfterDot) {
            $('.round-vol-active')
                .removeClass('round-vol-active');
            $('#mk').addClass('round-vol-active');
            if (Number.isInteger(vars.result)) {
                $('#result-text').text('')
                    .text(vars.result);
            } else {
                $('#result-text').text('')
                    .text((+vars.result).toFixed(vars.numAfterDot));
                $('#input-text').text('');
            }
        }
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
                if (+vars.input === 0 && vars.buffer === 0 && vars.result === 0) {
                    return;
                }
                if (+vars.input === 0 && vars.buffer === 0 && vars.result !== 0) {
                    funcPanel.checkResult();
                    return;
                }
                if (+vars.input !== 0 && vars.buffer === 0 && vars.result === 0) {
                    vars.input = $('#input-text').text();
                    vars.buffer = +vars.input;
                    vars.input = 0;
                    $('#input-text').text('');
                    $('#result-text').text(vars.buffer);
                    return
                }
                if (vars.input != 0 && vars.buffer === 0 && vars.result !== 0) {
                    vars.input = $('#input-text').text();
                    vars.result = +vars.input;
                    vars.input = 0;
                    funcPanel.checkResult();
                    return;
                }
        }
    },
    /**
     * Выбранные по ID операции
     */
    equalDiv: function () {
        if (+vars.input === 0 && vars.buffer === 0 && vars.result === 0) {
            return;
        }
        if (+vars.input === 0 && +vars.buffer === 0 && vars.result !== 0) {
            if ($('#input-text').text() === '/') {
                vars.result = +vars.buffer;
                vars.input = 0;
                vars.buffer = 0;
                $('#input-text').text('');
                funcPanel.checkResult();
                return;
            }
            vars.input = +vars.input;
            errors.divByZero();
            vars.input = 0;
            return;
        }
        if (+vars.input === 0 && +vars.buffer !== 0 && vars.result === 0) {
            if ($('#input-text').text() === '/') {
                vars.result = +vars.buffer;
                vars.input = 0;
                vars.buffer = 0;
                $('#input-text').text('');
                funcPanel.checkResult();
                return;
            }
            vars.input = +vars.input;
            errors.divByZero();
            vars.input = 0;
            return;
        }
        if (+vars.input !== 0 && +vars.buffer === 0 && vars.result === 0) {
            vars.buffer = vars.input;
            vars.input = 0;
            $('#input-text').text(vars.buffer);
            return;
        }
        if (+vars.input !== 0 && +vars.buffer !== 0 && vars.result === 0) {
            vars.result = +vars.buffer / +vars.input;
            vars.input = 0;
            vars.buffer = 0;
            funcPanel.checkResult();
            $('#input-text').text('');
            return;
        }
        if (+vars.input !== 0 && +vars.buffer === 0 && vars.result !== 0) {
            vars.buffer = vars.result;
            vars.result = 0;
            vars.result = +vars.buffer / h723 + vars.input;
            vars.input = 0;
            vars.buffer = 0;
            funcPanel.checkResult();
            $('#input-text').text('');
            return;
        }
    },
    equalMult: function () {
        if (+vars.input === 0 && vars.buffer === 0 && vars.result === 0) {
            return;
        }
        if (+vars.input === 0 && +vars.buffer === 0 && vars.result !== 0) {
            if ($('#input-text').text() === '*') {
                vars.buffer = +vars.result;
                vars.input = 0;
                vars.result = 0;
                $('#input-text').text('');
                funcPanel.checkResult();
                return;
            }
            vars.input = +vars.input;
            vars.result = +vars.buffer * +vars.input;
            vars.input = 0;
            vars.buffer = 0;
            $('#input-text').text('');
            funcPanel.checkResult();
            return;
        }
        if (+vars.input === 0 && +vars.buffer !== 0 && vars.result === 0) {
            if ($('#input-text').text() === '*') {
                vars.result = +vars.buffer;
                vars.input = 0;
                vars.buffer = 0;
                $('#input-text').text('');
                funcPanel.checkResult();
                return;
            }
            /* if (vars.input === '00') { */
            vars.input = +vars.input;
            vars.result = +vars.buffer * +vars.input;
            vars.input = 0;
            vars.buffer = 0;
            $('#input-text').text('');
            funcPanel.checkResult();
            return;
            /* } */
        }
        if (+vars.input !== 0 && +vars.buffer === 0 && vars.result === 0) {
            vars.buffer = vars.input;
            vars.input = 0;
            $('#input-text').text(vars.buffer);
            return;
        }
        if (+vars.input !== 0 && +vars.buffer !== 0 && vars.result === 0) {
            vars.result = +vars.buffer * +vars.input;
            vars.input = 0;
            vars.buffer = 0;
            funcPanel.checkResult();
            $('#input-text').text('');
            return;
        }
        if (+vars.input !== 0 && +vars.buffer === 0 && vars.result !== 0) {
            vars.buffer = vars.result;
            vars.result = 0;
            vars.result = +vars.buffer * +vars.input;
            vars.input = 0;
            vars.buffer = 0;
            funcPanel.checkResult();
            $('#input-text').text('');
            return;
        }
    },
    equalSub: function () {
        if (+vars.input === 0 && +vars.buffer === 0 && vars.result === 0) {
            return;
        }
        if (vars.input === 0 && +vars.buffer === 0 && vars.result !== 0) {
            vars.buffer = vars.result;
            vars.result = 0;
            $('#input-text').text(vars.buffer);
            return;
        }
        if (+vars.input === 0 && +vars.buffer !== 0 && vars.result === 0) {
            vars.result = +vars.buffer + +vars.input;
            vars.input = 0;
            vars.buffer = 0;
            $('#input-text').text('');
            funcPanel.checkResult();
            return;
        }
        if (+vars.input !== 0 && +vars.buffer === 0 && vars.result === 0) {
            vars.input = $('#input-text').text();
            vars.buffer = +vars.input;
            $('#result-text').text('').text(vars.buffer);
            $('#input-text').text('');
            vars.input = 0;
            return;
        }
        if (+vars.input !== 0 && +vars.buffer === 0 && vars.result !== 0) {
            vars.input = $('#input-text').text();
            vars.buffer = vars.result;
            vars.result = 0;
            vars.result = +vars.buffer + +vars.input;
            vars.input = 0;
            vars.buffer = 0;
            $('#input-text').text('');
            funcPanel.checkResult();
            return;
        }
        if (+vars.input !== 0 && +vars.buffer !== 0 && vars.result === 0) {
            vars.input = $('#input-text').text();
            vars.result = +vars.buffer + +vars.input;
            vars.input = 0;
            vars.buffer = 0;
            $('#input-text').text('');
            funcPanel.checkResult();
            return;
        }
    },
    equalSum: function () {
        if (+vars.input === 0 && +vars.buffer === 0 && vars.result === 0) {
            return;
        }
        if (vars.input === 0 && +vars.buffer === 0 && vars.result !== 0) {
            vars.buffer = vars.result;
            vars.result = 0;
            $('#input-text').text(vars.buffer);
            return;
        }
        if (+vars.input === 0 && +vars.buffer !== 0 && vars.result === 0) {
            vars.result = +vars.buffer + +vars.input;
            vars.input = 0;
            vars.buffer = 0;
            funcPanel.checkResult();
            return;
        }
        if (+vars.input !== 0 && +vars.buffer === 0 && vars.result === 0) {
            vars.input = $('#input-text').text();
            $('#result-text').text('').text(vars.buffer);
            $('#input-text').text('');
            vars.input = 0;
            return;
        }
        if (+vars.input !== 0 && +vars.buffer === 0 && vars.result !== 0) {
            vars.input = $('#input-text').text();
            vars.buffer = vars.result;
            vars.result = 0;
            vars.result = +vars.buffer + +vars.input;
            vars.input = 0;
            vars.buffer = 0;
            funcPanel.checkResult();
            return;
        }
        if (+vars.input !== 0 && +vars.buffer !== 0 && vars.result === 0) {
            vars.input = $('#input-text').text();
            vars.result = +vars.buffer + +vars.input;
            vars.input = 0;
            vars.buffer = 0;
            funcPanel.checkResult();
            return;
        }
    },
    endOfEqually: function () {
        equalBlock.commonEqual();
        vars.operationID = 0;
        $('#input-text').text('');
    },
}
//Ошибки в наборе или результате
const errors = {
    //Ошибка при делении на ноль
    divByZero: function () {
        $('#result-text')
            .html('<span style="color: red">ERROR!</span>');
        setTimeout(() => { $('#result-text').text(''); }, 1500);
    },
}

const memory = {
    ms: function () {
        if (vars.result !== 0) {
            vars.memory = 0;
            vars.memory = vars.result.toString();
            $('#input-text').text('');
        } else {
            vars.memory = 'empty';
            vars.memory = vars.input.toString();
            $('#input-text').text('');
        }
        $('#result-text')
            .html('<span style="color: blue; font-size: 16px">saved</span>');
        setTimeout(() => { $('#result-text').text(''); }, 1500);
    },
    mr: function () {
        if (+vars.memory === 0 || +vars.memory === 'empty') {
            $('#result-text')
                .html('<span style="color: blue; font-size: 16px">empty slot</span>');
            setTimeout(() => { $('#result-text').text(''); }, 1500);
        } else {
            vars.input = +vars.memory;
            $('#input-text').text(+vars.input);
        }
    },
    mc: function () {
        vars.memory = 0;
        $('#result-text')
            .html('<span style="color: blue; font-size: 16px">cleared</span>');
        setTimeout(() => { $('#result-text').text(''); }, 1500);
    },
}
//Квадратный корень. Работает с вводимым числом. Результат выводит в поле ввода.
//Если идет вычитание корня из числа, то по ИД операции значению корня присваивается минус.
const exponentiation = {
    sqrt: function () {
        if (vars.operationID === 3) {
            vars.input = -1 * Math.sqrt(+vars.input);
        } else {
            vars.input = Math.sqrt(+vars.input);
        }
        $('#input-text').text('').text(vars.input);
        return;
    }
}

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
$('#normal').on('click', round.toNormal);
$('#ml').on('click', round.toMilli);
$('#mk').on('click', round.toMickro);
$('#random').on('click', funcPanel.random);
$('#eql').on('click', equalBlock.endOfEqually);
$('#division').on('click', funcPanel.division);
$('#multiply').on('click', funcPanel.multiply);
$('#substruction').on('click', funcPanel.substruction);
$('#sum').on('click', funcPanel.summary);
$('#sqrt').on('click', exponentiation.sqrt);

//reset button
$('#btn-erase').on('click', funcPanel.erase);
$('#btn-reset').on('click', funcPanel.reset);

//memory buttons
$('#ms').on('click', memory.ms);
$('#mr').on('click', memory.mr);
$('#mc').on('click', memory.mc);

//Включение :)
$('#result-text').text('0');