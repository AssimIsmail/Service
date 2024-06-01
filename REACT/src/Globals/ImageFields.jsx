import React from "react";

const ImageFields = ({ imageFields, handleImageChange, addImageField, removeImageField, selectedTemplate }) => {
  return (
    <div>
      {imageFields.map((field, index) => (
        <div key={field.id} className="mb-4 flex items-center">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Template  {index + 1}:</label>
            <input
              type="file"
              multiple
              onChange={(e) => handleImageChange(index, e)}
              required={!selectedTemplate}
              className="mt-1 p-2 border rounded w-full bg-gray-200 text-black"
            />
          </div>
          <button
            type="button"
            onClick={() => removeImageField(index)}
            className="ml-4 mt-6 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addImageField}
        className="mt-4 bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded w-full"
      >
        Add More Images
      </button>
    </div>
  );
};

export default ImageFields;