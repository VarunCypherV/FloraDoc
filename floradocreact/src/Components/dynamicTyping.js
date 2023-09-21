// import React, { useState } from 'react';
// import styled from 'styled-components';

// // Define a styled component for the prescription container
// const PrescriptionContainer = styled.div`
//   background-color: #fff;
//   border: 2px solid #000;
//   padding: 20px;
//   width: 400px;
//   margin: 0 auto;
//   font-family: Arial, sans-serif;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
// `;

// // Define a styled component for the textarea
// const PrescriptionTextarea = styled.textarea`
//   width: 100%;
//   height: 150px;
//   padding: 10px;
//   margin-bottom: 10px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   resize: none;
//   font-family: 'Courier New', monospace;
// `;

// // Define a styled component for the button
// const PrescriptionButton = styled.button`
//   background-color: #007bff;
//   color: #fff;
//   border: none;
//   padding: 10px 20px;
//   border-radius: 4px;
//   cursor: pointer;
//   font-weight: bold;
// `;

// const DynamicTyping = () => {
//   const [text, setText] = useState("");

//   const handleTextChange = (e) => {
//     setText(e.target.value);
//   };

//   const handleDownload = () => {
//     // Create a Blob with the user's input
//     const blob = new Blob([text], { type: "text/plain" });

//     // Create a URL for the Blob
//     const url = URL.createObjectURL(blob);

//     // Create an anchor element for downloading
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "downloaded-text.txt";

//     // Trigger a click event on the anchor element
//     a.click();

//     // Clean up by revoking the URL
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <PrescriptionContainer>
//       <PrescriptionTextarea
//         rows="4"
//         value={text}
//         onChange={handleTextChange}
//         placeholder="Doctor's Prescription..."
//       />
//       <PrescriptionButton onClick={handleDownload}>Done</PrescriptionButton>
//     </PrescriptionContainer>
//   );
// };

// export default DynamicTyping;
import React, { useState } from 'react';
import styled from 'styled-components';
import { PDFDocument, rgb } from 'pdf-lib';

// Define a styled component for the prescription container
const PrescriptionContainer = styled.div`
  background-color: #fff;
  border: 2px solid #000;
  padding: 20px;
  width: 400px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

// Define a styled component for the textarea
const PrescriptionTextarea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
  font-family: 'Courier New', monospace;
`;

// Define a styled component for the button
const PrescriptionButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
`;

const DynamicTyping = () => {
  const [text, setText] = useState("");

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleDownload = async () => {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([400, 400]);
    
    // Add the text to the PDF page
    page.drawText(text, {
      x: 50,
      y: 350,
      size: 12,
      color: rgb(0, 0, 0),
    });

    // Serialize the PDF to bytes
    const pdfBytes = await pdfDoc.save();

    // Create a Blob from the bytes
    const blob = new Blob([pdfBytes], { type: "application/pdf" });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create an anchor element for downloading
    const a = document.createElement("a");
    a.href = url;
    a.download = "downloaded-text.pdf"; // Set the file name to .pdf

    // Trigger a click event on the anchor element
    a.click();

    // Clean up by revoking the URL
    URL.revokeObjectURL(url);
  };

  return (
    <PrescriptionContainer>
      <PrescriptionTextarea
        rows="4"
        value={text}
        onChange={handleTextChange}
        placeholder="Doctor's Prescription..."
      />
      <PrescriptionButton onClick={handleDownload}>Done</PrescriptionButton>
    </PrescriptionContainer>
  );
};

export default DynamicTyping;
