(function () {
    "use strict";

    Interface.main = {
        "init" : function () {
            var type      = Interface.data.type,
                headID    = document.getElementsByTagName("head")[0],
                cssNode   = document.createElement('link'),
                title = type.toUpperCase() + ' Remote Web Interface';
            cssNode.type  = 'text/css';
            cssNode.rel   = 'stylesheet';
            cssNode.href  = 'js/k3y.css.' + type + '.css';
            cssNode.media = 'screen';
            headID.appendChild(cssNode);

            $('.logo > img').attr('src', 'img/logo-' + type + '.png');
            /*var title = 'xK3y Remote Web Interface';
            if (type == 'ps3')
                title = '3Key Remote Web Interface'
            else if (type == 'wiiu')
                title = 'WiiKeU Remote Web Interface'*/
            $('title').html(title);

            //Notify Xbox users that they should change their settings
            if (navigator.userAgent == "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; Xbox)") {
                Interface.utils.messageBox.create(Interface.data.messages["notify-xbox"]);
            }
        },
        "create" : {
            "gamepage" : function (args, xml) {
                var targs = args[1].split("&"),
                    name  = targs[1],
                    id    = targs[0],
                    URL   = "covers/" + id + ".xml",
                    page = $("#game-page"),
                    title,
                    summary,
                    HTML = '',
                    cover,
                    infoitems,
                    item,
                    string;

                page.find("#game-title").html("Loading " + unescape(name));
                page.find(".page-content").html("Loading info...");

                if (!xml) {
                    $.ajax({
                        type: "GET",
                        url: URL,
                        success: function (data) {
                            var xml = $(data);
                            Interface.main.create.gamepage(args, xml);
                        },
                        error: function () {
                            $.ajax({
                                type: "GET",
                                url: "img/empty.xml",
                                success: function (data) {
                                    var xml = $(data);
                                    Interface.main.create.gamepage(args, xml);
                                }
                            });
                        }
                    });
                } else {
                    title = xml.find("title").text();
                    summary = xml.find("summary").text();
                    cover = "covers/" + id + ".jpg";
                    infoitems = "<table>";

                    if (title == "No Title") {
                        title = unescape(name);
                    }

                    xml.find("infoitem").each(function () {
                        infoitems += "<tr>";
                        item   = $(this);
                        string = item.text();
                        if (string.indexOf('www') == 0 || string.indexOf('http') == 0) {
                            if (string.contains('youtube.com')) {
                                //var id = string.match(/([^\/]+)$/g);
                                var id = Interface.utils.parseYouTubeURL(string);
                                if (id != '') {
                                    string = '<a href="javascript:void(0);" onclick="Interface.utils.videoPopup(\'' + id + '\')">' + string + '</a>';
                                } else {
                                    string = '<a href="' + string + '" target="_blank">' + string + '</a>';
                                }
                            } else {
                                string = '<a href="' + string + '" target="_blank">' + string + '</a>';
                            }
                        }
                        //infoitems += item.attr("name") + ": "+ string+'<br/>';
                        infoitems += "<td>" + item.attr("name") + ": </td><td>" + string + "</td>";
                        infoitems += "</tr>";
                    });

                    infoitems += "</table><br/>";

                    HTML += '<div class="gamepage-info">';
                    HTML += infoitems;
                    HTML += '</div>';

                    HTML += '<div class="main-item gamepage-item active-game">';
                    HTML += '<img class="gamepage-game" src="' + cover + '" alt="Cover"/></div>';
                    // HTML += '<span class="gamepage-info">'
                    // HTML += infoitems;
                    // HTML += '</span>';
                    HTML += '<div>';
                    HTML += summary;
                    HTML += '</div>';

                    HTML += '<br/>';
                    HTML += '<div class="gamepage-buttonContainer">';
                    HTML += '<a href="javascript:void(0)" onclick="Interface.utils.launch(\'' + id + '\')"><span class="prettyButton">Play</span></a>';
                    HTML += '<a href="#favorites_game_manager-page?' + id + '&' + escape(name) + '"><span class="prettyButton">Manage lists</span></a>';
                    HTML += '</div>';

                    HTML += '<br class="clear"/>';

                    page.find("#game-title").html(title);
                    page.find(".page-content").html(HTML);
                }
            },
            "coverwall" : function () {
                if (!Interface.main.vars.made.coverwall) {
                    var name, id, cover, activeClass,
                        HTML   = '',
                        games  = Interface.data.data.sorted,
                        active = Interface.data.data.active,
                        showTitles = Interface.data.storage.settings.get("coverwalltitle"),
                        l = games.length,
                        i;

                    HTML += '<div class="coverwall-container">';

                    for (i = 0; i < l; i += 1) {
                        name  = games[i].name;
                        id    = games[i].id;
                        cover = games[i].cover;

                        activeClass = '';
                        if (id == active) {
                            activeClass = 'active-game';
                        }

                        HTML += '<div class="coverwall-itemcontainer">';
                        HTML += '<a href="javascript:void(0);" onclick="Interface.utils.select(\'' + id + '&' + escape(name) + '\')">';
                        HTML += '<div class="main-item coverwall-item ' + activeClass + '">';
                        HTML += '<div class="coverwall-imagecontainer">';
                        if (showTitles) {
                            HTML += '<div class="coverwall-gametitle"><span class="coverwall-gametitletext">' + name + '</span></div>';
                        }
                        HTML += '<img class="coverwall-game" src="' + cover + '" alt="Cover"/>';
                        HTML += '</div></div></a></div>';
                    }
                    HTML += '</div>';
                    Interface.navigation.pages.setContent('coverwall-page', HTML);
                    Interface.main.vars.made.coverwall = true;
                }
            },
            "gamelist" : function (force) {
                //var args = args[1];
                //console.time("gamelist");
                var args = document.getElementById('gameSortSelect').value,
                    games = [],
                    showLetters = true,
                    name,
                    id,
                    cover,
                    activeClass,
                    letter,
                    timesPlayed,
                    lastPlayed,
                    obj,
                    HTML = '',
                    active = Interface.data.data.active,
                    l,
                    i;

                if (args == "alphabetic") {
                    games = Interface.data.data.sorted;
                    showLetters = true;
                    force = false;
                } else if (args == "mostplayed") {
                    games = Interface.utils.getMostPlayed();
                    showLetters = false;
                } else if (args == "lastplayed") {
                    games = Interface.utils.getLastPlayed();
                    showLetters = false;
                }

                if (args != Interface.main.vars.curList || force) {
                    l = games.length;
                    for (i = 0; i < l; i += 1) {
                        name   = games[i].name;
                        id     = games[i].id;
                        cover  = games[i].cover;

                        timesPlayed = Interface.data.storage.getTimesPlayed(id);
                        lastPlayed  = Interface.data.storage.getLastPlayed(id);

                        if ((timesPlayed == 0 && lastPlayed == 0) && (args == 'mostplayed' || args == 'lastplayed')) {
                            i += 0;
                        } else {
                            if (showLetters) {
                                letter = name.charAt(0).toUpperCase();
                                if (Interface.utils.isNumber(letter)) {
                                    letter = '#';
                                }
                                if (HTML.indexOf('list-divider-' + letter) == -1) {
                                    HTML       += '<div class="main-item list-item-accent list-divider-' + letter + '"><span class="letter-item-text">';
                                    HTML       += letter;
                                    HTML       += '</span></div>';
                                }
                            }

                            if (lastPlayed == 0) {
                                lastPlayed = 'never';
                            } else {
                                lastPlayed = new Date(lastPlayed);
                                lastPlayed = lastPlayed.toLocaleDateString();
                            }

                            activeClass = false;
                            if (id == active) {
                                activeClass = true;
                            }

                            obj = {
                                "onclick" : 'Interface.utils.select(\'' + id + '&' + escape(name) + '\')',
                                "alt" : true,
                                "active" : activeClass,
                                "image" : cover,
                                "title" : name,
                                "sub" : 'Played ' + timesPlayed + ' times, last ' + lastPlayed
                            };

                            HTML += Interface.utils.html.menuItem(obj);
                        }
                    }
                    $('#listContent').html(HTML);
                    Interface.main.vars.made.gamelist = true;
                    Interface.main.vars.curList = args;
                    //console.timeEnd("gamelist");
                }
            },
            "folders" : function (args) {
                if (args.length > 0 && Interface.main.vars.made.folders) {
                    Interface.navigation.navigateTo(args[1]);
                    return;
                }
                if (!Interface.main.vars.made.folders) {
                    //console.time("folders");
                    var dir,
                        par,
                        name,
                        id,
                        cover,
                        activeClass,
                        lastPlayed,
                        timesPlayed,
                        obj,
                        htmlPar,
                        active  = Interface.data.data.active,
                        games   = Interface.data.data.games,
                        folders = Interface.data.data.folders,
                        HTML = '',
                        HTMLToAppend = {},
                        l = folders.length,
                        i;

                    for (i = 0; i < l; i += 1) {
                        dir = escape(folders[i].dir);
                        par = folders[i].par;
                        if (!document.getElementById(dir + '-dir')) {
                            Interface.navigation.pages.create(dir + '-dir', dir);
                            obj = {
                                "href" : '#folders-page?' + dir + '-dir',
                                "id" : dir + '-item',
                                "alt" : true,
                                "title" : unescape(dir),
                                "sub" : "Folder"
                            };

                            HTML = Interface.utils.html.menuItem(obj);

                            if (!HTMLToAppend[par]) {
                                HTMLToAppend[par] = '';
                            }
                            HTMLToAppend[par] += HTML;
                        }
                    }
                    l = games.length;
                    for (i = 0; i < l; i += 1) {
                        name  = games[i].name;
                        id    = games[i].id;
                        cover = games[i].cover;
                        par   = games[i].parent;

                        timesPlayed = Interface.data.storage.getTimesPlayed(id);
                        lastPlayed  = Interface.data.storage.getLastPlayed(id);
                        if (lastPlayed == 0) {
                            lastPlayed = 'never';
                        } else {
                            lastPlayed = new Date(lastPlayed);
                            lastPlayed = lastPlayed.toLocaleDateString();
                        }

                        activeClass = false;
                        if (id == active) {
                            activeClass = true;
                        }
                        obj = {
                            "onclick" : 'Interface.utils.select(\'' + id + '&' + escape(name) + '\')',
                            "alt" : true,
                            "active" : activeClass,
                            "image" : cover,
                            "title" : name,
                            "sub" : 'Played ' + timesPlayed + ' times, last ' + lastPlayed
                        };

                        HTML = Interface.utils.html.menuItem(obj);
                        /*if ($.isEmptyObject(HTMLToAppend[par])) {
                            HTMLToAppend[par] = '';
                        }*/
                        if (!HTMLToAppend[par]) {
                            HTMLToAppend[par] = '';
                        }
                        HTMLToAppend[par] += HTML;
                    }
                    for (i in HTMLToAppend) {
                        if (HTMLToAppend.hasOwnProperty(i)) {
                            //Get the HTML
                            HTML = HTMLToAppend[i];
                            //If dir is HDD, put into main container
                            if (Interface.utils.isHDD(i)) {
                                htmlPar = 'folders-page';
                            } else {
                                //Otherwise prep html parent ID
                                htmlPar = escape(i + '-dir');
                            }
                            //Append all HTML at once to parent container
                            Interface.navigation.pages.addContent(htmlPar, HTML);
                        }
                    }

                    Interface.main.vars.made.folders = true;
                    if (args.length > 0) {
                        Interface.navigation.navigateTo(args[1]);
                    }
                    //console.timeEnd("folders");
                    return;
                }
            },
            "favorites" : function (args) {
                if (args.length > 0 && Interface.main.vars.made.favorites) {
                    Interface.navigation.navigateTo(args[1]);
                    return;
                }
                var id,
                    name,
                    cover,
                    activeClass,
                    listName,
                    desc,
                    pageName,
                    gameList,
                    gameHTML,
                    timesPlayed,
                    lastPlayed,
                    obj,
                    active = Interface.data.data.active,
                    lists = Interface.data.lists.getLists(),
                    mainHTML = '',
                    k,
                    l = lists.length,
                    i,
                    j;

                if (l == 0) {
                    obj = {
                        "title" : 'No lists yet',
                        "sub" : 'Go make some!'
                    };
                    mainHTML += Interface.utils.html.menuItem(obj);
                } else {
                    for (i = 0; i < l; i += 1) {
                        listName = lists[i].name;
                        pageName = listName + "-listpage";
                        //desc     = (lists[i].desc ? lists[i].desc : "List");
                        desc = (lists[i].desc || "List");

                        obj = {
                            "href" : '#favorites-page?' + pageName,
                            "alt" : true,
                            "title" : unescape(listName),
                            "sub" : unescape(desc)
                        };

                        mainHTML += Interface.utils.html.menuItem(obj);

                        gameList = lists[i].content;
                        k = gameList.length;
                        if (!Interface.navigation.pages.exists(pageName)) {
                            Interface.navigation.pages.create(pageName, unescape(listName));
                        }
                        gameHTML = '';
                        for (j = 0; j < k; j += 1) {
                            id    = gameList[j].id;
                            name  = gameList[j].name;
                            cover = 'covers/' + id + '.jpg';

                            timesPlayed = Interface.data.storage.getTimesPlayed(id);
                            lastPlayed  = Interface.data.storage.getLastPlayed(id);
                            if (lastPlayed == 0) {
                                lastPlayed = 'never';
                            } else {
                                lastPlayed = new Date(lastPlayed);
                                lastPlayed = lastPlayed.toLocaleDateString();
                            }

                            activeClass = false;
                            if (id == active) {
                                activeClass = true;
                            }

                            obj = {
                                "onclick" : 'Interface.utils.select(\'' + id + '&' + escape(name) + '\')',
                                "alt" : true,
                                "active" : activeClass,
                                "image" : cover,
                                "title" : name,
                                "sub" : 'Played ' + timesPlayed + ' times, last ' + lastPlayed
                            };

                            gameHTML += Interface.utils.html.menuItem(obj);
                        }

                        Interface.navigation.pages.setContent(pageName, gameHTML);
                    }
                }
                if (lists.length != 0) {
                    obj = {
                        "href" : "#favorites_list_manager-page",
                        "title" : "List manager",
                        "sub" : "Manage your lists",
                        "active" : true
                    };
                    mainHTML += Interface.utils.html.menuItem(obj);
                }
                Interface.navigation.pages.setContent('favorites-page', mainHTML);
                Interface.main.vars.made.favorites = true;
                if (args.length > 0) {
                    Interface.navigation.navigateTo(args[1]);
                }
            },
            "favorites_game_manager" : function (args) {
                args     = args[1].split("&");
                var id       = args[0],
                    name     = args[1],
                    lists    = Interface.data.lists.getLists(id),
                    toAdd    = lists.isAvailable,
                    toRemove = lists.isIn,
                    HTML = '',
                    l = toAdd.length,
                    i;

                if (l > 0) {
                    for (i = 0; i < l; i += 1) {
                        HTML += '<option value="' + toAdd[i].name + '">' + unescape(toAdd[i].name) + '</option>';
                    }
                    $('.listsAddGameSelector').html(HTML);
                    $('.listsDataAddListName').attr('value', toAdd[0].name);
                    $('.gameManagerAddGame').removeClass("invis");
                } else {
                    $('.gameManagerAddGame').addClass("invis");
                }

                HTML = '';
                l = toRemove.length;
                if (l > 0) {
                    for (i = 0; i < l; i += 1) {
                        HTML += '<option value="' + toRemove[i].name + '">' + unescape(toRemove[i].name) + '</option>';
                    }
                    $('.listsRemoveGameSelector').html(HTML);
                    $('.listsDataRemoveListName').attr('value', toRemove[0].name);
                    $('.gameManagerRemoveGame').removeClass("invis");
                } else {
                    $('.gameManagerRemoveGame').addClass("invis");
                }

                $('.listsDataGameID').attr('value', id);
                $('.listsDataGameName').attr('value', name);
                $('.gameManagerGameName').html(unescape(name));
            },
            "favorites_list_manager" : function () {
                var lists    = Interface.data.lists.getLists(),
                    HTML = '',
                    l = lists.length,
                    i;
                if (l > 0) {
                    for (i = 0; i < l; i += 1) {
                        HTML += '<option value="' + lists[i].name + '">' + unescape(lists[i].name) + '</option>';
                    }
                    $('.listsManagerSelector').html(HTML);
                    $('.listsManagerListName').attr('value', lists[0].name);
                    $('.listManagerSelectList, .listManagerOptions').removeClass("invis");
                    $('.listManagerNoLists').addClass('invis');
                } else {
                    $('.listManagerSelectList, .listManagerOptions').addClass("invis");
                    $('.listManagerNoLists').removeClass('invis');
                }
            },
            "recent" : function () {
                if (!Interface.main.vars.made.recentList) {
                    Interface.main.vars.made.recentList = true;
                    Interface.data.lists.updateRecent();
                    return;
                }
                if (!Interface.main.vars.made.recent) {
                    var list = Interface.data.lists.getLists(),
                        index = Interface.data.lists.indexOf("Recently Added"),
                        id,
                        name,
                        cover,
                        activeClass,
                        obj,
                        active = Interface.data.data.active,
                        HTML = '',
                        l,
                        i;

                    list = list[index].content;

                    l = list.length;
                    for (i = 0; i < l; i += 1) {
                        id    = list[i].id;
                        name  = list[i].name;
                        cover = 'covers/' + id + '.jpg';

                        activeClass = false;
                        if (id == active) {
                            activeClass = true;
                        }

                        obj = {
                            "onclick" : 'Interface.utils.select(\'' + id + '&' + escape(name) + '\')',
                            "alt" : true,
                            "active" : activeClass,
                            "image" : cover,
                            "title" : name,
                            "sub" : 'Newly added'
                        };

                        HTML += Interface.utils.html.menuItem(obj);
                    }
                    Interface.navigation.pages.setContent('recent-page', HTML);

                    Interface.main.vars.made.recent = true;
                }
            },
            "about" : function () {
                if (!Interface.main.vars.made.about) {
                    var HTML = '',
                        temp,
                        i;
                    HTML += '<div class="main-item list-item-accent"><span class="letter-item-text">';
                    HTML += "Device";
                    HTML += '</span></div>';
                    for (i = 0; i < Interface.data.data.about.length; i += 1) {
                        temp = Interface.data.data.about[i];
                        HTML += '<div class="main-item"><span class="main-item-text item-text">';
                        HTML += temp.item;
                        HTML += '</span><span class="secondary-item-text item-text">';
                        HTML += temp.value;
                        HTML += '</span></div>';
                    }
                    HTML += '<div class="main-item list-item-accent"><span class="letter-item-text">';
                    HTML += "Other";
                    HTML += '</span></div>';
                    HTML += '<div onclick="Interface.utils.easter();Interface.utils.messageBox.create(Interface.data.messages.changelog);" class="main-item"><span class="main-item-text item-text">Interface version</span><span class="secondary-item-text item-text">';
                    HTML += Interface.data.version;
                    HTML += '</span></div>';

                    HTML += '<div class="main-item"><span class="main-item-text item-text">GUID</span><span class="secondary-item-text item-text">';
                    HTML += Interface.data.data.storage.guid;
                    HTML += '</span></div>';

                    HTML += '<a href="http://k3yforums.com/" target="_blank"><div class="main-item"><span class="main-item-text item-text">Support</span><span class="secondary-item-text item-text">';
                    HTML += 'Get support for anything *K3y related here';
                    HTML += '</span></div></a>';

                    HTML += '<a href="http://xkeydownloads.com/stats" target="_blank"><div class="main-item"><span class="main-item-text item-text">Statistics</span><span class="secondary-item-text item-text">';
                    HTML += 'View the online statistics';
                    HTML += '</span></div></a>';

                    HTML += '<a href="https://github.com/MrWaffle/K3y-Web-Interface" target="_blank"><div class="main-item"><span class="main-item-text item-text">Source on Github</span><span class="secondary-item-text item-text">';
                    HTML += 'Contribute or study the inner workings of this interface';
                    HTML += '</span></div></a>';

                    Interface.navigation.pages.setContent('about-page', HTML);
                    Interface.main.vars.made.about = true;
                }
            },
            "settings" : function () {
                if (!Interface.main.vars.made.settings) {
                    var HTML = '',
                        settings = Interface.data.storage.settings.supported,
                        strings = Interface.data.storage.settings.strings,
                        l = settings.length,
                        obj,
                        i;
                    for (i = 0; i < l; i += 1) {
                        obj = {
                            "href" : "#settings-page",
                            "onclick" : "Interface.data.storage.settings.handle(this)",
                            "id" : "setting-" + settings[i],
                            "title" : strings[settings[i]].title,
                            "sub" : strings[settings[i]].desc
                        };
                        HTML += Interface.utils.html.menuItem(obj);
                    }
                    Interface.navigation.pages.setContent('settings-page', HTML);
                    Interface.data.storage.settings.init();
                    Interface.main.vars.made.settings = true;
                }
            }
        },
        "vars" : {
            "made" : {
                "gamelist"               : false,
                "coverwall"              : false,
                "folders"                : false,
                "favorites"              : false,
                "favorites_game_manager" : false,
                "favorites_list_manager" : false,
                "recent"                 : false,
                "recentList"             : false,
                "about"                  : false,
                "settings"               : false
            },
            "index" : [
                "gamelist", "coverwall", "folders", "recent", "about", "settings"
            ],
            "curList" : ""
        }
    };
}());
