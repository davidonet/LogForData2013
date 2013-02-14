define(["dyn", "lib/dat.gui.min"], function(dyn, GUI) {
	return {
		init : function() {
			var VisualEngine = function() {
				this.original = 50;
				this.inline = 50;
				this.asciimod = 30;
				this.wordmod = 20;
				this.wordrange = 3;
				this.blockinsert = 10;
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
		//	gui.add(aVE, 'asciimod', 0, 100);
		//	gui.add(aVE, 'wordmod', 0, 100);
		//	gui.add(aVE, 'wordrange', 1, 10);
			gui.add(aVE, 'clean');

			function testVar(thresold) {
				return ((100 * Math.random()) < thresold);
			}


			$('#render').on('receive', function(event, text) {
				var elt;
				if (testVar(aVE.original)) {
					elt = document.createElement('span');
					$(elt).addClass('plain');
					console.log('Original');
				} else {
					if (testVar(aVE.inline)) {

						elt = document.createElement('span');
						console.log('Inline');
					} else {
						elt = document.createElement('div');
						console.log('Block');
					}
					var c = Math.floor(Math.random() * 100) % 8;
					$(elt).addClass('style' + c);
				}
				if (testVar(aVE.blockinsert)) {
					$('#render').append("<hr/>");
					console.log('Insert');
				}
				$(elt).html(text);
				$('#render').append(elt);
				dyn.updateTag();
				$('#render').scrollTop(65000);
			})
		}
	}
});
