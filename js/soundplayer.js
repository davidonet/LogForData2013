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
			source[i].connect(context.destination);

		}
	}
});
 