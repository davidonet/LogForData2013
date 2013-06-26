define(['bufferloader'], function(bufferloader) {

	var context;
	var bufferLoader;

	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	context = new AudioContext();
	var files = [];
	for (var i = 1; i < 9; i++)
		files.push('/sound/S' + i + '.mp3');
	bufferLoader = new BufferLoader(context, files, finishedLoading);
	bufferLoader.load();

	function finishedLoading(bufferList) {
		// Create two sources and play them both together.

		for (var i = 0; i < 8; i++) {
			source[i] = context.createBufferSource();
			source[i].buffer = bufferList[i];

		}
		/*
		source[7].playbackRate.value = .1;
		source[7].loop = true;
		source[7].start(0);
		source[7].connect(context.destination);
		speak("test", {
			pitch : 20,
			speed : 150
		});
		*/
	}

});
