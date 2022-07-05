import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ViewMain from './components/ViewMain';
import ViewCreate from './components/ViewCreate';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename='/shopping'>
      <Routes>
        <Route index path="/" element={<ViewMain />} />
        <Route path="create" element={<ViewCreate />} />
        <Route path="items/:publicId" element={<ViewCreate />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
