;(function () {
    // DOM
    var oInput = document.getElementById('input'),
        oDropdown = document.getElementById('dropdown'),
        oButton = document.getElementById('button'),
        oSearchTypes = document.getElementById('searchTypes'),
        oFirstTools = document.getElementById('firstTools'),
        oSecondTools = document.getElementById('secondTools'),
        oThirdTools = document.getElementById('thirdTools')
    ;

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
    ];

    var firstTools = [
        {
            title: 'WebSite',
            list: [
                {title: '阮一峰', link: 'http://www.ruanyifeng.com'},
                {title: '程序员DD', link: 'http://blog.didispace.com'},
                {title: '纯洁的微笑', link: 'http://www.ityouknow.com'},
                {title: '江南一点雨', link: 'http://www.javaboy.org'},
                {title: 'Wind Mt', link: 'https://windmt.com'},
                {title: '吕小荣', link: 'https://mednoter.com'},
                {title: '屈定\'s Blog', link: 'https://mrdear.cn'},
                {title: 'wangpei\'s Blog', link: 'http://wangpei.me'},
            ]
        },
        {
            title: 'Other',
            list: [
                {title: 'CS-Notes', link: 'https://cyc2018.github.io/CS-Notes/#/README'},
                {title: 'JavaGuide', link: 'https://snailclimb.gitee.io'},
                {title: 'Docs4dev', link: 'https://www.docs4dev.com'},
                {title: '猴子都能懂的 Git 入门', link: 'https://backlog.com/git-tutorial/cn/'},
                {title: '30天精通 RxJS', link: 'https://blog.jerry-hong.com/series/rxjs'}
            ]
        }
    ]

    var secondTools = [
        {
            title: '后端',
            list: [
                {title: '跟上Java8', link: 'https://zhuanlan.zhihu.com/java8'},
                {title: 'Spring', link: 'https://spring.io/quickstart'},
                {
                    title: 'SpringBoot 中文',
                    link: 'https://www.docs4dev.com/docs/zh/spring-boot/2.1.1.RELEASE/reference/boot-documentation.html'
                },
                {title: 'mybatis', link: 'https://mybatis.org/mybatis-3/zh/index.html'},
                {title: 'mybatis-plus', link: 'https://mybatis.plus'},
                {title: 'hutool', link: 'https://hutool.cn'},
            ]
        },
        {
            title: '开源项目',
            list: [
                {title: 'Aooms', link: 'https://gitee.com/cyb-javaer/Aooms'},
                {title: 'SpringBlade', link: 'https://gitee.com/smallc/SpringBlade'},
                {title: 'pig', link: 'https://gitee.com/log4j/pig'},
                {title: 'zheng', link: 'https://gitee.com/shuzheng/zheng'},
                {title: 'spring-boot-plus', link: 'https://springboot.plus'},
            ]
        }
    ]

    var thirdTools = [
        {
            title: 'Angular',
            list: [
                {title: 'Angular', link: 'https://angular.cn'},
                {title: 'Ng-Zorro', link: 'https://ng.ant.design/docs/introduce/zh'},
                {title: 'Ng-Alain', link: 'https://ng-alain.com'},
            ]
        },
        {
            title: 'Vue',
            list: [
                {title: 'Vue', link: 'https://cn.vuejs.org'},
                {title: 'Element', link: 'https://element.eleme.cn/#/zh-CN/component/installation'},
                {title: 'Avue', link: 'https://avuejs.com/doc/installation'},
                {title: 'vue-echarts', link: 'https://github.com/ecomfe/vue-echarts/blob/master/README.zh_CN.md'},
            ]
        },
        {
            title: 'Html & CSS',
            list: [
                {title: '学习 CSS 布局', link: 'http://zh.learnlayout.com'},
                {title: '深入浅出 CSS 布局', link: 'http://layout.imweb.io'},
                {title: 'echarts 例子', link: 'https://echarts.apache.org/examples/zh/#chart-type-line'},
                {title: 'D2 Projects', link: 'https://d2.pub/zh'},
            ]
        }
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
        initTools(firstTools, oFirstTools);
        initTools(secondTools, oSecondTools);
        initTools(thirdTools, oThirdTools);
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

    function initTools(data = [], _html = HTMLElement) {
        for (var i = 0, lenOne = data.length; i < lenOne; i++) {

            var toolTitle = data[i].title;
            var toolItems = data[i].list;

            var toolBoxDiv = document.createElement('div');
            toolBoxDiv.className = "tool-box-div";

            var divTitle = document.createElement('div');
            divTitle.className = "tool-title";
            divTitle.innerText = toolTitle;
            toolBoxDiv.appendChild(divTitle);

            for (var j = 0, lenTwo = toolItems.length; j < lenTwo; j++) {

                var toolItem = document.createElement("div");
                toolItem.className = "tool-item";
                var toolItemSpan = document.createElement('span');
                toolItemSpan.innerText = "*";

                var toolItemA = document.createElement('a');
                toolItemA.href = toolItems[j].link;
                toolItemA.target = "_blank";
                toolItemA.className = "tool-item-link";
                toolItemA.innerText = toolItems[j].title;

                toolItem.appendChild(toolItemSpan);
                toolItem.appendChild(toolItemA);

                toolBoxDiv.appendChild(toolItem);
            }
            _html.appendChild(toolBoxDiv);
        }
    }

    function initEvent() {
        // Show Tips When Input.
        bindEvent(oInput, 'keyup', function (e) {
            // toggleTips(true);
            var ev = e || window.event;
            var target = e.target || ev.srcElement;
            var val = target.value;
            if (e.keyCode === 13) {
                executeSearch(val);
            } else {
                // getTips(val);
            }
        });
        // Hide Tips When Click Document.
        // bindEvent(document, 'click', function (e) {
        //     var ev = e || window.event;
        //     var target = e.target || ev.srcElement;
        //     if (target.className === 'tips-item') {
        //         executeSearch(target.innerHTML);
        //     } else if (target.className === 'search-type') {
        //         changeSearchType(target);
        //     } else {
        //         toggleTips(false);
        //     }
        // });
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