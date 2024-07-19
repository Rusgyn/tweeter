/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function */


$(document).ready(() => {

  // Nav bar. New Tweet Form will show/hide when "Write a New Tweet" is called/clicked.
  $('.write-new-tweet').on('click', () => {
    if ($('#new-tweet-form').is(':hidden')) {
      $('#new-tweet-form').slideDown("slow");
      $('#tweet-text').focus(); //automatically place the cursor in the text area when the form slides down, improving the user experience.
    } else {
      $('#new-tweet-form').slideUp("slow");
    }
  });

  const renderTweets = function(tweets) {
    tweets.forEach((tweet) => { // loops through tweets
      let $tweet = createTweetElement(tweet); // calls createTweetElement for each tweet
      $('#tweets-container').prepend($tweet); // takes return value and appends it to the tweets container
    });
  };

  const createTweetElement = function(tweet) {

    //Function that prevents Cross-Site Scripting (XSS) attach with Escaping. Converting insecure text into a safe "encoded" representation.
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const safeHTML = `<p>${escape(tweet.content.text)}</p>`;

    let $tweet = $(`
      <article>
        <header>
          <div class="tweet-uname-avatar">
            <img src="${tweet.user.avatars}"> &nbsp &nbsp
            ${tweet.user.name} 
          </div>
          <div>
            ${tweet.user.handle}
          </div>
        </header>
  
        <section>
          <p class="tweet-txt-container">${safeHTML}</p>
        </section>
    
        <footer>
          <div>
          ${timeago.format(tweet.created_at)}
          </div>
          <div>
            <i class="fa-solid fa-flag"></i>&nbsp;
            <i class="fa-solid fa-retweet"></i>&nbsp;
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>`);

    return $tweet;
  };
  
  // Grab the tweet form
  const $tweetForm = $('#new-tweet-form');

  // Listen for the submit event of the form
  $tweetForm.on('submit', (event) => {
    //prevent the default behaviour of the browser
    event.preventDefault();
    
    const $textArea = $('#tweet-text');
    const tweetText = ($textArea.val()).trim(); //remove any leading or trailing white spaces
    const tweetCondition = validateTweet(tweetText);

    if (tweetCondition) {
      $('#validation-error').text(tweetCondition);
      //Displaying the error with effects and warning icons.
      $('#validation-error').prepend('<i class="fa-solid fa-triangle-exclamation"></i> ').append(' <i class="fa-solid fa-triangle-exclamation"></i>').slideDown( 2000 , function () {
        $('#validation-error').delay(2000).hide(2000);
      });

      return;
    } else {
      //Case: Validation is successful, no error.
      $('#validation-error').hide(); //Keep the section hidden.

      // Grab the data from the form
      const newTweetData = $tweetForm.serialize(); // create a url-encoded string for the POST request to send.

      //POST the form. AJAX POST request that sends the form data to the server.
      $.ajax({
        method: 'POST',
        url:'/tweets',
        data: newTweetData,
        success: (res) => {
          // re-fetch all the tweet data
          loadTweets();
        },
        error: () => {
          $('#validation-error').show();
          $('#validation-error').text('Internal Server Error. Failed to save tweet');
          //Displaying the error with effects and warning icons.
          $('#validation-error').prepend('<i class="fa-solid fa-triangle-exclamation"></i> ').append(' <i class="fa-solid fa-triangle-exclamation"></i>').slideDown( 2000 , function () {
            $('#validation-error').delay(2000).hide(2000);
          });
        }
      });

      $('#tweet-text').val('');// clearing the form
      $('.counter').text(140)// reset to our default max number of text character
      $('#new-tweet-form').hide("slow"); // Hide the form, until its called
    }

  });

  //Helper Function: Validate the new tweet
  const validateTweet = function(tweetText) {
    if (tweetText.length === 0) {
      return "Your tweet is empty";
    }

    if (tweetText.length > 140) {
      return "Your tweet is too long, limit to 140 characters only";
    }
  };

  // load the tweets
  const loadTweets = function() {
    
    // make AJAX GET request to /tweets
    $.ajax({
      method: 'GET',
      url: '/tweets',
      success: (tweetData) => {
        $('#tweets-container').empty(); // Empty the tweets container before rendering all Tweets to avoid duplication.
        renderTweets(tweetData);
      },
      error: () => {
        $('#validation-error').show();
        $('#validation-error').text('Internal Server Error. Failed to load tweets');
        //Displaying the error with effects and warning icons.
        $('#validation-error').prepend('<i class="fa-solid fa-triangle-exclamation"></i> ').append(' <i class="fa-solid fa-triangle-exclamation"></i>').slideDown( 2000 , function () {
          $('#validation-error').delay(2000).hide(2000);
        });
      }
    });
    
  };

  loadTweets();

  $('#validation-error').hide(); //to remain hidden until its called.
  $('#new-tweet-form').hide(); //to remain the form hidden until its called.
});