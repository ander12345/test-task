// @flow

import React, { type ElementConfig } from 'react';
import cn from 'classnames';
import Select, { components } from 'react-select';
import {
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Select.scss';
import { path } from 'ramda';

const DropdownIndicator = (
  props: ElementConfig<typeof components.DropdownIndicator>,
) => (
  <components.DropdownIndicator {...props}>
    <FontAwesomeIcon
      className={cn('select-dropdown-indicator', {
        'select-dropdown-indicator__rotate': path(['selectProps', 'menuIsOpen'], props),
      })}
      icon={faCaretDown}
    />
  </components.DropdownIndicator>
);

const CustomSelect = ({ className, ...props }: *) => (
  <Select
    components={
      { DropdownIndicator }
    }
    className={cn(className, 'select')}
    classNamePrefix="select"
    {...props}
  />
);

export default CustomSelect;
