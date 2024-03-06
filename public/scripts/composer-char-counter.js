$(document).ready(function() {
  // --- our code goes here ---
  const existingCount = $('.counter').html();

  $('#tweet-text').on('input', function() {
    let tweet = this.value;
    let counter = $('.counter');
    let newCount = parseInt(existingCount) - tweet.length;

    if (newCount < 0) {
      counter.addClass('invalid');
    }

    counter.html(newCount);
  }) 

  
});