/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {
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
  ]
  
  const renderTweets = function(tweets) {
    tweets.forEach(function(tweet) {
      let $html = createTweetElement(tweet);
      $('.tweets-container').prepend($html);
    })
  }
  
  const createTweetElement = function(tweet) {
    const html = `
      <article class="tweet-container">
        <header class="tweet-container-header">
          <img class="tweeter-user-icon" src="${tweet.user.avatars}">
          ${tweet.user.name};
          <div class="tweeter-userName">${tweet.user.handle}</div>
        </header>
  
        <section>
          <p class="tweet-textarea-container">${tweet.content.text}</p>
        </section>
  
        <footer class="tweet-container-footer">
          <div class="footer-left">
            ${tweet.created_at}
          </div>
          <div class="footer-right">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
    `;
  
    return $(html);
  };
  
  renderTweets(data);

  // Click (tweet) form submit handler.
  $("#tweet-form").on( "submit", function( event ) {
    alert( "Handler for `submit` called." );
    event.preventDefault();
  });
});
