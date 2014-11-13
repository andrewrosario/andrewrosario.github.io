// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

// Rental Price Calculator
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
	// Makes sure all form imputs are filled out - Prints Quote
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

// Removes Default Values for Form Fields
$(document).on('focus', '.blur', function(){
	$(this).removeAttr('value');
});

// Replaces Default Values if Nothing is entered
$(document).on('blur', '.blur', function(){
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

// Travel Guide JSON
$(document).on( 'click', '.travelSection', function(event) {
    event.preventDefault();
    $('.travelSection').removeClass('active');
    $( this ).addClass('active');  
    var id = $(this).attr("id");
    getGuide(id);
  });

    function getGuide(activity) {
     $.getJSON('json/' + activity + '.json', function(json) {
       populateGuide(json);
     });
    }

    function populateGuide( json ) {
      html = '';
      for( var i = 0; i < json.length; i++ ){
        html += '<div class="activityGroup column small-12">';
        for( var j = 0; j < json[i].content.length; j++ ) {
			html += '<div class="activityItem small-12 column">';
			html += '<div class="activityName small-12 column"><h3>' + json[i].content[j].activityName + '</h3></div>';
			html += '<p class="activityDescription">' + json[i].content[j].activityDescription + '</p>';
			html += '</div>';
        }
        html += '</div>';
      }
      $('.activityContent').html(html);
    }



