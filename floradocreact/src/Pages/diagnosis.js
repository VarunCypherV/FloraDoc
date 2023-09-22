import React, { useRef, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { PDFDocument, rgb } from "pdf-lib";

const Diagnosis = (props) => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null); // Added video reference
  const [uploadedImage, setUploadedImage] = useState(null);
  const [predictionResult, setPredictionResult] = useState("");
  const [cameraStream, setCameraStream] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [snapshot, setSnapshot] = useState(null);
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
    props.onImageUpload(imageUrl);
  };

  const handleConfirm = () => {
    // Call the onConfirm function from the parent component
    props.onConfirm(predictionResult);
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
      console.error("Error opening camera:", error);
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
        videoRef.current.style.display = "none";
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
      const model = await tf.loadLayersModel('https://raw.githubusercontent.com/VarunCypherV/FloraDoc/main/Model4/model.json');
      console.log('Custom model loaded.');


      // If an image has been uploaded or a snapshot is available, proceed with detection
      if (uploadedImage || snapshot) {
        // Load the image for prediction (either uploaded or snapshot)
        const img = new Image();
        img.src = uploadedImage || snapshot;
        img.onload = async () => {
          // Ensure the image has the desired dimensions (256x256)

          const canvas = document.createElement('canvas');
          canvas.width = 256;
          canvas.height = 256;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, 256, 256);
      
          // Convert the canvas to a TensorFlow tensor
          const tensor = tf.browser.fromPixels(canvas);

          // Normalize the pixel values to be between 0 and 1
          const normalizedImage = tensor.div(255.0);

          // Expand dimensions to match the model's input shape
          const inputTensor = normalizedImage.expandDims(0);

          // Make predictions
          const predictions = await model.predict(inputTensor).data();
          console.log(predictions);
          
          // Define the class labels
          const classLabels = ['Applehealthy',
          'Applerust',
          'Applescab',
          'Apple_black_rot',
          'Corncommon_rust',
          'Corngray_leaf_spot',
          'Cornhealthy',
          'Cornnorthern_leaf_blight',
          'Grapeblack_measles',
          'Grapeblack_rot',
          'Grapehealthy',
          'Grapeleaf_blight',
          'Potatoearly_blight',
          'Potatohealthy',
          'Potatolate_blight',
          'Ricebrown_spot',
          'Ricehispa',
          'Riceleaf_blast',
          'Riceneck_blast',
          'Rice_healthy',
          'Sugarcanebacterial_blight',
          'Sugarcanehealthy',
          'Sugarcanered_rot',
          'Sugarcanered_stripe',
          'Sugarcanerust',
          'Teaalgal_leaf',
          'Teaanthracnose',
          'Teabird_eye_spot',
          'Teabrown_blight',
          'Teahealthy',
          'Teared_leaf_spot',
          'Tomatobacterial_spot',
          'Tomatoearly_blight',
          'Tomatohealthy',
          'Tomatolate_blight',
          'Tomatoleaf_mold',
          'Tomatomosaic_virus',
          'Tomatoseptoria_leaf_spot',
          'Tomatospider_mites',
          'Tomatotarget_spot',
          'Tomatoyellow_leaf_curl_virus',
          'Wheatbrown_rust',
          'Wheathealthy',
          'Wheatseptoria',
          'Wheat__yellow_rust'];

          // Find the index with the highest probability
          const maxIndex = predictions.indexOf(Math.max(...predictions));

    // Set the predicted class
    setPredictionResult(classLabels[maxIndex]);
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
      {uploadedImage && (
        <img
          src={uploadedImage}
          alt="Uploaded"
          style={{ maxWidth: "100%", maxHeight: "300px" }}
        />
      )}

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
        style={{
          maxWidth: "100%",
          maxHeight: "300px",
          display: showCamera ? "block" : "none",
        }}
        autoPlay
        playsInline
        muted
      />

      {/* Display Snapshot */}
      {snapshot && (
        <div>
          <img
            src={snapshot}
            alt="Snapshot"
            style={{ maxWidth: "100%", maxHeight: "300px" }}
          />
          <button onClick={retakeSnapshot}>Retake</button>
        </div>
      )}
      <button onClick={handleConfirm}>Confirm</button>
      <div>{predictionResult}</div>
      
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
