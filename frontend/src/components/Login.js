import Header from "./Header";
import {Link, useNavigate} from "react-router-dom";
import React from "react";
import InformPopup from "./InformPopup";

export default function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isShowErrorPopup, setIsShowErrorPopup] = React.useState(false);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)
    props.onSubmit({email, password}, (result) => {
      setIsLoading(false);
      if (result) {
        navigate('/')
      } else {
        setIsShowErrorPopup(true);
      }
    })
  }

  const handleClosePopup = () => {
    setIsShowErrorPopup(false);
  }

  return (
    <div className="page">
      <Header>
        <Link className="sign__link" to="/sign-up">Регистрация</Link>
      </Header>

      <div className="sign">
        <div className="sign__header">Вход</div>
        <form className="sign__form" onSubmit={onSubmit}>
          <input type="email"
                 className="sign__input"
                 required
                 name="email"
                 placeholder="Email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
          />
          <input type="password"
                 className="sign__input"
                 required
                 name="password"
                 placeholder="Пароль"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
          />

          <div className="sign__bottom">
            <button className="sign__button" disabled={isLoading}>Войти</button>
          </div>
        </form>
      </div>

      <InformPopup icon="circle-cross"
                   isOpen={isShowErrorPopup}
                   onClose={handleClosePopup}
      >
        Что-то пошло не так! Попробуйте ещё раз.
      </InformPopup>
    </div>
  );
}
