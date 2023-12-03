import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const EditCustomer = ({ customer, isOpen, onClose, updateCustomer }) => {
  const [editedCustomer, setEditedCustomer] = useState(customer);

  useEffect(() => {
    if (customer) {
      setEditedCustomer(customer);
    }
  }, [customer]);

  
  if (!editedCustomer) {
    return null; 
  }
  
  

  const handleChange = (event) => {
    setEditedCustomer({ ...editedCustomer, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateCustomer(editedCustomer);
    onClose();
  };

  return (
    <Modal appElement={document.getElementById('root')} isOpen={isOpen} onRequestClose={onClose} >
      <h2>Muokkaa Asiakasta</h2>
      <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="firstname">Etunimi:</label>
      <input
        type="text"
        id="firstname"
        name="firstname"
        value={editedCustomer.firstname}
        onChange={handleChange}
      />
    </div>
    <div>
      <label htmlFor="lastname">Sukunimi:</label>
      <input
        type="text"
        id="lastname"
        name="lastname"
        value={editedCustomer.lastname}
        onChange={handleChange}
      />
    </div>
    <div>
      <label htmlFor="streetaddress">Katuosoite:</label>
      <input
        type="text"
        id="streetaddress"
        name="streetaddress"
        value={editedCustomer.streetaddress}
        onChange={handleChange}
      />
    </div>
    <div>
      <label htmlFor="postcode">Postinumero:</label>
      <input
        type="text"
        id="postcode"
        name="postcode"
        value={editedCustomer.postcode}
        onChange={handleChange}
      />
    </div>
    <div>
      <label htmlFor="city">Kaupunki:</label>
      <input
        type="text"
        id="city"
        name="city"
        value={editedCustomer.city}
        onChange={handleChange}
      />
    </div>
    <div>
      <label htmlFor="email">Sähköposti:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={editedCustomer.email}
        onChange={handleChange}
      />
    </div>
    <div>
      <label htmlFor="phone">Puhelinnumero:</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={editedCustomer.phone}
        onChange={handleChange}
      />
    </div>
    <button type="submit">Päivitä asiakas</button>
  </form>
    </Modal>
  );
};

export default EditCustomer;
