import React from "react";
import closeIcon from '../images/close-icon.png'
import usePopupClose from "../hooks/usePopupClose";

export default function ImagePopup(props) {
  const [containerClassName, setContainerClassName] = React.useState('popup image-popup');

  React.useEffect(() => {
    setContainerClassName(
      props.card
        ? 'popup image-popup popup_opened'
        : 'popup image-popup'
    )
  }, [props.card])

  usePopupClose(props.isOpen, props.onClose)

  return (
    <div className={containerClassName}>
      <div className="popup__container-image">
        <button className="popup__icon-close"
                type="button"
                onClick={props.onClose}
        >
          <img className="popup__icon-close-image" src={closeIcon} alt="Закрывание окна"/>
        </button>
        <img className="popup__image" src={props.card?.link} alt={props.card?.name}/>
        <p className="popup__description">{props.card?.name}</p>
      </div>
    </div>
  );
}
