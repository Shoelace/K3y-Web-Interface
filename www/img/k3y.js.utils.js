//Some initting
$(window).hashchange(function() {
	Interface.navigation.navigateTo(window.location.hash);
});

$(document).ready(function() {
	Interface.init();
});

var tempStorage = JSON.parse('{"Settings":{"accent":"purple","metro":true,"language":"English","slideChance":"100","orientationNotification":false},"FavLists":{"Pinned":[{"id":"ecb9d3f80f04a7985508567b04372a421bc5c6c0","name":"SSX"},{"id":"5ad5e4cae5729d7c9d96c58deb39205ad9d5d040","name":"Forza Motorsport 4 Disc 2"}],"Recently Added":[{"id":"09834ce1795306a740ab3f8fb865c04bd7415932","name":"Assassin\'s CreedÂ® III Disc 1"},{"id":"c682c0436c9b69ffdb89bee30db33fbb5e18b1ed","name":"Assassin\'s CreedÂ® III Disc 2"},{"id":"07f85dedf8cbeaf4be9cd3e1c51e4216f8e0fce0","name":"Borderlands 2"},{"id":"3954a72fddee9122631eb8dabf95ad445394da35","name":"DiRT 3 -- Complete Edition"},{"id":"d70dfd7c39331fda8a006c32c9b7cc3e3589447a","name":"DiRT Showdown"},{"id":"41d0d5b6489878b7a77b5ec95ccf57d0fe79b908","name":"Far Cry 3"},{"id":"2a4eb4c5155d0c605240082acc8207ba685f0410","name":"FIFA 13"},{"id":"fd06f24b8b184ef95ab6d639c028c99a20c6b95e","name":"Forza Horizon"},{"id":"8dc3891c06f22f4e56ef5f4284c80a5c8be69f56","name":"Halo 4 Disc 1"},{"id":"43885cbbeb26493dc9a07f17f9db3baab9ce6a6c","name":"Halo 4 Disc 2"},{"id":"4236cbaf8093bd99395596a7fd4f4fa660607fe4","name":"Hitman Absolution"},{"id":"c9be79ab9f653e3e08e53ebd101994da3e09527f","name":"NEED FOR SPEED MOST WANTED"},{"id":"d11be4e9eb3aea311ddeb1bfaf51a90ba84406dc","name":"Saints Row The Third"},{"id":"1dcf450b8036e8d39773e5b8dcc367517264aa97","name":"Saints Row The Third DLC"}],"RPG":[{"id":"61cb592a19e6fdb4c9fab8d7d989e42593ef5acf","name":"The Elder Scrolls V Skyrim"},{"id":"8edef05d3eae48e0463452d53c8cce88031ca644","name":"Fable III"},{"id":"670682f5a7e5f8a88e2a6350552f1c7d0d095d4f","name":"Fable II -- Game of the Year Edition"}],"List 2":[{"id":"07f85dedf8cbeaf4be9cd3e1c51e4216f8e0fce0","name":"Borderlands 2"},{"id":"ed8c27c72df81e5dfdb3a74319407ab58989b0b9","name":"Brink"},{"id":"4236cbaf8093bd99395596a7fd4f4fa660607fe4","name":"Hitman Absolution"},{"id":"76c95b2d57a0fb2bbc68158ff6ff8b4383a439b7","name":"Gears of War 3"}],"List 3":[{"id":"c7c87f5b0ebb2f706da0fcc606933288fc8b0312","name":"Rage Disc 3"},{"id":"99a427cbc5cb193741e12ea43251723dc40b6584","name":"Syndicate"},{"id":"e9431a66c3bff887b84f81b3b6ade8b0581eadda","name":"Max Payne 3 Disc 1"},{"id":"9b4f7282309dcec6403809a8d5373f8b833acbee","name":"Army of Two The 40th Day"}]},"1ad214f9143283a89c207f4d870fd5bbd24915ed":{"known":true},"eecc99971efbb838522c31337da068323655a880":{"known":true},"27808d3ffd6cc37f95780e8d8c962b929b15351f":{"known":true},"49a217cb1a6e879b8a7308e3e5ead480f460e472":{"known":true},"f3aaf6c154948d51d65bc7a45155871c14cd7b07":{"known":true},"20ebde8c190d00bf984c09fc9b30dff98cf5197d":{"known":true},"ed8c27c72df81e5dfdb3a74319407ab58989b0b9":{"known":true},"17877d6a5a56953e718f62296e28353d150fc6a4":{"known":true},"fe4b0175639b21eed78625e23f76de0acb60c0e8":{"known":true},"2a3cec920c56909559adc4cf19f8e62109ec5faf":{"known":true},"a76ccaa648d25e19b52868b5098ae415c6795adc":{"known":true},"8da77abcb7f97dd3c46e30e4174d958b12d5080d":{"known":true},"8b7950435a207f6ca424bd73f28df3f894e7b6a1":{"known":true},"03055cd0317422ed3bd3212f28a4d50981de5a0b":{"known":true},"cb0995bd155c18106d2875f598d4bc4ae9a3009f":{"known":true},"921cb10ec486adf97dfaed66468b378c56769b93":{"known":true},"9b182a4b4c0ebc3dfe7fe696cdee11a74cc18dbf":{"known":true},"8edef05d3eae48e0463452d53c8cce88031ca644":{"known":true},"d1ba1bbe85d95329a27666e2ad33a27a9aab6624":{"known":true},"ef1e2fd91ed15c9a316b85bb189a4743476adb58":{"known":true},"9e2f4e07d49f9e9c436cbbbddc62afb59093defc":{"known":true},"b2a53a44ff9f8efe75139f521ab4a49eed0b1834":{"known":true},"2022b9cbf91ffd1c8b1e8ec7d4fefccd47fd4808":{"known":true},"76c95b2d57a0fb2bbc68158ff6ff8b4383a439b7":{"known":true},"0c2dab94a8fd423b61c5b3d2cc76f2e876b72faf":{"known":true},"ad510ca8d6d6467a01608afb9aab8e24008ddf45":{"known":true},"538b824034f52f57017231ca5a72aa5b740cdd06":{"known":true},"722f2b8ecda48fe326ff78a43f57e6bceef7c04c":{"known":true},"29fc25852851bdb874adb8191acd8d60f24543dc":{"known":true},"1945cac203e9a03bde9f9d1e7350565b4f74f757":{"known":true},"817f29773e6878285b420e9e8ee8f12f6a12f2e3":{"known":true},"9ef95c926299e0f6af88fddf0390dbb912165f01":{"known":true},"f16028eb36eccdb691a4f668d2c67b1dfbce7cf9":{"known":true},"49c415b035b7d8e0593baad0f7b52a80954194d5":{"known":true},"22f4b23e18cde5c34f69b623f96bd0e8b0292406":{"known":true},"55d035e6e08e7f5e5e137604e0dffff58b551ed7":{"known":true},"24114d7e66c47ce476e4eb6bb48f4cc1165792f0":{"known":true},"966b0c9b6e033f7736f0a56b9fe530d79c352372":{"known":true},"63f582ed2321610b01ce09709fd51d9c08d29fb9":{"known":true},"cd7139c54832c6b15e5a89dc9fb1ec01924ef93c":{"known":true},"aae30ac6f9d06b5d20bddec3312d1feb1f86ff2a":{"known":true},"aca07b659fef7b41bf3fd64f09a3f7198927fe8b":{"known":true},"20270cce12b5cc17d3887cd93ba055720fe6c1da":{"known":true},"70cfdf0c9e8679815f8260cb75519467fcaf7c01":{"known":true},"19dccaa6dd5d75fcb4f4139a04322a45e1ee401d":{"known":true},"14c68d77b33da6415cdefe64c9a3011fcf90968d":{"known":true},"45dd7ac85393b503f8ea117d32b7b0b10a07feee":{"known":true},"d937f6040ea2141db832fb2c5b58546e222e4c66":{"known":true},"3b296de66161ec1946d51c6adea54c01f70a021d":{"known":true},"eb0af5f14486fdd28ebffcdac21a3c49e8338fc3":{"known":true},"a0c539e167df88a8cc4cb652bc5f16d2233fdf82":{"known":true},"aac1d40b29cbe173fc079f1c4f0e136750d6746b":{"known":true},"4596614439da8abad9de6342936d056ce80ad7cb":{"known":true},"d8808554429ec953c56344f13c2246a024e16313":{"known":true},"fc5e4d3d9684768817cf715562955bd1d6651e2f":{"known":true},"e8ed8cc8aff3c542a58ac36f0d6ed63069e6c4c3":{"known":true},"10f8b9a1f9f0803c59202c52d7115c8e92a05bc9":{"known":true},"6cb2c2e5d7ae0f30bdbf04551886ce3578633c82":{"known":true},"a309db163478e0c542961eaece83a26dbc7786bb":{"known":true},"24d81c87f75170068bf4887ca9de90f9f0cf099b":{"known":true},"ecb9d3f80f04a7985508567b04372a421bc5c6c0":{"known":true},"a40206c501411aaf8cba74f12cd3f509aae0ec35":{"known":true},"0d4ffd85a16efec07edbc60fd04bc1a166f8fe13":{"known":true},"99a427cbc5cb193741e12ea43251723dc40b6584":{"known":true},"e51e3a1cbc5dbce3b663cd8ba566506f1dd96766":{"known":true},"cb4a7710270d209bf1860eee937d8a944cad967f":{"known":true},"246090b169be8ed6e1f8448cf96aa2167e050960":{"known":true},"9b4f7282309dcec6403809a8d5373f8b833acbee":{"known":true},"2986390017bf34375724cf36648b9ce3350b3dd6":{"known":true},"b6aecaf976c663ad2dbc8c7464d74035dbc61538":{"known":true},"1d99141dbb49350ca3d3a9e5f41c4864f4958f54":{"known":true},"4b3f97a1b14bf470a2cabded2b9212be3651eb72":{"known":true},"62c3401db5acb1905072cf34f11e3f5b75196974":{"known":true},"628afe27b64f4e4e94a165a65852d1aca4a1c920":{"known":true},"bd16de59dee4f2bc1fd122c68e39737816d4f4e8":{"known":true},"670682f5a7e5f8a88e2a6350552f1c7d0d095d4f":{"known":true},"2623ec8ba138a18bd1f7f441d270cc566339d815":{"known":true},"5ad5e4cae5729d7c9d96c58deb39205ad9d5d040":{"known":true},"aef69965ab97eace2b85f729e30297fe8aee8fc5":{"known":true},"e9826d4cd8b09d8f06454268751c0d2438afbf9b":{"known":true},"df4fea8fce85a77884829938e8958956a5e91fae":{"known":true},"d6330aa716c985312a0a4e4986d3f7b1fd995dc4":{"known":true},"1bf21eec453a1eaf8ecc04a54c68283f0883882d":{"known":true},"f66e5a8f464ecc71e96562b6f3cd1918b2469344":{"known":true},"140d5928da7a06bbabd09f638bd672f053feec80":{"known":true},"11deb6dcaf48480e3215f475ea26fb303d71aa39":{"known":true},"8abc3f7be32b24baecca74cef8402704994932bb":{"known":true},"2912b4afe8595fe417161cabc259691b70a6eff9":{"known":true},"e9431a66c3bff887b84f81b3b6ade8b0581eadda":{"known":true},"7fc6519f3619b3ecd293edd8ceadd72a07614288":{"known":true},"38841b7f5ff36c3a40ec96da30ecfb466c8011d0":{"known":true},"b05e18c41faf9d1d12d0d9314d45df01bab5f657":{"known":true},"4ae33589be68d34d0ff8ae3aa25242dfe61db888":{"known":true},"3cba284cb468db496d4cf1aa6ffb7d316ce19715":{"known":true},"c7c87f5b0ebb2f706da0fcc606933288fc8b0312":{"known":true},"772b38dd9685fb730dbd81b8009d367350abc739":{"known":true},"acb634e951626b40d316c8ef9c41ddac33e7110d":{"known":true},"f00f2ea3c8f0d5aced0e953f3c9272f9c8030b27":{"known":true},"9a54a6cf2b836a6c0ba2f65200e367777a7b205d":{"known":true},"2fef52209a6ca08d89458b09231a94bea5150565":{"known":true},"3bb6cc479ea5f39f5038188ee49be964186f462c":{"known":true},"3b91dd77323a8face25ccfbc68db7207f6543ef0":{"known":true},"61cb592a19e6fdb4c9fab8d7d989e42593ef5acf":{"known":true},"a6dc73e32c0bad3fbab9fd3019ed5de24ea301b5":{"known":true},"8f53ec14274ec3af0e507ecef18a28b9cb41a0dc":{"known":true},"09834ce1795306a740ab3f8fb865c04bd7415932":{"known":true},"c682c0436c9b69ffdb89bee30db33fbb5e18b1ed":{"known":true},"07f85dedf8cbeaf4be9cd3e1c51e4216f8e0fce0":{"known":true},"3954a72fddee9122631eb8dabf95ad445394da35":{"known":true},"d70dfd7c39331fda8a006c32c9b7cc3e3589447a":{"known":true},"41d0d5b6489878b7a77b5ec95ccf57d0fe79b908":{"known":true},"2a4eb4c5155d0c605240082acc8207ba685f0410":{"known":true},"fd06f24b8b184ef95ab6d639c028c99a20c6b95e":{"known":true},"8dc3891c06f22f4e56ef5f4284c80a5c8be69f56":{"known":true},"43885cbbeb26493dc9a07f17f9db3baab9ce6a6c":{"known":true},"4236cbaf8093bd99395596a7fd4f4fa660607fe4":{"known":true},"c9be79ab9f653e3e08e53ebd101994da3e09527f":{"known":true},"d11be4e9eb3aea311ddeb1bfaf51a90ba84406dc":{"known":true},"1dcf450b8036e8d39773e5b8dcc367517264aa97":{"known":true}}');

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
				"home-page"                   : function(){},
				"game-page"                   : function(args){Interface.main.create.gamepage(args)},
				"coverwall-page"              : function(){Interface.main.create.coverwall()},
				"list-page"                   : function(){Interface.main.create.gamelist()},
				"folders-page"                : function(args){Interface.main.create.folders(args)},
				"favorites-page"              : function(args){Interface.main.create.favorites(args)},
				"favorites_game_manager-page" : function(args){Interface.main.create.favorites_game_manager(args)},
				"favorites_list_manager-page" : function(args){Interface.main.create.favorites_list_manager(args)},
				"recent-page"                 : function(){Interface.main.create.recent()},
				"search-page"                 : function(){},
				"about-page"                  : function(){Interface.main.create.about()},
				"settings-page"               : function(){}
			},
			"new" : function (id, name, func) {
				if (id.indexOf('%') == -1) {
					id = escape(id);
				}
				var page = '<div id="'+ id +'" class="page"><div class="page-title">'+unescape(name)+'</div><div class="page-content"></div></div>';
				//#main is the main container, append page to there
				document.getElementById('main').innerHTML += page;
				if (!func) {
					func = function(){};
				}
				//Register page
				Interface.navigation.pages.list[id] = func;
			},
			"remove" : function (id) {
				if (id.indexOf('%') == -1) {
					id = escape(id);
				}
				var selector = document.getElementById(id);
				var page = $(selector);
				//Clean up HTML
				page.remove();
				//Unregister page
				delete Interface.navigation.pages.list[id];
			},
			"exists" : function (id) {
				for (page in Interface.navigation.pages.list) {
					if (page == id) {
						return true;
					}
				}
				return false;
			},
			"addContent" : function (id, HTML) {
				//$('#' + id + ' > .page-content').html(HTML);
				$(document.getElementById(id)).children('.page-content').html(HTML);
			}
		},
		"navigateTo" : function (page) {
			var allPages = this.pages.list;
			var args;
			if (!page) {
				page = 'home-page';
			}
			//Do we have a "#" in the page string? cut it off
			if (page.indexOf('#') == 0) {
				page = page.slice(1,page.length);
			}
			//Parse arguments
			if (page.indexOf('?') != -1) {
				args = page.split('?',2);
				page = args[0];

				if (page == "folders-page" || page == "favorites-page"){
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
			//Do we have a "#" in the page string? cut it off
			/*if (page.indexOf('#') == 0) {
				page = page.slice(1,page.length);
			}*/
			//No "%"? Escape the page string to make sure we get it right
			if (page.indexOf('%') == -1) {
				page = escape(page);
			}
			//Hide currently active page
			//$('.page.active').removeClass('active');
			//console.log(page);
			$('.page.active').fadeOut(200, function() {
				$('.page.active').removeClass('active');
				
				//Show requested page
				//$(document.getElementById(page)).addClass('active');
				$(document.getElementById(page)).fadeIn(200).addClass('active');
				//Sometimes animation is a bitch, so we force opacity
				document.getElementById(page).style.opacity = 1;

				if (page != 'home-page') {
					$(document.getElementById(page)).find('div.page-title')
						.prepend('<a href="javascript:history.back()"><img class="back-button" src="img/back.png"/></a>')
						.prepend('<a href="#home-page"><img class="home-button" src="img/home.png"/></a>');
				}
				
				if (!$.isFunction(allPages[page])) {
					//PANIC
					//A non-registered page has been requested
					//This function handles hashchanges
					//So it will loop until we get a safe page
					history.back();
					//Prevent calling page related functions
					return;
				}
				
				//Call function related to page
				allPages[page](args);
			});
		},
		"current" : function () {
			var page = window.location.hash;
			page = page.slice(1,page.length);
			return page;
		}
	},
	/**
		Data
	*/
	
	"data" : {
		"startPoll" : function () {
			var pollTime   = this.pollTime;
			this.pollTimer = setInterval('Interface.data.poll()', pollTime);
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
				// cache: false,
				success: function(xml) {
					Interface.utils.log("Poll success!");
					$.ajax({
						type: "GET",
						url: "store.sh",
						dataType: "json",
						cache: false,
						success: function(storage) {
							if (storage == null || storage == "")
								storage = {};
							Interface.data.pollSuccess(xml, storage, init);
						},
						error: function() {
							Interface.data.pollSuccess(xml, {}, init);
						}
					});
				},
				error : function(jqXHR, textStatus, error) {
					Interface.utils.log("Poll error!");
					Interface.utils.log("textStatus: "+textStatus);
					Interface.utils.log("error: "+error);
					Interface.data.pollError();
				}
			});
		},
		"pollSuccess" : function (xml, storage, init) {
			var HDDcount = $(xml).find('MOUNT').length;
			var ACTIVE   = $(xml).find('ACTIVE').text();
			
			//Check for change in HDD's
			if (!this.data.drives || HDDcount != this.data.drives.length) {
				Interface.utils.log("Starting update...");
				if (!init) {
					Interface.utils.messageBox.create(Interface.data.messages["notify-dataUpdate"])
				}
				this.update(xml, storage, init);
			}
			else {
				Interface.utils.log("No update needed...");
			}
			//Check for change in active game
			if (ACTIVE != this.active) {
				this.data.active = ACTIVE;
			}
		},
		"pollError" : function () {
			
		},
		"update" : function (xml, storage, init) {
			Interface.utils.log("Update started!");
			xml        = $(xml);
			Interface.utils.log("XML Parsed!");
			var drives = [];
			var dirs   = [];
			var isos   = [];
			var about  = [];
			var lists  = [];
			var dir, par, id, name, cover, info, hdd;
			if (xml.find('XKEY').length != 0) {
				Interface.data.type = "xbox";
			}
			else if (xml.find('3KEY') != 0) {
				Interface.data.type = "ps3";
			}
			Interface.utils.log("Device = "+Interface.data.type);
			//storage = tempStorage;
			if ($.isEmptyObject(storage.games)) {
				storage = Interface.data.storage.convert(storage);
				//storage.games = {};
			}
			
			//Array of HDDs
			xml.find('MOUNT').each(function() {
				drives.push($(this).attr('NAME'));
			});
			Interface.utils.log("HDD parsed: "+drives.length);
			//Directories
			xml.find('DIR').each(function() {
				dir = $(this).attr('NAME');
				par = $(this.parentNode).attr('NAME');
				dirs.push({"dir" : dir, "par" : par});
			});
			Interface.utils.log("Folders parsed: "+dirs.length);
			//Parse ISO data
			xml.find('ISO').each(function() {
				id    = $(this).find('ID').text();
				name  = $(this).find('TITLE').text().replace(/\.iso/gi,"");
				par   = $(this.parentNode).attr('NAME');
				hdd   = $(this).parents('MOUNT').attr('NAME');
				cover = "covers/"+id+".jpg";
				//DEBUG
				//cover = "img/test.jpg";
				info  = "covers/"+id+".xml";
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
						"known" : false,
					};
				}
				storage.games[id].hdd = hdd;
				//Cache images
				//cacheImage = new Image();
				//cacheImage.src = "covers/"+id+".jpg";
				//cache.push(cacheImage);
			});
			Interface.utils.log("Games parsed: "+isos.length);
			//About info
			xml.find('ABOUT').find('ITEM').each(function() {
				about.push({item: $(this).attr('NAME'), value: $(this).text()});
			});
			Interface.utils.log("About info parsed");
			//Active game
			var active = xml.find('ACTIVE').text();
			//Lists
			if (storage.favLists != undefined) {
				lists = storage.favLists;
			}
			
			//Sort games
			var sorted = isos.slice();
			sorted.sort(function(x,y) {
				var a = String(x.name).toUpperCase();
				var b = String(y.name).toUpperCase();
				if (a > b)
					return 1
				if (a < b)
					return -1
				return 0;
			});
			Interface.utils.log("Games sorted!");
			var data = {
				"games"   : isos,
				"sorted"  : sorted,
				"folders" : dirs,
				"drives"  : drives,
				"about"   : about,
				"active"  : active,
				"lists"   : lists,
				"storage" : storage
			}
			Interface.data.data = data;
			Interface.utils.log("Saved everything!");
			Interface.utils.log("Attempting to flag all pages as not made...");
			//PS3 browser is retarded
			for (var i = 0; i < Interface.main.vars.made.index.length; i++) {
			/*for (page in Interface.main.vars.made) {*/
				Interface.utils.log("Inside the loop now...")
				/*Interface.main.vars.made[page] = false;*/
				//Interface.main.vars.made[i].made = false;
				Interface.main.vars.made[Interface.main.vars.made.index[i]] = false;
			}
			//See if this works
			Interface.utils.log("See if another approach works");
			$.each(Interface.main.vars.made, function(key){
				Interface.utils.log("INSIDE THE OTHER ONE!");
				if (key != "index") {
					Interface.main.vars.made[key] = false;
				}
			});
			Interface.utils.log("Success with the above ^^");
			if (init) {
				Interface.utils.log("init, so navigate to current hash");
				if (window.location.hash != '') {
					Interface.navigation.navigateTo(window.location.hash);
				}
				Interface.utils.log("That should've worked");
				Interface.utils.log("Attempting init...");
				Interface.main.init();
				Interface.utils.log("Init done!");
			}
			else if (!init) {
				if (window.location.hash != '') {
					Interface.navigation.navigateTo('');
				}
			}
			Interface.utils.log("Updated!");
			Interface.utils.log("Games: "+isos.length);
			Interface.data.storage.save();
			Interface.utils.messageBox.remove();
		},
		"lists" : {
			"getLists" : function (id) {
				if (id) {
					var lists        = Interface.data.data.lists;
					var returnObject = {"isAvailable":[], "isIn":[]};

					var content, game, k;
					var flag = false;
					var l    = lists.length;

					for (var i = 0; i < l; i++) {
						content = lists[i].content;
						k       = content.length;
						for (var j = 0; j < k; j++) {
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
				else {
					return Interface.data.data.lists;
				}
			},
			"createList" : function (listName, id, name) {
				if (!id) {
					id       = $('.listsDataGameID').val();
					name     = $('.listsDataGameName').val();
					listName = $('.listsNewListInput').val();
				}
				var lists = Interface.data.data.lists;
				listName = escape(listName);

				if (Interface.data.lists.indexOf(listName) != -1) {
					Interface.utils.messageBox.create(Interface.data.messages["notify-list-exists"]);
					return;
				}
				var game  = {
					"id"   : id,
					"name" : name,
					"hdd"  : Interface.data.data.storage.games[id].hdd
				}
				var list  = {
					"name"    : listName,
					"content" : [
						game
					]
				}
				lists.push(list);
				Interface.data.storage.save();
				if (Interface.navigation.current().indexOf('favorites') != -1) {
					$(window).hashchange();
				}
			},
			"addGame" : function (id, name, listName) {
				if (!id) {
					id       = $('.listsDataGameID').val();
					name     = $('.listsDataGameName').val();
					listName = $('.listsDataAddListName').val();
				}
				var game = {
					"id"   : id,
					"name" : name,
					"hdd"  : Interface.data.data.storage.games[id].hdd
				}
				var lists = Interface.data.data.lists;

				var index = Interface.data.lists.indexOf(listName);
				lists[index].content.push(game);
				Interface.data.storage.save();
				if (Interface.navigation.current().indexOf('favorites') != -1) {
					$(window).hashchange();
				}
			},
			"removeGame" : function (id, listName) {
				if (!id) {
					id       = $('.listsDataGameID').val();
					listName = $('.listsDataRemoveListName').val();
				}
				var lists = Interface.data.data.lists;

				var index   = Interface.data.lists.indexOf(listName);
				var content = lists[index].content;
				var l       = content.length;
				for (var i = 0; i < l; i++) {
					if (content[i].id == id) {
						content.splice(i, 1);
						Interface.data.storage.save();
						if (Interface.navigation.current().indexOf('favorites') != -1) {
							$(window).hashchange();
						}
						return;
					}
				}
			},
			"indexOf" : function (listName) {
				var lists = Interface.data.data.lists;
				listName = escape(listName);
				var l = lists.length;
				for (var i = 0; i < l; i++) {
					if (lists[i].name == listName) {
						return i;
					}
				}
				return -1;
			},
			"updateRecent" : function () {
				var games = Interface.data.data.sorted;
				var l = games.length;
				var listName = "Recently Added";
				var lists = Interface.data.lists.getLists();
				var listExists = (Interface.data.lists.indexOf(listName) == -1 ? false : true);
				var storage = Interface.data.data.storage;

				var cleared = false;
				var id, name, flag, store;
				for (var i = 0; i < l; i++) {
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
						}
						else {
							Interface.data.lists.createList(listName, id, name);
							listExists = true;
							cleared = true;
						}
					}
				}
				Interface.data.storage.save();
				$(window).hashchange();
			},
			"clear" : function (listName) {
				var index = Interface.data.lists.indexOf(listName);
				Interface.data.data.lists[index].content = [];
				Interface.data.storage.save();
			},
			"removeList" : function (listName) {
				var index = Interface.data.lists.indexOf(listName);
				if (index != -1) {
					Interface.data.data.lists.splice(index, 1);
				}
				Interface.data.storage.save();
			}
		},
		"storage" : {
			"getTimesPlayed" : function (id) {
				return Interface.data.data.storage.games[id].timesPlayed;
			},
			"getLastPlayed" : function (id) {
				return Interface.data.data.storage.games[id].lastPlayed;
			},
			"updateTimesPlayed" : function (id) {
				return (Interface.data.data.storage.games[id].timesPlayed++ + 1);
			},
			"updateLastPlayed" : function (id) {
				return Interface.data.data.storage.games[id].lastPlayed = Date.parse(new Date);
			},
			"convert" : function (storage) {
				//Convert old storage to new storage
				var newStorage = {
					"games" : {},
					"settings" : {},
					"favLists" : []
				}
				for (var key in storage) {
					if (key.length == 40) {
						//If the key length is 40, its probably a game ID
						var temp = storage[key];
						if ($.isEmptyObject(temp.lastPlayed))
							temp.lastPlayed = 0;
						if ($.isEmptyObject(temp.timesPlayed))
							temp.timesPlayed = 0;
						if ($.isEmptyObject(temp.known))
							temp.known = false;
						if ($.isEmptyObject(temp.hdd))
							temp.hdd = "";
						newStorage.games[key] = temp;
					}
				}
				if (!$.isEmptyObject(storage.FavLists)) {
					var temp, list, hdd, l;
					for (var key in storage.FavLists) {
						list = storage.FavLists[key];
						l = list.length;
						temp = [];
						for (var i = 0; i < l; i++) {
							temp.push({
								"name" : list[i].name,
								"id"   : list[i].id,
								"hdd"  : ""
							})
						}
						newStorage.favLists.push({
							"name" : escape(key),
							"content" : temp
						});
					}
				}
				if (!$.isEmptyObject(storage.Settings))
					newStorage.settings = storage.Settings;
				Interface.utils.messageBox.create(Interface.data.messages['notify-convert']);
				return newStorage;
			},
			"get" : function () {
				return Interface.data.data.storage;
			},
			"save" : function () {
				$.post('store.sh', JSON.stringify(Interface.data.data.storage));
			}
		},
		"pollTime"  : 10000,
		"pollTimer" : 0,
		"version"   : "beta 2",
		"type"      : "xbox",
		"messages"  : {
			"notify-xbox" : {
				"title"   : "Xbox IE Settings",
				"content" : "I see you're using your Xbox to view this interface. I'm prepared for that! <br/><br/> Can I just recommend that you tick the option \"Use my whole TV to show the webpage\" in IE's settings? Thanks!"
			},
			"notify-dataUpdate" : {
				"title"   : "Data updated",
				"content" : "It looks like the number of HDD's changed. This also means that the games have changed. In order to make sure that I continue to function properly, I updated myself, and reset you to the homepage to prevent any errors. <br/>Thanks for understanding!"
			},
			"notify-opentray" : {
				"title"   : "Loading Notification",
				"content" : "Please open your DVD tray"
			},
			"notify-reload" : {
				"title"   : "Loading Notification",
				"content" : "A game appears to be already loaded, please open your DVD tray and click 'Reload'<br/><br/>"
			},
			"notify-list-exists" : {
				"title"   : "List exists",
				"content" : "This list already exists, please pick another name!"
			},
			"notify-convert" : {
				"title"   : "Storage converted",
				"content" : "Your storage has been converted to the new standard. This WILL break apps that haven't updated their code to work with it. Please notify the developers of these apps and refer them to the API wiki. Thanks!"
			},
			"notify-init" : {
				"title"   : "Loading",
				"content" : "Please wait while data is being loaded and processed..."
			},
			"test" : {
				"title"   : "Testing",
				"content" : "Let's see if this works"
			}
		},
		"data" : {}
	},
	"utils" : {
		"launch" : function (id) {
			var url = "launchgame.sh?"+id;
			$.ajax({
				type: "GET",
				url: "data.xml",
				dataType: "xml",
				success: function(xml) {
					var tray = $(xml).find('TRAYSTATE').text();
					var guistate = $(xml).find("GUISTATE").text();
					if (tray == 0) {
						$.get(url);
						Interface.utils.updateGameInfo(id);
		            }
					else if (tray == 1 && guistate == 1) {
						Interface.utils.messageBox.create(Interface.data.messages["notify-opentray"]);
						$.get(url);
						Interface.utils.updateGameInfo(id);
					}
					else if (tray == 1 && guistate == 2) {
						var message = Interface.data.messages["notify-reload"];
						message.content += '<a href="javascript:Interface.utils.messageBox.remove();launchGame(\''+id+'\')"><span class="prettyButton">Reload</span></a><br/>';
						Interface.utils.messageBox.create(message);	
					}
				}
			});
		},
		"updateGameInfo" : function (id) {
			var timesPlayed = Interface.data.storage.updateTimesPlayed(id);
			var lastPlayed  = Interface.data.storage.updateLastPlayed(id);
			Interface.data.data.active = id;
			Interface.data.storage.save();

			lastPlayed = new Date(lastPlayed);
			lastPlayed = lastPlayed.toLocaleDateString();

			var HTML = 'Played ' + timesPlayed + ' times, last ' + lastPlayed;

			$('a[href*="'+id+'"] > div > span.secondary-item-text').html(HTML);
		},
		"messageBox" : {
			"create" : function(message){
				if (this.active == "") {
					var messageBox = $('#messageBox');

					messageBox.find('.messageBox-title').html(message.title)
						.append('<a href="javascript:Interface.utils.messageBox.remove()"><img class="close-button" src="img/close.png"/></a>');
					messageBox.find('.messageBox-content').html(message.content);
					this.active = message;

					Interface.utils.overlay.show();
					this.show();
				} else {
					this.queue.push(message);
				}
			},
			"remove" : function(){
				this.active = "";
				if (this.queue.length > 0) {
					this.hide(function() {
						Interface.utils.messageBox.create(Interface.utils.messageBox.queue.shift());
					});
				}
				else {
					this.hide();
					Interface.utils.overlay.hide();
				}
			},
			"show" : function () {
				$('.other-container').addClass("overlap");
				$('#messageBox').fadeIn(200).css("display", "inline-block").removeClass("invis");
			},
			"hide" : function (callback) {
				$('#messageBox').fadeOut(200, function(){
					$(this).addClass("invis");
					$('.other-container').removeClass("overlap");
					if (callback) {
						callback();
					}
				});
			},
			"active" : "",
			"queue" : []
		},
		"overlay" : {
			"show" : function() {
				$('#overlay').fadeIn(200).removeClass("invis");
			},
			"hide" : function() {
				$('#overlay').fadeOut(200, function(){
					$(this).addClass("invis");
				});
			}
		},
		"log" : function (message) {
			var log = $('#debug');
			//log.append(message+"</br>");
		},
		"isNumber" : function (o) {
			return ! isNaN (o-0); 
		},
		"isHDD" : function (dir) {
			return (Interface.data.data.drives.toString().indexOf(dir)!=-1);
		},
		"search" : function (input) {
			var HTML = '';
			if (input.length == 0) {
				HTML = 'No results';
			}
			else {
				var games   = Interface.data.data.sorted;
				var pattern = new RegExp(input,"i");
				var name, id, cover;
				var l       = Interface.data.data.sorted.length;
				for (var i = 0; i < l; i++) {
					if (pattern.test(games[i].name)) {
						name  = games[i].name;
						id    = games[i].id;
						cover = games[i].cover;
						HTML  += '<div class="main-item"><img class="list-cover" src="' + cover + '"/><span class="main-item-text item-text">';
						HTML  += name;
						HTML  += '</span><span class="secondary-item-text item-text">';
						HTML  += 'Times played + last played will go here';
						HTML  += '</span></div>';
					}
				}
				
				if (HTML == '') {
					HTML = 'No results';
				}
			}
			document.getElementById('searchResults').innerHTML = HTML;
		}
	}
}
