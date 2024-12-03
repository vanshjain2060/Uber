import React, { createContext, useState } from 'react';

export const CaptainDataContext = createContext();

export const CaptainDataContextProvider = ({ children }) => {
  const [captain, setCaptain] = useState({
    email: '',
    fullname: {
      firstname: '',
      lastname: ''
    },
    vehicle: {
      color: '',
      plate: '',
      capacity: '',
      vehicleType: ''
    }
  });

  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainDataContextProvider;