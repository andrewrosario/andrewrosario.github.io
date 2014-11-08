// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

// Show/Hide Calendar
$(document).on('click', '#checkAvail', function() {
	$('#checkAvail').toggleClass('.hidden');
})


var rentalPrice = 0
// var extraGuests = this.form.numGuests.value

// function firstDay (form) {
// var fullDate = new Date(form.checkIn.value);
// console.log(fullDate);
// var d = fullDate.getDay();
// return(d);
// }

// function numDays(form) {
// 	var d1 = new Date (form.checkIn.value);
// 	var d2 = new Date (form.checkOut.value);
// 	return((d2 - d1)/(60*24*60*1000));
// }

function getQuote(form) {
	// Remove Old Quotes
	$('.quoteWrapper').remove();
	// Find Rental Rate
	rentalPrice = 0;
	var fullDate = new Date(form.checkIn.value.substring(6,10), form.checkIn.value.substring(0,2)-1, form.checkIn.value.substring(3,5));
	// console.log(form.checkIn.value.substring(3,5));
	// console.log(form.checkIn.value.substring(5,7));
	// console.log(form.checkIn.value.substring(8,10));
	// console.log(form.checkIn.value);
	// console.log(fullDate);
	var firstDay = fullDate.getDay();
	// console.log("Day of the week is " + firstDay);
	var d1 = new Date (form.checkIn.value);
	var d2 = new Date (form.checkOut.value);
	var numDays = (d2 - d1)/(60*24*60*1000);
	// console.log("The stay is " + numDays + " nights");
	// console.log("stayLength is" + stayLength);
	// console.log(firstDay);
	// console.log(typeof(firstDay));
	for(i = firstDay; i <= numDays+firstDay-1; i++) {
		if(i === 0) {
			rentalPrice = rentalPrice +1
		}
		else if(i % 6 === 0 || i % 5 === 0) {
			rentalPrice = rentalPrice + 10
			// console.log(rentalPrice)
		}
		else {
			rentalPrice = rentalPrice +1
			// console.log(rentalPrice)
		}
		console.log("Rental Price is " + rentalPrice);
	}
	// Find Extra Guests
	var extraGuests = form.numGuests.value;
	// console.log(extraGuests);
	// console.log(form.checkIn.value);
	// console.log(form.checkOut.value);
	var fullPrice = rentalPrice + 125 + ((extraGuests)*20);
	// console.log("The full price is $" + fullPrice.toFixed(2));
	
	if(form.firstName.value === "First Name" || form.lastName.value === "Last Name" || form.email.value === "email address")
	{
		$('.button').before('<div class="quoteWrapper small-12 large-12 column"><h3>Please provide your full name and email address</h3></div>').slideDown()
	}
	else if (form.checkIn.value === "mm/dd/yyyy" || form.checkOut.value === "mm/dd/yyyy"){
		$('.button').before('<div class="quoteWrapper small-12 large-12 column"><h3>Please provide an arrival and departure date.</h3></div>')
	}
	else if (numDays < 0) {
		$('.button').before('<div class="quoteWrapper small-12 large-12 column"><h3>Make sure your arrival date is before your departure date.</h3></div>')
	}
	else {
		$('.button').before('<div class="quoteWrapper small-12 large-12 column"><h3>Your request has been sent. <br> The estimated price is $' + fullPrice.toFixed(2) + '</h3></div>')
		$('#quoteForm').submit()
	}
};

$(document).on('focus', '.blur', function(){
	console.log("click");
	$(this).removeAttr('value');
});

$(document).on('blur', '.blur', function(){
	// console.log("blug");
	// console.log(this.name);
	if(this.value === "") {
		if(this.name === "firstName") {
			$(this).attr('value', 'First Name')
		}
		else if(this.name === 'lastName') {
			$(this).attr('value', 'Last Name')
		}
		else if(this.name === 'email') {
			$(this).attr('value', 'email address')
		}
		else if(this.name === 'checkIn' || this.name === 'checkOut') {
			$(this).attr('value', 'mm/dd/yyyy')
		}
		else {
			$(this).attr('value', 'Get a Quote')
		};

	};

});

