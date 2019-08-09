// @flow

import React, { useState } from 'react';
import {identity, omit} from 'ramda';
import './Checkbox.scss';

export type CheckboxLabeledProps = $Rest<HTMLInputElement, {|label: *, onChange: *|}> & {
  label?: string,
  labelProps?: $Shape<HTMLLabelElement>,
  onChange?: (checked: boolean) => void,
};

const CheckboxLabeled = ({
  id,
  className,
  label,
  labelProps,
  onChange = identity,
  defaultChecked = false,
  ...inputProps
}: CheckboxLabeledProps) => {
  const [checked, setChecked] = useState(defaultChecked);

  const handleChange = () => {
    onChange(!checked);
    setChecked(!checked);
  };

  return (
    <div className="checkbox cb-container">
      <input
        type="checkbox"
        className="input"
        onChange={handleChange}
        checked={checked}
        id={id}
        {...omit(['children'], inputProps)}
      />
      {label && (
        <label className="label" onClick={handleChange} htmlFor={id} {...labelProps}>
          {label}
        </label>
      )}
    </div>
  );
};

export default CheckboxLabeled;
