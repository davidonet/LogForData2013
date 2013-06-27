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
		function updateClock() {
			// Gets the current time
			var now = new Date();

			// Get the hours, minutes and seconds from the current time
			var hours = now.getHours();
			var minutes = now.getMinutes();
			
			// Format hours, minutes and seconds
			if (hours < 10) {
				hours = "0" + hours;
			}
			if (minutes < 10) {
				minutes = "0" + minutes;
			}
			

			// Gets the element we want to inject the clock into
			var elem = document.getElementById('clock');

			// Sets the elements inner HTML value to our clock data
			elem.innerHTML = hours + ':' + minutes;
		}

		setInterval(updateClock, 1000);
		
		require(["audiohandling", "htmldecoder", "localinfo", "soundplayer"], function(audiohandling, htmldecoder, localinfo) {
			aVE = htmldecoder.init();
			//localinfo.init();
		});
	});
});
