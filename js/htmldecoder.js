define(["dyn"], function(dyn) {
	return {
		init : function() {
			var localDiv = $('<div id="rawtext">');
			var pos = 32;
			localDiv.load('/data/Text_test_Kawenga.txt');
			$('#testtxt').click(function() {
				$('#render').html(localDiv[0].innerHTML.slice(0, pos));
				pos += 32;
			});
			$('#updatetag').click(dyn.updateTag);
			$('#updatetext').click(function() {
				$('#render').html($('#txt')[0].innerHTML);
			});
		}
	}
});
