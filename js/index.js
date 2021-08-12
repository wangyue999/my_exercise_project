$(function (){
    $('.center_in_left .left_but').mCustomScrollbar();
    var left_but = $('.left_but');
    left_but.delegate('.list_music','mouseenter',function (){
        $(this).find(".icon").stop().fadeIn();
        $(this).find(".list_time span").stop().fadeOut();
        $(this).find(".list_time a").stop().fadeIn();
    });
    left_but.delegate(".list_music","mouseleave",function (){
        $(this).find(".icon").stop().fadeOut();
        $(this).find(".list_time span").stop().fadeIn();
        $(this).find(".list_time a").stop().fadeOut();
    });
    left_but.delegate('.list_check','click',function (){
        $(this).toggleClass('ca');
    })
    left_but.find('.list_title .list_check').click(function (){
        $('ul .list_music .list_check').toggleClass('ca');
    });
    $(".footer_in a:nth-child(2)").click(function (){
        $(this).toggleClass('stop')
    });

    function getMusic(){
        $.ajax({
            url : "../source/musiclist.json",
            dataType : "json",
            success : function(data){
               $.each(data, function (index, val){
                   var listmusic = $(" <li class=\"list_music\">\n" +
                       "                        <div class=\"list_check \"><i></i></div>\n" +
                       "                        <div class=\"list_number\">"+(index + 1)+"</div>\n" +
                       "                        <div class=\"list_name\">"+val.name+"" +
                       "                            <div class=\"icon\">\n" +
                       "                                <a href=\"javascript:;\" title=\"播放\" ></a>\n" +
                       "                                <a href=\"javascript:;\" title=\"添加\"></a>\n" +
                       "                                <a href=\"javascript:;\" title=\"下载\"></a>\n" +
                       "                                <a href=\"javascript:;\" title=\"分享\"></a>\n" +
                       "                            </div>\n" +
                       "                        </div>\n" +
                       "                        <div class=\"list_singer\">"+val.singer+"</div>\n" +
                       "                        <div class=\"list_time\">\n" +
                       "                            <span>"+val.time+"</span>\n" +
                       "                            <a href=\"javascript:;\" title=\"删除\"></a>\n" +
                       "                        </div>\n" +
                       "                    </li>");
                   $(".left_but ul ").append(listmusic);
               })
            },
            error : function (data){
                console.log(data)
            },

        })
    }
    getMusic();
    var list_music = $(this).parents('.list_music');
    left_but.delegate('.icon a','click',function (){
        //切换播放图标
        $(this).toggleClass('cli');
        list_music.siblings().find('.icon a:nth-child(1)').removeClass('cli');
        //同步底部播放按钮
        if ($(this).hasClass('cli')){
            list_music.find('div').css('color','white');
            list_music.siblings().find('div').css('color','#ccc');
            $(".footer_in a:nth-child(2)").addClass("stop");
            list_music.find('.list_number').addClass('list_number2');
            list_music.siblings().find('.list_number').removeClass('list_number2');
        }else {
            list_music.find('div').css('color','#ccc')
            $(".footer_in a:nth-child(2)").removeClass("stop");
            list_music.removeClass('list_number2');
            list_music.find('.list_number').removeClass('list_number2');
        }
    });
})