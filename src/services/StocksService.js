const baseURL = 'http://localhost:3000/api/stocks/';

export default {
  getUsers() {},
  getUserStocks(userName) {
    return fetch(baseURL + userName).then((res) => res.json());
  },
  postStock(payload) {
    return fetch(baseURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json());
  },
};
