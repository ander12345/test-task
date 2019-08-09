// @flow

import React, { useState, useMemo } from 'react';
import cn from 'classnames';
import './ContactsTable.scss';
import {
  faArrowDown, faArrowUp, faEye, faEyeSlash, faPen, faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {identity, prop, propEq} from 'ramda';
import { DESC_SORT, ASC_SORT, type SortType } from '../../../constants/sort';

import { useContacts } from '../model/ContactsContext';
import type { Contact } from '../../../types/contact';

type HeaderCellSortType = ?SortType;
type ControlsField = 'CONTROLS';

const CONTROLS_FIELD = 'CONTROLS';
const DISPLAYED_FIELDS: Array<$Keys<Contact> | ControlsField> = [
  'name',
  'surname',
  'city',
  'email',
  'phone',
  CONTROLS_FIELD,
];

const SortIcon = ({ sort, color }: { sort: HeaderCellSortType, color: string }) => (
  <div className="table--header-row-icon">
    {
      <FontAwesomeIcon
        className={cn({
          hide: !sort,
        })}
        color={color}
        icon={sort === DESC_SORT ? faArrowUp : faArrowDown}
      />
    }
  </div>
);

type HeaderCellProps = {
  className?: string,
  text: string,
  sort?: HeaderCellSortType,
  reverseFlow?: boolean,
  disableSort?: boolean,
  onToggleSort?: (sort: HeaderCellSortType) => void,
};
const HeaderCell = ({
  text,
  sort = null,
  className,
  reverseFlow = false,
  onToggleSort = identity,
  disableSort,
}: HeaderCellProps) => {
  const handleClick = () => {
    if (disableSort) return;

    if (sort === ASC_SORT) {
      onToggleSort(DESC_SORT);
    } else if (sort === DESC_SORT) {
      onToggleSort(null);
    } else {
      onToggleSort(ASC_SORT);
    }
  };

  return (
    <div
      role="cell"
      className={cn(className, 'table--header-cell', {
        'table--header-cell__reverse': reverseFlow,
      })}
      onClick={handleClick}
    >
      <span>{text}</span>
      {!disableSort && <SortIcon color="white" sort={sort} />}
    </div>
  );
};

type ControlSquareButtonProps = {
  onClick?: (event: SyntheticMouseEvent<HTMLElement>) => void,
  className?: string,
  icon: IconProp,
  active?: boolean,
};
const ControlSquareButton = ({
  icon, className, onClick, active = false,
}: ControlSquareButtonProps) => (
  <div
    onClick={onClick}
    className={cn(className, {
      active,
    }, 'square-button')}
  >
    <FontAwesomeIcon size="sm" icon={icon} />
  </div>
);

const renderCell = (contact: Contact, field: $Keys<Contact> | ControlsField, className: string, selected: boolean) => {
  const { active, name } = contact;

  const handleIconClick = (event: SyntheticMouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  switch (field) {
    case 'name':
      return (
        <div key={field} className={cn(className, 'table--body-cell table--body-cell-name')}>
          <FontAwesomeIcon icon={active ? faEye : faEyeSlash} />
          <span>{name}</span>
        </div>
      );
    case CONTROLS_FIELD:
      return (
        <div key={field} className={cn(className, 'table--body-cell table--body-cell-controls')}>
          <ControlSquareButton icon={faPen} onClick={handleIconClick} active={selected} />
          <ControlSquareButton icon={faTrash} onClick={handleIconClick} active={selected} />
        </div>
      );
    default:
      return (
        <div key={field} className={cn(className, 'table--body-cell', `table--body-cell-${field}`)}>
          <span>{prop(field, contact)}</span>
        </div>
      );
  }
};

type RowProps = {
  selected: boolean,
  contact: Contact,
  onSelect: () => void,
  className?: string,
};
const Row = ({
  className, selected, onSelect, contact,
}: RowProps) => (
  <div
    className={cn(className, 'table--body-row', {
      'table--body-row__selected': selected,
    })}
    onClick={onSelect}
  >
    {DISPLAYED_FIELDS.map(
      displayFieldName => renderCell(
        contact,
        displayFieldName,
        `table--body-cell-${displayFieldName}`,
        selected,
      ),
    )}
  </div>
);

const ContactsTable = () => {
  const {
    data, sort, resetSort, selectContact, selectedContact,
  } = useContacts();

  const [sortColumn, setSortColumn] = useState<{field: $Keys<Contact> | ControlsField, sortType: HeaderCellSortType}>({
    field: 'name',
    sortType: ASC_SORT,
  });

  const getSortForColumn = (field: $Keys<Contact> | ControlsField) => sortColumn.field === field
    ? sortColumn.sortType
    : null;

  const getToggleSortHandler = (field: $Keys<Contact>) => (newSort?: HeaderCellSortType) => {
    if (newSort) {
      sort(field, newSort);
    } else {
      resetSort();
    }
    setSortColumn({
      field,
      sortType: newSort,
    });
  };

  const getRowSelectHandler = (contact: Contact) => () => {
    selectContact(contact.id);
  };

  const headerCells = useMemo<Array<HeaderCellProps>>(
    () => [
      {
        text: 'Name',
        onToggleSort: getToggleSortHandler('name'),
        className: 'table--header-cell-name',
        sort: getSortForColumn('name'),
      },
      {
        text: 'Surname',
        onToggleSort: getToggleSortHandler('surname'),
        className: 'table--header-cell-surname',
        sort: getSortForColumn('surname'),
      },
      {
        text: 'City',
        onToggleSort: getToggleSortHandler('city'),
        className: 'table--header-cell-city',
        sort: getSortForColumn('city'),
      },
      {
        text: 'Email',
        onToggleSort: getToggleSortHandler('email'),
        className: 'table--header-cell-email',
        sort: getSortForColumn('email'),
      },
      {
        text: 'Phone',
        onToggleSort: getToggleSortHandler('phone'),
        reverseFlow: true,
        className: 'table--header-cell-phone',
        sort: getSortForColumn('phone'),
      },
      {
        text: '',
        disableSort: true,
        className: 'table--header-cell-empty',
      },
    ],
    [sortColumn, getToggleSortHandler, getSortForColumn],
  );

  return (
    <div role="table" className="table">
      <div className="table--header">
        {headerCells.map(headerCellProps => (
          <HeaderCell key={headerCellProps.text} {...headerCellProps} />
        ))}
      </div>
      <div className="table--body">
        {data.map(contact => (
          <Row
            onSelect={getRowSelectHandler(contact)}
            key={contact.id}
            contact={contact}
            selected={propEq('id', contact.id, selectedContact)}
          />
        ))}
      </div>
    </div>
  );
};

export default ContactsTable;
