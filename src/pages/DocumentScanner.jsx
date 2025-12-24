import React, { useState } from "react";
import { rewardForScanning } from "../services/rewardService";

const DocumentScanner = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [documents, setDocuments] = useState(
    JSON.parse(localStorage.getItem("documents")) || []
  );

  /* ===================== HANDLE FILE UPLOAD ===================== */
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);

    if (selected.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(selected);
    } else {
      setPreview(null);
    }
  };

  /* ===================== SAVE DOCUMENT ===================== */
  const saveDocument = () => {
    if (!file) return;

    const type = file.type.includes("pdf") ? "pdf" : "receipt";

    const newDoc = {
      id: Date.now(),
      name: file.name,
      type,
      uploadedAt: new Date().toISOString()
    };

    const updated = [newDoc, ...documents];
    setDocuments(updated);
    localStorage.setItem("documents", JSON.stringify(updated));

    // Reward hook
    rewardForScanning(type);

    // Reset
    setFile(null);
    setPreview(null);
  };

  /* ===================== RENDER ===================== */
  return (
    <div className="app-container">
      <h1>Document Scanner</h1>

      <section className="planner-main">
        {/* ===================== UPLOAD ===================== */}
        <div className="planner-card">
          <h3>Upload Document</h3>

          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileChange}
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              style={{
                width: "100%",
                marginTop: "15px",
                borderRadius: "8px"
              }}
            />
          )}

          <button
            className="button"
            onClick={saveDocument}
            disabled={!file}
            style={{ marginTop: "15px" }}
          >
            Save Document
          </button>
        </div>

        {/* ===================== HISTORY ===================== */}
        <div className="planner-card">
          <h3>Uploaded Documents</h3>

          {documents.length === 0 ? (
            <p style={{ opacity: 0.6 }}>No documents uploaded yet.</p>
          ) : (
            <ul className="transaction-list">
              {documents.map((doc) => (
                <li key={doc.id} className="transaction income">
                  <span>{doc.name}</span>
                  <span>{doc.type.toUpperCase()}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default DocumentScanner;
