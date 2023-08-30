import React from "react";
import vectorPencil from '../images/vector-pencil.svg'
import vectorCross from '../images/vector-cross.svg'
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default class Main extends React.Component {
  static contextType = CurrentUserContext;

  get cardElements() {
    return this.props.cards.map(
      (card) => (
        <Card
          card={card}
          key={card._id}
          onCardClick={this.props.handleCardClick}
          onCardLike={this.props.handleCardLike}
          onCardDelete={this.props.handleCardDelete}
        />
      )
    );
  }

  render() {
    return (
      <main className="main">
        <section className="profile">
          <button className="profile__avatar-button"
                  onClick={this.props.onEditAvatar}
          >
            <img className="profile__avatar"
                 src={this.context.avatar}
                 alt="Аватар"
            />
          </button>
          <div className="profile__info">
            <div className="profile__area">
              <h1 className="profile__title">{this.context.name}</h1>
              <button className="profile__edit-button"
                      type="button"
                      onClick={this.props.onEditProfile}
              >
                <img className="profile__edit-button-image"
                     src={vectorPencil}
                     alt="Картинка карандаш"
                />
              </button>
            </div>
            <p className="profile__subtitle">{this.context.about}</p>
          </div>
          <button className="profile__button"
                  type="button"
                  onClick={this.props.onAddPlace}
          >
            <img className="profile__button-image" src={vectorCross} alt="Картинка крест"/>
          </button>
        </section>
        <section className="elements">
          {this.cardElements}
        </section>
      </main>
    );
  }
}
