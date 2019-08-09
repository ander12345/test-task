// @flow
import React from 'react';
import './AddNewContact.scss';
import {
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../../../ui/Button/Button';

const AddNewContact = () => (
  <Button className="add-new-contact--button">
    <div className="add-new-contact--button__icon-block">
      <FontAwesomeIcon icon={faPlus} className="add-new-contact--button__icon" />
    </div>
    <p>add new contact</p>
  </Button>
);

export default AddNewContact;
