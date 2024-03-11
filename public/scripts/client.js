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
            ${timeago.format(tweet.created_at)}
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

    const $textArea = $('#tweet-textarea');
    const tweetText = $textArea.val();
    const error = validateTweet(tweetText);

    if (error) {
      alert(error)
    } else {
      $.post("/tweets", $(this).serialize()).done(() => {
        $textArea.val('')
        loadTweets();
      })
    }
  }); 

  const validateTweet = function(tweetText) {
    if (tweetText.length === 0) {
      return "Your tweet is empty";
    }

    if (tweetText.length > 140) {
      return "Your tweet content is too long";
    }
  }

  const loadTweets = () => {
   
    $.get('/tweets')
      .done((tweetData) => {
        $('#tweet-textarea').empty();
        renderTweets(tweetData)
      }
    )}

  loadTweets();

});