var md = new MobileDetect(window.navigator.userAgent);
var $noticeDesktop = document.getElementById('notice-desktop');
var $containerMain = document.getElementById('container-main');
var $btnDesktopShow = document.getElementById('btn-desktop-show');

var showMain = function () {
    $noticeDesktop.classList.remove('active');
    $containerMain.classList.add('active');
};

if (null === md.mobile()) {
    // 不处理
} else {
    showMain();
}

$btnDesktopShow.addEventListener('click', function () {
    showMain();
});


