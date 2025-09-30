import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DocumentScanner from './DocumentScanner';
import MobileScanner from './MobileScanner';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Desktop view - shows upload button and QR code */}
          <Route path="/" element={<DocumentScanner />} />
          
          {/* Mobile view - opens when QR code is scanned */}
          <Route path="/scanner/:sessionId" element={<MobileScanner />} />
          
          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;