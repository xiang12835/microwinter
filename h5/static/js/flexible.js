/*
 *  Created by cy on 2016/9/21
 *  please don't make any updates unless you know what you are doing
 *  the following codes will flexible all kind of devices whose width are between 320px and 750px
 */
//mobile width and meta settings
var settingREM = function(){
    //var dpr, rem, scale;
    var docEl = document.documentElement;
    var fontEl = document.createElement('style');
    //var metaEl = document.querySelector('meta[name="viewport"]');
    //dpr = window.devicePixelRatio || 1;
    //scale = 1 / dpr;
    //rem = docEl.clientWidth * dpr / 10;
    docEl.firstElementChild.appendChild(fontEl);
    if(docEl.clientWidth<=750){
        fontEl.innerHTML = 'html{font-size:' + docEl.clientWidth/375*20 + 'px!important;}';
    }else{
        fontEl.innerHTML = 'html{font-size:' + 40 + 'px!important;}';
    }
};
settingREM();
// window.onresize=function(){
//     setTimeout(settingREM,100);
// };
