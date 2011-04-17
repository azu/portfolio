/**
 * Created by azu.
 * Date: 11/02/25 16:30
 * License: MIT License
 */
var port = port || {};
$(function() {
    var sites = {};

    // http://tkyk.github.com/jquery-history-plugin/
    var locationWrapper = {
        put: function(hash, win) {
            (win || window).location.hash = this.encoder(hash);
        },
        get: function(win) {
            var hash = ((win || window).location.hash).replace(/^#/, '');
            try {
                return $.browser.mozilla ? hash : decodeURIComponent(hash);
            }
            catch (error) {
                return hash;
            }
        },
        encoder: encodeURIComponent
    };

    function createNav(data) {
        if (jQuery.isEmptyObject(data)) {
            return log("dataがないよ");
        }
        var nav = $('<nav />');
        var ul = $('<ul />', {
                    className : "nav-roll"
                })
        $.each(data, function(key, value) {// ドメイン
            var li = $('<li class="nav-site" />')
                    .append($('<a />', {
                        href : "#" + key,
                        text : value.title
                    }))
                    .append($('<img />', {
                        src : value.screenshot,
                        alt : value.title
                    })
            ).appendTo(ul);
            // クリックでarticleまで移動
            li.click(function(e) {
                // e.preventDefault();
                $.scrollTo($("#" + key), 500, {axis:'y'});
                locationWrapper.put(key);
            });
        });
        nav.append($('<span />', {
                    className:"descrition",
                    text :"クリックするとスクロールします"
                }))
                .append(ul);
        return nav;
    }

    // domain-idを持つ要素から情報を取得
    function getSiteInfo(selector) {
        var articles = $(selector);
        if (articles.size() === 0) {
            return false;
        }
        var result = {};
        articles.each(function(idx, elem) {
            if (!elem.id) {
                return log(elem, "idがない");
            }
            var siteID = elem.id;
            var screenshot = $('.screenshots', elem);
            result[siteID] = {
                title : $('h1 > a', elem).text(),
                description : $('.site-description', elem).text(),
                screenshot : $('img[src]', screenshot)[0].src,// 絶対パス
                url : $('a[href]', screenshot)[0].href
            };
        });
        return result;
    }

    function insertNav(selector, navElem) {
        var ref = $(selector);
        ref.prepend(navElem);
    }

    port = {
        "getSiteInfo" : getSiteInfo,
        "createNav" : createNav,
        "insertNav" : insertNav
    }
    function log() {
        if (window.console) {
            console.log(arguments)
        }
        return false;
    }

});
$(function main() {
    dispatcher
            .connect({
                pathname:/sites.html/
            },
            function() {
                var navElem = port.createNav(port.getSiteInfo('#contents > article'));
                port.insertNav('#contents', navElem);
            })
            .connect({
                pathname:/products.html/
            },
            function() {
                var navElem = port.createNav(port.getSiteInfo('#contents > article'));
                port.insertNav('#contents', navElem);
            }).dispatch();

})

