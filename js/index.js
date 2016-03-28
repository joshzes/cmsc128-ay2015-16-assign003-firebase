var myDataRef = new Firebase('https://luminous-inferno-6698.firebaseio.com/');
				
	$('#contactInput').keypress(function (e) {
		if (e.keyCode == 13) {
					
			var name = $('#nameInput').val();
			var org = $('#orgInput').val();
			var contact = $('#contactInput').val();
			myDataRef.push({name: name, org: org, contact: contact});
						
			$('#nameInput').val('');
			$('#orgInput').val('');
			$('#contactInput').val('');
		}
	});
			
	myDataRef.on('child_added', function(snapshot) {
				
	var message = snapshot.val();
	displayChatMessage(message.name, message.org, message.contact);
});

function displayChatMessage(name, org, contact) {
	var content = "<tr class='animated slideInDown'>"
					+ "<td>" + name + "</td>"
					+ "<td>" + org + "</td>"
					+ "<td>" + contact + "</td>"
				+ "</tr>"

	$(content).appendTo($("#guestList"));
};