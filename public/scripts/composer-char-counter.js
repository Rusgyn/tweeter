$(document).ready(function() { //runs a callback when the DOM is ready to be manipulated with jQuery.
  const maxCount = $('.counter').html(); // => 140

  $('#tweet-text').on('input', function() {
    let counter = $(this).closest('form').find('.counter');// Use traverse to target the counter from 'this' (the textarea)
    let tweet = this.value;// The character/s you press
    let count = maxCount - tweet.length;

    if (count < 0) {
      counter.addClass('invalid');//New CSS .invalid to modify the counter color
    } else {
      counter.removeClass('invalid');//use the original counter color (black)
    }

    counter.html(count); //Updates the counter.
  });
  
});