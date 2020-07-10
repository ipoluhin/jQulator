"use strict";

//Вспомогательные переменные
const vars = {
    num: 0,         //Промеуточная переменная для пользовательского ввода
    result: 0,      //Результат вычислений
    operationID: 0,
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
/**
 * Операции в функциональной панели начинаются с метода init, который определяет содержится ли
 * в вводе числа пользователя или же надо оставить прошлое значение. Далее задается операционный
 * идентификатор vars.operationID, который затем может учитываться в блоке вывода значения
 * по окончании операции. В некоторых ситуациях этот ID не требуется. ID хранится до выбора следующей
 * операции.
 */
const funcPanel = {
    init: function (inNum) {                       //метод принимает значение от юзера(строка переводится в число).
        if (inNum != undefined) {                  //если вводится число, то оно конкатенируется   
            vars.num += inNum.toString();          //с предыдущим, если числа нет, берется предыдущее
            vars.num = +vars.num;                  //значение
            return vars.num;
        }
    },
    division: function () {
        /* vars.operationID = 1;
        $('#pre-text').text('');
        funcPanel.init();
        if (vars.result === 0) {
            $('#pre-text').text('');
            vars.result = vars.num;
            vars.num = 0;
            return vars.result;
        }
        if (vars.result !== 0 && vars.num !== 0) {
            vars.result = vars.result / vars.num;
            $('#pre-text').text('');
            vars.num = 0;
            return vars.result;
        }
        if (vars.result !== 0 && vars.num === 0) {
            $('#pre-text')
                .html('<span style="color: red">Логическая ошибка при делении на ноль!</span>');
            return vars.result;
        } */
        alert(`Функция в разработке.`)
    },
    multiply: function () {
        vars.operationID = 2;
        $('#pre-text').text('');
        funcPanel.init();
        if (vars.result !== 0 && vars.num === 0) {
            $('#pre-text').text('');
            return vars.result;
        }
        if (vars.result === 0) {
            vars.result = vars.num;
            vars.num = 0;
            $('#pre-text').text('');
            return vars.result;
        }
        else {
            vars.result = vars.result * vars.num;
            $('#pre-text').text('');
            vars.num = 0;
            return vars.result;
        }
    },
    substruction: function () {
        vars.operationID = 3;
        $('#pre-text').text('');
        funcPanel.init();
        if (vars.result === 0) {
            vars.result = vars.num;
            vars.num = 0;
            $('#pre-text').text('');
            return vars.result;
        }
        if (vars.result !== 0 && vars.num !== 0) {
            vars.result = vars.result - vars.num;
            $('#pre-text').text('');
            vars.num = 0;
            return vars.result;
        }
        if (vars.result !== 0 && vars.num === 0) {
            $('#pre-text').text('');
            return vars.result;
        }
    },
    summary: function () {
        vars.operationID = 4;
        $('#pre-text').text('');
        funcPanel.init();
        if (vars.result === 0) {
            vars.result = vars.num;
            vars.num = 0;
            $('#pre-text').text('');
            return vars.result;
        }
        if (vars.result !== 0 && vars.num !== 0) {
            vars.result = +vars.result + +vars.num;
            $('#pre-text').text('');
            vars.num = 0;
            return vars.result;
        }
        if (vars.result !== 0 && vars.num === 0) {
            $('#pre-text').text('');
            return vars.result;
        }
    },

    erase: function () {
        $('#pre-text').text('');
        vars.num = 0;
        return vars.result;
    },
    reset: function () {
        $('#pre-text').text('');
        return vars.num = 0, vars.result = 0;
    },
}
/**
 * Вывод итогового значения при нажатии кнопки "равно" состоит, фактически,
 * из двух блоков: общее равно (для ситуаций, когда либо пользовательское,
 * либо результирующее значение равно нулю) и блока рассчета результат при
 * не нулевых значения пользователя и результирующего. При этом во втором блоке
 * вариант берется согласно ID проводимой операции. 
 * Сам ID задается в переменной vars.operationID в начале каждой арифметической
 * операции и сохраняется до выбора следующей операции. 
 */
const equalBlock = {
    commonEqual: function () {
        if (vars.operationID === 1) {
            equalBlock.equalDiv();
            return vars.result;
        }
        if (vars.operationID === 2) {
            equalBlock.equalMult();
            return vars.result;
        }                                   //Метод 'общее равно' выводит итоговое значение по нажатию '='       
        if (vars.result === 0) {            //При нулевом результирующем, ему присваивается значение пользователя
            vars.result = vars.num;         //и возвращается функцией с выводом на экран калькулятора.
            vars.num = 0;                   //Значение пользователя зануляется
            $('#pre-text').text('')
                .text(vars.result);
            return vars.result;
        }
        if (vars.result !== 0 && vars.num === 0) {      //При нулевом значении пользователя 
            $('#pre-text').text('')                     //выводится результирущее
                .text(vars.result);
            return vars.result;
        } else {
            switch (vars.operationID) {    //Модуль вычисления при не нулевых значениях  по ID операции
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
            }
        }
    },
    equalDiv: function () {
        if (vars.result === 0) {
            $('#pre-text').text('');
            return vars.result;
        }
        if (vars.result !== 0 && vars.num !== 0) {
            vars.result = vars.result / vars.num;
            $('#pre-text').text('')
                .text(vars.result);
            vars.num = 0;
            return vars.result;
        }
        if (vars.num === 0) {
            $('#pre-text')
                .html('<span style="color: red">Логическая ошибка при делении на ноль!</span>');
            return vars.result;
        }
    },
    equalMult: function () {
        vars.result = vars.result * vars.num;
        $('#pre-text').text('')
            .text(vars.result);
        vars.num = 0;
        return vars.result;
    },
    equalSub: function () {
        vars.result = vars.result - vars.num;
        $('#pre-text').text('')
            .text(vars.result);
        vars.num = 0;
        return vars.result;
    },
    equalSum: function () {
        vars.result = +vars.result + +vars.num;
        $('#pre-text').text('')
            .text(vars.result);
        vars.num = 0;
        return vars.result;
    },
}

const memory = {
    mr: function () {
        alert(`Функция в разработке.`)
        /* $('#pre-text')
            .html('<span style="color: red">Функция временно недоступна!</span>'); */
    },
    mc: function () {
        alert(`Функция в разработке.`)
        /* $('#pre-text')
            .html('<span style="color: red">Функция временно недоступна!</span>'); */
    },
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
$('#eql').on('click', equalBlock.commonEqual);
$('#division').on('click', funcPanel.division);
$('#multiply').on('click', funcPanel.multiply);
$('#substruction').on('click', funcPanel.substruction);
$('#sum').on('click', funcPanel.summary);

//reset button
$('#btn-erase').on('click', funcPanel.erase);
$('#btn-reset').on('click', funcPanel.reset);

//memory buttons
$('#mr').on('click', memory.mr);
$('#mc').on('click', memory.mc);
