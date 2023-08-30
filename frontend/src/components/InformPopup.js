import React from 'react';
import closeIcon from '../images/close-icon.png'
import usePopupClose from "../hooks/usePopupClose";
import circleCheckIcon from '../images/circle-check.svg'
import circleCrossIcon from '../images/circle-cross.svg'

export default function InformPopup(props) {
  const [containerClassName, setContainerClassName] = React.useState(`popup inform-popup`)

  React.useEffect(() => {
    setContainerClassName(
      props.isOpen
        ? `popup inform-popup popup_opened`
        : `popup inform-popup`
    )

    if (props.isOpen) {
      document.body.style.overflow = 'hidden';
    }
  }, [props.isOpen])

  usePopupClose(props.isOpen, props.onClose)

  const handleClose = () => {
    document.body.style.overflow = null;
    props.onClose();
  }

  return (
    <div className={containerClassName}>
      <div className="popup__container">
        <button
          className="popup__icon-close"
          type="button"
          onClick={handleClose}
        >
          <img className="popup__icon-close-image"
               src={closeIcon}
               alt="Закрывание окна"
          />
        </button>
        <div className="inform-popup__container">
          <img src={props.icon === 'circle-check' ? circleCheckIcon : circleCrossIcon}
               alt="inform-icon"
               className="inform-popup__icon"
          />
          <div className="inform-popup__message">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}
