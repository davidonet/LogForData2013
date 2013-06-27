requirejs.config({
	paths : {
		swfobject : 'http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject',
		mustache : 'lib/mustache',
		bufferloader : 'lib/BufferLoader'
	}
});
var source = [];
var aVE;
require(["jquery"], function($) {

	$(function() {
		require(["audiohandling", "htmldecoder", "localinfo", "soundplayer"], function(audiohandling, htmldecoder, localinfo) {
			aVE = htmldecoder.init();
			//localinfo.init();
		});
	});
});
