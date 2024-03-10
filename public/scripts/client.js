/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = (tweetData) => {
  const html = `
    <header class="tweets-container-header">
      <img class="tweeter-user-icon" src="${tweetData.user.avatars}">
      ${tweetData.user.name};
      <div class="tweeter-userName">${tweetData.user.handle}</div>
    </header>

    <section>
      <p class="tweet-textarea-container">${tweetData.content.text}</p>
    </section>

    <footer class="tweets-container-footer">
      <div class="footer-left">
        ${tweetData.created_at}
      </div>
      <div class="footer-right">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  `;

  return $(html)
};
