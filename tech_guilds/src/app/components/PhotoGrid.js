import React, { useEffect, useState, useRef } from 'react';
import { fetchPhotos } from '../lib/unsplash';
import Lightbox from './Lightbox';

const PhotoGrid = () => {
  const [photos, setPhotos] = useState([]); // store list of photos
  const [page, setPage] = useState(1); // keep track of current page for API

  const [selectedPhoto, setSelectedPhoto] = useState(null); //state to manage selected photo for lightbox
  const [error, setError] = useState(null); //catch errors

  const loader = useRef(null);

  // Function to handle infinite scrolling using Intersection Observer 
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      // Trigger a page update if the loader div is intersecting (visible on screen)
      if (entries[0].isIntersecting) {
        setPage(prevPage => prevPage + 1);  // update page state to fetch next set of photos
      }
    }, { threshold: 1.0 }); //which means the loader must be fully visible before more photos are fetched (edit as required,0.5)

    if (loader.current) {
      observer.observe(loader.current);
    }

    // Cleanup function to remove the observer
    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, []);

  // Function to load photos from Unsplash API
  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const newPhotos = await fetchPhotos(page);
        setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]); // append the new photos to the existing photos/array
      } catch (error) {
        setError('Failed to load photos.'); // error message
      }
    };
    loadPhotos();
  }, [page]);

  const handlePhotoClick = photo => {
    console.log('Photo clicked:', photo);
    setSelectedPhoto(photo);
    console.log('Selected Photo after set:', selectedPhoto);  // This log won't reflect the immediate update
  };
  
  useEffect(() => {
    console.log('Current selected photo state:', selectedPhoto);
  }, [selectedPhoto]);

  if (error) {
    return <div>Error: {error}</div>;  // error message
}
  //the w-full makes the image 100% of its container
  //h-auto makes height automatically to maintain aspect ratio
  //object-contain: makes sure the image scaled to be as large as possible while still being fully visible within its bounding box

  //responsive grid;
  //grid-cols-2: Sets a 2-column grid by default.
  //sm:grid-cols-3: Changes to 3 columns on small screens and up.
  //md:grid-cols-4: Changes to 4 columns on medium screens and up.
  //gap-4: Ensures there is space between the columns.
  //p-4: Adds padding around the grid.
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
        {photos.map(photo => (
          <div key={photo.id} className="w-full cursor-pointer" onClick={() => handlePhotoClick(photo)}>
            <img src={photo.urls.regular} alt={photo.description || 'Unsplash Photo'} className="w-full h-auto object-contain" />
          </div>
        ))}
        <div ref={loader} className="col-span-full text-center">Loading more photos...</div>
      </div>
      {selectedPhoto && <Lightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />}
    </>
  );
};

export default PhotoGrid;
