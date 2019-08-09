// @flow

import React, { useState } from 'react';
import { prop } from 'ramda';
import Input from '../../../ui/Input/Input';
import Button from '../../../ui/Button/Button';
import CheckboxLabeled from '../../../ui/CheckboxLabeled/CheckboxLabeled';
import Select from '../../../ui/Select/Select';
import cities from '../../../constants/cities';
import { useContacts } from '../model/ContactsContext';
import { type Option } from '../../../types/select';
import './Filters.scss';

const ALL_CITY_OPTION = { value: null, label: 'All Cities' };

const citySelectOptions = [ALL_CITY_OPTION, ...cities.map(city => ({ value: city, label: city }))];

const Filters = () => {
  const { addFilters } = useContacts();
  const [inputValue, setInputValue] = useState('');
  const [cityOption, setCityOption] = useState<Option<?string>>(ALL_CITY_OPTION);
  const [showActive, setShowActive] = useState(true);

  const handleCheck = (checked: boolean) => setShowActive(checked);
  const handleCitySelect = (value: Option<?string>) => setCityOption(value);

  const handleFilterClick = () => {
    addFilters([
      { field: 'name', value: inputValue },
      { field: 'city', value: prop('value', cityOption) },
      { field: 'active', value: showActive },
    ]);
  };

  return (
    <div className="filter">
      <Input placeholder="Name" onChange={setInputValue} className="filter--input" />
      <Select
        isSearchable
        className="filter--select"
        value={cityOption === ALL_CITY_OPTION ? null : cityOption}
        placeholder="City"
        options={citySelectOptions}
        onChange={handleCitySelect}
      />
      <CheckboxLabeled label="Show active" defaultChecked onChange={handleCheck} className="filter--checkbox" />
      <Button type="submit" className="filter--button" onClick={handleFilterClick}>FILTER</Button>
    </div>
  );
};

export default Filters;
