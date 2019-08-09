// @flow
import React from 'react';
import './ContactCard.scss';
import userMockPic from '../assets/userpic.jpg';
import { useContacts } from '../model/ContactsContext';


const ContactCard = () => {
  const {
    selectedContact,
  } = useContacts();

  const {
    name, surname, city, email, phone,
  } = selectedContact || {};

  if (!selectedContact) {
    return (
      <div className="card">
        <p>Select a contact</p>
      </div>
    );
  }

  return (
    <div className="card">
      <img className="card--picture" alt="user" src={userMockPic} />
      <div className="card--wrapper">
        <div className="card--names">
          <span className="card--names-labelName">Name:</span>
          <span className="card--names-labelName">Surname:</span>
          <span className="card--names-labelName">City:</span>
          <span className="card--names-labelName">Email:</span>
          <span className="card--names-labelName">Phone:</span>
        </div>
        <div className="card--values">
          <span className="card--values-labelValue">{name}</span>
          <span className="card--values-labelValue">{surname}</span>
          <span className="card--values-labelValue">{city}</span>
          <span className="card--values-labelValue">
            <a href={'mailto:{email}'}>{email}</a>
          </span>
          <div className="card--values-labelValue">{phone}</div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
