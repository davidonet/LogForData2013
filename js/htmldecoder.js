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
			gui.add(aVE, 'asciimod', 0, 100);
			gui.add(aVE, 'wordmod', 0, 100);
			gui.add(aVE, 'wordrange', 1, 10);
			gui.add(aVE, 'clean');
			
			
			$('#render').on('receive', function(event, text) {
				var changeChance = .8;
				var changeBigChance = .5;
				var alea = Math.random();
				var elt;
				if (alea < changeBigChance)
					elt = document.createElement('div');
				else
					elt = document.createElement('span');
				alea = Math.random();
				if (alea < changeChance) {
					var c = Math.floor(Math.random() * 100) % 8;
					$(elt).addClass('style' + c);
				} else {
					$('#render').append("<hr/>");
				}
				$(elt).html(text);
				$('#render').append(elt);
				dyn.updateTag();
				$('#render').scrollTop(65000);
			})
		}
	}
});
