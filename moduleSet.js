// 언어 목록
const arrayLanguage = ['kor', 'eng', 'jpn'];

// 방문 지역
import { visitedAreas, picturesUtah, picturesSydney, picturesNagoya } from "./datas/picturesVisited.js";

// 국가 목록
import { contries } from "./datas/countries.js";

// skills
import skills from './datas/skills.js';

// Backend 경력
import backendWorks from "./datas/backendWorks.js";

// Frontend & Webdesign 경력
import webWorks from "./datas/webWorks.js";

// 프로필
import profile from './datas/profile.js';

jQuery(document).ready(function(){
    // 방문 지역 
    for(let area of visitedAreas) {
        let pictureSet;
        switch(area) {
            case 'utah':
                pictureSet = picturesUtah;
                break;

            case 'sydney':
            pictureSet = picturesSydney;
                break;
                
            case 'nagoya':
            pictureSet = picturesNagoya;
                break;
        }

        let pictureList = $('.popVisited .' + area);
        for (let i in pictureSet) {
            let oneImg = '<li><img src="./images/' + area + '/'+ pictureSet[i] +'" alt="utah"></li>'
            $(oneImg).appendTo(pictureList);
        }
    }

    // 방문지 swiper
    var swiper = new Swiper(".visitSwiper", {
      slidesPerView: 1,
      spaceBetween: 0,
      grabCursor: true
    });

    // skills
    let skillList = $('.popSkills ul');
    for(let skill of skills) {
        if (skill.skillType != 'api') {
            let oneSkill = '<li><div class=' + skill.skillType + '>';
            oneSkill += '<img src="./images/logosIT/'+ skill.skillName +'.png" alt="' + skill.skillType + '">';
            oneSkill += '</div></li>';
            $(oneSkill).appendTo(skillList);
        }
        
    }

    // Backend 경력
    let backendPop = $('.popBackend');
    for (let language of arrayLanguage) {
        let backendForm = '<div class="backendForm ' + language + '">'
        let backendList = '<ul>';

        for (let oneProject of backendWorks) {
            // Backend 기본 내용
            let projectDetail = '<li>';
            let projectName = '';
            let projectRole = '';
            let projectPlace = '';

            switch (language) {
                case 'kor':
                    projectName = '<h3>' + oneProject.projectsName.nameKor + '</h3>';
                    projectRole = '<p>역할: ' + oneProject.role.roleKor + '</p>';
                    projectPlace = '<p>실시 기관:' + oneProject.place.placeKor + '</p>';
                    break;

                case 'eng':
                    projectName = '<h3>' + oneProject.projectsName.nameEng + '</h3>';
                    projectRole = '<p>role: ' + oneProject.role.roleEng + '</p>';
                    projectPlace = '<p>place: ' + oneProject.place.placeEng + '</p>';
                    break;

                case 'jpn':
                    projectName = '<h3>' + oneProject.projectsName.nameJpn + '</h3>';
                    projectRole = '<p>役割: ' + oneProject.role.roleJpn + '</p>';
                    projectPlace = '<p>実施機関: ' + oneProject.place.placeJpn + '</p>';
                    break;
            }
            // Backend 언어
            let projectLanguage = '<ul>';
            for (let onePL of oneProject.language){
                projectLanguage += '<li><img src="./images/logosIT/'
                    + onePL +
                    '.png" alt="backendLang"></li>'
            }
            projectLanguage += '</ul>';

            // Backend Tool
            let projectTool = '<ul>';
            for (let onePT of oneProject.tool){
                projectTool += '<li><img src="./images/logosIT/'
                    + onePT +
                    '.png" alt="backendTool"></li>'
            }
            projectTool += '</ul>';

            projectDetail +=  projectName + projectRole + projectPlace + projectLanguage + projectTool + '</li>'
            backendList += projectDetail;
        }

        backendForm += backendList + '</ul></div>'
        $(backendForm).appendTo(backendPop);
    }
    
    // Web design, Frontend 
    let frontWeb = $('#works>.worksSwiper>.swiper-wrapper');
    for (let oneWebInfo of webWorks) {
        // console.log(oneWebInfo);
        let oneWeb = '<div class="swiper-slide">';
        // webpage image
        oneWeb += '<div class="webpageFrame">';
        oneWeb += '<img src="images/works/' + oneWebInfo.pageImg + '" alt="webDesignPage">';
        oneWeb += '</div>';

        // webpage info
        oneWeb += '<div class="webInfo">'
        oneWeb += '<img src="images/logosProject/' + oneWebInfo.projectLogo + '" alt="webDesignLogo">';
        
        oneWeb += '<h3 class="kor">' + oneWebInfo.projectSummary.summaryKor + '</h3>';
        oneWeb += '<h3 class="eng">' + oneWebInfo.projectSummary.summaryEng + '</h3>';
        oneWeb += '<h3 class="jpn">' + oneWebInfo.projectSummary.summaryJpn + '</h3>';
        
        oneWeb += '<p class="kor">담당 역할:' + oneWebInfo.role.roleKor + '</p>';
        oneWeb += '<p class="eng">role:' + oneWebInfo.role.roleEng + '</p>';
        oneWeb += '<p class="jpn">役割:' + oneWebInfo.role.roleJpn + '</p>';

        oneWeb += '<p class="kor">실시 기관:' + oneWebInfo.place.placeKor + '</p>';
        oneWeb += '<p class="eng">place' + oneWebInfo.place.placeEng + '</p>';
        oneWeb += '<p class="jpn">実施機関:' + oneWebInfo.place.placeJpn + '</p>';

        oneWeb += '<ul>'
        for (let onePL of oneWebInfo.language){
            oneWeb += '<li><img src="./images/logosIt/'
                + onePL +
                '.png" alt="webLang"></li>'
        }
        
        oneWeb += '</ul>'

        oneWeb += '<a href="' + oneWebInfo.url + '" target="_blank">';
        oneWeb += 'To Webpage';
        oneWeb += '</a>';
        oneWeb += '<a class="kor" href="#" target="_blank">';
        oneWeb += 'ToDocument';
        oneWeb += '</a>';

        oneWeb += '<p class="explain kor">';
        oneWeb += oneWebInfo.explain.explainKor;
        oneWeb += '</p>';
        oneWeb += '<p class="explain eng">';
        oneWeb += oneWebInfo.explain.explainEng;
        oneWeb += '</p>';
        oneWeb += '<p class="explain jpn">';
        oneWeb += oneWebInfo.explain.explainJpn;
        oneWeb += '</p>';

        oneWeb += '</div></div>'
        $(oneWeb).appendTo(frontWeb);
    }
    
    // webWork Swiper
    var swiper = new Swiper(".worksSwiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      grabCursor: true
    });
    
    // 프로필
    // 학력 & 경력
    let popExperience = $('.popExperience');
    for (let oneInfo of profile) {

        // 전체 form
        let experienceForm = '<div class="' + oneInfo.langCode + '">';

        // 소제목 설정
        let scholarTitle = '' // 학력
        let workTitle = ''; // 경력
        let langTitle = ''; // 어학
        let certifyTitle = ''; // 자격증

        switch (oneInfo.langCode) {
            case 'kor':
                scholarTitle = '<h3>학업, 교육 경력</h3>';
                workTitle = '<h3>직업 경력</h3>';
                langTitle = '<h3>어학 자격증</h3>';
                certifyTitle = '<h3>기타 자격증</h3>';
                break;

            case 'eng':
                scholarTitle = '<h3>Scholarship & Education</h3>';
                workTitle = '<h3>Work Experience</h3>';
                langTitle = '<h3>Language Certificate</h3>';
                certifyTitle = '<h3>Other Certificate</h3>';
                break;

            case 'jpn':
                scholarTitle = '<h3>学業・教育履歴</h3>';
                workTitle = '<h3>職業経歴</h3>';
                langTitle = '<h3>語学試験</h3>';
                certifyTitle = '<h3>他の資格</h3>';
                break;
        }

        // 학력
        let schools = '<ul>';
        for (let school of oneInfo.educationExperience) {
            let oneSchool = '<li>'
            oneSchool += '<p>' + school.schoolName + '<span>' + school.courseName;

            
            oneSchool += '</span></p>'
            oneSchool += '<p>' + school.duration + ' / ' + school.location;
            for (let country of contries) {
                if (country.countryCode3 === school.country) {
                    oneSchool += '<img src="./images/' + country.countryFlag + '" alt="' + country.countryCode2 + '">';
                }
            }
            oneSchool += '</p>';
            oneSchool += '</li>'
            schools += oneSchool
        }
        schools += '</ul>';
        experienceForm += scholarTitle + schools;

        // 경력
        let works = '<ul>';
        for (let work of oneInfo.workExperience) {
            let oneWork = '<li>'
            oneWork += '<p>' + work.companyName + '</p><p>' + work.duration + '/' + work.location;

            for (let country of contries) {
                if (country.countryCode3 === work.country) {
                    oneWork += '<img src="./images/' + country.countryFlag + '" alt="' + country.countryCode2 + '">';
                }
            }
            oneWork += '</p>';
            oneWork += '</li>';
            works += oneWork
        }
        works += '</ul>';
        experienceForm +=  workTitle + works;

        // 어학
        let languages = '<ul>';
        for (let langtest of oneInfo.languageTests) {
            let oneLang = '<li>'
            oneLang += '<p>' + langtest.testName + ' (' + langtest.grade + ')';
            oneLang +='  <span>' + langtest.testedDate + '</span></p>';
            oneLang += '</li>';
            languages += oneLang;
        }
        languages += '</ul>';
        experienceForm += langTitle + languages;

        // 자격증
        let certificates = '<ul>';
        for (let certificate of oneInfo.lisencesAndCertificate) {
            let oneTest = '<li>'
            oneTest += '<p>' + certificate.testName;
            oneTest +='  <span>' + certificate.testedDate + '</span></p>';
            oneTest += '</li>';
            certificates += oneTest;
        }
        certificates += '</ul>';
        experienceForm += certifyTitle + certificates;

        experienceForm += '</div>';
        $(experienceForm).appendTo(popExperience);
    }

});
