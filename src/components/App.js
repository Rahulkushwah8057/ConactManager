import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []);
  const [editingContact, setEditingContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    const filtered = contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredContacts(filtered);
  }, [contacts, searchTerm]);

  const addContactHandler = (contact) => {
    setContacts([...contacts, contact]);
    toast.success("Contact added successfully!");
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => contact.id !== id);
    setContacts(newContactList);
    toast.error("Contact deleted successfully!");
  };

  const editContactHandler = (id) => {
    const contactToEdit = contacts.find((contact) => contact.id === id);
    setEditingContact(contactToEdit);
  };

  const updateContactHandler = (updatedContact) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
    setEditingContact(null);
    toast.info("Contact updated successfully!");
  };

  return (
    <div className="container">
      <Header />
      <div className="row">
        <div className="col-md-6 col-12 d-flex align-items-center">
          <AddContact
            addContactHandler={addContactHandler}
            editingContact={editingContact}
            updateContactHandler={updateContactHandler}
          />
        </div>
        <div className="col-md-3 col-3 col-sm-6 d-flex align-items-center justify-content-end" style={{marginTop:"24px"}}>
          <input
            type="text"
            placeholder="Search by name..."
            className="form-control mr-3" // Reduced the width here
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div>Total Contacts: {contacts.length}</div>
        </div>
      </div>
      <div style={{marginTop:"10px"}}>
        <ContactList
          contacts={filteredContacts}
          deleteContactHandler={removeContactHandler}
          editContactHandler={editContactHandler}
        />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
    </div>
  );
}

export default App;
