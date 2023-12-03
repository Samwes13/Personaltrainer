import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import AddCustomer from './AddCustomer';
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";
import { exportToCsv } from "./csvUtils";
import "../style.css";


const CustomerList = () => {

const [rowData, setRowData] = useState([]);
const [modalIsOpen, setModalIsOpen] = useState(false);
const [editingCustomer, setEditingCustomer] = useState(null);
const [editModalIsOpen, setEditModalIsOpen] = useState(false);
const [trainingModalIsOpen, setTrainingModalIsOpen] = useState(false);
const [selectedCustomer, setSelectedCustomer] = useState(null);

    //Määrittelee sarakkeet listalle
  const columns = [
    { headerName: "Etunimi", field: "firstname", sortable: true, filter: true },
    { headerName: "Sukunimi", field: "lastname", sortable: true, filter: true },
    { headerName: "Osoite", field: "streetaddress", sortable: true, filter: true },
    { headerName: "Postinumero", field: "postcode", sortable: true, filter: true },
    { headerName: "Kaupunki", field: "city", sortable: true, filter: true },
    { headerName: "Sähköposti", field: "email", sortable: true, filter: true },
    { headerName: "Puhelinnumero", field: "phone", sortable: true, filter: true },
    {
        headerName: "Poista",
        field: "links",
        cellRenderer: (params) => {
          const selfLink = params.data.links.find(link => link.rel === "self").href;
          return (
            <button className="button button-red" onClick={() => deleteCustomer(selfLink)}>Poista</button>
          );
        }
      },
      {
        headerName: "Muokkaa",
        field: "links",
        cellRenderer: (params) => {
          return (
            <button className="button button-yellow" onClick={() => openEditModal(params.data)}>Muokkaa</button>
          );
        }
      },
      {
        headerName: "Lisää harjoitus",
        field: "links",
        cellRenderer: (params) => {
          const selfLink = params.data.links.find(link => link.rel === "self").href;
          return (
            <>
              <button onClick={() => openTrainingModal(selfLink)}>Lisää harjoitus</button>
            </>
          );
        }
      }
    
  ];

  //Uuden asiakkaan lisäys
  const addCustomer = (customer) => {
    fetch('http://traineeapp.azurewebsites.net/api/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customer)
    })
    .then(response => response.json())
    .then(data => {
      setRowData([...rowData, data]);
      
    })
    .catch(error => console.error('Error:', error));
  };

  const updateCustomer = (editedCustomer) => {
    fetch(editedCustomer.selfLink, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedCustomer)
    })
    .then(response => {
      if (response.ok) {
        
        setRowData(rowData.map(customer => 
          customer.links.find(link => link.rel === "self").href === editedCustomer.selfLink 
          ? editedCustomer 
          : customer
        ));
      } else {
        alert("Päivitys epäonnistui");
      }
    })
    .catch(error => console.error('Error:', error));
  };
  
  
  useEffect(() => {
    fetch('http://traineeapp.azurewebsites.net/api/customers')
      .then(response => response.json())
      .then(data => setRowData(data.content))
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const openEditModal = (customerData) => {
    const customerWithSelfLink = {
      ...customerData,
      selfLink: customerData.links.find(link => link.rel === "self").href
    };
    setEditingCustomer(customerWithSelfLink);
    setEditModalIsOpen(true);
  };
  
  
  

  const deleteCustomer = (customerLink) => {
    if (window.confirm("Haluatko varmasti poistaa asiakkaan?")) {
      fetch(customerLink, {
        method: 'DELETE'
      })
      .then(response => {
        if (response.ok) {
          
          setRowData(rowData.filter(customer => customer.links.find(link => link.rel === "self").href !== customerLink));
        } else {
          alert("Poisto epäonnistui");
        }
      })
      .catch(error => console.error('Error:', error));
    }
  };
  
  // Funktio harjoituslisäysikkunan avaamiseen
  const openTrainingModal = (customerUrl) => {
    setSelectedCustomer(customerUrl);
    setTrainingModalIsOpen(true);
};

  
  // Funktio harjoituslisäysikkunan sulkemiseen
  const closeTrainingModal = () => {
    setTrainingModalIsOpen(false);
    setSelectedCustomer(null);
  };
  
  const addTraining = (trainingData) => {
    fetch('http://traineeapp.azurewebsites.net/api/trainings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...trainingData,
          customer: selectedCustomer 
        })
    })
    .then(response => {
        if (response.ok) {
            console.log("Harjoitus lisätty onnistuneesti");
            
        } else {
            
            console.error("Harjoituksen lisäys epäonnistui");
        }
    })
    .catch(error => console.error('Error:', error));
};

const handleExport = () => {
    exportToCsv(rowData);
  };

  

  return (
    <div>
        <div>
        <button onClick={handleOpenModal}>Lisää Asiakas</button>
    <AddCustomer
        isOpen={modalIsOpen}
        onClose={handleCloseModal}
        addCustomer={addCustomer}
      />
      
    <EditCustomer
        customer={editingCustomer}
        isOpen={editModalIsOpen}
        onClose={() => setEditModalIsOpen(false)}
        updateCustomer={updateCustomer}
        />
        <AddTraining
            isOpen={trainingModalIsOpen}
            onClose={closeTrainingModal}
            addTraining={addTraining}
            customer={selectedCustomer}
        />

    </div>
        
    <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={12}
      />
    </div>
    <button onClick={handleExport}>Vie CSV-tiedostoon</button>
    </div>
  );
};

export default CustomerList;
