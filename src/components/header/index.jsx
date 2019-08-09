// @flow

import React from 'react';
import './Header.scss';
import {
  faSearch, faUser, faUsers, faComments, faWrench, faPowerOff,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown, { type DropdownType } from '../dropdown';
import Navigation from '../navigation/Navigation';
import Input from '../../ui/Input/Input';

const dropdownOptions: DropdownType[] = [
  {
    label: 'Groups',
    icon: faUsers,
  },
  {
    label: 'Frequently contacted',
    icon: faComments,
  },
  {
    label: 'Preferences',
    icon: faWrench,
  },
  {
    label: 'Log out',
    icon: faPowerOff,
  },
];

const Header = () => (
  <header className="header">
    <div className="header__wrap">
      <div className="logo-content">
        <span className="logo-text">Contactify</span>
        <div className="logo-user">
          <FontAwesomeIcon icon={faUser} />
        </div>
      </div>
      <Navigation
        list={[
          { item: 'dashboard', selected: false },
          { item: 'contacts', selected: true },
          { item: 'notifications', selected: false },
        ]}
      />
      <Input className="header--input" placeholder="Search" actionIcon={faSearch} />
    </div>
    <div className="dropdown-wrapper">
      <Dropdown buttonIcon={faUser} buttonLabel="Jorah Mormont" list={dropdownOptions} />
    </div>
  </header>
);

export default Header;
