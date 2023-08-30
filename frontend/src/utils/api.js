class Api {
  constructor(settings) {
    this.settings = settings
  }

  getUser() {
    return this._get(`/users/me`, {
      headers: {
        Authorization: this._getToken(),
      },
    });
  }

  updateUser(user) {
    return this._patch('/users/me', {
      body: JSON.stringify(user),
      headers: {
        Authorization: this._getToken(),
      },
    });
  }

  updateUserAvatar(avatar) {
    return this._patch('/users/me/avatar', {
      body: JSON.stringify({avatar}),
      headers: {
        Authorization: this._getToken(),
      },
    })
  }

  getCardList() {
    return this._get('/cards', {
      headers: {
        Authorization: this._getToken(),
      },
    })
  }

  createCard(card) {
    return this._post('/cards', {
      body: JSON.stringify(card),
      headers: {
        Authorization: this._getToken(),
      },
    })
  }

  /**
   *
   * @param {string} cardId
   * @param {Boolean} adding
   * @returns {Promise<Response>}
   */
  changeCardLike(cardId, adding) {
    if (adding) {
      return this._put(`/cards/${cardId}/likes`, {
        headers: {
          Authorization: this._getToken(),
        },
      })
    } else {
      return this._delete(`/cards/${cardId}/likes`, {
        headers: {
          Authorization: this._getToken(),
        },
      })
    }
  }

  deleteCard(id) {
    return this._delete(`/cards/${id}`, {
      headers: {
        Authorization: this._getToken(),
      },
    })
  }

  signUp(email, password) {
    return this._post(`/signup`, {
      body: JSON.stringify({email, password})
    });
  }

  signIn(email, password) {
    return this._post(`/signin`, {
      body: JSON.stringify({email, password})
    });
  }

  setToken(payload) {
    this._token = payload;

    return this;
  }

  hasToken() {
    return typeof this._token === 'string' && this._token.length > 0
  }

  _get(url, options = {}) {
    return this._request('GET', url, options);
  }

  _post(url, options = {}) {
    return this._request('POST', url, options);
  }

  _put(url, options = {}) {
    return this._request('PUT', url, options);
  }

  _patch(url, options = {}) {
    return this._request('PATCH', url, options);
  }

  _delete(url, options = {}) {
    return this._request('DELETE', url, options);
  }

  _request(method, url, options) {
    if (!url.match(/^https?/)) {
      url = `${this.settings.baseUrl}${url}`
    }

    return fetch(url, {
      method,
      ...options,
      headers: {...this.settings.headers, ...(options.headers || {})},
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${response.status}`);
    });
  }

  _getToken() {
    return this._token ? `Bearer ${this._token}` : null;
  }
}

export default new Api({
  baseUrl: process.env.REACT_APP_API_URL,
  headers: {
    // Authorization: '03bede17-6085-4ace-b801-04f52b01265d',
    'Content-Type': 'application/json',
  },
});
