$(document).ready(function () {

    // changeScreenはスクリーンを切り替える関数です。
    function changeScreen(num) {
        // 一旦全てのスクリーンを非表示にする。
        $('.screen1, .screen2, .screen3, .screen4').hide();
        $('.screen' + num).show();
    }

    changeScreen(1);

    $('.screen1_button_area').on('click', function () {
        // $('.screen1_question1').val();
        // $('.screen1_question2').val();
        // $('.screen1_question3').val(); // テキストの中身が取れる
        changeScreen(2);
    });

    var my_card = null;
    var enemy_card = null;
    var count_win = 0;
    var count_loss = 0;
    var $cards = $('.screen2_select_gu_image, .screen2_select_choki_image, .screen2_select_pa_image');

    function showRandomQuestion(num) {
        var indexs = [0, 1, 2];
        indexs.sort(function () { return Math.random() - .5; });
        for (var i = 0; i < num; i++) {
            var t = $('.screen1_question_area textarea').eq(indexs.pop()).val();
            $('.screen4_question p').eq(i).text(t);
        }
    }

    var freeze = false;
    $cards.on('click', function () {
        if (freeze) return;
        freeze = true;

        my_card = $(this).data('type');

        enemy_card = ['gu', 'choki', 'pa'][Math.floor(Math.random() * 3)]
        $('.enemy_card img').attr('src', './img/' + enemy_card + '.png');

        if (my_card == 'gu') $('.screen2_select_gu').addClass('use');
        if (my_card == 'choki') $('.screen2_select_choki').addClass('use');
        if (my_card == 'pa') $('.screen2_select_pa').addClass('use');
        setTimeout(function () {
            $('.screen2_select > div').removeClass('use');
            freeze = false;
        }, 3000);

        if (my_card == 'gu' && enemy_card == "pa" ||
            my_card == 'choki' && enemy_card == "gu" ||
            my_card == 'pa' && enemy_card == "choki") {
            count_loss++;
            $('.count_loss').text(count_loss);
            $('#result').text('あなたの負けです');
            if ((count_win + count_loss) == 3) {
                freeze = true;
                setTimeout(function () {
                    freeze = false;
                    changeScreen(4);
                    showRandomQuestion(count_loss);
                }, 3000);
            }
        } else if (my_card == 'gu' && enemy_card == "choki" ||
            my_card == 'choki' && enemy_card == "pa" ||
            my_card == 'pa' && enemy_card == "gu") {
            count_win++;
            $('.count_win').text(count_win);
            $('#result').text('あなたの勝ちです');
            if ((count_win + count_loss) == 3) {
                freeze = true;
                setTimeout(function () {
                    freeze = false;
                    changeScreen(4);
                    showRandomQuestion(count_win);
                }, 3000);
            }
        } else if (my_card == 'gu' && enemy_card == "gu" ||
            my_card == 'choki' && enemy_card == "choki" ||
            my_card == 'pa' && enemy_card == "pa") {

            $('#result').text('あいこです');
        }
    });

    $('.screen4_button_area').on("click", function () {
        location.reload();
        changeScreen(1);
    });











    // $('.class').text();
    // alert(1);
    // $("#a").on("click", function () {

    //     var rand = Math.floor(Math.random() * 3 + 1);
    //     console.log(rand);

    //     if (rand == 1) {
    //         $("#a").html('<h1>グー</h1>');
    //     } else if (rand == 2) {
    //         $("#a").html('<h1>チョキ</h1>');
    //     } else if (rand == 3) {
    //         $("#a").html('<h1>パー</h1>');
    //     } else {
    //         alert("この数字は無効です");
    //     }

    //     $("#a").html('<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Surfer_at_the_Cayucos_Pier%2C_Cayucos%2C_CA.jpg/300px-Surfer_at_the_Cayucos_Pier%2C_Cayucos%2C_CA.jpg">');
    //     $("#a").css('color', 'red');
    // });

    /*
    $('#game').click(function () {
        var NUM = 5;                    // チェックボックス数
        var SIZE = 300;                 // ステージの大きさ
        var count = 0;                  // 現在チェックされている数
        var st = new Date().getTime();  // 開始時間
        $('body').empty();

        // チェックボックスの新しい位置を返す。
        function newPos() {
            return {
                left: Math.floor(Math.random() * SIZE),
                top: Math.floor(Math.random() * SIZE)
            };
        }

        // チェックボックスの生成・アニメーションの設定
        for (var i = 0; i < NUM; i++) {
            $('<img src="img/choki.png">')
                .appendTo('body')
                .css('position', 'absolute')
                .css(newPos())
                .each(function () {
                    $(this).animate(newPos(), 3000, arguments.callee);
                });
        }

        // チェックボックスが押されたときの処理
        $('img').click(function () {
            $(this).stop().attr('disabled', 'disabled');
            var t = (new Date().getTime() - st) / 1000;
            if (++count >= NUM) alert('クリア！所要時間：' + t + '秒');
        });

        return false;
    });
    */
});