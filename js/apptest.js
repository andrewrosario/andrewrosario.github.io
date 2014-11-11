// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

// New Don't Repeat Yourself Rental Price Code

var rentalPrice = 0;
var weekDay = 1;
var weekEnd = 10;
var weeklyPrice = 100;
var cleaningFee = 125;
var tax = 1;
var extraGuestFee = 20;

var daysPrice = function(day) {
	console.log("Start daysPrice")
	console.log("Function Stay Length = " + findDays(numDays))
	for(i = firstDay; i <= firstDay + findDays(numDays) - 1; i++) {
		if(i === 0) {
			console.log("added sunday")
			rentalPrice += weekDay
		}
		else if(i % 6 === 0 || i % 5 === 0) {
			rentalPrice += weekEnd
			console.log("added weekend")
		}
		else {
			console.log("i = " + i)
			rentalPrice += weekDay
			console.log("added weekday")
		}
	}
}

var findDays = function(days) {
	return days%7
};

var findWeeks = function(days) {
	return Math.floor(days/7)
};

var firstDay;
var numDays;

function getQuote(form) {
	console.log("Start getQuote")
	// Remove Old Quotes
	$('.quoteWrapper').remove();
	// Find Rental Rate
	rentalPrice = 0;
	var fullDate = new Date(form.checkIn.value.substring(6,10), form.checkIn.value.substring(0,2)-1, form.checkIn.value.substring(3,5));
	firstDay = fullDate.getDay();
	var d1 = new Date (form.checkIn.value);
	var d2 = new Date (form.checkOut.value);
	numDays = (d2 - d1)/(60*24*60*1000);
	console.log("fullDate is " + fullDate);
	console.log("firstDay is " + firstDay);
	if (numDays >= 7) {
		rentalPrice += (findWeeks(numDays) * weeklyPrice)
		daysPrice(firstDay)
	}
	else {
		daysPrice(firstDay)
	}
	var extraGuests = form.numGuests.value;
	var fullPrice = (rentalPrice + cleaningFee + (extraGuests*extraGuestFee*numDays)) * tax
	console.log('rentalprice =  ' + rentalPrice)
	console.log('fullPrice =  ' + fullPrice)
	}


// Old Rental Quote Price


var rentalPrice = 0;
var weekDay = 250;
var weekEnd = 450;
var weeklyPrice = 2000;

function getQuote(form) {
	// Remove Old Quotes
	$('.quoteWrapper').remove();
	// Find Rental Rate
	rentalPrice = 0;
	var fullDate = new Date(form.checkIn.value.substring(6,10), form.checkIn.value.substring(0,2)-1, form.checkIn.value.substring(3,5));
	var firstDay = fullDate.getDay();
	var d1 = new Date (form.checkIn.value);
	var d2 = new Date (form.checkOut.value);
	var numDays = (d2 - d1)/(60*24*60*1000);
	for(i = firstDay; i <= numDays+firstDay-1; i++) {
		if(i === 0) {
			rentalPrice = rentalPrice + weekDay
		}
		else if(i % 6 === 0 || i % 5 === 0) {
			rentalPrice = rentalPrice+ weekEnd
		}
		else {
			rentalPrice = rentalPrice + weekDay
		}
		console.log("Rental Price is " + rentalPrice);
	}
	// Find Extra Guests
	var extraGuests = form.numGuests.value;
	// Find Full Price
	var fullPrice = rentalPrice + 125 + ((extraGuests)*20);