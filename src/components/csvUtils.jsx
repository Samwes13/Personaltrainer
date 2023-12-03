export const exportToCsv = (data) => {
    const headers = ["Etunimi", "Sukunimi", "Katuosoite", "Postinumero", "Kaupunki", "Sähköposti", "Puhelinnumero"];
    const fieldNames = ["firstname", "lastname", "streetaddress", "postcode", "city", "email", "phone"];
  
    const csvRows = data.map(row => 
      fieldNames.map(fieldName => row[fieldName] || '').join(',')
    );
  
    csvRows.unshift(headers.join(','));
  
    const csvString = csvRows.join('\r\n');
  
    const blob = new Blob(["\uFEFF" + csvString], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'asiakastiedot.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  