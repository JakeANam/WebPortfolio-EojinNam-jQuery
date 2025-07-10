const arrayLanguage = ['kor', 'eng', 'jpn'];
let systemLanguage = '';
let clickedY = 0;
let canScroll = false;
let clickedContact = 0;

// jQuery
jQuery(document).ready(function() {
    // 헤더 메뉴 버튼
    $('.headerButton').click(function() {
        let submenu = $('.headerSub');
        if (submenu.css('top') == '0px'){
            submenu.animate({'top':'50px'});
        } else {
            submenu.animate({'top':'0px'});
        }
    });

    // 연락처 버튼 눌렀을때 팝업
    $('.contact li').click(function() {
        let toshow = $(this).children().attr("alt");
        // console.log($(this).index());
        let contactPop = $('.contactPop').children()
        for (let i= 0; i < contactPop.length; i++) {
            
            oneContact = contactPop.eq(i);
            if (oneContact.attr('class') == toshow) {
                // if (oneContact.css('top') == '0px') {
                    oneContact.animate({'top':'-80px'});
                // }
            } else {
                oneContact.animate({'top':'0px'});
            }
            // console.log('oidx:' +  $(this).index())
            // console.log('cidx:' + oneContact)
            // console.log($(this).index() == clickedContact);
            if ($(this).index() == clickedContact && oneContact.css('top') == '-80px') {
                oneContact.animate({'top':'0px'});
            }

            clickedContact = $(this).index();
        //    console.log(contactPop.eq(i).attr('class'));
        }
    });



    // 팝업 닫기
    $('.closePop').click(function() {
        let popup = $(this).parent().parent();
        popup.animate({'opacity':'0', 'left':'0'},function() {
            popup.hide();
            popup.css({'left':'100%'})
        })
        
    });

    // 브라우저 화면 크기 변경
    $(window).resize(function() {
        resetElementSize();
    });

});



document.addEventListener('wheel',function(event) {
    // goScroll(event,clickedY);
    // console.log(event);
//     // alert('yo')
//     console.log(event.deltaY)
//     // 스크롤 아래
//     if (event.deltaY > 0) {}
//     // $('body').animate({'margin-top':'-100vh'})
});
document.addEventListener('mousedown', function(event) {
    clickedY = event.clientY;
});

document.addEventListener('mouseup', function(event) {
    //goScroll(event,clickedY);
});

// 화면 크기에 따라 요소 너비 설정
function resetElementSize() {
    // 방문 지역 image 사이즈 설정
    let visitImage = $('.visitSwiper li>img');
    visitImage.width(visitImage.height() / 3 * 4);

    
    let skillsImg = $('.popSkills ul>li');
    // 세로로 긴 화면: 높이가 너비보다 더 큰 값
    if (skillsImg.height() > skillsImg.width()) {
        skillsImg.children().height(skillsImg.width() - 20);
        skillsImg.children().width(skillsImg.width() - 20);
    } else {
        skillsImg.children().height(skillsImg.height() - 20);
        skillsImg.children().width(skillsImg.height() - 20);
    }
}

// 첫 화면 언어 선택
function chooseLanguageFirst(lang) {
    systemLanguage = lang;
    for (thatLang of arrayLanguage){
            if(thatLang == lang){
                $('*.' + thatLang).show();   
            } else {
                $('*.' + thatLang).hide();   
            }
        }
    $('#selectLanguage').slideUp(1000);
    $('header').delay(1000).animate({'top':'0'});
    $('.headerSub').delay(1000).animate({'top':'0'});
}

// 자기소개 팝업 열기
function openAboutPop(className) {
    $('.' + className).show();
    $('.' + className).animate({opacity:'1',left: '50%'});
    resetElementSize();
}

// function goScroll(event, clickedY) {
//     if(!($('#selectLanguage').is(':visible'))) {
//         let currentY = $('body').css('top');
//         console.log(currentY)
//         if (event.type == 'wheel') {
//             // 아래 스크롤
//             if (event.deltaY > 0 ) {
//                 currentY -= window.innerHeight;
//                 console.log('scrollDown');
//                 $('body').animate({'top':  + currentY + 'px'})
//             // 위 스크롤
//             } else if (currentY < 0) {
//                 currentY += window.innerHeight;
//                 $('body').animate({'top':currentY + 'px'})
//             }
//         } else {
//             // 아래 드래그
//             if (clickedY > event.clientY) {
//                 console.log('scrollDown');
//             // 드래그 X
//             } else if (clickedY== event.clientY) {
//                 console.log('NoScroll');
//             // 위 드래그
//             } else {
//                 console.log('scrollUp');
//             }
//         }
//     }
// }

// 언어 바꾸기
function changeLanguage(lang) {
    $('#changingLanguage .' + lang)
        .show().stop().animate({
            'marginLeft':'-100%'
    }, 500, function(){
        for (thatLang of arrayLanguage){
            if(thatLang == lang){
                $('*.' + thatLang).show();   
            } else {
                $('*.' + thatLang).hide();   
            }
        }
    }).delay(50).animate({
        'marginLeft':'-200%'
    }, 500, function(){
        $(this).css('marginLeft','0%');
    });

}

// 초기 실행
