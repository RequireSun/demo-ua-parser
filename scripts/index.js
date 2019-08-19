var $noticeDesktop = document.getElementById('notice-desktop');
var $containerMain = document.getElementById('container-main');
var $btnDesktopShow = document.getElementById('btn-desktop-show');

var $sectionBase = document.getElementById('section-base');

var md;

(function () {
    if (!MobileDetect._impl.mobileDetectRules.props['WeChat']) {
        if (MobileDetect._impl.mobileDetectRules.props['MicroMessenger']) {
            MobileDetect._impl.mobileDetectRules.props['WeChat'] = MobileDetect._impl.mobileDetectRules.props['MicroMessenger'];
        } else {
            MobileDetect._impl.mobileDetectRules.props['WeChat'] = 'MicroMessenger\/[VER]';
        }
    }
})();

var showMain = function () {
    $sectionBase.innerText = JSON.stringify(parseMd());

    $noticeDesktop.classList.remove('active');
    $containerMain.classList.add('active');
};

var init = function () {
    md = new MobileDetect(window.navigator.userAgent);

    if (null === md.mobile()) {
        // 不处理
    } else {
        showMain();
    }
};

var parseMd = function () {
    var i, l, temp;

    var base = {
        mobile: md.mobile(),
        phone: md.phone(),
        tablet: md.tablet(),
        mobileGrade: md.mobileGrade(),
        os: md.os(),
        userAgent: md.userAgent(),
    };

    var is = {};

    var isKeys = Object.keys(MobileDetect._impl.mobileDetectRules.utils).concat(Object.keys(MobileDetect._impl.mobileDetectRules.uas));

    for (i = 0, l = isKeys.length; i < l; ++i) {
        if (md.is(isKeys[i])) {
            is[isKeys[i]] = true;
        }
    }

    var version = {};

    var versionKeys = Object.keys(MobileDetect._impl.mobileDetectRules.props);

    for (i = 0, l = versionKeys.length; i < l; ++i) {
        temp = md.version(versionKeys[i]);
        if (!isNaN(temp)) {
            version[versionKeys[i]] = temp;
        }
    }

    return {
        base: base,
        is: is,
        version: version,
    };
};

$btnDesktopShow.addEventListener('click', function () {
    showMain();
});

init();


