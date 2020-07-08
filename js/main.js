"use strict";

//Вспомогательные переменные
const vars = {
    num: 0,         //Промеуточная переменная для пользовательского ввода
    result: 0,      //Результат вычислений
    fistNum: 0,
}


/* Функция очистки тем */
function clearTheme() {
    $('#calc-body')
        .removeClass('calc-body-theme-2')
        .removeClass('calc-body-theme-3')
        .removeClass('calc-body-theme-4')
        .addClass('calc-body-theme-1');
}


//Панель переключения тем
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

//Цифровая панель (отрисовка выводимых значений на экране калькулятора)
const numberPanel = {
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
const funcPanel = {
    init: function (inNum) {                       //метод принимает значение от юзера.
        if (inNum != undefined) {                  //если вводится число, то оно конкатенируется   
            vars.num += inNum.toString();          //с предыдущим, если числа нет, берется предыдущее
            /* console.log(vars.num); */           //значение
            return vars.num;
        }
    },
    division: function () {
        /* alert(`Функция временно недоступна. Попробуйте позже. 
        С уважением, Администрация проекта.`) */
    },
    multiply: function () {
        /* alert(`Функция временно недоступна. Попробуйте позже. 
        С уважением, Администрация проекта.`) */
    },
    substruction: function () {
        /* alert(`Функция работает, но пока некорректно. Попробуйте позже. 
        С уважением, Администрация проекта.`); */
        /* funcPanel.init();
        $('#pre-text').text('');
        vars.num = +vars.num;
        if (vars.result === 0) {
            vars.result = vars.num;
        }
        if (vars.result !== 0 && +vars.num === 0) {
            return vars.result;
        } else {
            vars.result -= vars.num;
        }
        console.log('Результат операции ' + vars.result);
        return vars.result; */
    },
    summary: function () {
        $('#pre-text').text('');
        funcPanel.init();
        if (vars.result === 0) {
            vars.result = +vars.num;
            vars.num = 0;
            $('#pre-text').text('');
            return vars.result;
        }
        if (vars.result !== 0 && +vars.num === 0) {
            $('#pre-text').text('');
            return vars.result;
        }
        else
        /* if (vars.result !== 0 && vars.result === +vars.num) */ {
            vars.result = +vars.result + +vars.num;
            $('#pre-text').text('');
            vars.num = 0;
            return vars.result;
        }
    },
    equal: function () {                    //Метод "равно" выводит итоговое значение        
        if (vars.result === 0) {
            $('#pre-text').text('')
                .text(vars.num);
            return vars.num;
        } else {
            vars.result = +vars.result + +vars.num;
            $('#pre-text').text('')
                .text(vars.result);
            vars.num = 0;
            return vars.result;
        }
    },
    reset: function () {
        $('#pre-text').text('');
        return vars.num = 0, vars.result = 0;
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

