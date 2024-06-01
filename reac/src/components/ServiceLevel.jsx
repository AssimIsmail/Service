import React from "react";

const ServiceLevel = ({
  title,
  price,
  setPrice,
  duration,
  setDuration,
  revisions,
  setRevisions,
  description,
  setDescription,
}) => {
  return (
    <div className="p-4 border rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Prix</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder={`Prix du service ${title}`}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Durée par jour
        </label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder={`Durée du service ${title}`}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Nombre de révisions
        </label>
        <input
          type="number"
          value={revisions}
          onChange={(e) => setRevisions(e.target.value)}
          placeholder={`Nombre de révisions pour ${title}`}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Description {title}
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={`Description du service ${title}`}
          className="mt-1 p-2 border rounded w-full"
        ></textarea>
      </div>
    </div>
  );
};

export default ServiceLevel;
