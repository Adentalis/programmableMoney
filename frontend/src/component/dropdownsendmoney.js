 import React from 'react';
    import Select from 'react-select';
    import 'bootstrap/dist/css/bootstrap.min.css';
    import './dropdownsendmoney.css';
    
    const techCompanies = [
      { label: "alle 15 Tage", value: 1 },
      { label: "zum 1. im Monat", value: 2},
      { label: "alle 3 Monate", value: 3 },
      { label: "alle 6 Monate", value: 4 },  
    ];
    
    const Dropdown = () => (
     
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <Select options={ techCompanies } />
          </div>
          <div className="col-md-4"></div>
        </div>
     
     
    );
    
    export default Dropdown