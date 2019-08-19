var $containerMain = document.getElementById('container-main');

var uap;

var init = function () {
    uap = new UAParser(window.navigator.userAgent);
};

init();
