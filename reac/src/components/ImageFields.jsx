import React from "react";

const ImageFields = ({ imageFields, addImageField, removeImageField, handleImageChange }) => {
  return (
    <div>
      {imageFields.map((field, index) => (
        <div key={field.id} className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Image {index + 1}:
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleImageChange(index, e)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          />
          <button
            type="button"
            className="mt-2 text-red-500"
            onClick={() => removeImageField(index)}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addImageField}
        className="mt-2 text-indigo-500"
      >
        Add Image Field
      </button>
    </div>
  );
};

export default ImageFields;
