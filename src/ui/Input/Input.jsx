// @flow

import React from 'react';
import cn from 'classnames';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Input.scss';
import {identity} from "ramda";

export type InputProps = {
  rootClassName?: string,
  onChange?: (value: string) => void,
  actionIcon?: IconProp,
  onAction?: () => void,
} & $Shape<HTMLInputElement>;

const Input = ({
  className,
  onChange = identity,
  children,
  actionIcon,
  rootClassName,
  onAction = identity,
  ...props
}: $Shape<InputProps>) => {
  const handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => onChange(event.target.value);
  const handleActionClick = () => {
    onAction();
  };

  return (
    <span className={cn('input', rootClassName)}>
      <input
        onChange={handleChange}
        className={cn(className, 'input--field', { 'input--field__with-icon': !!actionIcon })}
        {...props}
      />
      {actionIcon && (
        <div className="input--action-block" onClick={handleActionClick}>
          <FontAwesomeIcon color="#777" size="sm" icon={actionIcon} />
        </div>
      )}
    </span>
  );
};

export default Input;
