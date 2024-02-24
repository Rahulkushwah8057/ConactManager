// AddContact.js
import React, { useState, useEffect } from "react";

const AddContact = ({ addContactHandler, editingContact, updateContactHandler }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarName, setAvatarName] = useState(""); // State to hold the file name

  useEffect(() => {
    if (editingContact) {
      setName(editingContact.name);
      setEmail(editingContact.email);
      setAvatar(editingContact.avatar);
      setAvatarName(editingContact.avatarName || ""); // Set avatar name if available
    }
  }, [editingContact]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "" || email.trim() === "") {
      alert("All the fields are mandatory!");
      return;
    }

    if (editingContact) {
      updateContactHandler({ ...editingContact, name, email, avatar, avatarName }); // Pass avatarName when updating
    } else {
      addContactHandler({ name, email, avatar, avatarName }); // Pass avatarName when adding
    }

    setName("");
    setEmail("");
    setAvatar(null);
    setAvatarName(""); // Reset the file name after submission
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
      setAvatarName(file.name); // Set the file name when a new file is selected
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              {/* <h2 className="card-title">
                {editingContact ? "Edit Contact" : "Add Contact"}
              </h2> */}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="avatar">Avatar</label>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="avatar"
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                    <label className="custom-file-label" htmlFor="avatar">
                      {avatarName || (editingContact ? "No image chosen" : "Choose file")} {/* Display file name or default text */}
                    </label>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary" style={{marginTop:"-15px"}}>
                  {editingContact ? "Update" : "Add"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
