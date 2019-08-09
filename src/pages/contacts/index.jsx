import React from 'react';
import Filters from './components/Filters';
import './ContactsLayout.scss';
import { ContactsProvider } from './model/ContactsContext';
import ContactsTable from './components/ContactsTable';
import ContactCard from './components/ContactCard';
import AddNewContact from './components/AddNewContact';

const ContactsLayout = () => (
  <ContactsProvider>
    <div className="layout">
      <div className="layout--topBar">
        <Filters />
        <AddNewContact />
      </div>
      <div className="layout--container">
        <ContactCard
          name="Jorah"
          surname="Mormont"
          city="Los Angeles"
          email="a.hill@gamil.com"
          phone="+1 213 509 6995"
        />
        <ContactsTable />
      </div>
    </div>
  </ContactsProvider>
);

export default ContactsLayout;
