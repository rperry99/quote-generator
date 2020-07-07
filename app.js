const quoteContainer = document.getElementById('quote-container');
const authorText = document.getElementById('author');
const quoteText = document.getElementById('quote');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');

// Get Quote from API
async function getQuote() {
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl =
    'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    //If author is blank, add "unknown" to the author field
    if (data.quoteAuthor === '') {
      authorText.innerText = 'Unknown';
    } else {
      authorText.innerText = data.quoteAuthor;
    }

    //Reduce the font size of long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText;
  } catch (error) {
    getQuote();
  }
}

// Send the quote as a tweet
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
  console.log('tweet');
}

// Event Listeners
newQuoteButton.addEventListener('click', getQuote);
twitterButton.addEventListener('click', tweetQuote);

// On Load
getQuote();
