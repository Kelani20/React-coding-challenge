import React, { useEffect, useState } from 'react';
import { fetchPhotos } from '../lib/unsplash';

const PhotoGrid = () => {
  const [photos, setPhotos] = useState([]); // store list of photos
  const [page, setPage] = useState(1); //keep track of current page for api

  //using a function to handle infinite scrolling behavour (test)
  const handleScroll = async () => {
    //a check if user has scrolled bottom to page
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    setPage(prevPage => prevPage + 1);  // update page state to fetch next set of photos
  };

  useEffect(() => {
    //function to load photos from unsplash
    const loadPhotos = async () => {
      const newPhotos = await fetchPhotos(page); 
      setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);  // append the new photos to the existing photos/array
    };

    loadPhotos();
    window.addEventListener('scroll', handleScroll); //event listener to handle scroll

    //cleanup func to remove event listener when component unmounts
    return () => window.removeEventListener('scroll', handleScroll);  
  }, [page]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
      {photos.map(photo => (
        <div key={photo.id} className="w-full">
          <img src={photo.urls.regular} alt={photo.description || 'Unsplash Photo'} className="w-full h-auto" />
        </div>
      ))}
    </div>
  );
};

export default PhotoGrid;
