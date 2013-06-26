define(["dyn", "lib/dat.gui.min", 'asciiart'], function(dyn, GUI, asciiart) {
	return {
		init : function() {
			var VisualEngine = function() {
				this.original = 50;
				this.inline = 50;
				this.asciimod = 30;
				this.wordmod = 20;
				this.wordrange = 3;
				this.blockinsert = 10;
				this.wordmod = 10;
				this.wordrange = 2;
				this.magicsecret = 10;
				this.sentenceswap = 10;
				this.clean = function() {
					$('#render').empty();
				}
			}
			var aVE = new VisualEngine();
			var gui = new dat.GUI();
			gui.remember(aVE);
			gui.add(aVE, 'original', 0, 100);
			gui.add(aVE, 'blockinsert', 1, 100);
			gui.add(aVE, 'inline', 0, 100);
			gui.add(aVE, 'asciimod', 0, 100);
			gui.add(aVE, 'magicsecret', 0, 100);
			gui.add(aVE, 'wordmod', 0, 100);
			gui.add(aVE, 'wordrange', 1, 10).step(1);
			gui.add(aVE, 'sentenceswap', 0, 100);
			gui.add(aVE, 'clean');
			function testVar(thresold) {
				return ((100 * Math.random()) < thresold);
			}


			$('#render').on('receive', function(event, text) {
				var elt;
				if (testVar(aVE.wordmod)) {
					var txt = text.split(' ');
					var pos = Math.floor(Math.random() * txt.length);
					var nbw = Math.floor(Math.random() * aVE.wordrange);
					txt[pos] = "<em>" + txt[pos];
					if (0 < nbw)
						txt[pos + nbw] = txt[pos + nbw] + "</em>";
					else
						txt[pos] += "</em>";
					text = "";
					$(txt).each(function(index, w) {
						text += w;
						text += ' ';
					});
				}
				if (testVar(aVE.original)) {
					elt = document.createElement('span');
					$(elt).addClass('plain');
					$(elt).html(text);
				} else {

					if (testVar(aVE.inline)) {
						elt = document.createElement('span');
						var c = Math.floor(Math.random() * 100) % 8;
						$(elt).addClass('style' + c);
						$(elt).html(text);
					} else {
						elt = document.createElement('div');
						$(elt).html(text);
						if (testVar(aVE.asciimod)) {
							$(elt).html(asciiart.block($(elt).text(), 10 * Math.floor(2 + Math.random() * 6)));
							$(elt).addClass('ascii');
							$(elt).css({
								"margin-left" : Math.floor(1 + 20 * Math.random()) + "%"
							});
						} else {
							var c = Math.floor(Math.random() * 100) % 8;
							$(elt).addClass('style' + c);
						}
					}
					if (testVar(aVE.sentenceswap)) {
						$(elt).addClass('logandrew');
					}
				}

				if (testVar(aVE.blockinsert)) {
					if (testVar(aVE.asciimod)) {
						$('#render').append("<p><center>" + asciiart.line[Math.floor(Math.random() * asciiart.line.length)] + "</center></p><br/>");
					} else {
						$('#render').append("<hr/>");
					}
				}

				$('#render').append(elt);
				if (testVar(aVE.magicsecret))
					$(elt).fadeOut(10000);
				dyn.updateTag();
				$('#render').scrollTop(65000);
			})
		}
	}
});

