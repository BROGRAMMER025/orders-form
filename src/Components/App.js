import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import Orders from './Orders'; // Import your Orders component

function App() {
  return (
    <Router>
      <SnackbarProvider maxSnack={3}>
        <Routes>
          <Route path="/" element={<Orders />} />
          {/* Add more routes as needed */}
        </Routes>
      </SnackbarProvider>
    </Router>
  );
}

export default App;
