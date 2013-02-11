// wait for the DOM to be loaded

var decoderWin = window.open('decoder.html', 'decoder', 'width=320,height=240,toolbar=no,location=0,directories=no,status=no,menubar=no');
var consoleWin = window.open('console.html', 'console', 'width=320,height=240,toolbar=no,location=no,directories=no,status=no,menubar=no,top=512');


$(document).ready(function() {

	$('.insert').click(function(elt) {
		$('#myText').val($('#myText').val() + $(this).attr('name'));
		$('#myText').focus();
	});
	$('#myText').val("");

	$('#insimg').click(function(elt) {
		$("#dialog-form").dialog("open");
	});
	$("#dialog-form").dialog({
		autoOpen : false,
		height : 80,
		modal : true,
		buttons : {
			"Insert" : function() {
				$('#myText').val($('#myText').val() + '<span class="searchimg" name="' + $('#name').val() + '"/>');
				$(this).dialog("close");
			},
			Cancel : function() {
				$(this).dialog("close");
			}
		}
	});
	$('#dialog-form').keyup(function(e) {
		if(e.which == 13) {
			return false;
		}
	});
	$('#imgsrch').submit(function() {
		return false;
	});
	$('#preview').click(function(elt) {
		$(decoderWin.document).find('#decode').append($('#myText').val());
		decoderWin.updateTag();
		log("Generating preview");
	});
	$('#clear').click(function(elt) {
		$(decoderWin.document).find('#decode').html('');
	});
	$('#myForm').ajaxForm(function() {
		log("Sending data");
		return false;
	});

});
