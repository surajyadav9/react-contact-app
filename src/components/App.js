import Header from './Header'
import AddContact from './AddContact'
import ContactCard from './ContactCard'
import ContactList from './ContactList'
import './App.css'

function App() {
  return (
    <div className='ui container'>
      <Header/>
      <AddContact/>
      <ContactList/>
      {/* <ContactCard/> */}
    </div>
  );
}

export default App;
