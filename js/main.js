"use strict";

let num = 0;            //Промеуточная переменная для пользовательского ввода
let result = 0;         //Результат вычислений

/* Функция очистки тем */
function clearTheme() {
    $('#calc-body')
        .removeClass('calc-body_theme-1')
        .removeClass('calc-body_theme-2')
        .removeClass('calc-body_theme-3')
        .removeClass('calc-body_theme-4')
        .addClass('calc-body');
}


//Панель переключения тем
let themesPanel = {
    one: function () {
        $('.theme_active').removeClass('theme_active').addClass('theme');
        $('#theme-1').removeClass('theme').addClass('theme_active');
        clearTheme();
        $('#calc-body').removeClass('calc-body').addClass('calc-body_theme-1');
    },
    two: function () {
        $('.theme_active').removeClass('theme_active').addClass('theme');
        $('#theme-2').removeClass('theme').addClass('theme_active');
        clearTheme();
        $('#calc-body').removeClass('calc-body').addClass('calc-body_theme-2');
    },
    three: function () {
        $('.theme_active').removeClass('theme_active').addClass('theme');
        $('#theme-3').removeClass('theme').addClass('theme_active');
        clearTheme();
        $('#calc-body').removeClass('calc-body').addClass('calc-body_theme-3');
    },
    four: function () {
        $('.theme_active').removeClass('theme_active').addClass('theme');
        $('#theme-4').removeClass('theme').addClass('theme_active');
        clearTheme();
        $('#calc-body').removeClass('calc-body').addClass('calc-body_theme-4');
    },
}

//Цифровая панель (отрисовка выводимых значений на экране калькулятора)
let numberPanel = {
    one: function () {
        $('#pre-text').text($('#pre-text').text() + '1');
        funcPanel.init(1);
    },
    two: function () {
        $('#pre-text').text($('#pre-text').text() + '2');
        funcPanel.init(2);
    },
    three: function () {
        $('#pre-text').text($('#pre-text').text() + '3');
        funcPanel.init(3);
    },
    four: function () {
        $('#pre-text').text($('#pre-text').text() + '4');
        funcPanel.init(4);
    },
    five: function () {
        $('#pre-text').text($('#pre-text').text() + '5');
        funcPanel.init(5);
    },
    six: function () {
        $('#pre-text').text($('#pre-text').text() + '6');
        funcPanel.init(6);
    },
    seven: function () {
        $('#pre-text').text($('#pre-text').text() + '7');
        funcPanel.init(7);
    },
    eigth: function () {
        $('#pre-text').text($('#pre-text').text() + '8');
        funcPanel.init(8);
    },
    nine: function () {
        $('#pre-text').text($('#pre-text').text() + '9');
        funcPanel.init(9);
    },
    zero: function () {
        $('#pre-text').text($('#pre-text').text() + '0');
        funcPanel.init(0);
    },
    dot: function (e) {
        if ($('#pre-text').text().includes('.')) {
            e.preventDefault();                    // Нельзя вводить точку дважды
            return;
        }
        /* if ($('#pre-text').text().includes('' + '.')) {
            $('#pre-text').text('0.');
        } */
        $('#pre-text').text($('#pre-text').text() + '.');
        funcPanel.init('.');
        console.log($('#pre-text').text().toString());
        return num;
    },
}

//Функциональная панель
let funcPanel = {
    init: function (inNum) {            //метод принимает значение от юзера
        if (inNum != undefined) {       //если вводится число, то оно конкатенируется   
            num += inNum.toString();    //с предыдущим, если числа нет, берется старое
            console.log(num);           //значение
            return num;
        } else { return num; }
    },
    division: function () {

    },
    multiply: function () {

    },
    substruction: function () {
        funcPanel.init();
        $('#pre-text').text('');
        num = +num;
        result = result - num;
        console.log('Sum ' + result);
        return Math.sign(result);
    },
    summary: function () {
        funcPanel.init();
        $('#pre-text').text('');
        num = +num;
        result += num;
        num = 0;
        return result;
    },
    equal: function () {                   //Метод "равно" считает итоговое значение
        result += +num;
        num = 0;
        $('#pre-text').text('')
            .text(result);
        return result;
    },
    reset: function () {
        $('#pre-text').text('');
        return num = 0, result = 0;
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
$('#eql').on('click', funcPanel.equal);
$('#division').on('click', funcPanel.division);
$('#multiply').on('click', funcPanel.multiply);
$('#substruction').on('click', funcPanel.substruction);
$('#sum').on('click', funcPanel.summary);

//reset button
$('#btn-reset').on('click', funcPanel.reset);