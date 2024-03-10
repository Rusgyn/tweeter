/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {
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
  
  // Click (tweet) form submit handler.
  $("#tweet-form").on("submit", function(event) {
    event.preventDefault();
    let $data = ($(this).serialize());
    $.post("/tweets", $data).done(() => {
      $('#tweet-textarea').val('')
      loadTweets();
    })
  }); 

  const loadTweets = () => {
    $.get('/tweets')
      .done((tweetData) => renderTweets(tweetData))
  }

  loadTweets();
  
});