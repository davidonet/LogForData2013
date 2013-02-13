define(["dyn"], function(dyn) {
	return {
		init : function() {
			var localDiv = $('<div id="rawtext">');
			var pos = 0;
			localDiv.load('/data/Text_test_Kawenga.txt');
			$('#testtxt').click(function() {
				$('#render').html(localDiv[0].innerHTML.slice(pos, pos + 80));
				pos += 80;
			});
			$('#updatetag').click(dyn.updateTag);

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
					$(elt).addClass('c' + c);
				} else {
					$('#render').append("<hr/>");
				}
				$(elt).html(text);
				$('#render').append(elt);
				dyn.updateTag();
				$('#render').scrollTop(65000);
			})

			$('#updatetext').click(function() {
				var changeChance = .5;
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
					$(elt).addClass('c' + c);
				}
				$(elt).html($('#txt').text());
				$('#render').append(elt);
				$('#txt').empty();
			});
		}
	}
});
