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

    //Cross-site scripting, preventing xss.
    const escape = function (strTweet) {
      let div = document.createElement("p");
      div.appendChild(document.createTextNode(strTweet));
      return div.innerHTML;
    };

    const safeHTML = `${escape(tweet.content.text)}`;

    const html = `
      <article class="tweet-container">
        <header class="tweet-container-header">
          <img class="tweeter-user-icon" src="${tweet.user.avatars}">
          ${tweet.user.name}
          <div class="tweeter-userName">${tweet.user.handle}</div>
        </header>
  
        <section>
          <p class="tweet-textarea-container"> ${safeHTML} </p>
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
 

  // Click (tweet) form submit handler. New-Tweet.
  $("#tweet-form").on("submit", function(event) {
    event.preventDefault();
    
    const $textArea = $('#tweet-textarea');
    const tweetText = $textArea.val().trim();
    const error = validateTweet(tweetText);
    
    if (error) {
      $('#tweet-validation-error').text(error);
      //show the error message then hide after.
      $('#tweet-validation-error').slideDown(3000, function() {
        $('#tweet-validation-error').hide( 7000 );
      });
    } else {
      $.post("/tweets", $(this).serialize()).done(() => {
        $textArea.val('');
        loadTweets();
      })
    }
  }); 

  const validateTweet = function(tweetText) {
    if (tweetText.length === 0) {
      return "Your tweet is empty";
    }
    if (tweetText.length > 140) {
      return "Your tweet content is too long. Character limit is 140.";
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
  $('#tweet-validation-error').hide() //to remain hidden until its called.
});