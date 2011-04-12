/**
 * Created by azu.
 * Date: 11/02/25 16:30
 * License: MIT License
 */
var port = port || {};
$(function() {
    var sites = {};


    function createNav(data) {
        if (jQuery.isEmptyObject(data)) {
            return log("dataがないよ");
        }
        var nav = $('<nav />');
        var ul = $('<ul />', {
                    className : "nav-roll"
                })
        $.each(data, function(key, value) {// ドメイン
            ul.append(
                    $('<li class="nav-site" />')
                            .append($('<a />', {
                                href : "#" + key,
                                text : value.title,
                                click: function(e) {
                                    // e.preventDefault();
                                    $.scrollTo($("#" + key), 500, {queue:true});
                                }
                            }))
                            .append($('<img />', {
                                src : value.screenshot,
                                width: "140px",
                                alt : value.title
                            }))
            );
        });
        nav.append($('<span />', {
                    className:"descrition",
                    text :"ナビゲーション"
                }))
                .append(ul);
        return nav;
    }

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
                title : $('h1', elem).text(),
                description : $('.site-description', elem).text(),
                screenshot : $('img[src]', screenshot)[0].src,// 絶対パス
                url : $('a[href]', screenshot)[0].href
            };
        });
        return result;
    }


    var navElem = createNav(getSiteInfo('.sites')),
            ref = $('#contents');
    ref.prepend(navElem);
    port = {
        "getSiteInfo" : getSiteInfo,
        "createNav" : createNav
    }
    function log() {
        if (window.console) {
            console.debug(arguments)
        }
        return false;
    }
})