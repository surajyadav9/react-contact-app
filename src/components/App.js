import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import api from '../api/contact'
import './App.css'
import Header from './Header'
import AddContact from './AddContact'
import ContactList from './ContactList'
import ContactDetail from './ContactDetail'
import DeleteContact from './DeleteContact'
import EditContact from './EditContact'
import contact from '../api/contact';


function App() {

  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([])

  // retrieve contacts from json server
  const retrieveContacts = async () => {
    const response = await api.get('/contacts')
    return response.data
  }

  // this function receives an object with fields "name" and "email"
  const addContactHandler = async (contact) => {
    const request = {
      id: uuidv4(),
      ...contact
    }
    
    const response = await api.post('/contacts', request)
    // console.log(response) // response is an object that has a data object which contains request items
    setContacts([...contacts, response.data])
  }

  // update contact
  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact)
    // console.log(response)
    const {id, name, email} = response.data
    setContacts(
      contacts.map((contact)=>{
        return contact.id === id ? {...response.data} : contact
      })
    )
  }

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`)
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  useEffect(() => {
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retriveContacts) setContacts(retriveContacts);

    const getAllContacts = async () => {
      const allContacts = await retrieveContacts()
      if(allContacts) setContacts(allContacts)
    }

    getAllContacts();
  }, []);

  useEffect(() => {
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
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
          <Route path="/edit" render={(props) => <EditContact {...props} updateContactHandler={updateContactHandler}/> } />
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
