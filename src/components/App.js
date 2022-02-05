import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import Header from './Header'
import AddContact from './AddContact'
import ContactList from './ContactList'
import ContactDetail from './ContactDetail'
import DeleteContact from './DeleteContact'


function App() {

  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([])

  // this function receives an object with fields "name" and "email"
  const addContactHandler = (contact) => {
    setContacts([...contacts, { id: uuidv4(), ...contact }])
  }

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveContacts) setContacts(retriveContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className='ui container'>
      <Router>
        <Header/>
        <Switch>
          {/* <Route path="/" exact component={() => <ContactList contacts={contacts} removeContactId={removeContactHandler}/> } />
          <Route path="/add" component={() => <AddContact addContactHandler={addContactHandler}/> } /> */}

          <Route path="/" exact render={(props) => <ContactList {...props} contacts={contacts} removeContactId={removeContactHandler}/> } />
          <Route path="/add" render={(props) => <AddContact {...props} addContactHandler={addContactHandler}/> } />
          <Route path="/contacts/:id" component={ContactDetail}/>
          <Route path="/delete/:id" render={(props) => <DeleteContact {...props} deleteContactId={removeContactHandler}/>}/>
        </Switch>
        {/* <AddContact addContactHandler={addContactHandler}/>
        <ContactList contacts={contacts} removeContactId={removeContactHandler} /> */}
      </Router>
    </div>
  );
}

export default App;
