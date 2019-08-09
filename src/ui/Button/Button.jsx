// @flow

import React from 'react';
import cn from 'classnames';
import './Button.scss';

type ButtonProps = $Rest<HTMLButtonElement, {|children: any|}> & {
  className?: string,
  children: React$Node
};

const Button = ({ className, children, ...restProps }: ButtonProps) => (
  <button
    className={
  cn(className, 'button')
}
    {...restProps}
  >
    {children}
  </button>
);

export default Button;
