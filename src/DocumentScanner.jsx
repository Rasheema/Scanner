import React, { useState, useRef, useEffect } from "react";
import "./DocumentScanner.css";

const DocumentScanner = () => {
  const [qrCode, setQrCode] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [sessionStatus, setSessionStatus] = useState("idle");
  const [uploadedImage, setUploadedImage] = useState(null);
  const pollIntervalRef = useRef(null);

  const generateQRCode = () => {
    // Replace with your actual IP address
    const localIP = "192.168.1.73"; // ← CHANGE THIS TO YOUR IP
    const port = "3000"; // Your React app port

    const demoSessionId = `session-${Date.now()}`;
    const scannerUrl = `http://${localIP}:${port}/scanner/${demoSessionId}`;

    const demoQRCode = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
      scannerUrl
    )}`;

    setQrCode(demoQRCode);
    setSessionId(demoSessionId);
    setSessionStatus("waiting");
    setUploadedImage(null);
    startPolling(demoSessionId);
  };

  const startPolling = (sessionId) => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
    }

    pollIntervalRef.current = setInterval(async () => {
      // Simulate receiving an upload after 10 seconds for demo
      const timeElapsed = Date.now() - parseInt(sessionId.split("-")[1]);
      if (timeElapsed > 10000 && sessionStatus === "waiting") {
        setUploadedImage("/demo-image.jpg");
        setSessionStatus("completed");
        clearInterval(pollIntervalRef.current);
      }
    }, 2000);
  };

  const resetScanner = () => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
    }
    setQrCode(null);
    setSessionId(null);
    setSessionStatus("idle");
    setUploadedImage(null);
  };

  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="document-scanner">
      <div className="scanner-header">
        <h2>📱 Document Scanner</h2>
        <p>Generate QR code to scan documents from your phone</p>
      </div>

      <div className="scanner-content">
        {!qrCode ? (
          <div className="upload-section">
            <div className="upload-card">
              <div className="upload-icon">📄</div>
              <h3>Upload Document</h3>
              <p>
                Click below to generate a QR code. Scan it with your phone to
                open the document scanner.
              </p>
              <button
                className="upload-btn"
                onClick={generateQRCode}
                disabled={sessionStatus === "generating"}
              >
                {sessionStatus === "generating" ? (
                  <>
                    <span className="spinner"></span>
                    Generating QR Code...
                  </>
                ) : (
                  "Generate QR Code"
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="scanner-session">
            <div className="qr-section">
              <h3>Scan this QR with your Phone</h3>
              <p className="instruction-text">
                Use your phone's camera to scan this QR code
              </p>

              <div className="qr-container">
                <img src={qrCode} alt="QR Code" className="qr-code" />
              </div>

              <div className="scan-instructions">
                <h4>How to use:</h4>
                <ol>
                  <li>Open your phone's camera app</li>
                  <li>Point camera at the QR code above</li>
                  <li>Tap the notification/link that appears</li>
                  <li>The document scanner will open on your phone</li>
                  <li>Take a photo of your document</li>
                </ol>
              </div>

              <div className="session-status">
                <span className={`status-badge ${sessionStatus}`}>
                  {sessionStatus === "waiting" &&
                    "⏳ Waiting for phone scan..."}
                  {sessionStatus === "completed" &&
                    "✅ Document uploaded from phone!"}
                  {sessionStatus === "expired" && "❌ Session expired"}
                </span>
              </div>
            </div>

            {uploadedImage && (
              <div className="uploaded-document">
                <h3>✅ Document Received from Phone!</h3>
                <div className="document-preview">
                  <div className="preview-placeholder">
                    <span>📄 document-from-phone.jpg</span>
                    <span>Successfully uploaded from mobile</span>
                  </div>
                </div>
                <div className="document-actions">
                  <button className="btn btn-success">💾 Save Document</button>
                  <button className="btn btn-secondary" onClick={resetScanner}>
                    📱 Scan Another
                  </button>
                </div>
              </div>
            )}

            <div className="session-actions">
              <button className="btn btn-outline" onClick={resetScanner}>
                ↻ Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentScanner;
