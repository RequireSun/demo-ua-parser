var $containerMain = document.getElementById('container-main');

var $sectionUa = document.getElementById('section-ua');
var $sectionDevice = document.getElementById('section-device');
var $sectionOs = document.getElementById('section-os');
var $sectionBrowser = document.getElementById('section-browser');
var $sectionEngine = document.getElementById('section-engine');

var uap;

var createLine = function (key, value) {
    var $line = document.createElement('div');
    var $key = document.createElement('span');
    var $equal = document.createElement('span');
    var $value = document.createElement('span');

    $line.classList.add('line');
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
    uap = new UAParser(ua);
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
