import React, { useState } from "react";
import "../CSS/WelcomeScreen.css";
import FieldPanel from "./Fieldpanel"; 
import WelcomeScreenPanel from "./WelcomeScreenEdit";

const initialSteps = [
  { id: 1, title: "Welcome screen", content: "This is the description of our form" },
  { id: 2, title: "Enter your name", content: "Please enter your name and phone number" },
  { id: 3, title: "Enter your email", content: "Please enter your email and description" }, 
];

const FormEditor = () => {
  const [steps, setSteps] = useState(initialSteps);
  const [selectedStep, setSelectedStep] = useState(steps[0]);
  const [isFieldPanelVisible, setFieldPanelVisible] = useState(false);
  const [isWelcomePanelVisible, setWelcomePanelVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: "Welcome screen",
    description: "This is the description of our form",
    image: null,
    box1Color: "#ff0000",
    box2Color: "#00ff00",
    box3Color: "#0000ff",
    name: "",      
    phone: "",     
    email: "",  
    emailDescription: "",  
    emailError: "",
    phoneError: "",
  });
  const [saveMessage, setSaveMessage] = useState("");  

  const handleStepClick = (step) => {
    setSelectedStep(step);
    if (step.id === 1) {
      setWelcomePanelVisible(true);
    }
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setFormData((prev) => ({ ...prev, name }));
  };

  const handlePhoneChange = (e) => {
    const phone = e.target.value;
    setFormData((prev) => ({ ...prev, phone }));

    const phoneRegex = /^\d{10}$/;  
    setFormData((prev) => ({
      ...prev,
      phoneError: phoneRegex.test(phone) ? "" : "Phone number must be 10 digits",
    }));
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setFormData((prev) => ({ ...prev, email }));

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setFormData((prev) => ({
      ...prev,
      emailError: emailRegex.test(email) ? "" : "Invalid email format",
    }));
  };

  const handleEmailDescriptionChange = (e) => {
    const emailDescription = e.target.value;
    setFormData((prev) => ({ ...prev, emailDescription }));
  };

  const handleSave = () => {
    if (!formData.emailError && formData.email && formData.emailDescription) {
      setSaveMessage("Email and description saved successfully!");
    } else {
      setSaveMessage("Please enter a valid email and description.");
    }
    setTimeout(() => setSaveMessage(""), 3000);
  };

  const handleSave2 = () => {
    if (!formData.phoneError && formData.phone && formData.name) {
      setSaveMessage("Details saved successfully!");
    } else {
      setSaveMessage("Please fill the whole form.");
    }
    setTimeout(() => setSaveMessage(""), 3000);
  };

  const toggleFieldPanel = () => {
    setFieldPanelVisible(!isFieldPanelVisible);
  };

  return (
    <div className="form-editor-container">
      <div className="sidebar">
        <h3>Form Editor</h3>
        <div className="steps">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`step ${selectedStep.id === step.id ? "active" : ""}`}
              onClick={() => handleStepClick(step)}
            >
              {step.title}
            </div>
          ))}
          <button onClick={toggleFieldPanel} className="add-step-btn">
            + Add field
          </button>
        </div>
      </div>

      <div className="preview-section">
        <h2>{formData.title || "Welcome screen"}</h2>
        <p>{formData.description || "This is the description of our form"}</p>

        {selectedStep.id === 1 && (
          <>
            <button className="start-button">Start</button>
            <p className="start-hint">press Enter ⏎</p>
            <div className="color-blocks">
              <div className="color-block" style={{ backgroundColor: formData.box1Color }}></div>
              <div className="color-block" style={{ backgroundColor: formData.box2Color }}></div>
              <div className="color-block" style={{ backgroundColor: formData.box3Color }}></div>
            </div>

            {formData.image && (
              <div className="image-preview">
                <img src={formData.image} alt="Preview" />
              </div>
            )}
          </>
        )}

        {selectedStep.id === 2 && (
          <>
            <input
              type="text"
              value={formData.name}
              onChange={handleNameChange}
              placeholder="Enter your name"
              className="name-input"
            />
            {formData.name.trim() === "" && (
              <p className="name-error">Name cannot be empty</p>
            )}
            <input
              type="text"
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="Enter your phone number"
              className="phone-input"
            />
            {formData.phoneError && (
              <p className="phone-error">{formData.phoneError}</p>
            )}
            <button className="save-button" onClick={handleSave2}>
              Save
            </button>
            {saveMessage && (
              <p className="save-message">{saveMessage}</p>
            )}
          </>
        )}

        {selectedStep.id === 3 && (
          <>
            <p className="Email-text">You will be contacted Accordingly</p>
            <input
              type="email"
              value={formData.email}
              onChange={handleEmailChange}
              placeholder="@gmail.com / @outlook.com / @yahoo.com"
              className="email-input"
            />
            {formData.emailError && (
              <p className="email-error">{formData.emailError}</p>
            )}
            <textarea
              value={formData.emailDescription}
              onChange={handleEmailDescriptionChange}
              placeholder="Add a description for the next step"
              className="description-input"
            />
            {formData.emailDescription && (
              <p className="email-description">{formData.emailDescription}</p>
            )}
            <button className="save-button" onClick={handleSave}>
              Save
            </button>
            {saveMessage && (
              <p className="save-message">{saveMessage}</p>
            )}
          </>
        )}
      </div>

      <FieldPanel
        isVisible={isFieldPanelVisible}
        onClose={toggleFieldPanel}
        onEmailSelect={() => setSelectedStep(steps[2])}
        onPhoneSelect={() => setSelectedStep(steps[1])}  
      />

      <WelcomeScreenPanel
        isVisible={isWelcomePanelVisible}
        onClose={() => setWelcomePanelVisible(false)}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default FormEditor;