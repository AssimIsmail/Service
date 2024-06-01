import React, { useState } from 'react';
import axios from 'axios';

const TemplateManager = () => {
  const [utilisateurId, setUtilisateurId] = useState(1);
  const [serviceId, setServiceId] = useState(1);
  const [imageFields, setImageFields] = useState([{ id: Date.now(), files: [] }]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('utilisateur_id', utilisateurId);
    formData.append('service_id', serviceId);

    imageFields.forEach(field => {
      field.files.forEach(file => {
        formData.append('images[]', file);
      });
    });

    try {
      const request = selectedTemplate
        ? axios.put(`http://127.0.0.1:8000/api/templates/${selectedTemplate.id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
        : axios.post('http://127.0.0.1:8000/api/templates', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });

      await request;
      console.log('Template saved successfully');
      resetForm();
    } catch (error) {
      console.error('There was an error saving the template!', error);
    }
  };

  const handleImageChange = (index, event) => {
    const newImageFields = [...imageFields];
    const newFiles = Array.from(event.target.files);
    const existingIndex = newImageFields.findIndex(field => field.files[0]?.name === newFiles[0]?.name);
    if (existingIndex !== -1) {
      newImageFields[existingIndex].files = newFiles;
    } else {
      newImageFields[index].files = newFiles;
    }
    
    setImageFields(newImageFields);
  };
  

  const addImageField = () => {
    setImageFields([...imageFields, { id: Date.now(), files: [] }]);
  };

  const removeImageField = (index) => {
    setImageFields(imageFields.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setUtilisateurId(1);
    setServiceId(1);
    setImageFields([{ id: Date.now(), files: [] }]);
    setSelectedTemplate(null);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {imageFields.map((field, index) => (
          <div key={field.id}>
            <label>Images {index + 1}:</label>
            <input
              type="file"
              multiple
              onChange={(e) => handleImageChange(index, e)}
              required={!selectedTemplate}
            />
            <button type="button" onClick={() => removeImageField(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addImageField}>
          Add More Images
        </button>
        <button type="submit">
          {selectedTemplate ? 'Update Template' : 'Add Template'}
        </button>
        {selectedTemplate && (
          <button type="button" onClick={resetForm}>
            Cancel Edit
          </button>
        )}
      </form>
    </div>
  );
};

export default TemplateManager;
