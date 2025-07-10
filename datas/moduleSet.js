
import { visitedAreas, picturesUtah, picturesSydney, picturesNagoya } from "./picturesVisited.js"
jQuery(document).ready(function(){

    
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

    
});