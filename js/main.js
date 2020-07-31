"use strict";

/**
 * Служебные переменные
 * @param {input} Переменная пользовательского ввода
 * @param {buffer} Оперативная переменная (слагаемое, вычитаемое, делимое, умножаемое)
 * @param {result} Результат вычислений
 * @param {operationID} ID фрифметической операции
 * @param {numAfterDot} Знаков после запятой
 * @param {memory} Число в памяти
 */
const vars = {
    input: 0,
    buffer: 0,
    result: 0,
    operationID: 0,
    numAfterDot: 3,
    memory: 'empty',
    date: new Date(),
}

/** 
 * Массив с данными кнопок числовой панели
*/
const buttonsBase = {
    themes: [
        { text: 'Сажа', class: 'theme-active', id: 'theme-1' },
        { text: 'Неон', class: 'theme', id: 'theme-2' },
        { text: 'Апельсин', class: 'theme', id: 'theme-3' },
        { text: 'Небо', class: 'theme', id: 'theme-4' },
    ],
    round: [
        { text: 'F', class: 'btn round-vol', id: 'normal' },
        { text: '.00', class: 'btn round-vol', id: 'ml' },
        { text: '.000', class: `btn round-vol round-vol-active`, id: 'mk' },
    ],
    memory: [
        { text: 'MS', class: 'btn memory', id: 'ms' },
        { text: 'MR', class: 'btn memory', id: 'mr' },
        { text: 'MC', class: 'btn memory', id: 'mc' },
    ],
    exponentiation: [
        { text: '&#8730x', class: 'btn sqrt', id: 'sqrt' },
    ],
    digits: [
        { text: '1', class: 'btn number', id: 1 },
        { text: '2', class: 'btn number', id: 2 },
        { text: '3', class: 'btn number', id: 3 },
        { text: '4', class: 'btn number', id: 4 },
        { text: '5', class: 'btn number', id: 5 },
        { text: '6', class: 'btn number', id: 6 },
        { text: '7', class: 'btn number', id: 7 },
        { text: '8', class: 'btn number', id: 8 },
        { text: '9', class: 'btn number', id: 9 },
        { text: '0', class: 'btn number', id: 0 },
        { text: '.', class: 'btn number', id: 'dot' },
        { text: '=', class: 'btn number', id: 'eql' },
    ],
    function: [
        { text: 'Rand', class: 'btn random', id: 'random' },
        { text: '/', class: 'btn function', id: 'division' },
        { text: '*', class: 'btn function', id: 'multiply' },
        { text: '-', class: 'btn function', id: 'substruction' },
        { text: '+', class: 'btn function', id: 'sum' },
        { text: 'C', class: 'btn function erase', id: 'btn-erase' },
        { text: 'AC', class: 'btn function reset', id: 'btn-reset' },
    ],
}

/**
 * Методы отрисовки блоков кнопок
 */
const htmlRender = {
    /**
     * Метод themesRender отрисовывает блок тем
     * Данные берутся из массива themes
     */
    themesRender: function () {
        for (let i = 0; i < buttonsBase.themes.length; i++) {
            $('.themes').html($('.themes').html() + `<button class="${buttonsBase.themes[i].class}" id="${buttonsBase.themes[i].id}">${buttonsBase.themes[i].text}</button>`);
        }
    },
    /**
     * Метод roundRender отрисовывает режимы округления
     * Данные берутся из массива round
     */
    roundRender: function () {
        for (let i = 0; i < buttonsBase.round.length; i++) {
            $('.round-function').html($('.round-function').html() + `<button button type = "button" class= "${buttonsBase.round[i].class}" id = "${buttonsBase.round[i].id}" >
            <span class="round-text">${buttonsBase.round[i].text}</span></button > `);
        }
    },
    /**
     * Метод memoryRender рисует блок работы с паматью
     * Данные берутся из массива memory
     */
    memoryRender: function () {
        for (let i = 0; i < buttonsBase.memory.length; i++) {
            $('.memory-function').html($('.memory-function').html() + `<button type="button" class="${buttonsBase.memory[i].class}" id = "${buttonsBase.memory[i].id}">
            <span class="memory-text">${buttonsBase.memory[i].text}</span>`);
        }
    },
    /**
     * Метод exponentiationRender рисует блок работы с доп функциями
     * Данные берутся из массива exponentiation
     */
    exponentiationRender: function () {
        for (let i = 0; i < buttonsBase.exponentiation.length; i++) {
            $('.exponentiation').html($('.exponentiation').html() + `
            <button type="button" class="${buttonsBase.exponentiation[i].class}" id = "${buttonsBase.exponentiation[i].id}">
            <span class="sqrt-text">${buttonsBase.exponentiation[i].text}</span></button>`);
        }
    },
    /**
     * Метод numberPanelRender отрисовывает числовой блок + кнопки . и =
     * Данные берутся из массива digits
     */
    digitRender: function () {
        for (let i = 0; i < buttonsBase.digits.length; i++) {
            $('.number-block').html($('.number-block').html() + `
            <button type = "button" class= "${buttonsBase.digits[i].class}" id = "${buttonsBase.digits[i].id}" >
            <span class="num-text">${buttonsBase.digits[i].text}</span>`);
        }
    },
    /**
     * Метод numberPanelRender отрисовывает числовой блок + кнопки . и =
     * Данные берутся из массива digits
     */
    functionRender: function () {
        for (let i = 0; i < buttonsBase.function.length; i++) {
            $('.func-block').html($('.func-block').html() + `
            <button	type="button" class="${buttonsBase.function[i].class}" id="${buttonsBase.function[i].id}">
            ${buttonsBase.function[i].text}</button>`);
        }
    },
}

/**
 * Панель переключения тем (отрисовка на экране в span)
 */
const themesPanel = {
    one: function () {
        $('.theme-active').removeClass('theme-active').addClass('theme');
        $('#theme-1').removeClass('theme').addClass('theme-active');
        themesPanel.clearTheme();
    },
    two: function () {
        $('.theme-active').removeClass('theme-active').addClass('theme');
        $('#theme-2').removeClass('theme').addClass('theme-active');
        themesPanel.clearTheme();
        $('.calc-body-theme-1').removeClass('calc-body-theme-1').addClass('calc-body-theme-2');
    },
    three: function () {
        $('.theme-active').removeClass('theme-active').addClass('theme');
        $('#theme-3').removeClass('theme').addClass('theme-active');
        themesPanel.clearTheme();
        $('.calc-body-theme-1').removeClass('calc-body-theme-1').addClass('calc-body-theme-3');
    },
    four: function () {
        $('.theme-active').removeClass('theme-active').addClass('theme');
        $('#theme-4').removeClass('theme').addClass('theme-active');
        themesPanel.clearTheme();
        $('.calc-body-theme-1').removeClass('calc-body-theme-1').addClass('calc-body-theme-4');
    },
    clearTheme: function () {
        $('#calc-body')
            .removeClass('calc-body-theme-2')
            .removeClass('calc-body-theme-3')
            .removeClass('calc-body-theme-4')
            .addClass('calc-body-theme-1');
    },
}

/**
 * Модуль округления
 */
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
 * Модуль работы с памятью
 */
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
        $('#input-text').text('');
        $('#result-text')
            .html('<span style="color: blue; font-size: 16px">cleared</span>');
        setTimeout(() => { $('#result-text').text(''); }, 1500);
    },
}

/**Квадратный корень. Работает с вводимым числом. Результат выводит в поле ввода.
*Если идет вычитание корня из числа, то по ИД операции значению корня присваивается минус.
*/
const exponentiation = {
    sqrt: function () {
        if (vars.operationID === 3) {
            if (vars.input < 0) {
                vars.input = -1 * vars.input;
            }
            vars.input = -1 * Math.sqrt(+vars.input);
        } else {
            if (vars.input < 0) {
                vars.input = -1 * vars.input;
            }
            vars.input = Math.sqrt(+vars.input);
        }
        if (Number.isInteger(+vars.input)) {
            $('#input-text').text('')
                .text(vars.input);
        } else {
            $('#input-text').text('')
                .text((+vars.input).toFixed(vars.numAfterDot));
        }
        return;
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
    /**
     * Нельзя вводить точку дважды
     * @param {any} e Событие ввода точки. Если в input дробное число, то точка не ставится.
     * @returns {any} Запись введенного числа в input 
     */
    dot: function (e) {
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
 * Init - принимает пользовательские числа в аргумент userInput. Проверяет на длину числа.
 * Если все ок число сохраняется в input
 * Включено поддержка отрицательных значений(ОЗн).
 * 4 основных арифметических операции. В начале идет завершение предыдущей операции
 * по ID и далее уже устанавливается свой ID и выполняется непосредственно 
 * выбранная. Экранировки ОЗн в цепочке операций нет - происходит смена типа операции 
 * на вычитание.
 */
//
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
            vars.result = +vars.buffer / + vars.input;
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
            vars.input = +vars.input;
            vars.result = +vars.buffer * +vars.input;
            vars.input = 0;
            vars.buffer = 0;
            $('#input-text').text('');
            funcPanel.checkResult();
            return;
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
        $('#input-text').text('/');
        setTimeout(() => { $('#result-text').text(vars.result); }, 1500);
        clearInterval(divByZero());
    },
}


//Функционал переключения тем
htmlRender.themesRender();
$('#theme-1').on('click', themesPanel.one);
$('#theme-2').on('click', themesPanel.two);
$('#theme-3').on('click', themesPanel.three);
$('#theme-4').on('click', themesPanel.four);


//Функционал числовой панели
htmlRender.roundRender();
$('#normal').on('click', round.toNormal);
$('#ml').on('click', round.toMilli);
$('#mk').on('click', round.toMickro);

//Функциональная панель
htmlRender.memoryRender();
$('#ms').on('click', memory.ms);
$('#mr').on('click', memory.mr);
$('#mc').on('click', memory.mc);

//reset button
htmlRender.exponentiationRender();
$('#sqrt').on('click', exponentiation.sqrt);

//memory buttons
htmlRender.digitRender();
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

//function buttons
htmlRender.functionRender();
$('#random').on('click', funcPanel.random);
$('#eql').on('click', equalBlock.endOfEqually);
$('#division').on('click', funcPanel.division);
$('#multiply').on('click', funcPanel.multiply);
$('#substruction').on('click', funcPanel.substruction);
$('#sum').on('click', funcPanel.summary);
$('#btn-erase').on('click', funcPanel.erase);
$('#btn-reset').on('click', funcPanel.reset);

//Включение :)
$('#result-text').text('0');

//Дата в футере
$('.year').text(vars.date.getFullYear());
