/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function */

$(document).ready(() => {

  const renderTweets = function(tweets) {
    tweets.forEach((tweet) => { // loops through tweets
      let $tweet = createTweetElement(tweet); // calls createTweetElement for each tweet
      $('#tweets-container').prepend($tweet); // takes return value and appends it to the tweets container
    });
  };

  const createTweetElement = function(tweet) {
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
          <p class="tweet-txt-container">${tweet.content.text}</p>
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
      alert(tweetCondition);
      return;
    } else {
      // Grab the data from the form
      const newTweetData = $tweetForm.serialize(); // create a url-encoded string for the POST request to send.

      //POST the form. AJAX POST request that sends the form data to the server.
      $.ajax({
        method: 'POST',
        url:'/tweets',
        data: newTweetData,
        success: (res) => {
          $('#tweet-text').val('');// clearing the form
          $('.counter').text(140);// reset to our default max number of text character
          // re-fetch all the tweet data
          loadTweets();
        },
        error: (error) => {
          alert("There's an error posting your tweet. ", error);
        }
      });
    }

  });

  //Helper Function: Validate the new tweet
  const validateTweet = function(tweetText) {
    if (tweetText.length === 0) {
      return "Your tweet is empty";
    }

    if (tweetText.length > 140) {
      return "Your tweet content is too long";
    }
  };

  // load the tweets
  const loadTweets = function() {
    
    // make a AJAX GET request to /tweets
    $.ajax({
      method: 'GET',
      url: '/tweets',
      success: (tweetData) => {
        $('#tweets-container').empty(); // Empty the tweets container before rendering all Tweets to avoid duplication.
        renderTweets(tweetData);
      },
      error: (error) => {
        alert("There's an error loading all tweets. ", error);
      }
    });
    
  };

  loadTweets();
});