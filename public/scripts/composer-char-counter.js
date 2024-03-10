$(document).ready(function() {
  const maxCount = $('.counter').html();

  $('#tweet-textarea').on('input', function() {
    let tweet = this.value;
    let counter = $('.counter');
    let count = parseInt(maxCount) - tweet.length;

    if (count < 0) {
      counter.addClass('invalid');
    } else {
      counter.removeClass('invalid');
    }

    counter.html(count);
  })

});