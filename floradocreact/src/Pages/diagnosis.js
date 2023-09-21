import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { PDFDocument, rgb } from 'pdf-lib';


const Diagnosis = () => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null); // Added video reference
  const [uploadedImage, setUploadedImage] = useState(null);
  const [predictionResult, setPredictionResult] = useState('');
  const [cameraStream, setCameraStream] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [snapshot, setSnapshot] = useState(null);

  const generatePDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([300, 200]); // Customize the page size as needed
    const { width, height } = page.getSize();
  
    const fontSize = 20;
    const x = 50;
    const y = height - 50;
    console.log(predictionResult);
    page.drawText(`${predictionResult}`, {
      x,
      y,
      size: fontSize,
      color: rgb(0, 0, 0), // Black color
    });
  
    const pdfBytes = await pdfDoc.save();
  
    // Create a Blob from the PDF data
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
  
    // Create a URL for the Blob
    const pdfUrl = URL.createObjectURL(pdfBlob);
  
    // Create an anchor element to trigger the download
    const downloadLink = document.createElement('a');
    downloadLink.href = pdfUrl;
    downloadLink.download = 'prediction.pdf';
    downloadLink.click();
  };

  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
  };

  const initCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream);
      setShowCamera(true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error('Error opening camera:', error);
    }
  };

  const closeCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
      setShowCamera(false);
      setSnapshot(null);
    }
  };

  const takeSnapshot = async () => {
    if (cameraStream) {
      const videoTrack = cameraStream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(videoTrack);
      const blob = await imageCapture.takePhoto();
      const imageUrl = URL.createObjectURL(blob);
      setSnapshot(imageUrl);
      closeCamera();
      setUploadedImage(imageUrl);

      if (videoRef.current) {
        videoRef.current.style.display = 'none';
      }
    }
  };

  const retakeSnapshot = () => {
    setSnapshot(null);
    initCamera();
  };

  useEffect(() => {
    const runObjectDetection = async () => {
      // Load your custom TensorFlow.js model
      console.log('Custom model going to load.');
      const model = await tf.loadLayersModel('https://raw.githubusercontent.com/VarunCypherV/ObjectDetectionReactApp/main/model.json');
      console.log('Custom model loaded.');

      // If an image has been uploaded or a snapshot is available, proceed with detection
      if (uploadedImage || snapshot) {
        // Load the image for prediction (either uploaded or snapshot)
        const img = new Image();
        img.src = uploadedImage || snapshot;
        img.onload = async () => {
          // Ensure the image has the desired dimensions (256x256)
          const resizedImage = tf.image.resizeBilinear(tf.browser.fromPixels(img), [256, 256]);

          // Normalize the pixel values to be between 0 and 1
          const normalizedImage = resizedImage.div(255.0);

          // Expand dimensions to match the model's input shape
          const inputTensor = normalizedImage.expandDims(0);

          // Make predictions
          const predictions = await model.predict(inputTensor).data();

          // Define the class labels
          const classLabels = ['buildings', 'forest', 'glacier', 'mountain', 'sea', 'street'];

          // Find the index with the highest probability
          const maxIndex = predictions.indexOf(Math.max(...predictions));

          // Set the predicted class
          setPredictionResult('Predicted Class: ' + classLabels[maxIndex]);
        };
      }
    };

    runObjectDetection();

    // Cleanup function to close the camera when the component unmounts
    return () => {
      closeCamera();
    };
  }, [uploadedImage, snapshot]);

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {uploadedImage && <img src={uploadedImage} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '300px' }} />}

      {/* Camera Controls */}
      {showCamera ? (
        <div>
          <button onClick={takeSnapshot}>Take Snapshot</button>
          <button onClick={closeCamera}>Close Camera</button>
        </div>
      ) : (
        <button onClick={initCamera}>Open Camera</button>
      )}

      {/* Live Camera Preview */}
      <video
        ref={videoRef}
        style={{ maxWidth: '100%', maxHeight: '300px', display: showCamera ? 'block' : 'none' }}
        autoPlay
        playsInline
        muted
      />

      {/* Display Snapshot */}
      {snapshot && (
        <div>
          <img src={snapshot} alt="Snapshot" style={{ maxWidth: '100%', maxHeight: '300px' }} />
          <button onClick={retakeSnapshot}>Retake</button>
        </div>
      )}

      <div>{predictionResult}</div>
      <button onClick={generatePDF}>Generate PDF</button>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          margin: "auto",
          textAlign: "center",
          zIndex: 9,
          height: 800,
          width: 800,
        }}
      />
    </div>
  );
};

export default Diagnosis;
