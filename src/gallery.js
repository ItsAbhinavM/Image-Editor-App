import React from 'react';

const Gallery = ({ savedImages, onImageClick }) => {
  return (
    <div>
      <h2>Gallery</h2>
      {savedImages.length > 0 ? (
        <ul>
          {savedImages.map((image) => (
            <li key={image.id}>
              <img
                src={image.url}
                alt={image.name}
                onClick={() => onImageClick(image)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No saved images yet. Edit an image to save it.</p>
      )}
    </div>
  );
};

export default Gallery;
