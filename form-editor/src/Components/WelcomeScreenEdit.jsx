import React, { useState } from "react";

const WelcomeScreenPanel = ({ isVisible, onClose, formData, setFormData }) => {
  const [imagePreview, setImagePreview] = useState(formData.image || null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  if (!isVisible) return null;

  return (
    <div className="welcome-screen-panel">
      <h2>Edit</h2>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Upload Image:
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </label>

      {imagePreview && (
        <>
          <img src={imagePreview} alt="Preview" className="image-preview" />
          <button onClick={handleRemoveImage} className="remove-image-button">
            Remove Image
          </button>
        </>
      )}

      <div className="color-picker-container">
        <label className="color-label">
          <input
            type="color"
            name="box1Color"
            value={formData.box1Color || "#ff0000"}
            onChange={handleInputChange}
            className="color-input"
          />
        </label>

        <label className="color-label">
          <input
            type="color"
            name="box2Color"
            value={formData.box2Color || "#00ff00"}
            onChange={handleInputChange}
            className="color-input"
          />
        </label>

        <label className="color-label">
          <input
            type="color"
            name="box3Color"
            value={formData.box3Color || "#0000ff"}
            onChange={handleInputChange}
            className="color-input"
          />
        </label>
      </div>

      <button onClick={onClose} className="close-button">Close</button>
    </div>
  );
};

export default WelcomeScreenPanel;







