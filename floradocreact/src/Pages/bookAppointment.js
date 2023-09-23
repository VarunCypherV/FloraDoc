import React, { useEffect, useState } from "react";
import Header from "../Components/header";
import Footer from "../Components/footer";
import styled from "styled-components";
import logo from "../Assets/logo.png";
import { PDFDocument } from "pdf-lib";
import * as htmlToImage from "html-to-image";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import Diagnosis from "./diagnosis";

//farmer name : get user DONE
//model gives id that as diagnosis and uplaoded image : post req to prelim  :
// with res of abv Crop Name Crop Disease Disease Description in the prelim form for download
//on click book appointment open a modal with time and additional comments , :=> farmerappointments desiease tag , type choices
//,description , time

function BookAppointment() {
  const { token } = useAuth();
  const [userData, setUserData] = useState(null);
  const [recievedPredictionName, setrecievedPredictionName] = useState("");
 
  const fetchdata = async () => {
    try {
      const response = await axios.get(
        "https://9dac-49-205-81-55.ngrok-free.app/getuser/",
        {
          headers: {
            Authorization: `Token ${token}`,
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      setUserData(response.data[0]);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const handleBookAppointment = () => {
    alert("Appointment booked!");
  };

  const handleCancel = () => {
    alert("Appointment cancelled.");
  };

  const handleConfirm = (result) => {
    
    setrecievedPredictionName(result);
  
  };

  const handlePrint = async () => {
    const reportContainer = document.getElementById("report-container");
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([
      reportContainer.offsetWidth,
      reportContainer.offsetHeight,
    ]);
    const imageSrc = await htmlToImage.toPng(reportContainer);
    const image = await pdfDoc.embedPng(imageSrc);
    const { width, height } = page.getSize();
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: width,
      height: height,
    });
    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(pdfBlob);
    downloadLink.download = "report.pdf";
    downloadLink.click();
  };

  return (
    <>
      <Header />
      <div className="page-container">
        {userData ? ( 
          <>
            <ReportContainer id="report-container">
              <TitleContainer>AI PRELIMINARY DIAGNOSIS</TitleContainer>
              <FormContainer>
                <Row>
                  <Cell>
                    <div>Farmer Name</div>
                    <input
                      value={userData.user.username}
                      disabled={true}
                      type="text"
                      placeholder="Enter Name"
                    />
                  </Cell>
                </Row>
                <Row>
                  <Cell>
                    <CropImage src={logo} alt="Crop Image" />
                    <Diagnosis
                      onConfirm={handleConfirm}
                    />
                  </Cell>
                </Row>
                <Row>
                  <Cell>
                    <div>Crop Name</div>
                    <input value="Crop" disabled={true} type="text" />
                  </Cell>
                  <Cell>
                    <div>Disease</div>
                    <textarea
                      value={recievedPredictionName}
                      disabled={true}
                      type="text"
                    />
                  </Cell>
                </Row>
                <Row>
                  <Cell>
                    <div>Disease Description</div>
                    <input
                      value="Disease Description"
                      disabled={true}
                      type="text"
                    />
                  </Cell>
                </Row>
              </FormContainer>
            </ReportContainer>
            <ButtonContainer>
              <Button className="secondary-button" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                className="primary-button"
                onClick={handleBookAppointment}
              >
                Book Appointment
              </Button>
              <Button className="secondary-button" onClick={handlePrint}>
                Print Report (PDF)
              </Button>
            </ButtonContainer>
          </>
        ) : (
   
          <>
            <TitleContainer>
              Kindly login before using our services!
            </TitleContainer>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default BookAppointment;

const ReportContainer = styled.div`
  color: black;
  width: 100%;
  border: 2px solid black;
  font-family: "Courier", sans-serif;
  font-weight: 600;
  background-color: var(--offwhite);
`;

const TitleContainer = styled.div`
  font-size: var(--h1);
  letter-spacing: 0.1rem;
  text-align: center;
  padding: 0.5em;
  text-decoration: underline;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  &:first-child {
    border-top: 1px solid black;
  }
  &:last-child {
    border-bottom: none;
  }
`;

const Cell = styled.div`
  flex: 1;
  padding: 1em;
  border-right: 1px solid black;

  &:last-child {
    border-right: none;
  }

  input,
  textarea {
    font-family: "Courier", sans-serif;
    color: black;
    width: 100%;
    border: none;
    background-color: transparent;
    font-size: 1em;
    padding: 0.5em 0;
    resize: none;
    overflow: hidden;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 3em;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CropImage = styled.img`
  max-width: 60%;
  height: auto;
  margin: 0 auto;
  display: block;
`;