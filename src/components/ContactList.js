// ContactList.js
import React from "react";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
  const renderContactList = props.contacts.map((contact) => (
    <ContactCard
      contact={contact}
      deleteHandler={props.deleteContactHandler}
      editHandler={props.editContactHandler} // Corrected prop name
      key={contact.id}
    />
  ));

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="list-group">
            {renderContactList.length ? (
              renderContactList
            ) : (
              <p className="text-center">No contacts available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactList;
