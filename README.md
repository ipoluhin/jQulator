# jQulator

jQulator - веб-калькулятор. Калькулятор способен считать неограниченное количество операций до вывода результирующих данных. В целом, попытка сымитировать реальный счетный не инженерный инструмент. Учебная работа по теме jquery.
<a href="https://ipoluhin.github.io/jQulator/"><img src="./img/theme_in_out1.png" alt="jqulator-img" /></a>
На данный момент реализовано:
-разделены поля ввода и вывода чисел
-переключение тем оформления.
-корректный ввод положительных чисел, в том числе дробей.
-корректный ввод и работа с отрицательными числами. Важно: ввод отрицательного значения не экранируется от набора предшествующей операции. Происходит именно смена типа операции на тип Вычитание. Пример: цепочка "-3+68/(-5)" и тд станет цепочкой вида "-3+68-5".
-основные арифметические функции.
-очистка последнего введенного числа и полная очистка поля ввода.

Планируется:
-переключение между 1,2 и 4 цифрами вывода десятичных дробей
-экранировка отрицательных значений и кусков цепочки в серии операций (вопрос изучается).
-функции работы с памятью(вопрос в процессе изучения).

Публичная ссылка <https://ipoluhin.github.io/jQulator/>
