var myDataRef = new Firebase('https://event-guest-list-jrl.firebaseio.com/');
		
$('document').ready(function(){
    $('#submitGuest').click(function(){				// if button is clicked
       		var name = $('#nameInput').val();
			var org = $('#orgInput').val();
			var contact = $('#contactInput').val();

			if(name.length && org.length && contact.length){
				var guestTemp = myDataRef.push();
				guestTemp.set({name: name , info:{org: org, contact: contact}});
			}	// if input is not empty

			$('#nameInput').val('');
			$('#orgInput').val('');
			$('#contactInput').val('');

			return false;	// will not refresh page
    })
    $('#contactInput').keypress(function(e){		// if enter is pressed
        if(e.keyCode == 13){
            $('#submitGuest').click();
        }
    });
});

myDataRef.on('child_added', function(snapshot) {
 	var guest = snapshot.val();
	snapshot.forEach(function(childValues) {
		guest_i = childValues.val();
		if(guest_i.org) displayGuests(guest.name, guest_i.org, guest_i.contact, snapshot.key());
	});
});

myDataRef.on('child_removed', function(snapshot) {
    $("#" + snapshot.key()).remove();	// the id of each guest is its key in firebase 
});

function displayGuests(name, org, contact, key) {
	var content = "<tr class='animated slideInDown addDelete' id='" + key + "'>"
					+ "<td class='name'>" + name + "</td>"
					+ "<td>" + org + "</td>"
					+ "<td>" + contact + "</td>"
					+ "<td><span class='trash'><i class='material-icons'>delete</i></span></td>"
				+ "</tr>"

	$(content).appendTo($("#guestList"));
};

$(document).on('click', '.trash', function() {
/*
*	Executes if delete icon is clicked.
*	Limitation: Deletes by name, so it will delete all guests with the same name as the only
*	one intended by the user.
*/

	var toDelete = $(this).closest("tr").children("td.name").text();
	myDataRef.orderByChild("name").equalTo(toDelete).on("child_added", function(snapshot) {	// find guest to remove
		snapshot.ref().remove();
	});
});