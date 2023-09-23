import React, { useRef, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

const Diagnosis = () => {
  const { token } = useAuth();
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [predictionResult, setPredictionResult] = useState("");
  const [cameraStream, setCameraStream] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [snapshot, setSnapshot] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);

    setUploadedImage(imageUrl);
  };

  const PrelimPredic = async () => {
    try {
      console.log(token);

      const requestData = {
        diagnosis: {
          disease_tag: predictionResult,
        },
        // Add other JSON data fields as needed
        // field_name: field_value,
      };

      const headers = {
        Authorization: `Token ${token}`,
        "ngrok-skip-browser-warning": "69420",
        "Content-Encoding": "gzip, deflate, br",
        "Content-type":
          "multipart/form-data; boundary=----WebKitFormBoundaryD5jeZoBNqMSjAUUy", // Set the content type to "application/json"
      };

      const response = await axios.post(
        "https://9dac-49-205-81-55.ngrok-free.app/prelim/",
        requestData,
        { headers }
      );

      // Handle the response here
      console.log("Response data:", response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleConfirm = () => {
    PrelimPredic();
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
    }
  };

  const retakeSnapshot = () => {
    setSnapshot(null);
    initCamera();
  };

  useEffect(() => {
    const runObjectDetection = async () => {
      console.log("Custom model going to load.");
      const model = await tf.loadLayersModel(
        "https://raw.githubusercontent.com/VarunCypherV/FloraDoc/main/Model4/model.json"
      );
      console.log("Custom model loaded.");
      if (uploadedImage || snapshot) {
        const img = new Image();
        img.src = uploadedImage || snapshot;
        img.onload = async () => {
          const canvas = document.createElement("canvas");
          canvas.width = 256;
          canvas.height = 256;
          const ctx = canvas.getContext("2d");

          ctx.drawImage(img, 0, 0, 256, 256);

          const tensor = tf.browser.fromPixels(canvas);

          const normalizedImage = tensor.div(255.0);

          const inputTensor = normalizedImage.expandDims(0);

          const predictions = await model.predict(inputTensor).data();

          const classLabels = [
            "Applehealthy",
            "Applerust",
            "Applescab",
            "Apple_black_rot",
            "Corncommon_rust",
            "Corngray_leaf_spot",
            "Cornhealthy",
            "Cornnorthern_leaf_blight",
            "Grapeblack_measles",
            "Grapeblack_rot",
            "Grapehealthy",
            "Grapeleaf_blight",
            "Potatoearly_blight",
            "Potatohealthy",
            "Potatolate_blight",
            "Ricebrown_spot",
            "Ricehispa",
            "Riceleaf_blast",
            "Riceneck_blast",
            "Rice_healthy",
            "Sugarcanebacterial_blight",
            "Sugarcanehealthy",
            "Sugarcanered_rot",
            "Sugarcanered_stripe",
            "Sugarcanerust",
            "Teaalgal_leaf",
            "Teaanthracnose",
            "Teabird_eye_spot",
            "Teabrown_blight",
            "Teahealthy",
            "Teared_leaf_spot",
            "Tomatobacterial_spot",
            "Tomatoearly_blight",
            "Tomatohealthy",
            "Tomatolate_blight",
            "Tomatoleaf_mold",
            "Tomatomosaic_virus",
            "Tomatoseptoria_leaf_spot",
            "Tomatospider_mites",
            "Tomatotarget_spot",
            "Tomatoyellow_leaf_curl_virus",
            "Wheatbrown_rust",
            "Wheathealthy",
            "Wheatseptoria",
            "Wheat__yellow_rust",
          ];

          const maxIndex = predictions.indexOf(Math.max(...predictions));

          setPredictionResult(classLabels[maxIndex]);
        };
      }
    };

    runObjectDetection();

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

      {showCamera ? (
        <div>
          <button onClick={takeSnapshot}>Take Snapshot</button>
          <button onClick={closeCamera}>Close Camera</button>
        </div>
      ) : (
        <button onClick={initCamera}>Open Camera</button>
      )}

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
