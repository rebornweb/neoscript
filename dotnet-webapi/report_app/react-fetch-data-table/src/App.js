import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './App.css';
import Table from 'react-bootstrap/Table';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:2030/api/StoredProcedures/getbillofmaterials")
      .then(response => response.json())
      .then(json => setData(json))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
   
    <div className="App">
     
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
         
          <h1>Product Assembly Data</h1>
          <Table striped bordered hover>
            <thead>
            <img src={logo} alt='logo' class='App-logo'/>
              <tr>
                <th>Product Assembly ID</th>
                <th>Component ID</th>
                <th>Component Description</th>
                <th>Total Quantity</th>
                <th>Standard Cost</th>
                <th>List Price</th>
                <th>BOM Level</th>
                <th>Recursion Level</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.ProductAssemblyID}>
                  <td>{item.ProductAssemblyID}</td>
                  <td>{item.ComponentID}</td>
                  <td>{item.ComponentDesc}</td>
                  <td>{item.TotalQuantity}</td>
                  <td>{item.StandardCost}</td>
                  <td>{item.ListPrice}</td>
                  <td>{item.BOMLevel}</td>
                  <td>{item.RecursionLevel}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
}

export default App;
