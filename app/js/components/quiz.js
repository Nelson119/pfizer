'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations, no-alert*/
/*global app, $ */
app.partial.quiz = function() {


    var container = $('[role=main]');
    container.on('page:update:quiz', function(page, menu) {
        $('.quiz1 a label').on('click', function() {
            if (!$('[name=q1_option]:checked').val() ) {
                alert('請選擇一個級別');
                return false;
            }
            $('.quiz1-result article')
                .eq($('[name=q1_option]:checked').parent().index())
                .siblings()
                .addClass('hide');
        });
        $('.quiz2-page1 a.next label').on('click', function(e) {
            if (!$('[name=quiz2question1]:checked').val() ||
                !$('[name=quiz2question2]:checked').val() ||
                !$('[name=quiz2question3]:checked').val()) {
                alert('請回答所有問題再按下一頁');
                return false;
            }
        });
        $('.quiz2-page2 a.next label').on('click', function(e) {
            if (!$('[name=quiz2question4]:checked').val() ||
                !$('[name=quiz2question5]:checked').val()) {
                alert('請回答所有問題再按検視測験結果');
                return false;
            } else {
                var point = $('[name=quiz2question1]:checked').val() * 1 +
                    $('[name=quiz2question2]:checked').val() * 1 +
                    $('[name=quiz2question3]:checked').val() * 1 +
                    $('[name=quiz2question4]:checked').val() * 1 +
                    $('[name=quiz2question5]:checked').val() * 1;
                console.log(point);
                if(point > 20){
                    $('.quiz2-result .result-1').addClass('on');
                    $('.quiz2-result .result-2').removeClass('on');
                }else{
                    $('.quiz2-result .result-2').addClass('on');
                    $('.quiz2-result .result-1').removeClass('on');
                }
                $('.quiz2-result .point').html(point);
            }
        });

        $('.quiz2-result [for=quiz2page1]').on('click', function(){
            $('[name^=quiz2question]').removeAttr('checked');
        });

        $('#btnED').on('click', function() {
            $('#ED').addClass('on');
        });
        $('[for=chkED]').on('click', function() {
            $('#chkED').trigger('change');
        });
        $('#chkED').on('change', function() {
            if(!$('#chkED').is(':checked')){
                $('h2.af').removeClass('invisible');
                $('h2.bt').addClass('invisible');
            }else{
                $('h2.af').addClass('invisible');
                $('h2.bt').removeClass('invisible');

            }
        });
    });

    if (container.hasClass('quiz')) {
        container.trigger('page:update:quiz', null);
    }

};
