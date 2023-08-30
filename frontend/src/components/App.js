import React from 'react';
import api from '../utils/api';
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import Register from "./Register";
import Login from "./Login";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Desktop from "./Desktop";

const TOKEN_KEY = 'access_token';

export default function App() {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [isCheckingToken, setIsCheckingToken] = React.useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleCardDestroy = (cardId, callback) => {
    setIsSaving(true);

    api.deleteCard(cardId)
      .then(() => {
        setCards(cards.filter((card) => card._id !== cardId));
        callback();
      })
      .catch((error) => {
        console.log('Сервер вернул ошибку', error);
      })
      .finally(() => setIsSaving(false));
  };

  const handleCardLike = (cardId, isLiked) => {
    api.changeCardLike(cardId, isLiked)
      .then((response) => {
        setCards(cards.map((oldCard) => oldCard._id === cardId ? response.data : oldCard));
      })
      .catch((error) => {
        console.log('Сервер вернул ошибку', error);
      });
  }

  const handleUpdateUser = (user, callback) => {
    setIsSaving(true);
    api.updateUser(user)
      .then((response) => {
        setCurrentUser({...currentUser, ...response.data});
        callback();
      })
      .catch((error) => {
        console.log('Сервер вернул ошибку', error);
      })
      .finally(() => setIsSaving(false));
  }

  const handleUpdateAvatar = (url, callback) => {
    setIsSaving(true);
    api.updateUserAvatar(url)
      .then((response) => {
        setCurrentUser({...currentUser, ...response.data});
        callback();
      })
      .catch((error) => {
        console.log('Сервер вернул ошибку', error);
      })
      .finally(() => setIsSaving(false));
  }

  const handleAddPlaceSubmit = (card, callback) => {
    setIsSaving(true);
    api.createCard(card)
      .then((response) => {
        setCards([response.data, ...cards]);
        callback();
      })
      .catch((error) => {
        console.log('Сервер вернул ошибку', error);
      })
      .finally(() => setIsSaving(false));
  }

  const handleRegister = (data, callback) => {
    api.signUp(data.email, data.password)
      .then(() => {
        callback(true);
      })
      .catch((error) => {
        callback(false, error.message);
      });
  }

  const handleLogin = (data, callback) => {
    api.signIn(data.email, data.password)
      .then((res) => {
        localStorage.setItem(TOKEN_KEY, res.token);
        api.setToken(res.token);
        setLoggedIn(true);
        loadCurrentUserAndCards();
        callback(true);
      })
      .catch(() => {
        callback(false);
      });
  }

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY)
    setLoggedIn(false);
  }

  React.useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      setIsCheckingToken(true);
      api.setToken(token)
      loadCurrentUserAndCards()
    } else {
      setIsCheckingToken(false);
    }


  }, []);

  const loadCurrentUserAndCards = () => {
    api.getUser()
      .then((response) => {
        if (['/sign-up', '/sign-in'].includes(location.pathname)) {
          navigate('/')
        }

        setCurrentUser(response.data)
        setLoggedIn(true);

        api.getCardList()
          .then((response) => setCards(response.data))
          .catch((error) => {
            console.log('Сервер вернул ошибку', error);
          });
      })
      .catch((error) => {
        navigate('/sign-in');
      })
      .finally(() => {
        setIsCheckingToken(false);
      });
  }

  if (isCheckingToken || (loggedIn && !currentUser)) {
    return ''
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/sign-up" element={<Register onSubmit={handleRegister}/>}/>
        <Route path="/sign-in" element={<Login onSubmit={handleLogin}/>}/>
        <Route path="/" element={
          <ProtectedRoute loggedIn={loggedIn}>
            <Desktop
              isSaving={isSaving}
              cards={cards}
              onCardDestroy={handleCardDestroy}
              onCardLike={handleCardLike}
              onUpdateUser={handleUpdateUser}
              onUpdateUserAvatar={handleUpdateAvatar}
              onAddPlaceSubmit={handleAddPlaceSubmit}
              onLogout={handleLogout}
            />
          </ProtectedRoute>
        }>
        </Route>
      </Routes>
    </CurrentUserContext.Provider>
  );
}
