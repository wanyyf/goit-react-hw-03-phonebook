import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import Filter from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  componentDidMount() {
    const prevValues = JSON.parse(localStorage.getItem('contacts'));
    console.log(prevValues);
    if (prevValues) {
      this.setState({ contacts: prevValues });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  getFiltredArray = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(el =>
      el.name.toLowerCase().includes(normalizedFilter)
    );
  };

  filterContactList = evt => {
    this.setState({ filter: evt.target.value });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== id),
    }));
  };

  onAddBtnClick = ({ name, number }) => {
    const contactObject = {
      id: nanoid(),
      name,
      number,
    };
    this.state.contacts
      .map(el => {
        return el.name.toLowerCase();
      })
      .includes(contactObject.name.toLowerCase())
      ? alert(`${contactObject.name} is already there`)
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, contactObject],
        }));
  };

  render() {
    const filteredArray = this.getFiltredArray();
    return (
      <div className="container">
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.onAddBtnClick} />
        <h2>Contacts</h2>
        <Filter
          onChange={this.filterContactList}
          valueInput={this.state.filter}
        />
        <ContactList
          filteredArray={filteredArray}
          deletebtn={this.deleteContact}
        />
      </div>
    );
  }
}
