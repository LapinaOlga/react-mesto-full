import PopupWithForm from "./PopupWithForm";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default class EditProfilePopup extends React.Component {
  static contextType = CurrentUserContext;

  constructor(props, context) {
    super(props, context);

    this.state = {
      name: this.context.name,
      description: this.context.about,
    };

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChangeName(event){
    this.setState({
      name: event.target.value,
    });
  }

  onChangeDescription(event){
    this.setState({
      description: event.target.value,
    });
  }

  handleSubmit(e){
    e.preventDefault();

    this.props.onUpdateUser({
      name: this.state.name,
      about: this.state.description,
    });
  }

  render() {
    return (
      <PopupWithForm title="Редактировать профиль"
                     name="profile"
                     buttonText={this.props.buttonText}
                     isOpen={this.props.isOpen}
                     onClose={this.props.onClose}
                     onSubmit={this.handleSubmit}
      >
        <label className="popup__label">
          <input id="name-input"
                 type="text"
                 className="popup__item popup__item_el_name"
                 minLength="2"
                 maxLength="40"
                 required
                 name="name"
                 value={this.state.name}
                 onChange={this.onChangeName}
          />
          <span className="name-input-error popup__error"></span>
        </label>
        <label className="popup__label">
          <input id="profession-input"
                 type="text"
                 className="popup__item popup__item_el_profession"
                 minLength="2"
                 maxLength="200"
                 required
                 name="about"
                 value={this.state.description}
                 onChange={this.onChangeDescription}
          />
          <span className="profession-input-error popup__error"></span>
        </label>
      </PopupWithForm>
    );
  }
}
