import React from 'react';
import Details from '../Components/Details';
import Header from '../Components/Header';
import '../Css/DetailsPages.css'; 

const DetailsPages = () => {
  return (
    <>
      <div>
        <Header />
      </div>
      <div style={{ height: '20px' }} /> 
      <div>
        <Details />
      </div>
    </>
  );
};

export default DetailsPages;
