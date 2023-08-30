import React from "react";
import PopupWithForm from "./PopupWithForm";

export default class AddPlacePopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      link: '',
    };

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeLink = this.onChangeLink.bind(this);
    this.handleAddPlaceSubmit = this.handleAddPlaceSubmit.bind(this);
  }

  onChangeName(event) {
    this.setState({
      name: event.target.value,
    });
  }

  onChangeLink(event) {
    this.setState({
      link: event.target.value,
    });
  }

  handleAddPlaceSubmit(e) {
    e.preventDefault();

    this.props.onAddPlace({
      name: this.state.name,
      link: this.state.link,
    });
  }

  render() {
    return (
      <PopupWithForm
        title="Новое место"
        name="card"
        buttonText={this.props.buttonText}
        isOpen={this.props.isOpen}
        onClose={this.props.onClose}
        onSubmit={this.handleAddPlaceSubmit}
      >
        <label className="popup__label">
          <input id="location-input"
                 type="text"
                 className="popup__item popup__item_el_location"
                 minLength="2"
                 maxLength="30"
                 required
                 placeholder="Название"
                 name="name"
                 value={this.state.description}
                 onChange={this.onChangeName}
          />
          <span className="location-input-error popup__error"></span>
        </label>
        <label className="popup__label">
          <input id="link-input"
                 type="url"
                 className="popup__item popup__item_el_link"
                 required
                 placeholder="Ссылка на картинку"
                 name="link"
                 value={this.state.description}
                 onChange={this.onChangeLink}
          />
          <span className="link-input-error popup__error"></span>
        </label>
      </PopupWithForm>
    );
  }
}
