import React from "react";

const TemplateSelector = ({ selectedTemplate, setSelectedTemplate, templates }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Template</label>
      <select
        value={selectedTemplate}
        onChange={(e) => setSelectedTemplate(e.target.value)}
        className="mt-1 p-2 border rounded w-full"
      >
        <option value="">Select a template</option>
        {templates.map((template) => (
          <option key={template.id} value={template.id}>
            {template.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TemplateSelector;