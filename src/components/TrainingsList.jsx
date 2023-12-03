import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "../style.css";
import { format, parseISO } from 'date-fns';

const TrainingList = () => {
  const [rowData, setRowData] = useState([]);

  const columns = [
    { headerName: "Asiakkaan Nimi", field: "customerName", sortable: true, filter: true },
    {
      headerName: "Päivämäärä", 
      field: "date", 
      sortable: true, 
      filter: true,
      cellRenderer: (data) => {
        
        return data.value ? format(parseISO(data.value), 'dd.MM.yyyy HH:mm') : '';
      }
    },
    { headerName: "Kesto", field: "duration", sortable: true, filter: true },
    { headerName: "Toiminta", field: "activity", sortable: true, filter: true },
    {
      headerName: "Poista",
      field: "links",
      cellRenderer: (params) => {
        
        const selfLink = params.data.links.find(link => link.rel === "self").href;

        return <button className="button button-red" onClick={() => deleteTraining(selfLink)}>Poista</button>;
      }
    }
  ];

  const fetchCustomerName = (training) => {
    return fetch(training.links.find(link => link.rel === 'customer').href)
      .then(response => response.json())
      .then(customer => `${customer.firstname} ${customer.lastname}`)
      .catch(() => 'Tuntematon');
  };

  const deleteTraining = (trainingLink) => {
    if (window.confirm("Haluatko varmasti poistaa tämän harjoituksen?")) {
      fetch(trainingLink, {
        method: 'DELETE'
      })
      .then(response => {
        if (response.ok) {
          
          setRowData(rowData.filter(training => training.links.find(link => link.rel === "self").href !== trainingLink));
        } else {
          alert("Poisto epäonnistui");
        }
      })
      .catch(error => console.error('Error:', error));
    }
  };

  useEffect(() => {
    fetch('http://traineeapp.azurewebsites.net/api/trainings')
      .then(response => response.json())
      .then(async data => {
        const trainingData = await Promise.all(data.content.map(async training => {
          const customerName = await fetchCustomerName(training);
          return { ...training, customerName, date: training.date };
        }));
        setRowData(trainingData);
      })
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
};

export default TrainingList;
