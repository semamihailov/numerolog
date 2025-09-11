"use strict";

$(function(){
    $(".mask-date").mask("99.99.9999");

    $(".compatibility-tab-1").on("click", function () {
        // снимаем класс active со всех табов
        $(".compatibility-tab-1").removeClass("active");
        // ставим active на кликнутую кнопку
        $(this).addClass("active");

        // узнаем индекс выбранного таба
        let index = $(this).index();

        // скрываем все таблицы
        $(".compatibility-table-1").removeClass("active");

        // показываем таблицу по индексу таба
        $(".compatibility-table-1").eq(index).addClass("active");
    });
    $(".compatibility-tab-2").on("click", function () {
        // снимаем класс active со всех табов
        $(".compatibility-tab-2").removeClass("active");
        // ставим active на кликнутую кнопку
        $(this).addClass("active");

        // узнаем индекс выбранного таба
        let index = $(this).index();

        // скрываем все таблицы
        $(".compatibility-table-2").removeClass("active");

        // показываем таблицу по индексу таба
        $(".compatibility-table-2").eq(index).addClass("active");
    });


    function sumDigits(str) {
        return str.split('').reduce((s, ch) => s + +ch, 0);
    }
    function reduceToOne(n){
        while(n>9) n = String(n).split('').reduce((s,c)=>s+ +c,0);
        return n;
    }
    function repeatDigit(d,count){
        return count>0 ? String(d).repeat(count) : 'пусто';
    }
    
    let img = $(".soul-img");
    let wrapper = $(".soul-wrapper")
    let err = $(".err-span")
    let inputBirth = $('.input-birth');

    let name1 = $(".name1");
    let name2 = $(".name2");
    let date1 = $(".date1");
    let date2 = $(".date2");
    let err1 = $(".err1");
    let err2 = $(".err2");
    let img2 = $(".compatibility-img");

    name1.on("input", function () {
        // Заменяем всё, что не русская буква (А-Я, а-я, Ё, ё)
        $(this).val($(this).val().replace(/[^A-Za-zА-Яа-яЁё]/g, ""));
    });
    name2.on("input", function () {
        // Заменяем всё, что не русская буква (А-Я, а-я, Ё, ё)
        $(this).val($(this).val().replace(/[^A-Za-zА-Яа-яЁё]/g, ""));
    });

    $(".calc-soul-compatibility").click(function() {
        // валидация обеих персон
        let hasError = false;

        if (date1.val().trim().length === 0 || name1.val().trim().length === 0) {
            err1.css("display", "block");
            hasError = true;
        } else {
            err1.css("display", "none");
        }

        if (date2.val().trim().length === 0 || name2.val().trim().length === 0) {
            err2.css("display", "block");
            hasError = true;
        } else {
            err2.css("display", "none");
        }

        if (hasError) {
            img2.show();
            wrapper.hide();
            return;
        }
        

        // показываем основной блок
        $(".name1-past").text(name1.val());
        $(".name2-past").text(name2.val());
        img2.hide();
        wrapper.show();


        // общая функция расчёта для одной персоны
        // dateEl - jQuery элемент инпута даты, suffix - "" для первой, "-2" для второй
        function computePerson(dateEl, suffix) {
            let val = dateEl.val(); // например "10.12.1989"
            let digits = val.replace(/\D/g,''); // "10121989"

            let day = parseInt(digits.substr(0,2));
            let month = parseInt(digits.substr(2,2));
            let year = parseInt(digits.substr(4));

            // A, B, V, G
            let A = sumDigits(digits);
            let B = reduceToOne(A);
            let V = A - 2*parseInt(String(day)[0]);
            let G = sumDigits(String(V));

            // выводим базовые
            $("[data-field=birth" + suffix + "]").text(val);
            $("[data-field=tech" + suffix + "]").text(A + " " + B + " " + V + " " + G);
            $("[data-field=destiny" + suffix + "]").text(B);

            // считаем частоты
            let allNums = digits + A + B + V + G;
            let counts = {};
            for (let i = 1; i <= 9; i++) counts[i] = 0;
            allNums.split('').forEach(d => counts[d]++);

            $("[data-field=character" + suffix + "]").text(repeatDigit(1, counts[1]));
            $("[data-field=energy" + suffix + "]").text(repeatDigit(2, counts[2]));
            $("[data-field=interest" + suffix + "]").text(repeatDigit(3, counts[3]));
            $("[data-field=health" + suffix + "]").text(repeatDigit(4, counts[4]));
            $("[data-field=logic" + suffix + "]").text(repeatDigit(5, counts[5]));
            $("[data-field=work" + suffix + "]").text(repeatDigit(6, counts[6]));
            $("[data-field=charisma" + suffix + "]").text(repeatDigit(7, counts[7]));
            $("[data-field=responsibility" + suffix + "]").text(repeatDigit(8, counts[8]));
            $("[data-field=analysis" + suffix + "]").text(repeatDigit(9, counts[9]));

            $("[data-field=realization" + suffix + "]").text((counts[1]||0) + (counts[4]||0) + (counts[7]||0));
            $("[data-field=family" + suffix + "]").text((counts[2]||0) + (counts[5]||0) + (counts[8]||0));
            $("[data-field=habits" + suffix + "]").text((counts[3]||0) + (counts[6]||0) + (counts[9]||0));

            $("[data-field=assessment" + suffix + "]").text((counts[1]||0) + (counts[2]||0) + (counts[3]||0));
            $("[data-field=life" + suffix + "]").text((counts[4]||0) + (counts[5]||0) + (counts[6]||0));
            $("[data-field=talent" + suffix + "]").text((counts[7]||0) + (counts[8]||0) + (counts[9]||0));

            $("[data-field=temperament" + suffix + "]").text((counts[3]||0) + (counts[5]||0) + (counts[7]||0));
            $("[data-field=spirituality" + suffix + "]").text((counts[1]||0) + (counts[5]||0) + (counts[9]||0));

            // --- Кармическая матрица ---
            let superpower = day <= 22 ? day : day - 22;
            let lifeTask = month;
            let yearSum = sumDigits(String(year));
            let yearEnergy = yearSum > 22 ? yearSum - 22 : yearSum;
            let purpose = superpower + lifeTask + yearEnergy;
            if (purpose > 22) purpose -= 22;

            let ch1 = superpower + lifeTask;
            let ch2 = superpower + yearEnergy;
            let ch3 = ch1 + ch2;
            let ch4 = lifeTask + yearEnergy;

            let ku1 = Math.abs(superpower - lifeTask);
            let ku2 = Math.abs(superpower - yearEnergy);
            let ku3 = Math.abs(ku1 - ku2);
            let ku4 = Math.abs(lifeTask - yearEnergy);
            let ku5 = Math.abs((ku1 + ku2 + ku3 + ku4) - 22);

            let period1 = 36 - B;
            let period2 = period1 + 9;
            let period3 = period2 + 9;

            $("[data-field=superpower" + suffix + "]").text(superpower);
            $("[data-field=lifeTask" + suffix + "]").text(lifeTask);
            $("[data-field=yearEnergy" + suffix + "]").text(yearEnergy);
            $("[data-field=purpose" + suffix + "]").text(purpose);

            $("[data-field=ch1" + suffix + "]").text(ch1);
            $("[data-field=ch2" + suffix + "]").text(ch2);
            $("[data-field=ch3" + suffix + "]").text(ch3);
            $("[data-field=ch4" + suffix + "]").text(ch4);

            $("[data-field=ku1" + suffix + "]").text(ku1);
            $("[data-field=ku2" + suffix + "]").text(ku2);
            $("[data-field=ku3" + suffix + "]").text(ku3);
            $("[data-field=ku4" + suffix + "]").text(ku4);
            $("[data-field=ku5" + suffix + "]").text(ku5);

            $("[data-field=period1" + suffix + "]").text("(" + "0 - " + period1 + " ЛЕТ)");
            $("[data-field=period2" + suffix + "]").text("(" + period1 + " -  " + period2 + " ЛЕТ)");
            $("[data-field=period3" + suffix + "]").text("(" + period2 + " -  " + period3 + " ЛЕТ)");
            $("[data-field=period4" + suffix + "]").text("(" + period3 + " -  " + "∞ ЛЕТ)");
        }

        function computeCompatibility() {
            // даты (нужно, чтобы дата1 и дата2 были jQuery-элементами с .val())
            let val1 = date1.val().replace(/\D/g, ''); // например "24031988"
            let val2 = date2.val().replace(/\D/g, ''); // "18021988"

            // 1. Ядро отношений (А = Б + В)
            function sumDigitsStr(str) {
                return str.split('').reduce((s, d) => s + parseInt(d), 0);
            }
            function reduce22(n) {
                return n > 22 ? n - 22 : n;
            }

            let B = reduce22(sumDigitsStr(val1)); // она
            let V = reduce22(sumDigitsStr(val2)); // он
            let A = reduce22(B + V);

            $("[data-field=core]").text(A);

            // 2. Кармический урок: "предназначение" у обоих
            let purpose1 = parseInt($("[data-field=purpose]").text()) || 0;
            let purpose2 = parseInt($("[data-field=purpose-2]").text()) || 0;
            let karmicLesson = purpose1 + purpose2;
            if (karmicLesson > 22) karmicLesson -= 22;

            $("[data-field=karmicLesson]").text(karmicLesson);

            // 3. Причины конфликтов: ЧД(1) у обоих
            let ch1_1 = parseInt($("[data-field=ch1]").text()) || 0;
            let ch1_2 = parseInt($("[data-field=ch1-2]").text()) || 0;
            let conflicts = ch1_1 + ch1_2;
            if (conflicts > 22) conflicts -= 22;

            $("[data-field=conflicts]").text(conflicts);

            // 4. Уровень совместимости
            function calcMult(val) {
                let d = parseInt(val.substr(0, 2));
                let m = parseInt(val.substr(2, 2));
                let y = parseInt(val.substr(4));
                return d * m * y;
            }

            let mult1 = calcMult(val1); // она
            let mult2 = calcMult(val2); // он

            // привести к 6-значному числу
            function toSixDigits(n) {
                let s = String(n);
                while (s.length < 6) s += "0";
                return parseInt(s);
            }

            let B6 = toSixDigits(mult1);
            let V6 = toSixDigits(mult2);

            let compatVal = Math.abs(B6 - V6);
            
            
            // сводим к однозначному числу
            function digitRoot(n) {
                let sum;
                while (n > 9) {
                    sum = String(n).split('').reduce((s, d) => s + parseInt(d), 0);
                    n = sum;
                }
                return n;
            }

            let compatibilityLevel = digitRoot(compatVal);

            $("[data-field=compatibilityLevel]").text(compatibilityLevel);
        }
        
        // вычисляем 
        computePerson(date1, "");
        computePerson(date2, "-2");

        // --- Формулы для расчетов совместимости ---
        computeCompatibility();
    });


    $(".calc-soul").click(function(){
        if (inputBirth.val().trim().length === 0) {
            err.css("display", "block");
            img.show();
            wrapper.hide();
            return;
        }
        err.css("display", "none");
        img.hide();
        wrapper.show();
        
        let val = inputBirth.val(); // например "10.12.1989"
        
        let digits = val.replace(/\D/g,''); // "10121989"
        
        let day = parseInt(digits.substr(0,2));
        let month = parseInt(digits.substr(2,2));
        let year = parseInt(digits.substr(4));

        // A, B, V, G
        let A = sumDigits(digits);
        let B = reduceToOne(A);
        let V = A - 2*parseInt(String(day)[0]);
        let G = sumDigits(String(V));

        // выводим базовые
        $("[data-field=birth]").text(val);
        $("[data-field=tech]").text(A+" "+B+" "+V+" "+G);
        $("[data-field=destiny]").text(B);

        
        // считаем частоты
        let allNums = digits + A + B + V + G;
        let counts = {};
        for(let i=1;i<=9;i++) counts[i]=0;
        allNums.split('').forEach(d=>counts[d]++);
        
        $("[data-field=character]").text(repeatDigit(1,counts[1]));
        $("[data-field=energy]").text(repeatDigit(2,counts[2]));
        $("[data-field=interest]").text(repeatDigit(3,counts[3]));
        $("[data-field=health]").text(repeatDigit(4,counts[4]));
        $("[data-field=logic]").text(repeatDigit(5,counts[5]));
        $("[data-field=work]").text(repeatDigit(6,counts[6]));
        $("[data-field=charisma]").text(repeatDigit(7,counts[7]));
        $("[data-field=responsibility]").text(repeatDigit(8,counts[8]));
        $("[data-field=analysis]").text(repeatDigit(9,counts[9]));

        $("[data-field=realization]").text(counts[1] + counts[4] + counts[7]);
        $("[data-field=family]").text(counts[2] + counts[5] + counts[8]);
        $("[data-field=habits]").text(counts[3] + counts[6] + counts[9]);

        $("[data-field=assessment]").text(counts[1] + counts[2] + counts[3]);
        $("[data-field=life]").text(counts[4] + counts[5] + counts[6]);
        $("[data-field=talent]").text(counts[7] + counts[8] + counts[9]);

        $("[data-field=temperament]").text(counts[3] + counts[5] + counts[7]);
        $("[data-field=spirituality]").text(counts[1] + counts[5] + counts[9]);
        

        // --- Кармическая матрица ---
        let superpower = day<=22 ? day : day-22;
        let lifeTask = month;
        let yearSum = sumDigits(String(year));
        let yearEnergy = yearSum>22 ? yearSum-22 : yearSum;
        let purpose = superpower+lifeTask+yearEnergy;
        if(purpose>22) purpose-=22;

        let ch1 = superpower+lifeTask;
        let ch2 = superpower+yearEnergy;
        let ch3 = ch1+ch2;
        let ch4 = lifeTask+yearEnergy;

        let ku1 = Math.abs(superpower-lifeTask);
        let ku2 = Math.abs(superpower-yearEnergy);
        let ku3 = Math.abs(ku1-ku2);
        let ku4 = Math.abs(lifeTask-yearEnergy);
        let ku5 = Math.abs((ku1+ku2+ku3+ku4)-22);

        let period1 = 36 - B;
        let period2 = period1 + 9;
        let period3 = period2 + 9;
        
        $("[data-field=superpower]").text(superpower);
        $("[data-field=lifeTask]").text(lifeTask);
        $("[data-field=yearEnergy]").text(yearEnergy);
        $("[data-field=purpose]").text(purpose);

        $("[data-field=ch1]").text(ch1);
        $("[data-field=ch2]").text(ch2);
        $("[data-field=ch3]").text(ch3);
        $("[data-field=ch4]").text(ch4);

        $("[data-field=ku1]").text(ku1);
        $("[data-field=ku2]").text(ku2);
        $("[data-field=ku3]").text(ku3);
        $("[data-field=ku4]").text(ku4);
        $("[data-field=ku5]").text(ku5);

        $("[data-field=period1]").text("(" + "0 - " + period1 + " ЛЕТ)");
        $("[data-field=period2]").text("(" + period1 + " -  " + period2 + " ЛЕТ)");
        $("[data-field=period3]").text("(" + period2 + " -  " + period3 + " ЛЕТ)");
        $("[data-field=period4]").text("(" + period3 + " -  " + "∞ ЛЕТ)");
    });

});




