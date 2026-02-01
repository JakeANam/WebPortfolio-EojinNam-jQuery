const arrayLanguage = ['kor', 'eng', 'jpn'];
let pageNum = 0;
let systemLanguage = '';
let clickedY = 0;
let canScroll = false;
let clickedURL = '';

// jQuery
jQuery(document).ready(function() {  
    // 헤더 메뉴 버튼
    $('.headerButton').click(function() {
        let submenu = $('.headerSub');
        if (submenu.css('top') == '0px') {
            submenu.animate({'top':'50px'});
        } else {
            submenu.animate({'top':'0px'});
        }
    });

    // 연락처 버튼 눌렀을때 팝업
    $('.contact li').click(function() {
        let clickedButton = $(this).children().attr("src");
        let clickedContact = $(this).children().attr("alt");
        let toShow = $('.contactPop .' + clickedContact);
        // 같은 버튼 눌렀으면 URL 내리기
        if (clickedURL === clickedButton) {
            toShow.animate({'top':'0px'});
            clickedURL = '';

        // 올라온 URL이 없으면 URL 올리기
        } else if (clickedURL === '') {
            toShow.animate({'top':'-80px'});
            clickedURL = clickedButton;

        // 다른 버튼이고 URL도 다르다면 URL 바꾸기
        // 다른 버튼이지만 같은 URL이면 URL 유지
        } else if (clickedButton != clickedURL) {
            toShow.animate({'top':'-80px'});
            toShow.siblings().animate({'top':'0px'});
            clickedURL = clickedButton;
        }
    });

    // 연락처 클릭
    $('.contactPop li').click(function() {
        let contentURL = $(this).text();

        // http URL이면 페이지 이동
        if (contentURL.indexOf('https://') >= 0) {
            setTimeout(function() {
                window.open(contentURL);
            }, 1000)
            
        } else {
            navigator.clipboard.writeText(contentURL);
        }

        $(this).children().eq(1).animate({'opacity':'0'}, function() {
            $(this).css('display','none').next()
                .css('display','inline-block')
                .animate({'opacity':'1'}, function() {
                    $(this).animate({'opacity':'0'}, function() {
                        $(this).css('display','none').prev()
                            .css('display','inline-block')
                            .animate({'opacity':'1'});
                    });
                });
        })
    });

    // 팝업 닫기
    $('.closePop').click(function() {
        let popup = $(this).parent().parent();
        popup.animate({'opacity':'0', 'left':'0'}, function() {
            popup.hide();
            popup.css({'left':'100%'})
        });
        canScroll = true;

        // if ($(openPop).height() >= $(openPop + ">div").height() + 50) {
        //    $("#about>div>div:gt(3)").remove();
        // }
        
    });

    // 브라우저 화면 크기 변경
    $(window).resize(function() {
        resetElementSize();
    });
});

// 화면 크기에 따라 요소 너비 설정
function resetElementSize() {
    // 방문 지역 image 사이즈 설정
    let visitImage = $('.visitSwiper li>img');
    visitImage.width(visitImage.height() / 3 * 4);

    // skill 크기 설정
    let skillsCell = $('#about .popSkills ul>li');
    let skillsFrame = skillsCell.children(); // li>div
    // 세로로 긴 화면: 높이가 너비보다 더 큰 값
    if (skillsCell.height() > skillsCell.width()) {
        skillsFrame.height(skillsCell.width() - 20);
        skillsFrame.width(skillsCell.width() - 20);
    } else {
        skillsFrame.height(skillsCell.height() - 20);
        skillsFrame.width(skillsCell.height() - 20);
    }

    // skill image 크기 재설정    
    for (let i = 0; i < skillsFrame.length; i++) {
        let skillsImg = skillsFrame.children(":eq("+ i +")");
        
        if (skillsImg.width() >= skillsImg.height()) {
            skillsImg.width('90%');
            skillsImg.height('auto');
        } else {
            skillsImg.height('90%');
            skillsImg.width('auto');
        }
    }

    // Backend & Frontend Language, Tool Img
    let projectLang = $('.projectLanguage>li');

    for (let oneTool of projectLang) {
        let toolImage = $(oneTool).children();
        // console.log(toolImage);
        if (toolImage.width() >= toolImage.height()) {
            toolImage.width('90%');
            toolImage.height('auto');
        } else {
            toolImage.height('90%');
            toolImage.width('auto');
        }
    }
}

// 첫 화면 언어 선택
function chooseLanguageFirst(lang) {
    systemLanguage = lang;
    for (thatLang of arrayLanguage) {
            if (thatLang == lang) {
                $('*.' + thatLang).show();   
            } else {
                $('*.' + thatLang).hide();   
            }
        }
    resetElementSize();
    $('#selectLanguage').slideUp(1000);
    $('header').delay(1000).animate({'top':'0'});
    $('.headerSub').delay(1000).animate({'top':'0'});
    startIntroAnimation();
}

// 첫 화면 애니메이션 실행
function startIntroAnimation() {
    let introLogo = $('#introduction .greething p:last');
    introLogo.siblings().delay(1000)
        .animate({'opacity':'1','left':'0'});
    introLogo.delay(2000)
        .animate({'opacity':'1','left':'0'});
    $('#introduction .introSlide').delay(3000)
        .animate({'opacity':'0.9'});

    $('#introduction .notice').delay(4000).animate({'bottom':'10%'}, function(){
        canScroll = true;
    });
    

    setInterval(function() {
        let introSlide = $('#introduction .introSlide');
        let slideWidth = introSlide.children().width();

        introSlide.animate(
            {'left':'-' +slideWidth + 'px'},
            5000, 'linear',
            function() {
                introSlide.css('left','0');
                introSlide.append($(introSlide).children(':first'));
                
            }
        );
    }, 0);
}

// 첫 화면 애니메이션 정지
function stopIntroAnimation() {

}

// 헤더 메뉴로 페이지 이동
function scrollByHeader(toMovePage) {
    pageNum = toMovePage;
    scrollAction(toMovePage);
    $('.headerSub').animate({'top':'0'}, function() {
        canScroll = true;
    })
}

// 자기소개 팝업 열기
function openAboutPop(className) {
    const openPop = '.' + className;
    $(openPop).show();
    $('.' + className).animate({opacity:'1',left: '50%'});
    resetElementSize();
    canScroll = false;

    // if ($(openPop).height() < $(openPop + ">div").height() + 50) {
    if ($(openPop).height() >= $(openPop + ">div").height() + 50) {
        $(openPop).append($(openPop + ">div").clone());
       
    }
}

// 마우스 휠로 스크롤
document.addEventListener('wheel', function(event) {
    goScroll(event);
});

// 키보드로 스크롤
document.addEventListener('keyup', function(event) {
    // console.log(event.key)
    goScroll(event);
});

function goScroll(event) {
    // 스크롤할 수 있을 때 스크롤 실행
    if (canScroll) {
        if (event.type == 'wheel') {
            // 아래 스크롤
            if (event.deltaY > 0 && pageNum < 3) {
                console.log('scrollDown')
                ++pageNum;
                canScroll = false;
                
            // 위 스크롤
            } else if (event.deltaY < 0 && pageNum > 0) {
                console.log('scrollUp');
                pageNum -= 1;
                canScroll = false;
            }
        } else if (event.key == 'ArrowDown' && pageNum < 3) {
            console.log('downkey');
            ++pageNum;
            canScroll = false;

        } else if (event.key == 'ArrowUp' && pageNum > 0) {
            console.log('upkey');
            pageNum -= 1;
            canScroll = false;
        }

        scrollAction(pageNum);
    }
}

// 스크롤 애니메이션
function scrollAction(pageNum) {
    let windowHight = window.innerHeight;
    $('#wrap').stop().animate(
        {'top':  + ( -1 * pageNum * windowHight) + 'px'}, function() {
            canScroll = true;
        });
    $('header .headerButton').stop().animate({'top':( -100 * pageNum ) + '%'});
}
// 새로고침 할 때 맨 위로 스크롤
window.addEventListener("beforeunload", function(event){
    $('#wrap').css('top','0');
    this.window.scrollTo(0, 0);
});

// 언어 바꾸기
function changeLanguage(lang) {
    canScroll = false;
    $('#changingLanguage .' + lang)
        .show().stop().animate({
            'marginLeft':'-100%'
    }, 500, function() {
        resetElementSize();
        for (thatLang of arrayLanguage) {
            if (thatLang == lang) {
                $('*.' + thatLang).show();   
            } else {
                $('*.' + thatLang).hide();   
            }
        }
    }).delay(50).animate({
        'marginLeft':'-200%'
    }, 500, function() {
        $(this).css('marginLeft','0%');
        if (!$('#about>div[class ^= pop]').is(':visible')) {
            canScroll = true;
        }
    });
    
}
