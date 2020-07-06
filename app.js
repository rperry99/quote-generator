// Get Quote from API
async function getQuote() {
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl =
    'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    document.getElementById('author').innerHTML = data.quoteAuthor;
    document.getElementById('quote').innerHTML = data.quoteText;
    console.log(data);
  } catch (error) {
    getQuote();
    console.log('Whoops, no quote', error);
  }
}

// On Load
getQuote();
