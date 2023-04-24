const proxyUrl = "https://crossorigin.me/";

const fetchUrl = (url) =>
    
  fetch((proxyUrl + url), {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  });

export default fetchUrl;