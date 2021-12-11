import React from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import Login from '../components/login/login';


const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
