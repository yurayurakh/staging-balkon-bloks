(function(){

    var app = {

        initialize : function () {
            this.setUpListeners();
        },

        setUpListeners : function () {
            $('#apply_form_list').on('submit', app.submitForm);
            $('#apply_form_list').on('keydown', 'input', app.removeError);
            $('#apply_form_list').on('keydown', 'textarea', app.removeError);
            $('#montage_form_list').on('submit', app.submitForm);
            $('#montage_form_list').on('keydown', 'input', app.removeError);
        },

        submitForm : function (e) {
            e.preventDefault();

            var form = $(this),
                submitBtn = form.find('button[type="submit"]');

            if ( app.validateForm(form) === false ) return false;

            submitBtn.attr('disabled', 'disabled');

            var str = form.serialize();

            $.ajax ({
                url: 'contact_form/contact_process.php',
                type: 'POST',
                data: str
            }).fail(function() {
                    _openMessage("Ошибка", "Что то пошло не так, повторите позже");
            })
            .done(function(msg){
                if(msg === "OK"){
                    $('a#go_success').click();
                    setTimeout(function(){
                        $('.modal_close').click();
                    }, 2000);
                } else if (msg === "OK2") {
                    setTimeout(function(){
                        $('.modal_close').click();
                    }, 100);
                    setTimeout(function(){
                        $('a#btn_montage_modal').click();
                    }, 1000);
                } else {
                    $('a#go_montage_error').click();
                }
            })
            .always(function(){
                submitBtn.removeAttr('disabled');
            });
        },
        /* Валидацыя формы */
        validateForm : function (form) {
            var inputs = form.find('input'),
                textArea = form.find('textarea'),
                textAreaVal = textArea.val();
                valid = true;

            $.each(inputs, function(index, val) {
                var input = $(val),
                    val = input.val();

                    if (val.length === 0) {
                        input.addClass('has-error').removeClass('has-success');
                        valid = false;
                    }else {
                        input.addClass('has-success').removeClass('has-error');
                    }
            });

            return valid;
        },

        removeError : function () {
            $(this).removeClass('has-error')
        }
    }

    app.initialize();

}());
