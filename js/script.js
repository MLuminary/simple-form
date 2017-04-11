$(function () {

    //单选按钮
    //性别

    var sex = -1;
    $(".sex .radio").click(function () {
        $(".sex .radio").removeClass('active');
        $(this).addClass('active');
        sex = $(this).index();
        // console.log(sex);
    });
    //yes or not
    var is = -1;
    $(".isactivity .radio").click(function () {
        $(".isactivity .radio").removeClass('active');
        $(this).addClass('active');
        is = $(this).index();
        // console.log(is);
    })
    //为什么想参加活动的和自我介绍的文本

    $('.whyactivity .done').bind('click', function (event) {
        $('.whyac').fadeIn().focus();
        event.stopPropagation();
    })
    $('.introduction .done').bind('click', function (event) {
        $('.intro').fadeIn().focus();
        event.stopPropagation();
    })
    $('textarea').click(function (event) {
        event.stopPropagation();
    })
    $("body").bind('click', function () {
        if ($('.whyac').val().length < 1) {
            $('.whyactivity .done').text('');
        }
        if ($('.intro').val().length < 1) {
            $('.introduction .done').text('');
        }
        $('textarea').fadeOut();
        if ($('.whyac').val().length > 0) {
            $('.whyactivity .done').text('已完成');
        }
        if ($('.intro').val().length > 0) {
            $('.introduction .done').text('已完成');
        }
    })



    //表单判断
    function judge() {
        if ($('.mainbody .name input').val().length < 1) {
            alert("请输入姓名");
            return false;
        }
        else if (sex < 0) {
            alert("请选择性别");
            return false;
        }
        else if ($('.telephone input').val().length != 11 || !$('.telephone input').val().match(/(13|14|15|17|18)[0-9]{9}/)) {
            alert("请输入正确的手机号码");
            return false;
        }
        else if ($('.upload input').val().length < 1) {
            alert("请上传照片");
            return false;
        }
        else if ($('.birthday input').val().length < 1) {
            alert("请选择生日");
            return false;
        }
        else if (is < -1) {
            alert("请您选择是否坚持活动");
            return false;
        }
        else if ($('.whyac').val().length < 1 || $('.intro').val().length < 1) {
            alert("请完整表单");
            return false;
        } else {
            return true;
        }

    }
    var photoFile;
    $("input[type='file']").change(function () { clearInput(this) });

    function clearInput(THIS) {
        if (THIS.files[0].size > 0.5 * 1024 * 1024) {
            $("input[type='file']").remove();
            var photoInput = document.createElement('input');
            photoInput.type = "file";
            photoInput.accept = "image/png,image/gif,image/jpeg,image/jpg";
            $('.picture .upload').append(photoInput);
            $("input[type='file']").change(function () { clearInput(this) });
        } else {
            photoFile = THIS.files[0];
        }
    }


    //ajax接受
    $('.submit').click(function () {
        if (judge()) {
            formData = new FormData();
            formData.append("name", $("input[name='name']").val());
            formData.append("gender", sex);
            formData.append("phoneNum", $("input[name='telephone']").val());
            formData.append("birth", $("input[name='birthday']").val());
            formData.append("ifPersist", is);
            formData.append("reason", $('.whyac').val());
            formData.append("introduce", $('.intro').val());
            formData.append("fname", photoFile);
            $.ajax({
                type: "POST",
                url: "https://diyitem.sky31.com/chalingjie/baoming.php",
                dataType: "json",
                data: formData,
                // {
                //     name: $("input[name='name']").val(),
                //     gender: sex,
                //     phoneNum:$("input[name='telephone']").val(),
                //     birth:$("input[name='birthday']").val(),
                //     ifPersist:is,
                //     reason:$('.whyac').val(),
                //     introduce:$('.intro').val(),
                //     fname:photoFile,
                // },
                processData: false,
                contentType: false,
                success: function (data) {
                    if (data.code == 0) {
                        $('.success').fadeIn();
                        $('.submit').fadeOut();
                        console.log(data);
                    }
                },
                error: function () {
                    alert("出了一点小问题~刷新一下试试看");
                },
            })
        }
    })










    //重新填一份
    $('.success').click(function () {
        $(this).fadeOut();
        $('.submit').fadeIn();
        $('form')[0].reset();
        $('textarea')[0].value = "";
        $('.radio').removeClass('active');
    })


})//结束

