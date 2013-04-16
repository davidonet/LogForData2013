requirejs.config({
	paths : {
		swfobject : 'http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject',
		mustache : 'lib/mustache',
	}
});

require(["jquery"], function($) {
	$(function() {
		require(["audiohandling", "htmldecoder"], function(audiohandling, htmldecoder) {
			htmldecoder.init();
			$('#testtxt').click(function() {
				$('#render').append("<span class='searchimg' name='ear'/>");
				require(["dyn"], function(dyn) {
					dyn.updateTag();
				});
			});
		});
	});
});
