import React, { useState } from 'react';
import Modal from 'react-modal';


const AddCustomer = ({ isOpen, onClose, addCustomer }) => {
  const [newCustomer, setNewCustomer] = useState({
    firstname: '',
    lastname: '',
    streetaddress: '',
    postcode: '',
    city: '',
    email: '',
    phone: ''
  });

  const handleChange = (event) => {
    setNewCustomer({ ...newCustomer, [event.target.name]: event.target.value });
  };

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addCustomer(newCustomer);
      setNewCustomer({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
      });
      onClose(); // Sulje modaali API-pyynnön valmistuttua
    } catch (error) {
      console.error('Error:', error);
      // Voit näyttää virheviestin, jos API-pyyntö epäonnistuu
    }
  };

  return (
    <Modal appElement={document.getElementById('root')} isOpen={isOpen} onRequestClose={onClose} >
  <h2>Lisää Uusi Asiakas</h2>
  <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="firstname">Etunimi:</label>
      <input
        type="text"
        id="firstname"
        name="firstname"
        value={newCustomer.firstname}
        onChange={handleChange}
      />
    </div>
    <div>
      <label htmlFor="lastname">Sukunimi:</label>
      <input
        type="text"
        id="lastname"
        name="lastname"
        value={newCustomer.lastname}
        onChange={handleChange}
      />
    </div>
    <div>
      <label htmlFor="streetaddress">Katuosoite:</label>
      <input
        type="text"
        id="streetaddress"
        name="streetaddress"
        value={newCustomer.streetaddress}
        onChange={handleChange}
      />
    </div>
    <div>
      <label htmlFor="postcode">Postinumero:</label>
      <input
        type="text"
        id="postcode"
        name="postcode"
        value={newCustomer.postcode}
        onChange={handleChange}
      />
    </div>
    <div>
      <label htmlFor="city">Kaupunki:</label>
      <input
        type="text"
        id="city"
        name="city"
        value={newCustomer.city}
        onChange={handleChange}
      />
    </div>
    <div>
      <label htmlFor="email">Sähköposti:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={newCustomer.email}
        onChange={handleChange}
      />
    </div>
    <div>
      <label htmlFor="phone">Puhelinnumero:</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={newCustomer.phone}
        onChange={handleChange}
      />
    </div>
    <button type="submit">Lisää asiakas</button>
  </form>
</Modal>

  );
};

export default AddCustomer;
