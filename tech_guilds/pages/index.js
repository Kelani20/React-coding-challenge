import React from 'react';
import PhotoGrid from '../src/app/components/PhotoGrid';

const HomePage = () => {
  console.log("Index.js is loaded"); // a basic log to ensure the file is being executed

  return (
    <div>
      <h1>Photo Gallery from Unsplash</h1>
      <PhotoGrid />
    </div>
  );
};

export default HomePage;
