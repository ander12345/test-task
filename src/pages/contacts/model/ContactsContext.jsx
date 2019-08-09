// @flow
import React, {
  createContext, useState, useMemo, useContext,
} from 'react';
import {
  sort, comparator, lt, gt, filter, includes, compose, head, find, propEq, identity, curryN, toLower,
} from 'ramda';

import contactsMock from '../../../mocks/contacts.json';
import { type Contact } from '../../../types/contact';
import { DESC_SORT, type SortType } from '../../../constants/sort';

const empty = () => {};

export type AvailableFilterFiledType = 'name' | 'city' | 'active'

export type Filter = {
    field: string,
    value: *
}

type ContactsSortType = {
  field: $Keys<Contact>,
  order: SortType
}

type ContactsContextType = {
    data: Array<Contact>,
    sort: (field: $Keys<Contact>, order: SortType) => void,
  resetSort: () => void,
    addFilters: (filter: Array<Filter>) => void,
    removeFilter: (filterField: AvailableFilterFiledType) => void,
    resetFilters: () => void,
    selectedContact: ?Contact,
    selectContact: (contactId: number) => void,
}

const sortContacts = curryN(3, (field: $Keys<Contact>, order: SortType, contacts: Array<Contact>) => {
  const compare = order === DESC_SORT ? gt : lt;
  const contactFieldsComparator = comparator(
    (contact1: Contact, contact2: Contact) => compare(contact1[field], contact2[field]),
  );

  return sort(contactFieldsComparator, contacts);
});

const filterContacts = curryN(2, (filters: Array<Filter> = [], contacts: Array<Contact>) => {
  const composedFilter = compose(identity, ...filters.map(({ field, value }) => {
    switch (field) {
      case 'name':
        return filter((contact: Contact) => includes(toLower(value), toLower(contact.name)));
      case 'city':
        return filter((contact: Contact) => !value || contact.city === value);
      case 'active':
        return filter((contact: Contact) => value || !contact.active);
      default:
        throw new Error('Unsupported filter field');
    }
  }));


  return composedFilter(contacts);
});

const ContactsContext = createContext<ContactsContextType>({
  data: [],
  sort: empty,
  resetSort: empty,
  addFilters: empty,
  removeFilter: empty,
  resetFilters: empty,
  selectedContact: null,
  selectContact: empty,
});

export const ContactsProvider = (props: *) => {
  const [data] = useState(contactsMock);
  const [selectedContact, setSelectedContact] = useState(head(data));
  const [filters, setFilters] = useState<Array<Filter>>([]);
  const [contactsSort, setContactsSort] = useState<?ContactsSortType>(null);

  const addFilters = (newFilters: Array<Filter> = []) => {
    const newFiltersFields = newFilters.map(({ field }) => field);
    setFilters([...(filters.filter(({ field }) => !newFiltersFields.includes(field))), ...newFilters]);
  };

  const removeFilter = (fieldName: AvailableFilterFiledType) => setFilters(filters.filter(({ field }) => field !== fieldName));
  const resetFilters = () => setFilters([]);

  const contactsSorter = contactsSort ? sortContacts(contactsSort.field, contactsSort.order) : identity;
  const contactsFilter = filterContacts(filters);
  const processData = compose(contactsSorter, contactsFilter);
  const processedData = useMemo(() => processData(data), [filters, data, contactsSort, processData]);

  const contextValue = useMemo<ContactsContextType>(() => ({
    data: processedData,
    sort: (field: $Keys<Contact>, order: SortType) => setContactsSort({ field, order }),
    resetSort: () => setContactsSort(null),
    addFilters,
    removeFilter,
    resetFilters,
    selectedContact,
    selectContact: (contactId: number) => setSelectedContact(find(propEq('id', contactId))(data)),
  }), [processedData, selectedContact, addFilters]);

  return <ContactsContext.Provider value={contextValue} {...props} />;
};

export const useContacts = (): ContactsContextType => useContext(ContactsContext);
