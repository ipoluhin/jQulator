"use strict";

function clearTheme() {
    $('#calc-body')
        .removeClass('calc-body_theme-1')
        .removeClass('calc-body_theme-2')
        .removeClass('calc-body_theme-3')
        .removeClass('calc-body_theme-4')
        .addClass('calc-body');
}

//theme buttons
$('#theme-1').on('click', function () {
    $('.theme_active').removeClass('theme_active').addClass('theme');
    $('#theme-1').removeClass('theme').addClass('theme_active');
    clearTheme();
    $('#calc-body').removeClass('calc-body').addClass('calc-body_theme-1');
})
$('#theme-2').on('click', function () {
    $('.theme_active').removeClass('theme_active').addClass('theme');
    $('#theme-2').removeClass('theme').addClass('theme_active');
    clearTheme();
    $('#calc-body').removeClass('calc-body').addClass('calc-body_theme-2');
})
$('#theme-3').on('click', function () {
    $('.theme_active').removeClass('theme_active').addClass('theme');
    $('#theme-3').removeClass('theme').addClass('theme_active');
    clearTheme();
    $('#calc-body').removeClass('calc-body').addClass('calc-body_theme-3');
})
$('#theme-4').on('click', function () {
    $('.theme_active').removeClass('theme_active').addClass('theme');
    $('#theme-4').removeClass('theme').addClass('theme_active');
    clearTheme();
    $('#calc-body').removeClass('calc-body').addClass('calc-body_theme-4');
})

//number block
$('#1').on('click', function () {
    $('#pre-text').text($('#pre-text').text() + '1');
    console.log($('#pre-text'));
});
$('#2').on('click', function () {
    $('#pre-text').text($('#pre-text').text() + '2');
    console.log('2');
});
$('#3').on('click', function () {
    $('#pre-text').text($('#pre-text').text() + '3');
    console.log('3');
});
$('#4').on('click', function () {
    $('#pre-text').text($('#pre-text').text() + '4');
    console.log('4');
});
$('#5').on('click', function () {
    $('#pre-text').text($('#pre-text').text() + '5');
    console.log('5');
});
$('#6').on('click', function () {
    $('#pre-text').text($('#pre-text').text() + '6');
    console.log('6');
});
$('#7').on('click', function () {
    $('#pre-text').text($('#pre-text').text() + '7');
    console.log('7');
});
$('#8').on('click', function () {
    $('#pre-text').text($('#pre-text').text() + '8');
    console.log('8');
});
$('#9').on('click', function () {
    $('#pre-text').text($('#pre-text').text() + '9');
    console.log('9');
});
$('#0').on('click', function () {
    $('#pre-text').text($('#pre-text').text() + '0');
    console.log('0');
});
$('#coma').on('click', function () {
    $('#pre-text').text($('#pre-text').text() + '.');
    console.log('.');
});
$('#eql').on('click', function () {
    let number = ($('#pre-text').val(''));
    console.log(number);
});

//function block
$('#slash').on('click', function () {
    let number = $('#pre-text').text('');
    number = number;
});
$('#multiply').on('click', function () {
    $('#pre-text').text('');
});
$('#minus').on('click', function () {
    $('#pre-text').text('');
});
$('#plus').on('click', function () {
    $('#pre-text').text('');
});

//reset button
$('#btn-reset').on('click', function () {
    $('#pre-text').text('');
});