import React from "react";


const PersonalInfo = ({ userr, templates, currentImageIndex, handleClickPrevious, handleClickNext, service }) => {
  return (
    <div className="border p-4 min-h-52 items-center">
      <h1 className="text-lg font-bold mb-2">Information Personnelle</h1>
      <div className="flex items-center">
        <div
          className="h-14 w-14 rounded-full mr-2 cursor-pointer"
          style={{
            backgroundImage: `url('${userr && userr.image}')`,
            backgroundSize: "cover",
          }}
        ></div>
        <div>
          <p className="text-black hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
            {userr && `${userr.username} ${userr.lastname}`}
          </p>
        </div>
      </div>
      <div className="mt-4 w-96 ml-36">
        <div className="flex items-center justify-center">
          {templates &&
            templates.map((template, index) => (
              <div
                key={index}
                className={`max-w-full h-auto rounded-lg shadow-md overflow-hidden ${
                  index === currentImageIndex ? "block" : "hidden"
                }`}
                style={{ width: "400px", height: "300px" }}
              >
                <img
                  src={template.image}
                  alt={`Template ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
        </div>
        <div className="flex justify-between mt-2">
          <button
            onClick={handleClickPrevious}
            className="text-sm font-medium bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300 focus:outline-none"
          >
            Précédent
          </button>
          <button
            onClick={handleClickNext}
            className="text-sm font-medium bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300 focus:outline-none"
          >
            Suivant
          </button>
        </div>
      </div>
      <br />
      
      <div className="mt-4 ml-28">
        <div className="text-gray-700 text-lg leading-relaxed">
          <p className="mb-4">{service && service[0] && service[0].description}</p>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;