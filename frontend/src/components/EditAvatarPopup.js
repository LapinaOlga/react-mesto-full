import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props){
  const ref = React.useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onUpdateAvatar(ref.current.value);
  }

  // clearing the form
  React.useEffect(() => {
    ref.current.value = '';
  }, [props.isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="update"
      buttonText={props.buttonText}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input id="avatar-link-input"
               type="url"
               ref={ref}
               className="popup__item popup__item_el_link"
               required
               placeholder="Ссылка на картинку"
               name="link"
        />
        <span className="link-input-error popup__error"></span>
      </label>
    </PopupWithForm>
  );
}
