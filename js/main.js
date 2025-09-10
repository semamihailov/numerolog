"use strict";

$(function(){
    $(".mask-date").mask("99.99.9999");

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

    $(".calc-soul").click(function(){
        // if ($('.input-birth').val().trim().length === 0) {
        //     $(".err-span").css("display", "block");
        //     $(".soul-img").show();
        //     $(".soul-wrapper").hide();
        //     return;
        // }
        // $(".err-span").css("display", "none");
        $(".soul-img").hide();
        $(".soul-wrapper").show();
        
        // let val = $(".input-birth").val(); // например "10.12.1989"
        let val = "10.12.1989"; // например "10.12.1989" 23.10.1987
        
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

        console.log(counts)
        
        $("[data-field=character]").text(repeatDigit(1,counts[1]));
        $("[data-field=energy]").text(repeatDigit(2,counts[2]));
        $("[data-field=talent]").text(repeatDigit(3,counts[3]));
        $("[data-field=health]").text(repeatDigit(4,counts[4]));
        $("[data-field=logic]").text(repeatDigit(5,counts[5]));
        $("[data-field=work]").text(repeatDigit(6,counts[6]));
        $("[data-field=charisma]").text(repeatDigit(7,counts[7]));
        $("[data-field=responsibility]").text(repeatDigit(8,counts[8]));
        $("[data-field=analysis]").text(repeatDigit(9,counts[9]));












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

        let p1 = 36-B;
        let p2 = p1+9;
        let p3 = p2+9;
        let periods = `0-${p1}, ${p1}-${p2}, ${p2}-${p3}, ${p3}+`;

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

        $("[data-field=periods]").text(periods);
    });

});




