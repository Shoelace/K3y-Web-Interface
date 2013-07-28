"use strict";

var Interface = {
    /**
        Init
    */
    "init" : function () {
        Interface.data.poll(true);
        Interface.utils.messageBox.create(Interface.data.messages["notify-init"]);
    },
    /**
        Navigation
    */
    "navigation" : {
        "pages" : {
            "list" : {
                "home-page"                   : function () {return; },
                "game-page"                   : function (args) {Interface.main.create.gamepage(args); },
                "coverwall-page"              : function () {Interface.main.create.coverwall(); },
                "list-page"                   : function () {Interface.main.create.gamelist(); },
                "folders-page"                : function (args) {Interface.main.create.folders(args); },
                "favorites-page"              : function (args) {Interface.main.create.favorites(args); },
                "favorites_game_manager-page" : function (args) {Interface.main.create.favorites_game_manager(args); },
                "favorites_list_manager-page" : function (args) {Interface.main.create.favorites_list_manager(args); },
                "favorites_mass_add-page"     : function () {return; },
                "recent-page"                 : function () {Interface.main.create.recent(); },
                "about-page"                  : function () {Interface.main.create.about(); },
                "settings-page"               : function () {Interface.main.create.settings(); }
            },
            "create" : function (id, name, func) {
                if (id.indexOf('%') == -1) {
                    id = escape(id);
                }
                var page = '<div id="' + id + '" class="page"><div class="page-title">' + unescape(name) + '</div><div class="page-content"></div></div>';
                //#main is the main container, append page to there
                $('#main').append(page);
                if (!func) {
                    func = function () {return; };
                }
                //Register page
                Interface.navigation.pages.list[id] = func;
            },
            "remove" : function (id) {
                if (id.indexOf('%') == -1) {
                    id = escape(id);
                }
                var selector = document.getElementById(id),
                    page = $(selector);
                //Clean up HTML
                page.remove();
                //Unregister page
                delete Interface.navigation.pages.list[id];
            },
            "exists" : function (id) {
                var page;
                for (page in Interface.navigation.pages.list) {
                    if (Interface.navigation.pages.list.hasOwnProperty(page)) {
                        if (page == id) {
                            return true;
                        }
                    }
                }
                return false;
            },
            "setContent" : function (id, HTML) {
                //$('#' + id).children('.page-content').html(HTML);
                $('[id="' + id + '"]').children('.page-content').html(HTML);
            },
            "addContent" : function (id, HTML, prepend) {
                //$('#' + id + ' > .page-content').html(HTML);
                //$(document.getElementById(id)).children('.page-content').html(HTML);
                //$('#' + id).children('.page-content').html(HTML);
                if (!prepend) {
                    $('[id="' + id + '"]').children('.page-content').append(HTML);
                    //$('#' + id).children('.page-content').append(HTML);
                } else {
                    $('#' + id).children('.page-content').prepend(HTML);
                }
            }
        },
        "navigateTo" : function (page) {
            //console.log(page);
            //console.time("navigate");
            var allPages = this.pages.list,
                args = [];
            if (!page) {
                page = 'home-page';
            }
            //Do we have a "#" in the page string? cut it off
            if (page.indexOf('#') == 0) {
                page = page.slice(1, page.length);
            }
            //Parse arguments
            if (page.indexOf('?') != -1) {
                args = page.split('?', 2);
                page = args[0];

                if (page == "folders-page" || page == "favorites-page" || (page == "game-page" && this.previous == "game-page")) {
                    /*console.log(args);
                    page = args[1];*/
                    allPages[page](args);
                    return;
                }
            }
            //If hash is an overlay, go back
            if (page == 'overlay') {
                history.back();
            }
            //No "%"? Escape the page string to make sure we get it right
            // if (page.indexOf('%') == -1) {
            //     page = escape(page);
            // }
            page = escape(page);

            if (!$.isFunction(allPages[page])) {
                //PANIC
                //A non-registered page has been requested
                //This function handles hashchanges
                //So it will loop until we get a safe page
                history.back();
                //Prevent calling page related functions
                return;
            }

            /*if (Interface.data.storage.settings.get("animations")) {
                //$('.page.active').fadeOut(200, function() {
                    Interface.navigation.postTransition(page, args, allPages);
                //});
            } else {*/
            Interface.navigation.transition(page, args, allPages);
            //}
            //console.timeEnd("navigate");
        },
        "transition" : function (page, args, allPages) {
            //$('.page.active').removeClass('active').hide();
            //Show requested page
            //$(document.getElementById(page)).addClass('active');
            //this.previous = $('.page.active').attr('id');

            if (Interface.utils.supportsAnimation()) {
                $('.page.active').addClass('animate').removeClass('fullopacity');
                setTimeout(function () {
                    $('.page.active').removeClass('active');
                    $(document.getElementById(page)).addClass('animate active');
                    setTimeout(function () {$(document.getElementById(page)).addClass('fullopacity'); }, 20);
                }, 200);
                //$(document.getElementById(page)).fadeIn(200).addClass('active');
                //$(document.getElementById(page)).addClass('active fullopacity');
                //$(document.getElementById(page)).addClass('active');
                //setTimeout(function(){$(document.getElementById(page)).addClass('fullopacity')}, 2000);
                //$('[id="' + page +'"]').fadeIn(200).addClass('active');
                //Sometimes animation is a bitch, so we force opacity
                //document.getElementById(page).style.opacity = 1;
            } else {
                $('.page.active').removeClass('active animate');
                $(document.getElementById(page)).removeClass('animate').addClass('active fullopacity');
                //$('[id="' + page +'"]').addClass('active');
            }

            /*if (!this.bareTitle) {
                this.bareTitle = document.title;
            }
            document.title = this.bareTitle + ' - ' + $(document.getElementById(page)).find('div.page-title').html();*/

            if (page != 'home-page') {
                var title = $(document.getElementById(page)).find('div.page-title');
                if (!title.hasClass('_buttons')) {
                    title.prepend('<a href="javascript:void(0)" onclick="history.back()"><img class="back-button" src="img/back.png" alt="Back"/></a>').prepend('<a href="#home-page"><img class="home-button" src="img/home.png" alt="Home"/></a>');
                    title.addClass('_buttons');
                }
                /*$(document.getElementById(page)).find('div.page-title')
                //$('[id="' + page +'"]').find('div.page-title')
                    .prepend('<a href="javascript:void(0)" onclick="history.back()"><img class="back-button" src="img/back.png"/></a>')
                    .prepend('<a href="#home-page"><img class="home-button" src="img/home.png"/></a>');*/
            }

            this.previous = this.currentStr;
            if (this.currentStr != 'game-page') {
                this.prevMenu = this.currentStr;
            }
            this.currentStr = page;

            //Call function related to page
            allPages[page](args);
        },
        "previous" : "",
        "prevMenu" : "",
        "current" : function () {
            var page = window.location.hash;
            page = page.slice(1, page.length);
            return page;
        },
        "currentStr" : "",
        "bareTitle" : ""
    },
    /**
        Data
    */
    "data" : {
        "startPoll" : function () {
            var pollTime   = this.pollTime;
            this.pollTimer = setInterval(Interface.data.poll, pollTime);
        },
        "poll" : function (init) {
            Interface.utils.log("Starting poll...");
            if (init) {
                this.startPoll();
            }
            $.ajax({
                type: "GET",
                url: "data.xml",
                dataType: "xml",
                success: function (xml) {
                    Interface.utils.log("Poll success!");
                    Interface.data.pollSuccess(xml, init);  
                },
                error : function () {
                    Interface.data.pollError();
                }
            });
        },
        "pollSuccess" : function (xml, init) {
            var HDDcount = $(xml).find('GAMES').children('MOUNT').length,
                ACTIVE   = $(xml).find('ACTIVE').text();

            //Check for change in HDD's
            if (!this.data.drives || HDDcount != this.data.drives.length) {
                Interface.utils.log("Starting update...");
                if (!init) {
                    Interface.utils.messageBox.create(Interface.data.messages["notify-dataUpdate"]);
                }
                $.ajax({
                    type: "GET",
                    url: "store.sh",
                    dataType: "json",
                    success: function (storage) {
                        if (storage == null || storage == "") {
                            storage = {};
                        }
                        Interface.data.update(xml, storage, init);
                    },
                    error: function () {
                        Interface.data.update(xml, {}, init);
                    }
                });
            } else {
                Interface.utils.log("No update needed...");
            }
            //Check for change in active game
            if (ACTIVE != this.active) {
                this.data.active = ACTIVE;
            }
        },
        "pollError" : function () {
            clearInterval(this.pollTimer);
            var message = Interface.data.messages["notify-pollError"];
            Interface.utils.messageBox.create(message);
        },
        "update" : function (xml, storage, init) {
            // console.time('Ted');
            // xml        = $(xml);
            var drives = [], dirs = [],
                isos = [], about = [],
                lists = [], cache = [],
                dir, par, id, name, cover,
                info, hdd, value, active,
                _KEY, _GAMES, _ABOUT, _ACTIVE,
                l, tmp, tmpDir, tmpISO, sorted,
                i, k, o;

            Interface.data.type = xml.documentElement.nodeName.toLowerCase();

            if ($.isEmptyObject(storage.games)) {
                storage = Interface.data.storage.convert(storage);
            }
            if (!storage.guid || !storage.vars || !storage.vars.askedAnon) {
                storage.guid = Interface.utils.guid();
                if (!storage.vars) {
                    storage.vars = {};
                }
                storage.vars.askedAnon = true;
                Interface.utils.messageBox.create(Interface.data.messages["notify-anondata"]);
            }
            //_KEY = xml.documentElement.children;
            _KEY = xml.documentElement.childNodes;
            l = _KEY.length;
            for (i = 0; i < l; i += 1) {
                tmp = _KEY[i];
                if (tmp.nodeType == 3) {
                    i += 0;
                } else if (tmp.nodeType == 1) {
                    if (tmp.nodeName == "ACTIVE") {
                        _ACTIVE = tmp;
                    } else if (tmp.nodeName == "GAMES") {
                        _GAMES = tmp;
                    } else if (tmp.nodeName == "ABOUT") {
                        _ABOUT = tmp;
                    }
                }
            }

            //var l = _GAMES.children.length;
            l = _GAMES.childNodes.length;
            for (i = 0; i < l; i += 1) {
                //hdd = _GAMES.children[i];
                hdd = _GAMES.childNodes[i];
                if (hdd.nodeType == 3) {
                    i += 0;
                } else if (hdd.nodeType == 1) {
                    drives.push(hdd.getAttribute('NAME'));

                    tmp = hdd.getElementsByTagName("DIR");
                    k = tmp.length;
                    for (o = 0; o < k; o += 1) {
                        tmpDir = tmp[o];
                        if (tmpDir.firstElementChild.nodeName == 'MOUNT') {
                            o += 0;
                        } else {
                            dir = tmpDir.getAttribute('NAME');
                            par = tmpDir.parentNode.getAttribute('NAME');
                            dirs.push({"dir" : dir, "par" : par});
                        }
                    }

                    tmp = hdd.getElementsByTagName('ISO');
                    hdd = hdd.getAttribute('NAME');
                    k = tmp.length;
                    for (o = 0; o < k; o += 1) {
                        tmpISO = tmp[o];
                        name = tmpISO.firstElementChild.firstChild.nodeValue.replace(/\.iso/gi, "");
                        id = tmpISO.lastElementChild.firstChild.nodeValue;
                        par = tmpISO.parentNode.getAttribute('NAME');
                        cover = "covers/" + id + ".jpg";
                        info  = "covers/" + id + ".xml";
                        isos.push({
                            "id"     : id,
                            "name"   : name,
                            "parent" : par,
                            "hdd"    : hdd,
                            "cover"  : cover,
                            "info"   : info
                        });
                        if ($.isEmptyObject(storage.games[id])) {
                            storage.games[id] = {
                                "lastPlayed" : 0,
                                "timesPlayed" : 0,
                                "known" : false
                            };
                        }
                        storage.games[id].hdd = hdd;
                    }
                }
            }

            //var l = _ABOUT.children.length;
            l = _ABOUT.childNodes.length;
            for (i = 0; i < l; i += 1) {
                //tmp = _ABOUT.children[i];
                tmp = _ABOUT.childNodes[i];
                if (tmp.nodeType == 3) {
                    i += 0;
                } else {
                    name = tmp.getAttribute('NAME');
                    value = tmp.firstChild;
                    if (value) {
                        value = value.nodeValue;
                    } else {
                        value = "-";
                    }
                    if (name == "App") {
                        Interface.data.firmware = value;
                    }
                    about.push({"item": name, "value": value});
                }
            }

            if (_ACTIVE) {
                active = _ACTIVE.firstChild.nodeValue;
            }

            // xml = $(xml);
            // xml.find('MOUNT').each(function() {
            //     //hdd = $(this).attr('NAME');
            //     hdd = this.getAttribute('NAME');
            //     drives.push(hdd);

            //     $(this).find('DIR').each(function() {
            //         /*dir = $(this).attr('NAME');
            //         par = $(this.parentNode).attr('NAME');*/
            //         dir = this.getAttribute('NAME');
            //         par = this.parentNode.getAttribute('NAME');
            //         dirs.push({"dir" : dir, "par" : par});
            //     });

            //     $(this).find('ISO').each(function() {
            //         /*console.time("Test");
            //         id    = $(this).find('ID').text();
            //         name  = $(this).find('TITLE').text().replace(/\.iso/gi,"");
            //         par   = $(this.parentNode).attr('NAME');
            //         console.timeEnd("Test");
            //         console.time("Test2");*/
            //         name = this.firstElementChild.firstChild.nodeValue.replace(/\.iso/gi,"");
            //         id = this.lastElementChild.firstChild.nodeValue;
            //         par = this.parentNode.getAttribute('NAME');
            //         //console.timeEnd("Test2");

            //         cover = "covers/"+id+".jpg";
            //         //DEBUG
            //         //cover = "img/test.jpg";
            //         //DEBUG
            //         info  = "covers/"+id+".xml";
            //         isos.push({ 
            //             "id"     : id,
            //             "name"   : name,
            //             "parent" : par,
            //             "hdd"    : hdd,
            //             "cover"  : cover,
            //             "info"   : info
            //         });
            //         if ($.isEmptyObject(storage.games[id])) {
            //             storage.games[id] = {
            //                 "lastPlayed" : 0,
            //                 "timesPlayed" : 0,
            //                 "known" : false
            //             };
            //         }
            //         storage.games[id].hdd = hdd;
            //     });
            // });

            // xml.find('ABOUT').find('ITEM').each(function() {
            //     name = $(this).attr('NAME');
            //     value = $(this).text();
            //     if (name == "App")
            //         Interface.data.firmware = value;
            //     about.push({"item": name, "value": value});
            // });

            // //Active game
            // var active = xml.find('ACTIVE').text();

            //Lists
            if (storage.favLists != undefined) {
                lists = storage.favLists;
            }
            if (storage.settings != undefined) {
                $.extend(Interface.data.storage.settings.settings, storage.settings);
                storage.settings = Interface.data.storage.settings.settings;
            }

            //Sort games
            sorted = isos.slice();
            sorted.sort(function (x, y) {
                var a = String(x.name).toUpperCase(),
                    b = String(y.name).toUpperCase();
                if (a > b) {return 1; }
                if (a < b) {return -1; }
                return 0;
            });

            Interface.data.data = {
                "games"   : isos,
                "sorted"  : sorted,
                "folders" : dirs,
                "drives"  : drives,
                "about"   : about,
                "active"  : active,
                "lists"   : lists,
                "storage" : storage
            };

            if (init) {
                if (window.location.hash != '') {
                    Interface.navigation.navigateTo(window.location.hash);
                }
                Interface.utils.messageBox.remove();
                Interface.main.init();
                if (Interface.data.storage.settings.get("updatecheck")) {
                    Interface.utils.checkUpdate();
                }
            } else {
                $.each(Interface.main.vars.made, function (key) {
                    //if (key != "index") {
                    Interface.main.vars.made[key] = false;
                    //}
                });
                Interface.main.vars.curList = "";
                if (window.location.hash != '') {
                    //Interface.navigation.navigateTo('');
                    window.location.hash = '';
                }
            }
            Interface.data.storage.save();
            if (Interface.data.storage.settings.get("prebuild")) {
                Interface.main.create.gamelist();
                Interface.main.create.folders([]);
            }
            if (Interface.data.storage.settings.get("cacheImages")) {
                Interface.utils.messageBox.create(Interface.data.messages["notify-cache"]);
                l = isos.length;
                for (i = 0; i < l; i += 1) {
                    cover = isos[i].cover;
                    cache[i] = new Image();
                    cache[i].src = cover;
                }
                Interface.utils.messageBox.remove();
            }
            // console.timeEnd('Ted');
        },
        "lists" : {
            "getLists" : function (id) {
                if (id) {
                    var lists = Interface.data.data.storage.favLists,
                        returnObject = {"isAvailable" : [], "isIn" : []},
                        content,
                        game,
                        k,
                        flag = false,
                        l = lists.length,
                        i,
                        j;

                    for (i = 0; i < l; i += 1) {
                        content = lists[i].content;
                        k       = content.length;
                        for (j = 0; j < k; j += 1) {
                            game = content[j];
                            if (id == game.id && (Interface.data.data.drives.indexOf(game.hdd) != -1 || game.hdd == "")) {
                                if (game.hdd == "" && !$.isEmptyObject(Interface.data.data.storage.games[id].hdd)) {
                                    game.hdd = Interface.data.data.storage.games[id].hdd;
                                }
                                returnObject.isIn.push(lists[i]);
                                flag = true;
                                break;
                            }
                        }
                        if (!flag) {
                            returnObject.isAvailable.push(lists[i]);
                        }
                        flag = false;
                    }
                    return returnObject;
                }

                return Interface.data.data.storage.favLists;
            },
            "createList" : function (listName, id, name) {
                if (!id) {
                    id       = $('.listsDataGameID').val();
                    name     = $('.listsDataGameName').val();
                    listName = $('.listsNewListInput').val();
                }
                //var lists = Interface.data.data.storage.favLists;
                var lists = this.getLists(),
                    game,
                    list;
                listName = escape(listName);

                if (Interface.data.lists.indexOf(listName) != -1) {
                    Interface.utils.messageBox.create(Interface.data.messages["notify-list-exists"]);
                    return;
                }
                game  = {
                    "id"   : id,
                    "name" : name,
                    "hdd"  : Interface.data.data.storage.games[id].hdd
                };
                list  = {
                    "name"    : listName,
                    "desc"    : "List",
                    "content" : [
                        game
                    ]
                };
                lists.push(list);
                Interface.data.storage.save();
                if (Interface.navigation.current().indexOf('favorites') != -1) {
                    window.onhashchange();
                }
            },
            "addGame" : function (id, name, listName, mass) {
                if (!id) {
                    id       = $('.listsDataGameID').val();
                    name     = $('.listsDataGameName').val();
                    listName = $('.listsDataAddListName').val();
                }
                var game = {
                        "id"   : id,
                        "name" : name,
                        "hdd"  : Interface.data.data.storage.games[id].hdd
                    },
                    lists = this.getLists(),
                    index = Interface.data.lists.indexOf(listName);

                lists[index].content.push(game);
                if (!mass) {
                    Interface.data.storage.save();
                }
                if (Interface.navigation.current().indexOf('favorites_game') != -1) {
                    window.onhashchange();
                }
            },
            "removeGame" : function (id, listName) {
                if (!id) {
                    id       = $('.listsDataGameID').val();
                    listName = $('.listsDataRemoveListName').val();
                }
                //var lists = Interface.data.data.lists;
                var lists = this.getLists(),
                    index = Interface.data.lists.indexOf(listName),
                    content = lists[index].content,
                    l = content.length,
                    i;

                for (i = 0; i < l; i += 1) {
                    if (content[i].id == id) {
                        content.splice(i, 1);
                        Interface.data.storage.save();
                        if (Interface.navigation.current().indexOf('favorites') != -1) {
                            window.onhashchange();
                        }
                        return;
                    }
                }
            },
            "indexOf" : function (listName) {
                //var lists = Interface.data.data.lists;
                var lists = this.getLists(),
                    l = lists.length,
                    i;

                if (listName.indexOf('%') == -1) {
                    listName = escape(listName);
                }

                for (i = 0; i < l; i += 1) {
                    if (lists[i].name == listName) {
                        return i;
                    }
                }
                return -1;
            },
            "isInList" : function (id, listName) {
                var lists = this.getLists(),
                    index = this.indexOf(listName),
                    list = lists[index],
                    content = list.content,
                    l = content.length,
                    i;

                for (i = 0; i < l; i += 1) {
                    if (content[i].id == id) {
                        return true;
                    }
                }
                return false;
            },
            "updateRecent" : function () {
                var games = Interface.data.data.sorted,
                    l = games.length,
                    listName = "Recently Added",
                    listExists = (Interface.data.lists.indexOf(listName) == -1 ? false : true),
                    storage = Interface.data.data.storage,
                    cleared = false,
                    id,
                    name,
                    flag,
                    store,
                    i;

                for (i = 0; i < l; i += 1) {
                    id = games[i].id;
                    flag = false;
                    store = storage.games[id];
                    if (!store.known) {
                        flag = true;
                    }
                    if (flag) {
                        store.known = true;
                        name = games[i].name;
                        if (listExists && !cleared) {
                            Interface.data.lists.clear(listName);
                            cleared = true;
                        }
                        if (listExists) {
                            Interface.data.lists.addGame(id, name, listName);
                        } else {
                            Interface.data.lists.createList(listName, id, name);
                            listExists = true;
                            cleared = true;
                        }
                    }
                }
                Interface.data.storage.save();
                window.onhashchange();
            },
            "clear" : function (listName) {
                var index = Interface.data.lists.indexOf(listName);
                //Interface.data.data.lists[index].content = [];
                Interface.data.data.storage.favLists[index].content = [];
                Interface.data.storage.save();
            },
            "removeList" : function (listName) {
                if (!listName) {
                    listName = $('.listsManagerListName').val();
                }
                var index = Interface.data.lists.indexOf(listName);
                if (index != -1) {
                    //Interface.data.data.lists.splice(index, 1);
                    Interface.data.data.storage.favLists.splice(index, 1);
                }
                Interface.data.storage.save();
                if (Interface.navigation.current().indexOf('favorites') != -1) {
                    window.onhashchange();
                }
            },
            "renameList" : function (listName, newName) {
                var message,
                    msg = {},
                    index;
                if (!newName) {
                    if (!listName) {
                        listName = $('.listsManagerListName').val();
                        message = Interface.data.messages["notify-list-rename"];
                        msg.title = message.title;
                        msg.content = message.content;
                        msg.content = message.content.replace(/%s/g, unescape(listName));
                        Interface.utils.messageBox.create(msg);
                        return;
                    }
                    newName = $('.listsRenameListInput').val();
                    Interface.utils.messageBox.remove();
                }
                index = this.indexOf(listName);
                Interface.data.data.storage.favLists[index].name = escape(newName);
                Interface.data.storage.save();
                if (Interface.navigation.current().indexOf('favorites') != -1) {
                    window.onhashchange();
                }
            },
            "changeListDescription" : function (listName, desc) {
                var message,
                    msg = {},
                    index;
                if (!desc) {
                    if (!listName) {
                        listName = $('.listsManagerListName').val();
                        message = Interface.data.messages["notify-list-desc"];
                        msg.title = message.title;
                        msg.content = message.content;
                        msg.content = msg.content.replace(/%s/g, unescape(listName));
                        Interface.utils.messageBox.create(msg);
                        return;
                    }
                    desc = $('.listsListDescInput').val();
                    Interface.utils.messageBox.remove();
                }
                index = this.indexOf(listName);
                Interface.data.data.storage.favLists[index].desc = escape(desc);
                Interface.data.storage.save();
            },
            "massAddToList" : function (listName, games) {
                var l,
                    name,
                    id,
                    temp,
                    value,
                    HTML,
                    i,
                    checked;

                if (!games) {
                    if (!listName) {
                        listName = $('.listsManagerListName').val();
                        games = Interface.data.data.sorted;
                        l = games.length;
                        HTML = 'Mass adding to list: <b>' + unescape(listName) + '</b><br/><br/>';
                        for (i = 0; i < l; i += 1) {
                            name = games[i].name;
                            id = games[i].id;
                            value = id + '&' + escape(name);
                            HTML += '<input type="checkbox" value="' + value + '" ' + (this.isInList(id, listName) ? "checked" : "") + '>' + name + '<br/>';
                        }
                        HTML += '<br/><a onclick="Interface.data.lists.massAddToList(\'' + listName + '\')"><span class="prettyButton">Go</span></a><a onclick="history.back();"><span class="prettyButton">Cancel</span></a><br/>';
                        Interface.navigation.pages.setContent('favorites_mass_add-page', HTML);
                        //Interface.navigation.navigateTo('favorites_mass_add-page');
                        window.location.hash = "#favorites_mass_add-page";
                        return;
                    }
                    checked = $('#favorites_mass_add-page > .page-content > input:checked');
                    games = [];
                    $.each(checked, function () {
                        games.push($(this).val());
                    });
                    history.back();
                }
                this.clear(listName);
                l = games.length;
                for (i = 0; i < l; i += 1) {
                    temp = games[i].split("&");
                    name = unescape(temp[1]);
                    id = temp[0];
                    this.addGame(id, name, listName, true);
                }
                Interface.data.storage.save();
            }
        },
        "storage" : {
            "settings" : {
                "init" : function () {
                    var l = this.supported.length,
                        i,
                        key,
                        setting;
                    for (i = 0; i < l; i += 1) {
                        key = this.supported[i];
                        setting = this.settings[key];
                        if (setting) {
                            $('#setting-' + key).addClass("setting-enabled");
                        }
                    }
                },
                "get" : function (setting) {
                    //return (this.settings[setting] ? this.settings[setting] : false);
                    return (this.settings[setting] || false);
                },
                "set" : function (setting, value) {
                    this.settings[setting] = Interface.data.data.storage.settings[setting] = value;
                    Interface.data.storage.save();
                    return;
                },
                "handle" : function (element) {
                    var div = element.children[0],
                        setting = div.id.split("-")[1],
                        entry;
                    if (setting == "clear") {
                        Interface.data.storage.clear();
                        return;
                    }
                    entry = this.settings[setting];
                    entry = this.settings[setting] = Interface.data.data.storage.settings[setting] = !entry;
                    if (entry) {
                        $(div).addClass("setting-enabled");
                    } else {
                        $(div).removeClass("setting-enabled");
                    }

                    Interface.data.storage.save();

                    this.actions[setting]();
                },
                "actions" : {
                    "oneclickload" : function () {
                        return;
                    },
                    "dynamicfont" : function () {
                        Interface.utils.messageBox.create(Interface.data.messages["notify-pagereload"]);
                    },
                    "coverwalltitle" : function () {
                        Interface.main.vars.made.coverwall = false;
                        return;
                    },
                    "prebuild" : function () {
                        return;
                    },
                    "largeitems" : function () {
                        return;
                    },
                    "dottext" : function () {
                        return;
                    },
                    "gamenavigation" : function () {
                        return;
                    },
                    "cacheImages" : function () {
                        return;
                    },
                    "animations" : function () {
                        return;
                    },
                    "updatecheck" : function () {
                        return;
                    },
                    "anondata" : function () {
                        return;
                    }
                },
                "settings" : {
                    "oneclickload"   : false,
                    "dynamicfont"    : false,
                    "coverwalltitle" : true,
                    "prebuild"       : false,
                    "largeitems"     : false,
                    "dottext"        : false,
                    "gamenavigation" : false,
                    "cacheImages"    : false,
                    "animations"     : true,
                    "updatecheck"    : true,
                    "anondata"       : false
                },
                "supported" : [
                    "oneclickload",
                    "dynamicfont",
                    "coverwalltitle",
                    "prebuild",
                    "largeitems",
                    "dottext",
                    "gamenavigation",
                    "cacheImages",
                    "animations",
                    "updatecheck",
                    "anondata",
                    "clear"
                ],
                "strings" : {
                    "oneclickload" : {
                        "title" : "One click load",
                        "desc"  : "Disables the game page and loads the game instantly"
                    },
                    "dynamicfont" : {
                        "title" : "Dynamic font sizing",
                        "desc"  : "Adjusts the fontsize so the name of the game always fits"
                    },
                    "coverwalltitle" : {
                        "title" : "Coverwall titles",
                        "desc"  : "Adds titles over the covers in Coverwall"
                    },
                    "prebuild" : {
                        "title" : "Prebuild",
                        "desc"  : "Prebuild Folders &amp; Lists during init"
                    },
                    "largeitems" : {
                        "title" : "Large list items",
                        "desc"  : "List items take up the entire width"
                    },
                    "dottext" : {
                        "title" : "Show dots for clipped titles",
                        "desc"  : "Show '...' instead of cutting off titles"
                    },
                    "gamenavigation" : {
                        "title" : "Game navigation",
                        "desc"  : "Navigate to the next or previous game in the list or folder"
                    },
                    "cacheImages" : {
                        "title" : "Cache covers",
                        "desc"  : "Attempt to cache all the covers (serious performance impact)"
                    },
                    "animations" : {
                        "title" : "Animations",
                        "desc"  : "Show animations during page transition"
                    },
                    "updatecheck" : {
                        "title" : "Check for updates",
                        "desc"  : "Check for updates on every first launch of a day"
                    },
                    "anondata" : {
                        "title" : "Anonymous data",
                        "desc"  : "Allow anonymous usage data collection with the random GUID"
                    },
                    "clear" : {
                        "title" : "Clear data",
                        "desc"  : "Delete all the saved data"
                    }
                    /*"" : {
                        "title" : "",
                        "desc"  : ""
                    }*/
                }
            },
            "getTimesPlayed" : function (id) {
                return Interface.data.data.storage.games[id].timesPlayed;
            },
            "getLastPlayed" : function (id) {
                return Interface.data.data.storage.games[id].lastPlayed;
            },
            "updateTimesPlayed" : function (id) {
                Interface.data.data.storage.games[id].timesPlayed += 1;
                return Interface.data.data.storage.games[id].timesPlayed;
            },
            "updateLastPlayed" : function (id) {
                Interface.data.data.storage.games[id].lastPlayed = Date.parse(new Date());
                return Interface.data.data.storage.games[id].lastPlayed;
            },
            "convert" : function (storage) {
                //Convert old storage to new storage
                var newStorage = {
                        "games" : {},
                        "settings" : {},
                        "favLists" : []
                    },
                    key,
                    temp,
                    list,
                    l,
                    i;
                for (key in storage) {
                    if (storage.hasOwnProperty(key)) {
                        if (key.length == 40) {
                            //If the key length is 40, its probably a game ID
                            temp = storage[key];
                            if ($.isEmptyObject(temp.lastPlayed)) {temp.lastPlayed = 0; }
                            if ($.isEmptyObject(temp.timesPlayed)) {temp.timesPlayed = 0; }
                            if ($.isEmptyObject(temp.known)) {temp.known = false; }
                            if ($.isEmptyObject(temp.hdd)) {temp.hdd = ""; }
                            newStorage.games[key] = temp;
                        }
                    }
                }
                if (!$.isEmptyObject(storage.FavLists)) {
                    for (key in storage.FavLists) {
                        if (storage.FavLists.hasOwnProperty(key)) {
                            list = storage.FavLists[key];
                            l = list.length;
                            temp = [];
                            for (i = 0; i < l; i += 1) {
                                temp.push({
                                    "name" : list[i].name,
                                    "id"   : list[i].id,
                                    "hdd"  : ""
                                });
                            }
                            newStorage.favLists.push({
                                "name" : escape(key),
                                "desc" : "List",
                                "content" : temp
                            });
                        }
                    }
                }
                if (!$.isEmptyObject(storage.Settings)) {
                    newStorage.settings = storage.Settings;
                }
                Interface.utils.messageBox.create(Interface.data.messages['notify-convert']);
                return newStorage;
            },
            "get" : function () {
                return Interface.data.data.storage;
            },
            "save" : function () {
                $.post('store.sh', JSON.stringify(Interface.data.data.storage));
            },
            "clear" : function (confirm) {
                if (!confirm) {
                    Interface.utils.messageBox.create(Interface.data.messages["notify-clear"]);
                    return;
                }
                var storage = Interface.data.data.storage,
                    i;
                for (i in storage.games) {
                    if (storage.games.hasOwnProperty(i)) {
                        storage.games[i].lastPlayed = 0;
                        storage.games[i].timesPlayed = 0;
                        storage.games[i].known = false;
                    }
                }
                storage.favLists = [];
                storage.settings = {};
                this.save();
            }
        },
        "pollTime"  : 10000,
        "pollTimer" : 0,
        "version"   : "1.1",
        "type"      : "xbox",
        "firmware"  : "00.00",
        "messages"  : {
            "notify-loading" : {
                "title"   : "Loading...",
                "content" : "Loading, please wait..."
            },
            "notify-xbox" : {
                "title"   : "Xbox IE Settings",
                "content" : "I see you're using your Xbox to view this interface. I'm prepared for that!<br/><br/>Can I just recommend that you tick the option \"Use my whole TV to show the webpage\" in IE's settings? Thanks!"
            },
            "notify-dataUpdate" : {
                "title"   : "Data updated",
                "content" : "It looks like the number of HDD's changed. This also means that the games have changed. In order to make sure that I continue to function properly, I updated myself, and reset you to the homepage to prevent any errors. <br/>Thanks for understanding!"
            },
            "notify-pollError" : {
                "title"   : "Poll error",
                "content" : "There has been an error while retreiving data. Make sure the *K3y is turned on!<br/>Polling has been paused, press \"Restart\" to restart polling.<br/><br/><a onclick=\"Interface.data.startPoll(); Interface.utils.messageBox.remove();\"><span class=\"prettyButton\">Restart</span></a><br/>"
            },
            "notify-opentray" : {
                "title"   : "Loading Notification",
                "content" : "Please open your DVD tray"
            },
            "notify-gameloaded" : {
                "title"   : "Loading Notification",
                "content" : "Game loaded, have fun playing!"
            },
            "notify-reload" : {
                "title"   : "Loading Notification",
                "content" : "A game appears to be already loaded, please open your DVD tray and click 'Reload'<br/><br/>"
            },
            "notify-list-exists" : {
                "title"   : "List exists",
                "content" : "This list already exists, please pick another name!"
            },
            "notify-list-rename" : {
                "title"   : "Rename list",
                "content" : "Old name: <em>%s</em><br/>New name:<br/><input type=\"text\" class=\"listsRenameListInput\"/> <a onclick=\"Interface.data.lists.renameList('%s')\"><span class=\"prettyButton\">Go</span></a><br/>"
            },
            "notify-list-desc" : {
                "title"   : "Change description",
                "content" : "New description:<br/><input type=\"text\" class=\"listsListDescInput\"/> <a onclick=\"Interface.data.lists.changeListDescription('%s')\"><span class=\"prettyButton\">Go</span></a><br/>"
            },
            "notify-list-massadd" : {
                "title"   : "Mass Adding",
                "content" : "Mass adding for list: %s<br/><br/>%l<br/><a onclick=\"Interface.data.lists.massAddToList('%s')\"><span class=\"prettyButton\">Go</span></a><br/>"
            },
            "notify-convert" : {
                "title"   : "Storage converted",
                "content" : "Your storage has been converted to the new standard. This WILL break apps that haven't updated their code to work with it. Please notify the developers of these apps and refer them to the API wiki. Thanks!"
            },
            "notify-clear" : {
                "title"   : "Clearing data",
                "content" : "This will clear all your data, are you sure?<br/><br/><a href=\"#settings-page\" onclick=\"Interface.data.storage.clear(true); Interface.utils.messageBox.remove();\"><span class=\"prettyButton\">Yes</span></a><br/>"
            },
            "notify-anondata" : {
                "title"   : "Anonymous data",
                "content" : "<strong>Wait!</strong> Before you go and close this, I want to ask you something. I swear this will be the only time I'll ask you about it!<br/><br/>We made a <strong>pretty awesome</strong> page showing off some statistics among WiFi dongle users, you guys! In order to expand these statistics, I'm only asking you to allow me sending your current firmware and your game count. <strong>Nothing harmful!</strong> Whaddya say?<br/><br/><a onclick=\"Interface.data.storage.settings.set('anondata', true); Interface.utils.messageBox.remove();\"><span class=\"prettyButton\">Yes! Awesome! Allow!</span></a><a onclick=\"Interface.data.storage.settings.set('anondata', false);Interface.utils.messageBox.remove();\"><span class=\"prettyButton smallButton\">No, I'm boring!</span></a><br/><br/>It's always possible to change your opinion, just go to the Settings menu!<br/><br/><strong>You can find the statistics page in the About menu</strong><br/><br/>"
            },
            "notify-init" : {
                "title"   : "Loading",
                "content" : "Please wait while data is being loaded and processed..."
            },
            "notify-cache" : {
                "title"   : "Loading",
                "content" : "Caching all the covers..."
            },
            "notify-error" : {
                "title"   : "Error",
                "content" : "An error has occured. You can post this on the forums (link in \"About\") to get support and notify the developer about it<br/>(Error message from the console (F12) will be appreciated):<br/><br/>"
            },
            "notify-pagereload" : {
                "title"   : "Reload",
                "content" : "For this setting to take full effect, it's advised to reload the page."
            },
            "notify-firmware-update" : {
                "title"   : "Update available",
                "content" : "A new firmware is available for your device!<br/><br/>"
            },
            "changelog" : {
                "title"   : "Changelog",
                "content" : "1.1<br/>- Fix for empty folders<br/>- Fix for empty About nodes<br/>- Added larger item option<br/>- Added dots for clipped titles option<br/>- Added game navigation option<br/>- Fix title wrapping for large titles on small screens in game page<br/>- Added favicons and change them for each device.<br/><br/>1.0<br/>- Initial release<br/><br/><a onclick=\"Interface.utils.messageBox.create(Interface.data.messages.changelogdev);Interface.utils.messageBox.remove();\"><span class=\"prettyButton smallButton\">More...</span></a>"
            },
            "changelogdev" : {
                "title"   : "Changelog",
                "content" : "Final 1<br/>- Get storage only on an update to decrease network activity<br/>- JSLint everything<br/>- Added caching option<br/>- Fixed some variable stuff<br/>- Add 3key nocover.jpg<br/><br/>Beta 12<br/>- Attempted fix for WP8 launching of games<br/>- Added video popup for YouTube links<br/>- Changed anchor CSS to cover correct area<br/>- Changed Coverwall title CSS position and font size<br/>- Custom escape function to prevent accidentally double escaping<br/>- Changed button CSS a bit to fix button breaking on small resolutions<br/>- Cleaned up HTML to be 100% valid HTML5<br/>- Fixed some (un)escaping<br/>- Fix HDD issue in parser<br/>- Enhance Coverwall CSS<br/>- Added click overlay to close popup<br/>- Overhaul the parser<br/>- Style game page infoitems some more<br/>- Clean up About screen</br>- Fix wrong default logo link<br/>- Added Statistics item in About<br/>- Slightly changed anondata message<br/>- Change firmware download button<br/><br/>Beta 11<br/>- Fixed saving of lastUpdateCheck<br/>- Updated update return message<br/>- Added poll error handling<br/><br/>Beta 10<br/>- Mass adding<br/>- Anchor title<br/>- Coverwall title overlay option<br/>- Fixed duplicate navigation buttons<br/>- Slightly changed width CSS<br/><br/>Beta 9<br/>- Links in game info is correctly colored and underlined<br/>- Changed update check submitted data<br/><br/>Beta 8<br/>- Only show animations if supported<br/>- Added version checking<br/><br/>Beta 7<br/>- Fixed Search<br/>- Fixed Recently Added<br/>- Replaced jQuery animations with CSS3<br/>- Added extra animation for secondary popup<br/>- Changed messageBox popup CSS<br/>- Slightly darkened main text<br/>- Added list manager<br/>- Added changelog"
            },
            "test" : {
                "title"   : "Testing",
                "content" : "Let's see if this works"
            }
        },
        "data" : {}
    },
    "utils" : {
        "html" : {
            "menuItem" : function (obj) {
                /*
                {
                    "href" : "",
                    "onclick" : "",
                    "id" : "",
                    "alt" : true,
                    "active" : false,
                    "image" : "",
                    "title" : "",
                    "sub" : ""
                }
                */
                var HTML = '',
                    fixTitle = Interface.data.storage.settings.get("dynamicfont"),
                    bigWidth = (Interface.data.storage.settings.get("largeitems") && obj.supportLarge),
                    dotText = Interface.data.storage.settings.get("dottext"),
                    longTitle = '',
                    width,
                    size;

                if (!obj.href) {
                    obj.href = "javascript:void(0);";
                }
                if (!obj.onclick) {
                    obj.onclick = "";
                }
                if (!obj.id) {
                    obj.id = "";
                }

                HTML += '<a href="' + obj.href + '" onclick="' + obj.onclick + '" title="' + (obj.alt ? obj.title : "") + '">';
                HTML += '<div ' + (obj.id != "" ? 'id="' + obj.id + '" ' : '') + 'class="main-item' + (obj.active ? ' active-game' : '') + (bigWidth ? ' main-item-large' : '') + '">';
                if (obj.image) {
                    HTML += '<img class="list-cover' + (bigWidth ? ' list-cover-large' : '') + '" src="' + obj.image + '" alt="Cover"/>';
                }

                if (fixTitle) {
                    width = obj.title.width();
                    if (width > 330) {
                        size = (2 / (width / 330)).toFixed(2);
                        longTitle = ' style="font-size:' + size + 'em"';
                    }
                }
                HTML += '<span class="main-item-text item-text' + (dotText ? ' main-item-text-dot' : '') + '"' + longTitle + '>' + obj.title + '</span>';
                HTML += '<span class="secondary-item-text item-text">' + obj.sub + '</span>';
                HTML += '</div></a>';
                return HTML;
            }
        },
        "select" : function (args) {
            if (Interface.data.storage.settings.get("oneclickload")) {
                this.launch(args.split("&")[0]);
            } else {
                //Interface.navigation.navigateTo("#game-page?"+args)
                window.location.hash = "#game-page?" + args;
            }
        },
        "selectNext" : function (id) {
            var prevPage = Interface.navigation.prevMenu,
                game,
                args;

            if (prevPage != "") {
                if (prevPage == "coverwall-page") {
                    game = $('[id=' + prevPage + '] a[onclick*=' + id + ']').parent().next().children('a[onclick^=Interface]');
                } else {
                    game = $('[id=' + prevPage + '] a[onclick*=' + id + ']').nextAll('a[onclick^=Interface]').eq(0);
                }
                if (game.length < 1) {
                    game = $('[id=' + prevPage + '] a[onclick^=Interface]').first();
                }
                if (game.length < 1) {
                    window.location.hash = "#" + prevPage;
                } else {
                    game.click();
                }
            } else {
                window.location.hash = '';
            }
        },
        "selectPrev" : function (id) {
            var prevPage = Interface.navigation.prevMenu,
                game,
                args;

            if (prevPage != "") {
                if (prevPage == "coverwall-page") {
                    game = $('[id=' + prevPage + '] a[onclick*=' + id + ']').parent().prev().children('a[onclick^=Interface]');
                } else {
                    game = $('[id=' + prevPage + '] a[onclick*=' + id + ']').prevAll('a[onclick^=Interface]').eq(0);
                }
                if (game.length < 1) {
                    game = $('[id=' + prevPage + '] a[onclick^=Interface]').last();
                }
                if (game.length < 1) {
                    window.location.hash = "#" + prevPage;
                } else {
                    game.click();
                }
            } else {
                window.location.hash = '';
            }
        },
        "launch" : function (id) {
            var url = "launchgame.sh?" + id,
                tray,
                guistate,
                message,
                msg;
            $.ajax({
                type: "GET",
                url: "data.xml",
                cache: false,
                dataType: "xml",
                success: function (xml) {
                    tray = (Interface.data.type == "ps3key" ? 0 : $(xml).find('TRAYSTATE').text());
                    //var tray = $(xml).find('TRAYSTATE').text();
                    guistate = $(xml).find("GUISTATE").text();
                    if (tray == 0) {
                        $.get(url);
                        Interface.utils.messageBox.create(Interface.data.messages["notify-gameloaded"]);
                        Interface.utils.updateGameInfo(id);
                    } else if (tray == 1 && guistate == 1) {
                        $.get(url);
                        Interface.utils.messageBox.create(Interface.data.messages["notify-opentray"]);
                        Interface.utils.updateGameInfo(id);
                    } else if (guistate == 2) {
                        message = Interface.data.messages["notify-reload"];
                        msg = {};
                        msg.title = message.title;
                        msg.content = message.content;
                        msg.content += '<a href="javascript:void(0)" onclick="Interface.utils.messageBox.remove();launchGame(\'' + id + '\')"><span class="prettyButton">Reload</span></a><br/>';
                        Interface.utils.messageBox.create(msg);
                    }
                }
            });
        },
        "updateGameInfo" : function (id) {
            var timesPlayed = Interface.data.storage.updateTimesPlayed(id),
                lastPlayed  = Interface.data.storage.updateLastPlayed(id),
                HTML;
            Interface.data.data.active = id;
            Interface.data.storage.save();

            lastPlayed = new Date(lastPlayed);
            lastPlayed = lastPlayed.toLocaleDateString();

            HTML = 'Played ' + timesPlayed + ' times, last ' + lastPlayed;

            $('a[onclick*="' + id + '"] > div > span.secondary-item-text').html(HTML);

            if (Interface.navigation.current() == 'list-page') {
                Interface.main.create.gamelist(true);
            }
        },
        "getMostPlayed" : function () {
            var games = Interface.data.data.sorted.slice();
            games.sort(function (x, y) {
                var a = Interface.data.storage.getTimesPlayed(x.id),
                    b = Interface.data.storage.getTimesPlayed(y.id);
                return b - a;
            });
            return games;
        },
        "getLastPlayed" : function () {
            var games = Interface.data.data.sorted.slice();
            games.sort(function (x, y) {
                var a = Interface.data.storage.getLastPlayed(x.id),
                    b = Interface.data.storage.getLastPlayed(y.id);
                return b - a;
            });
            return games;
        },
        "messageBox" : {
            "create" : function (message) {
                if (this.active == "") {
                    var messageBox = $('#messageBox');

                    messageBox.find('.messageBox-title').html(message.title)
                        .append('<a href="javascript:void(0)" onclick="Interface.utils.messageBox.remove()"><img class="close-button" src="img/close.png" alt="Close"/></a>');
                    messageBox.find('.messageBox-content').html(message.content);
                    this.active = message;

                    /*Interface.utils.overlay.show();
                    this.t = setTimeout(function() {
                        Interface.utils.messageBox.show();
                    }, 200);*/
                    // this.show();
                    this.show();

                    this.scroll = window.scrollY;
                    window.scrollTo(0, 0);
                    $(document).keydown(function (e) {
                        if (e.keyCode == 27) {
                            Interface.utils.messageBox.remove();
                            return false;
                        }
                    });
                } else {
                    this.queue.push(message);
                }
            },
            "remove" : function () {
                this.active = "";
                if (this.queue.length > 0) {
                    if (Interface.utils.supportsAnimation()) {
                        $('#messageBox').removeClass('notify');
                        setTimeout(function () {
                            $('#messageBox').addClass('notify');
                        }, 10);
                    }

                    Interface.utils.messageBox.create(Interface.utils.messageBox.queue.shift());
                } else {
                    $('#messageBox').removeClass('notify');
                    this.hide();
                    //Interface.utils.overlay.hide();
                    $(document).keydown(function () {return; });
                    window.scrollTo(0, this.scroll);
                }
            },
            "show" : function () {
                $('.other-container').addClass("overlap");
                if (Interface.utils.supportsAnimation()) {
                    /*//$('#messageBox').fadeIn(200).css("display", "inline-block").removeClass("invis");
                    $('#messageBox').css("display", "inline-block").addClass('active animate');
                    this.t = setTimeout(function() {
                        $('#messageBox').addClass('fullopacity');
                    }, 10);*/
                    $('#messageBoxContainer').removeClass('invis').addClass('animate');
                    this.t = setTimeout(function () {
                        $('#messageBoxContainer').addClass('fullopacity');
                    }, 10);
                } else {
                    /*$('#messageBox').css("display", "inline-block").removeClass('animate').addClass('active fullopacity');*/
                    //$('#messageBox').css("display", "inline-block").removeClass("invis");
                    $('#messageBoxContainer').removeClass('invis animate').addClass('fullopacity');
                }
                $('#overlay').css('height', $(document).height());
            },
            "hide" : function (callback) {
                if (Interface.utils.supportsAnimation()) {
                    /*$('#messageBox').addClass('animate').removeClass('fullopacity');
                    clearTimeout(this.t);
                    setTimeout(function() {
                        $('#messageBox').removeClass('active');
                        $('#messageBox').css("display", "");
                        Interface.utils.messageBox.end(callback);
                    }, 200);*/
                    /*$('#messageBox').fadeOut(200, function(){
                        Interface.utils.messageBox.end(callback);
                    });*/
                    clearTimeout(this.t);
                    $('#messageBoxContainer').addClass('animate').removeClass('fullopacity');
                    setTimeout(function () {
                        $('#messageBoxContainer').addClass('invis');
                        Interface.utils.messageBox.end(callback);
                    }, 200);
                } else {
                    //$('#messageBox').hide();
                    /*$('#messageBox').removeClass('animate fullopacity active').css('display', '');
                    Interface.utils.messageBox.end(callback);*/
                    $('#messageBoxContainer').removeClass('fullopacity animate').addClass('invis');
                    Interface.utils.messageBox.end(callback);
                }
            },
            "end" : function (callback) {
                //$('#messageBox').addClass("invis");
                $('.other-container').removeClass("overlap");
                $('.messageBox-content').html('');
                if (callback) {
                    callback();
                }
            },
            "active" : "",
            "queue" : [],
            "scroll" : 0,
            "t" : 0
        },
        "overlay" : {
            "show" : function () {
                if (Interface.utils.supportsAnimation()) {
                    //$('#overlay').fadeIn(200).removeClass("invis");
                    $('#overlay').removeClass('invis').addClass('animate');
                    this.t = setTimeout(function () {
                        $('#overlay').addClass('overlayshade');
                    }, 10);
                } else {
                    $('#overlay').removeClass('animate invis').addClass('overlayshade');
                    //$('#overlay').show().removeClass("invis");
                }
                $('#overlay').css('height', $(document).height());
            },
            "hide" : function () {
                if (Interface.utils.supportsAnimation()) {
                    /*$('#overlay').fadeOut(200, function(){
                        $(this).addClass("invis");
                    });*/
                    $('#overlay').addClass('animate').removeClass('overlayshade');
                    clearTimeout(this.t);
                    setTimeout(function () {
                        $('#overlay').addClass('invis');
                    }, 200);
                } else {
                    //$('#overlay').hide().addClass("invis");
                    $('#overlay').removeClass('animate overlayshade').addClass('invis');
                }
            },
            "t" : 0
        },
        "parseYouTubeURL" : function (url) {
            var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/,
                match = url.match(regExp);
            if (match && match[7].length == 11) {
                return match[7];
            }
            return '';
        },
        "videoPopup" : function (id) {
            var message = {};
            message.title = "Video Popup";
            message.content = '<div class="videoWrapper"><iframe type="text/html" height="440" width="780" src="http://www.youtube.com/embed/' + id + '?autoplay=1&autohide=1&fs=1&html5=1" frameborder="0" ></iframe></div>';
            this.messageBox.create(message);
        },
        "checkUpdate" : function () {
            var lastCheck = Interface.data.data.storage.vars.lastUpdateCheck,
                today = new Date(new Date().toDateString()),
                doUpdate = false,
                //url = "http://bwerkt.nl/k3y/update/check.php",
                url = "http://xkeydownloads.com/check.php",
                params,
                device,
                guid,
                version,
                games,
                fw,
                link,
                result,
                message,
                msg;

            if (!lastCheck) {
                doUpdate = true;
            } else {
                lastCheck = new Date(lastCheck);
                if (lastCheck < today) {
                    doUpdate = true;
                }
            }
            if (doUpdate) {
                params = {};
                device = Interface.data.type;
                guid = Interface.data.data.storage.guid;
                //debug
                if (device == "wiikeu") {
                    device = "wkey";
                }
                //debug
                if (Interface.data.storage.settings.get("anondata")) {
                    version = Interface.data.firmware;
                    games = Interface.data.data.games.length;
                    params = {
                        "device" : device,
                        "guid" : guid,
                        "version" : version,
                        "games" : games,
                        "origin" : "officialweb"
                    };
                } else {
                    params = {
                        "device" : device,
                        "guid" : guid,
                        "origin" : "officialweb"
                    };
                }

                $.post(url, params, function (data) {
                    result = {};
                    try {
                        result = JSON.parse(data);
                    } catch (e) {
                        result.firmware = "-1";
                    }
                    fw = result.firmware;
                    link = result.download;
                    if (Interface.data.firmware < fw) {
                        message = Interface.data.messages["notify-firmware-update"];
                        msg = {};
                        msg.title = message.title;
                        msg.content = message.content;
                        msg.content += "Your version: " + Interface.data.firmware + "<br/>";
                        msg.content += "New version: " + fw + "<br/><br/>";
                        msg.content += "<a href='" + link + "' target='_BLANK'><span class=\"prettyButton\">Download</span></a></a><br/>";
                        Interface.utils.messageBox.create(msg);
                    }
                });
            }
            Interface.data.data.storage.vars.lastUpdateCheck = today.toDateString();
            Interface.data.storage.save();
        },
        "easter" : function () {
            var type = Interface.data.type;
            if (type == "wiikeu") {
                $('.logo > img').attr('src', 'img/logo-homemadeyo.png');
            }
        },
        "guid" : function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        },
        "log" : function (message) {
            //var log = $('#debug');
            //log.append(message+"</br>");
            return;
        },
        "isNumber" : function (o) {
            return !isNaN(o - 0);
        },
        "isHDD" : function (dir) {
            return (Interface.data.data.drives.toString().indexOf(dir) != -1);
        },
        "search" : function (input) {
            var HTML = '';
            if (input.length == 0) {
                $('#searchResults').hide();
            } else {
                var games   = Interface.data.data.sorted,
                    pattern = new RegExp(input, "i"),
                    name,
                    id,
                    cover,
                    timesPlayed,
                    lastPlayed,
                    letter,
                    activeClass,
                    obj,
                    active = Interface.data.data.active,
                    l = Interface.data.data.sorted.length,
                    i;
                for (i = 0; i < l; i += 1) {
                    if (pattern.test(games[i].name)) {
                        name  = games[i].name;
                        id    = games[i].id;
                        cover = games[i].cover;

                        timesPlayed = Interface.data.storage.getTimesPlayed(id);
                        lastPlayed  = Interface.data.storage.getLastPlayed(id);
                        if (lastPlayed == 0) {
                            lastPlayed = 'never';
                        } else {
                            lastPlayed = new Date(lastPlayed);
                            lastPlayed = lastPlayed.toLocaleDateString();
                        }
                        letter = name.charAt(0).toUpperCase();
                        if (Interface.utils.isNumber(letter)) {
                            letter = '#';
                        }
                        if (HTML.indexOf('list-divider-' + letter) == -1) {
                            HTML       += '<div class="main-item list-item-accent list-divider-' + letter + '"><span class="letter-item-text">';
                            HTML       += letter;
                            HTML       += '</span></div>';
                        }

                        activeClass = false;
                        if (id == active) {
                            activeClass = true;
                        }

                        // HTML  += '<a href="javascript:void(0);" onclick="Interface.utils.select(\'' + id + '&' + escape(name) + '\')">';
                        // HTML  += '<div class="main-item"><img class="list-cover" src="' + cover + '"/><span class="main-item-text item-text">';
                        // HTML  += name;
                        // HTML  += '</span><span class="secondary-item-text item-text">';
                        // HTML  += 'Played ' + timesPlayed + ' times, last ' + lastPlayed;
                        // HTML  += '</span></div></a>';

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
            }
            if (HTML == '') {
                $('#searchResults').hide();
                $('#listContent').show();
            } else {
                document.getElementById('searchResults').innerHTML = HTML;
                $('#listContent').hide();
                $('#searchResults').show();
            }
        },
        "supportsAnimation" : function () {
            var s = document.body.style;
            if (s.transition == '') {
                if (Interface.data.storage.settings.get("animations")) {
                    return true;
                }
            }
            return false;
        },
        "errorHandler" : function (error, url, line) {
            var message = Interface.data.messages["notify-error"],
                msg = {};
            msg.title = message.title;
            msg.content = message.content;
            msg.content += "Error: " + error + "<br/>At line: " + line + "<br/>For: " + url + "<br/>";
            Interface.utils.messageBox.create(msg);
        }
    }
};

//Some initting
window.onhashchange = function () {
    Interface.navigation.navigateTo(window.location.hash);
}

$(document).ready(function () {
    Interface.init();
    window.onerror = Interface.utils.errorHandler;
});
