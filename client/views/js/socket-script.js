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
			displayContent(msg);
		});
	  });

	  function displayContent(data) {
		$("#content").html("");
		
		var table = "<table id='table' style='width:80vw'>";
	
		table += "<thead><tr>";
	
		for(let j = 0; j < Object.keys(data[0]).length; j++) {
			table += "<th>" + Object.keys(data[0])[j] + "</th>";
		}
	
		table += "</tr></thead>";
	
		table += "<tbody>"
	
		for(let i = 0; i < data.length; i++) {
			table += "<tr>";
			for(let j = 0; j < Object.keys(data[i]).length; j++) {
				table += "<td>" + data[i][Object.keys(data[i])[j]] + "</td>";
			}
			table += "</tr>";
		}
	
		table += "</tbody>"
	
		table += "</table>"
	
		$("#content").html(table);
		$("#table").DataTable();
	}