// 방문 지역
import { visitedAreas, picturesUtah, picturesSydney, picturesNagoya } from "./datas/picturesVisited.js"

//skills
import skills from './datas/skills.js'

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

    // skills
    let skillList = $('.popSkills ul');
    for(let skill of skills) {
        let oneSkill = '<li><div class=' + skill.skillType + '>';
        oneSkill += '<img src="./images/logos/'+ skill.skillName +'.png" alt="' + skill.skillType + '">';
        oneSkill += '</div></li>';
        $(oneSkill).appendTo(skillList);
    }
    
});