requirejs.config({
	paths : {
		swfobject : 'http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject',
		mustache : 'lib/mustache',
		bufferloader : 'lib/BufferLoader'
	}
});
var source = [];

require(["jquery"], function($) {

	$(function() {
		require(["audiohandling", "htmldecoder", "localinfo", "soundplayer"], function(audiohandling, htmldecoder, localinfo) {
			htmldecoder.init();
			//localinfo.init();
		});
	});
});
