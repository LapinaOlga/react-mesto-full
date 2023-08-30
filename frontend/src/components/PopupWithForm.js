import React from 'react';
import closeIcon from '../images/close-icon.png'
import usePopupClose from "../hooks/usePopupClose";

export default function PopupWithForm(props) {
  const [containerClassName, setContainerClassName] = React.useState(`popup ${props.name}-popup`)

  React.useEffect(() => {
    setContainerClassName(
      props.isOpen
        ? `popup ${props.name}-popup popup_opened`
        : `popup ${props.name}-popup`
    )
  }, [props.isOpen])

  usePopupClose(props.isOpen, props.onClose)

  return (
    <div className={containerClassName}>
      <div className="popup__container">
        <button
          className="popup__icon-close"
          type="button"
          onClick={props.onClose}
        >
          <img className="popup__icon-close-image"
               src={closeIcon}
               alt="Закрывание окна"
          />
        </button>
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form"
              name={`${props.name}Form`}
              onSubmit={props.onSubmit}
        >
          <div className="popup__area">
            {props.children}
          </div>
          <button className="popup__button" type="submit">
            {props.buttonText ?? 'Сохранить'}
          </button>
        </form>
      </div>
    </div>
  );
}
