import $ from 'jquery';

export const chat = () => {
    var closeChat = $(".mobile__off");
    var chatIf;

    if($(window).width() <= 1400){
        chatIf = true;
    }
    else{
        chatIf = false;
    }

    closeChat.on("click", function(){
        if($(window).width() > 480){
            if(!chatIf){
                $(".main__chat--content").addClass("chat__off");
                $(".chat__close--inner").addClass("chat__button--on");
                $(".chat__close--icon").addClass("chat__close--icon--rotate");
                if($(window).width() > 991){
                    $(".main__games--content").addClass("games__fade");
                    $(".main__content--content").addClass("full");
                }
                chatIf = true;
            }
            else{
                $(".main__chat--content").removeClass("chat__off");
                $(".chat__close--inner").removeClass("chat__button--on");
                $(".chat__close--icon").removeClass("chat__close--icon--rotate");
                if($(window).width() > 991){
                    $(".main__games--content").removeClass("games__fade");
                    $(".main__content--content").removeClass("full");
                }
                chatIf = false;
            }
        }
        else{
            if(!chatIf){
                $(".main__chat--content").addClass("chat__off");
                $(".chat__close--inner").addClass("chat__button--on");
                chatIf = true;
            }
            else{
                $(".main__chat--content").removeClass("chat__off");
                $(".chat__close--inner").removeClass("chat__button--on");
                chatIf = false;
            }
        }
    });

    if($(window).width() <= 1400){
        $(".main__content--content").addClass("full");
        $(".main__chat--content").addClass("chat__off");
        closeChat.addClass("chat__button--on");
        $(".chat__close--icon").addClass("chat__close--icon--rotate");
    }
}