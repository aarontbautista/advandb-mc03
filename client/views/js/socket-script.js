var socket = io();

$('form').submit(function(e){
	if($("#m").val() != "") {
		e.preventDefault();
		socket.emit('chat message', $("#m").val());
		$("#m").val("");
	}

	return false;
});

$(function () {
		var socket = io();
		$('#read').click(function(e){
            socket.emit('action', "read");

			return false;
        });
        
		$('#update').click(function(e){
            socket.emit('action', "update");

			return false;
		});
        
		$('#centralNode').click(function(e){
            socket.emit('action', "centralNode");
            $('#centralNode').val() = true;

			return false;
		});
        
		$('#palawanNode').click(function(e){
            socket.emit('action', "palawanNode");
            $('#palawanNode').val() = true;

			return false;
		});
        
		$('#marinduqueNode').click(function(e){
            socket.emit('action', "marinduqueNode");
            $('#marinduqueNode').val() = true;

			return false;
		});

		socket.on('action', function(msg){
			$('BODY').append($('<li>').text(msg));
		});
	  });