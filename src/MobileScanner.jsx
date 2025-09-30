
import React, { useState, useRef } from 'react';
import './MobileScanner.css';

const MobileScanner = () => {
  const [image, setImage] = useState(null);
  const [isCaptured, setIsCaptured] = useState(false);
  const fileInputRef = useRef(null);

  const handleCapture = () => {
    // This would use the phone's camera in a real app
    // For demo, we'll use file input
    fileInputRef.current.click();
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        setIsCaptured(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRetake = () => {
    setImage(null);
    setIsCaptured(false);
  };

  const handleUpload = () => {
    // Upload logic would go here
    alert('Document uploaded successfully!');
    // Close the window or go back
    window.close();
  };

  return (
    <div className="mobile-scanner">
      <header className="scanner-header">
        <h1>📄 Document Scanner</h1>
        <p>Take a photo of your document</p>
      </header>

      <div className="scanner-content">
        {!isCaptured ? (
          <div className="camera-interface">
            <div className="camera-placeholder">
              <div className="camera-icon">📷</div>
              <p>Camera will open here</p>
            </div>
            <div className="document-overlay">
              <div className="document-frame"></div>
            </div>
            <button className="capture-btn" onClick={handleCapture}>
              📸 Capture Document
            </button>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              capture="environment"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
          </div>
        ) : (
          <div className="preview-interface">
            <div className="image-preview">
              <img src={image} alt="Captured document" />
            </div>
            <div className="preview-actions">
              <button className="btn retake-btn" onClick={handleRetake}>
                🔄 Retake
              </button>
              <button className="btn upload-btn" onClick={handleUpload}>
                ✅ Upload Document
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileScanner;