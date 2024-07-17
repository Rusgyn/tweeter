/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

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
          ${tweet.created_at}
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
  
  renderTweets(data);

  // Grab the tweet form
  const $tweetForm = $('#new-tweet-form');

  // Listen for the submit event of the form
  $tweetForm.on('submit', (event) => {
    //prevent the default behaviour of the browser
    event.preventDefault();
    alert("The Form has submitted!"); // end-user info/alert for reference
    
    // Grab the data from the form
    const newData = $tweetForm.serialize(); // create a url-encoded string for the POST request to send. serialize() method creates a text string. Returns string.

    //POST the form. AJAX POST request that sends the form data to the server.
    $.ajax({
      method: 'POST',
      url:'/tweets',
      data: newData,
      success: (res) => {
        console.log("THE RESPONSE: ", res);
      }
    });
  });


});