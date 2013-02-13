define(['swfobject', 'decoder'], function() {
	var data = "";
	var txt = $("#txt");
	var ui = $("#ui");
	var signals = ["mono", "left", "right"];

	Decoder.start("swf/decoder.swf", function(d) {
		d.onInputs = function(inputs) {
			ui.html("");
			var table = $("<table class='table'></table>");
			for ( i = 0; i < inputs.length; i++) {
				var input = inputs[i];
				var inputUi = $("<tr><td class='input-name'>" + input + "</td><td><div class='input-buttons btn-group'></div></td></tr>");
				var inputButtons = inputUi.find(".input-buttons");

				for ( j = 0; j < signals.length; j++) {
					var signal = signals[j];
					var btn = $("<a class='btn btn-mini input-button' data-input='" + i + "' data-signal='" + signal + "' href='#'>" + signal + "</a>");
					btn.click(function() {
						$(".input-button").removeClass("disabled");
						$(this).addClass("disabled");
						var inp = $(this).data('input');
						var sign = $(this).data('signal');
						d.attachInput(inp, sign);
					});
					inputButtons.append(btn);
				}

				table.append(inputUi);
			}
			ui.append(table);
		};
		d.onData = function(s) {
			data += s;
			var sp = data.indexOf(".");
			if (0 < sp) {
				var txt = data.slice(0, sp + 1);
				data = data.slice(sp+1);
				$('#render').trigger('receive', txt);
				while (data[0] == ".") {
					data = data.slice(2);
				}
			}
			$('#txt').text(data);
		};
	});
});
