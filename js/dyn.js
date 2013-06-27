define(['mustache'], function(Mustache) {
	function XHRProxified(url, mime) {

		if (document.location.port == 8080) {
			// local python proxy
			return '/__ajaxproxy/' + url;
		} else {
			// hosted internet php proxy
			return 'http://www.logfordata.net/proxy.php?mimeType=' + mime + '&url=' + escape(url);
		}
	}

	function map_show() {
		log("Opening new window for " + geoplugin_latitude() + ',' + geoplugin_longitude());
		var url = 'http://maps.googleapis.com/maps/api/staticmap?center=' + geoplugin_latitude() + ',' + geoplugin_longitude() + '&zoom=14&size=300x200&sensor=true&maptype=satellite';
		var myMap = window.open(url, 'maps', 'width=320,height=240,toolbar=no,location=no,directories=no,status=no,menubar=no,left=512');
		//	setTimeout(function(e){myMap.close();},3000);
	}


	jQuery.fn.exists = function() {
		return jQuery(this).length > 0;
	}
	function log(aText) {
		var t = '@' + (new Date()).getTime();
		$('#info').append(t + ' - ' + aText + '<br/>');
		console.log(aText);
		$('#info').scrollTop(65000);
	}

	var classes = ["actualite", "cuisine", "diplo", "entrevue", "princesse", "potins", "logandrew"];

	return {
		updateTag : function() {
			log("Updating Tag");

			if ($('.searchimg').exists()) {
				$('.searchimg').each(function(elt) {
					var searchterm = $(this).attr('name');
					var localElt = $(this);
					log("Searching images for : " + searchterm);
					$.getJSON("http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=b27e622e07f348e026d868f2ee68830c&tags=" + searchterm + "&format=json&jsoncallback=?", function(data) {
						var aPhoto = data.photos.photo[Math.floor(Math.random() * 100)]
						var elt = document.createElement('img');
						elt.draggable = false;
						var size = (Math.random() < .5 ? 't' : 'm');
						var url = Mustache.render("http://farm{{farm}}.staticflickr.com/{{server}}/{{id}}_{{secret}}_" + size + ".jpg", aPhoto);
						$(elt).attr('src', url);
						localElt.append(elt);
						localElt.removeClass('searchimg');
					});
				});
			}

			if ($('.temp').exists()) {
				log("Getting weather data");
				$.ajax({
					type : "GET",
					url : XHRProxified("http://api.wunderground.com/auto/wui/geo/WXCurrentObXML/index.xml?query=" + geoplugin_latitude() + "," + geoplugin_longitude(), "application/xml;charset=UTF-8"),
					dataType : "xml",
					success : function(xml) {
						$('.temp').text($(xml).find("temp_c").text() + "°C");
						$('.temp').removeClass('temp');
						log("Received weather data");
					}
				});
			}

			if ($(".actualite").exists()) {
				log("Getting some headnews");
				$.ajax({
					type : "GET",
					url : XHRProxified("http://rss.feedsportal.com/c/32788/f/524037/index.rss", 'application/xml;charset=UTF-8'),
					dataType : "xml",
					success : function(xml) {
						var aTitle = $(xml).find("item").first().find("title").text();
						$(".actualite").text(aTitle);
						log("I've got a news title")
						$(".actualite").removeClass('actualite');
					}
				});
			}

			if ($(".cuisine").exists()) {
				log("Getting some receipes");
				$(".cuisine").text("...");
				$.ajax({
					type : "GET",
					url : XHRProxified("http://www.audreycuisine.fr/feed/", "application/xml;charset=UTF-8"),
					dataType : "xml",
					success : function(xml) {
						var aTitle = $(xml).find("item").first().find("title").text();
						$(".cuisine").text(aTitle);
						$(".cuisine").removeClass('cuisine');
						log("I've got a new receipe")
					}
				});
			}

			if ($(".diplo").exists()) {
				log("Getting some diplo");
				$(".diplo").text("...");
				$.ajax({
					type : "GET",
					url : XHRProxified("http://www.monde-diplomatique.fr/rss/", "application/xml;charset=UTF-8"),
					dataType : "xml",
					success : function(xml) {
						var aTitle = $(xml).find("item").first().find("title").text();
						$(".diplo").text(aTitle);
						$(".diplo").removeClass('diplo');
						log("I've got a new diplo")
					}
				});
			}

			if ($(".entrevue").exists()) {
				log("Getting some entrevue");
				$(".entrevue").text("...");
				$.ajax({
					type : "GET",
					url : XHRProxified("http://www.entrevue.fr/flux-rss/general", "application/xml;charset=UTF-8"),
					dataType : "xml",
					success : function(xml) {
						var aTitle = $(xml).find("item").first().find("title").text();
						$(".entrevue").text(aTitle);
						$(".entrevue").removeClass('entrevue');
						log("I've got a new entrevue")
					}
				});
			}

			if ($(".princesse").exists()) {
				log("Getting some princesse");
				$(".princesse").text("...");
				$.ajax({
					type : "GET",
					url : XHRProxified("http://www.voici.fr/feeds/view/actu", "application/xml;charset=UTF-8"),
					dataType : "xml",
					success : function(xml) {
						var aArticles = $(xml).find("item");
						var aTitle = $(aArticles[Math.floor(Math.random() * aArticles.length)]).find("title").text();
						$(".princesse").text(aTitle);
						$(".princesse").removeClass('princesse');
						log("I've got a new princesse")
					}
				});
			}

			if ($(".potins").exists()) {
				log("Getting some people");
				$(".potins").text("...");
				$.ajax({
					type : "GET",
					url : XHRProxified("http://rss.feedsportal.com/c/32455/f/491700/index.rss", "application/xml;charset=UTF-8"),
					dataType : "xml",
					success : function(xml) {
						var aTitle = $(xml).find("item").first().find("title").text();
						$(".potins").text(aTitle);
						$(".potins").removeClass('potins');
						log("I've got a new people")
					}
				});
			}

			if ($(".param").exists()) {
				log("Seting up a new param");
				$(".param").each(function(idx, elt) {
					var name = $(elt).attr('name');
					var value = $(elt).attr('value');
					log(name + ' set to ' + value);
					aVE[name] = value;
					$(elt).removeClass('param');
				});
			}

			if ($(".logandrew").exists()) {
				log("Getting some fresh infos");
				$(".logandrew").each(function(idx, elt) {
					$.ajax({
						type : "GET",
						url : XHRProxified("http://logandrew.wordpress.com/feed/", "application/xml;charset=UTF-8"),
						dataType : "xml",
						success : function(xml) {
							var items = $(xml).find("item");
							var idx = Math.floor(Math.random() * items.length);
							var anItem = $(items[idx]);
							var aText = anItem.find('description').text();
							$(elt).removeClass('logandrew');
							$(elt).html(aText.replace(/<img.*>/g, ""));
							log("I've got logandrew infos")
						}
					});
				});
			}

			if ($(".msftquotes").exists()) {
				$.ajax({
					type : "GET",
					url : XHRProxified("http://www.google.com/ig/api?stock=MSFT", "application/xml;charset=UTF-8"),
					dataType : "xml",
					success : function(xml) {
						quotes = $(xml).find("last").attr("data");
						$(".msftquotes").text("MSFT : " + quotes + "$");
						$(".msftquotes").removeClass('msftquotes');
					}
				});
			}
			if ($(".generate").exists()) {
				log("Generating randomness");
				$('.generate').each(function(elt) {
					var myList = $(this).attr('name');
					var myArray = eval(myList);
					var randNum = Math.floor(Math.random() * myArray.length);
					log("Random number : " + randNum);
					$(this).text(myArray[randNum]);
				});
			}

			if ($(".sound").exists()) {
				log('sound instruction');
				$(".sound").each(function(idx, elt) {
					var nb = $(elt).attr('nb');
					var action = $(elt).attr('action');
					var value = $(elt).attr('value');
					var loop = $(elt).attr('loop');
					log(action + ' #' + nb + ' with ' + value);
					if (action == "start") {
						if (value)
							value = 0;
						source[nb].start(value);
						if (loop)
							source[nb].loop = true;
					}
					if (action == "stop") {
						if (value == undefined)
							value = 0;
						source[nb].stop(value);
					}
					if (action == "speed") {
						if (value == undefined)
							value = 0;
						source[nb].playbackRate.value = .1;
					}
					$(elt).removeClass('sound');
				});
			}

		}
	}
});
