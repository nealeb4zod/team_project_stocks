const baseURL = 'http://localhost:3000/api/stocks/';

export default {
  getUsers() {
    return fetch(baseURL).then((res) => res.json());
  },
  getUserStocks(userName) {
    return fetch(baseURL + userName).then((res) => res.json());
  },
  postStock(userName, stockItem) {
    return fetch(baseURL + userName, {
      method: 'PUT',
      body: JSON.stringify(stockItem),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
  },
};
