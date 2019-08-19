var $sectionUa = document.getElementById('section-ua');
var $sectionDevice = document.getElementById('section-device');
var $sectionOs = document.getElementById('section-os');
var $sectionBrowser = document.getElementById('section-browser');
var $sectionEngine = document.getElementById('section-engine');

var uap;

var patchModelChina = {
    device: [
        // vivo 根本没有
        [/Android.+;\s(?:zh-CN;\s)?vivo ([\w\.\s]+)\sBuild/i], [UAParser.DEVICE.MODEL, [UAParser.DEVICE.VENDOR, 'vivo'], [UAParser.DEVICE.TYPE, UAParser.DEVICE.MOBILE]],
        // 魅族根本没有
        [/Android.+;\s(?:zh-CN;\s)?((?:m\d(?:\smetal)?)|(?:PRO\s\d)|(?:MX\d(?:\sPro)?))\sBuild/i], [UAParser.DEVICE.MODEL, [UAParser.DEVICE.VENDOR, 'Meizu'], [UAParser.DEVICE.TYPE, UAParser.DEVICE.MOBILE]],
        // OPPO 新机没有更新上
        [/Android.+;\s(?:zh-CN;\s)?((?:PACM\d+)|(?:PAAM\d+)|(?:CPH\d+)|(?:PBET\d+))\sBuild/i], [[UAParser.DEVICE.VENDOR, 'OPPO'], [UAParser.DEVICE.MODEL, 'R15'], [UAParser.DEVICE.TYPE, UAParser.DEVICE.MOBILE]],
        // 小米新机 MAX 和老机 2S
        [/Android.+;\s(?:zh-cn;\s)?((?:MI\sMAX\s\d)|(?:MIX\s\d\w?))\s+Build/i], [UAParser.DEVICE.MODEL, [UAParser.DEVICE.VENDOR, 'Xiaomi'], [UAParser.DEVICE.TYPE, UAParser.DEVICE.MOBILE]],
        // 荣耀有一部分不认识
        [/Build\/HONOR([\w\s-]+)[;\)]/i], [UAParser.DEVICE.MODEL, [UAParser.DEVICE.VENDOR, 'Honor'], [UAParser.DEVICE.TYPE, UAParser.DEVICE.MOBILE]],
        // 一加 1 就不管了, ua 写的鬼都不认识
        [/Android.+;\s(?:zh-cn;\s)?oneplus2\sBuild/i], [[UAParser.DEVICE.VENDOR, 'OnePlus'], [UAParser.DEVICE.MODEL, '2'], [UAParser.DEVICE.TYPE, UAParser.DEVICE.MOBILE]],
    ],
};

var createLine = function (key, value) {
    var $line = document.createElement('div');
    var $key = document.createElement('span');
    var $equal = document.createElement('span');
    var $value = document.createElement('span');

    $line.classList.add('line');
    $key.classList.add('method');
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

    $key.innerText = key;
    $equal.innerText = '=';
    $value.innerText = value;

    $line.appendChild($key);
    $line.appendChild($equal);
    $line.appendChild($value);

    return $line;
};

var init = function () {
    var ua = window.navigator.userAgent;
    uap = new UAParser(ua, patchModelChina);
    var result = uap.getResult();

    var i, l;

    var deviceKeys = Object.keys(result.device);
    var osKeys = Object.keys(result.os);
    var browserKeys = Object.keys(result.browser);
    var engineKeys = Object.keys(result.engine);

    $sectionUa.querySelector('p').innerText = ua;

    for (i = 0, l = deviceKeys.length; i < l; ++i) {
        $sectionDevice.appendChild(createLine(deviceKeys[i], result.device[deviceKeys[i]]));
    }

    for (i = 0, l = osKeys.length; i < l; ++i) {
        $sectionOs.appendChild(createLine(osKeys[i], result.os[osKeys[i]]));
    }

    for (i = 0, l = browserKeys.length; i < l; ++i) {
        $sectionBrowser.appendChild(createLine(browserKeys[i], result.browser[browserKeys[i]]));
    }

    for (i = 0, l = engineKeys.length; i < l; ++i) {
        $sectionEngine.appendChild(createLine(engineKeys[i], result.engine[engineKeys[i]]));
    }
};

init();
