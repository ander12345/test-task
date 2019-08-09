// @flow

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import './Dropdown.scss';

export type DropdownType = {
  label: string,
  icon: IconProp,
  onClick?: () => void,
};

export type DropdownProps = {
  list: Array<DropdownType>,
  buttonLabel: string,
  buttonIcon: IconProp,
};

const Dropdown = ({ list, buttonLabel, buttonIcon }: DropdownProps) => (
  <button className="dropdown">
    <div className="dropdown-toggle">
      <FontAwesomeIcon size="sm" icon={buttonIcon} />
      <span className="text">{buttonLabel}</span>
      <span className="caret" />
    </div>
    <div className="dropdown-menu">
      {list.map(({ label, icon, onClick }) => (
        <li key={label}>
          <a href="/" onClick={onClick}>
            <FontAwesomeIcon size="sm" icon={icon} />
            <span className="text">{label}</span>
          </a>
        </li>
      ))}
    </div>
  </button>
);

export default Dropdown;
