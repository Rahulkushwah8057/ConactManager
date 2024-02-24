import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import userAvatar from "../images/user.png";

const ContactCard = (props) => {
  const { id, name, email, avatar } = props.contact;

  const handleDelete = () => {
    props.deleteHandler(id);
  };

  const handleEdit = () => {
    props.editHandler(id); // Call the editHandler function with contact id
  };

  return (
    <div className="item" style={{ display: "flex", marginBottom: "10px" }}>
      <img
        className="ui avatar image"
        src={avatar || userAvatar}
        alt={name}
        width="50px"
        height="50px"
        style={{ transition: "transform 0.2s", cursor: "pointer" }}
        onMouseOver={(e) => e.target.style.transform = "scale(1.1)"}
        onMouseOut={(e) => e.target.style.transform = "scale(1)"}
      />
      <div className="content" style={{ marginTop: "-5px", marginLeft: "5px", flex: "1" }} >
        <div className="header">{name}</div>
        <div>{email}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}> {/* Button container */}
        <button onClick={handleEdit} style={{ marginLeft: "10px" }}>
          <FontAwesomeIcon icon={faEdit} style={{ color: "blue" }} />
        </button>
        <button onClick={handleDelete} style={{ marginLeft: "10px" }}>
          <FontAwesomeIcon icon={faTrash} style={{ color: "red" }} />
        </button>
      </div>
    </div>
  );
};

export default ContactCard;

