// @flow

import React from 'react';
import './App.scss';
import WebFont from 'webfontloader';
import ContactsPage from './pages/contacts';
import Header from './components/header';
import Footer from './components/footer';

WebFont.load({
  google: {
    families: ['Open Sans:400,600', 'sans'],
  },
});

function App() {
  return (
    <div className="App">
      <Header />
      <ContactsPage />
      <Footer />
    </div>
  );
}

export default App;
