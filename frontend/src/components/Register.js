import Header from "./Header";
import {Link, useNavigate} from "react-router-dom";
import React from "react";
import InformPopup from "./InformPopup";

const POPUP_MODE_OFF = 0;
const POPUP_MODE_SUCCESSFUL = 1;
const POPUP_MODE_FAILED = 2;

export default function Register(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [popupMode, setPopupMode] = React.useState(POPUP_MODE_OFF);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)
    props.onSubmit({email, password}, (result) => {
      setPopupMode(result ? POPUP_MODE_SUCCESSFUL : POPUP_MODE_FAILED)
      setIsLoading(false);
    })
  }

  const handleClosePopup = () => {
    if (popupMode === POPUP_MODE_SUCCESSFUL) {
      setPopupMode(POPUP_MODE_OFF)
      navigate('/')
    } else {
      setPopupMode(POPUP_MODE_OFF)
    }
  }

  return (
    <div className="page">
      <Header>
        <Link className="sign__link" to="/sign-in">Войти</Link>
      </Header>

      <div className="sign">
        <div className="sign__header">Регистрация</div>
        <form className="sign__form" onSubmit={onSubmit}>
          <input type="email"
                 className="sign__input"
                 required
                 name="email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
          />
          <input type="password"
                 className="sign__input"
                 required
                 name="password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
          />

          <div className="sign__bottom">
            <button className="sign__button" disabled={isLoading}>Зарегистрироваться</button>
          </div>
        </form>
        <div className="sign__hint">Уже зарегистрированы? <Link className="sign__link" to="/sign-in">Войти</Link></div>
      </div>

      <InformPopup icon={popupMode === POPUP_MODE_SUCCESSFUL ? 'circle-check' : 'circle-cross'}
                   isOpen={popupMode !== POPUP_MODE_OFF}
                   onClose={handleClosePopup}
      >
        {popupMode === POPUP_MODE_SUCCESSFUL && "Вы успешно зарегистрировались!"}
        {popupMode === POPUP_MODE_FAILED && "Что-то пошло не так! Попробуйте ещё раз."}
      </InformPopup>
    </div>
  );
}
