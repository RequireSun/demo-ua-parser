var $noticeDesktop = document.getElementById('notice-desktop');
var $btnDesktopShow = document.getElementById('btn-desktop-show');
var $containerMain = document.getElementById('container-main');

var $sectionBase = document.getElementById('section-base');
var $sectionIs = document.getElementById('section-is');
var $sectionVersion = document.getElementById('section-version');

var md;

(function () {
    if (!MobileDetect._impl.mobileDetectRules.props['WeChat']) {
        if (MobileDetect._impl.mobileDetectRules.props['MicroMessenger']) {
            MobileDetect._impl.mobileDetectRules.props['WeChat'] = MobileDetect._impl.mobileDetectRules.props['MicroMessenger'];
        } else {
            MobileDetect._impl.mobileDetectRules.props['WeChat'] = 'MicroMessenger\/[VER]';
        }
    }

    if (!MobileDetect._impl.mobileDetectRules.phones['HUAWEI']) {
        MobileDetect._impl.mobileDetectRules.phones['HUAWEI'] = new RegExp('Build/HUAWEI(\\w+-\\w+);', 'i');
    }
})();

var createBase = function (key, value) {
    var $line = document.createElement('div');
    var $quoteLeft = document.createElement('span');
    var $quoteRight = document.createElement('span');
    var $equal = document.createElement('span');
    var $key = document.createElement('span');
    var $value = document.createElement('span');

    $line.classList.add('line');
    $quoteLeft.classList.add('quote');
    $quoteRight.classList.add('quote');
    $equal.classList.add('equal');
    $value.classList.add('value');

    $key.innerText = key;
    $quoteLeft.innerText = '(';
    $quoteRight.innerText = ')';
    $equal.innerText = '=';
    $value.innerText = value;

    switch (typeof value) {
        case 'string': {
            $value.classList.add('string');
            break;
        }
        case 'number': {
            $value.classList.add('number');
            break;
        }
        case 'boolean': {
            $value.classList.add('boolean');
            break;
        }
    }

    $line.appendChild($key);
    $line.appendChild($quoteLeft);
    $line.appendChild($quoteRight);
    $line.appendChild($equal);
    $line.appendChild($value);

    return $line;
};

var createIs = function (key, value) {
    var $line = document.createElement('div');
    var $quoteLeft = document.createElement('span');
    var $quoteRight = document.createElement('span');
    var $equal = document.createElement('span');
    var $method = document.createElement('span');
    var $key = document.createElement('span');
    var $value = document.createElement('span');

    $line.classList.add('line');
    $quoteLeft.classList.add('quote');
    $quoteRight.classList.add('quote');
    $key.classList.add('key');
    $equal.classList.add('equal');
    $value.classList.add('value');

    switch (typeof value) {
        case 'string': {
            $value.classList.add('string');
            break;
        }
        case 'number': {
            $value.classList.add('number');
            break;
        }
        case 'boolean': {
            $value.classList.add('boolean');
            break;
        }
    }

    $method.innerText = 'is';
    $quoteLeft.innerText = '(';
    $key.innerText = `'${key}'`;
    $quoteRight.innerText = ')';
    $equal.innerText = '=';
    $value.innerText = value;

    $line.appendChild($method);
    $line.appendChild($quoteLeft);
    $line.appendChild($key);
    $line.appendChild($quoteRight);
    $line.appendChild($equal);
    $line.appendChild($value);

    return $line;
};

var createVersion = function (key, value) {
    var $line = document.createElement('div');
    var $quoteLeft = document.createElement('span');
    var $quoteRight = document.createElement('span');
    var $equal = document.createElement('span');
    var $method = document.createElement('span');
    var $key = document.createElement('key');
    var $value = document.createElement('span');

    $line.classList.add('line');
    $quoteLeft.classList.add('quote');
    $quoteRight.classList.add('quote');
    $key.classList.add('key');
    $equal.classList.add('equal');
    $value.classList.add('value');

    switch (typeof value) {
        case 'string': {
            $value.classList.add('string');
            break;
        }
        case 'number': {
            $value.classList.add('number');
            break;
        }
        case 'boolean': {
            $value.classList.add('boolean');
            break;
        }
    }

    $method.innerText = 'version';
    $quoteLeft.innerText = '(';
    $key.innerText = `'${key}'`;
    $quoteRight.innerText = ')';
    $equal.innerText = '=';
    $value.innerText = value;

    $line.appendChild($method);
    $line.appendChild($quoteLeft);
    $line.appendChild($key);
    $line.appendChild($quoteRight);
    $line.appendChild($equal);
    $line.appendChild($value);

    return $line;
};

var showMain = function () {
    var parsed = parseMd();
    var i, l;

    var baseKeys = Object.keys(parsed.base);
    var isKeys = Object.keys(parsed.is);
    var versionKeys = Object.keys(parsed.version);

    $sectionBase.innerHTML = '';
    $sectionIs.innerHTML = '';
    $sectionVersion.innerHTML = '';

    for (i = 0, l = baseKeys.length; i < l; ++i) {
        $sectionBase.appendChild(createBase(baseKeys[i], parsed.base[baseKeys[i]]));
    }

    for (i = 0, l = isKeys.length; i < l; ++i) {
        $sectionIs.appendChild(createIs(isKeys[i], parsed.is[isKeys[i]]));
    }

    for (i = 0, l = versionKeys.length; i < l; ++i) {
        $sectionVersion.appendChild(createVersion(versionKeys[i], parsed.version[versionKeys[i]]));
    }

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


