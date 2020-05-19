;(function () {
    // DOM
    var oInput = document.getElementById('input'),
        oDropdown = document.getElementById('dropdown'),
        oButton = document.getElementById('button'),
        oSearchTypes = document.getElementById('searchTypes');

    // Variables
    var activeIndex = 0;

    // Search Types Links
    var searchTypes = [
        {title: 'Magi', link: 'https://magi.com/search?q='},
        {title: '多吉', link: 'https://www.dogedoge.com/results?q='},
        {title: '谷歌', link: 'https://www.google.com/search?q='},
        {title: '秘迹', link: 'https://mijisou.com/?category_general=on&time_range=&language=zh-CN&pageno=1&q='},
        {title: '百度', link: 'https://www.baidu.com/baidu?ie=utf-8&wd='},
        {title: '必应', link: 'https://cn.bing.com/search?q='},
        {title: '搜狗', link: 'https://www.sogou.com/web?query='},
        {title: '微信', link: 'https://weixin.sogou.com/weixin?type=2&ie=utf8&query='},
    ]

    // utils  
    var bindEvent = (function () {
        if (window.addEventListener) {
            return function (el, type, fn) {
                el.addEventListener(type, fn, false);
            }
        } else {
            return function (el, type, fn) {
                el.attachEvent('on' + type, fn);
            }
        }
    })();

    init();

    function init() {
        initSearchTypes();
        initEvent();
    }

    function initSearchTypes() {
        for (var i = 0, len = searchTypes.length; i < len; i++) {
            var a = document.createElement('a');
            if (i === activeIndex) {
                a.className = 'search-type active';
            } else {
                a.className = 'search-type';
            }
            a.innerHTML = searchTypes[i].title;
            a.setAttribute('data-index', i);
            oSearchTypes.appendChild(a);
        }
    }

    function initEvent() {
        // Show Tips When Input.
        bindEvent(oInput, 'keyup', function (e) {
            toggleTips(true);
            var ev = e || window.event;
            var target = e.target || ev.srcElement;
            var val = target.value;
            if (e.keyCode === 13) {
                executeSearch(val);
            } else {
                getTips(val);
            }
        });
        // Hide Tips When Click Document.
        bindEvent(document, 'click', function (e) {
            var ev = e || window.event;
            var target = e.target || ev.srcElement;
            if (target.className === 'tips-item') {
                executeSearch(target.innerHTML);
            } else if (target.className === 'search-type') {
                changeSearchType(target);
            } else {
                toggleTips(false);
            }
        });
        // Click Search Button to Search
        bindEvent(oButton, 'click', function (e) {
            executeSearch(oInput.value);
        })
    }

    function executeSearch(keywords) {
        toggleTips(false);
        window.location.href = searchTypes[activeIndex].link + keywords;
        // window.open(searchTypes[activeIndex].link + keywords);
    }

    function changeSearchType(el) {
        var className = el.className;
        if (className.indexOf('active') > -1) return;
        el.className = className + ' active';
        activeIndex = el.getAttribute('data-index');
        var parentNode = el.parentNode;
        for (var i = 0; i < parentNode.children.length; i++) {
            var childEl = parentNode.children[i]
            if (childEl === el) continue;
            if (childEl.className.indexOf('active') > -1) {
                childEl.className = className;
            }
        }
    }

    function toggleTips(flag) {
        oDropdown.style.display = flag ? 'block' : 'none';
    }

    function getTips(keywords) {
        flexJsonp({
            url: 'http://suggestion.baidu.com/su',
            params: {
                wd: keywords,
                p: 3,
                t: new Date().getTime()
            },
            callbackParam: 'cb'
        }).then(function (res) {
            responseHandle(res);
        }, function (err) {
            window.console.log(err);
        });
    }

    function responseHandle(res) {
        var tipsList = res.s;
        oDropdown.innerHTML = '';
        if (tipsList.length) {
            for (var i = 0, len = tipsList.length; i < len; i++) {
                var oLi = document.createElement('li');
                oLi.className = 'tips-item';
                oLi.innerHTML = tipsList[i];
                oDropdown.appendChild(oLi);
            }
        } else {
            var oLi = document.createElement('li');
            oLi.className = 'no-tips';
            oLi.innerHTML = 'No Tips';
            oDropdown.appendChild(oLi);
        }
    }
})();