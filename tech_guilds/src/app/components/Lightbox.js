import React from 'react';

const Lightbox = ({ photo, onClose }) => {
  if (!photo) return null;

  return (
    <div style={{ zIndex: 1000 }} className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center p-4">
      <button onClick={onClose} className="absolute top-0 right-0 p-4 text-white text-3xl focus:outline-none" aria-label="Close">&times;</button>
      <div className="bg-white p-5 rounded-lg shadow-lg overflow-auto">
        <img src={photo.urls.regular} alt={photo.description} className="max-w-full h-auto rounded-sm"/>
        <p className="text-gray-800 text-lg">{photo.description}</p>
      </div>
    </div>
  );
};

export default Lightbox;
