// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

// Show/Hide Calendar
$(document).on('click', '#checkAvail', function() {
	$('#checkAvail').toggleClass('.hidden');
});

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



