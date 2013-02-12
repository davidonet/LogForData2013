requirejs.config({
	paths : {
		swfobject : 'http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject'
	}
});

require(["jquery"], function($) {
	$(function() {
		require(["audiohandling","htmldecoder"], function(audiohandling,htmldecoder) {
			htmldecoder.init();
		});
	});
});
