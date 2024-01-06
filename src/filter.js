/*import React, { useState, useRef, useEffect } from 'react';

const App = () => {
  const fileInputRef = useRef();
  const [selectedImage, setSelectedImage] = useState();
  const [originalImage, setOriginalImage] = useState();
  const [saturation, setSaturation] = useState(100); // for saturation
  const [bAndW, setbAndW] = useState(false); // for b&w
  const [contrast, setContrast] = useState(100); // for contrast
  const [savedImages,setSavedImages]=useState([]);


  // for saving the edited image .
  useEffect(() => {
    if (selectedImage) {
      const newSavedImages = [...savedImages];
      newSavedImages.push({
        id: Date.now(),
        url: selectedImage,
      });
      setSavedImages(newSavedImages);
      localStorage.setItem('savedImages', JSON.stringify(newSavedImages));
    }
  }, [selectedImage]);
  

  useEffect(() => {
    // Save edited image state to local storage on update
    if (selectedImage) {
      localStorage.setItem('editedImage', JSON.stringify(selectedImage));
    }
  }, [selectedImage]);

  useEffect(() => {
    const savedImagesData = JSON.parse(localStorage.getItem('savedImages')) || [];
    setSavedImages(savedImagesData);
  }, []);
  
  useEffect(() => {
    // Try retrieving saved image data
    const savedImageData = localStorage.getItem('editedImage');
    if (savedImageData) {
      const imageURL = `data:image/png;base64,${savedImageData}`;
      setSelectedImage(imageURL);
    }
  }, []);
  
  
  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImage(imageUrl);
      setOriginalImage(imageUrl); // Store original image for reset
      setbAndW(false); // Reset to color when a new image is selected
    }
  };

  const handleReset = () => {
    setSelectedImage(originalImage);
    setSaturation(100);
    setbAndW(false);
    setContrast(100);
  };

  const handleSaveImage = () => {
  const editedImageData = selectedImage.split(',')[1];
  const base64Image = btoa(atob(editedImageData)); // converting to base64
  const savedImage = {
    id: Date.now(),
    timestamp: Date.now(),
    base64Image,
  };

  // Get existing saved images from local storage
  const savedImagesData = JSON.parse(localStorage.getItem('savedImages')) || [];

  // Add the new saved image to the array
  savedImagesData.push(savedImage);

  // Save the updated saved images data to local storage
  localStorage.setItem('savedImages', JSON.stringify(savedImagesData));

  alert('Image saved successfully!');
};


  const handleSaturationChange = (amount) => {
    // applying saturation with limits
    setSaturation(Math.max(0, Math.min(100, saturation + amount)));
  };

  const handlebAndWClick = () => {
    // black and white filter
    setbAndW(!bAndW);
  };

  const handleContrastChange = (amount) => {
    // Update contrast with limits
    setContrast(Math.max(0, Math.min(100, contrast + amount)));
  };

  const buttonStyle = {
    backgroundColor: 'black',
    color: 'white',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    borderRadius: '20px',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '10px 20px',
    margin: '10px',
  };

  return (
    <div style={{ position: 'relative' }}>
      {selectedImage && (
        <div style={{ margin: '200px', border: '20px solid', borderRadius: '8px', padding: '20px', textAlign: 'center', boxSizing: 'border-box' }}>
          <p>Edited Image:</p>
          <div style={{ maxWidth: '100%', maxHeight: '400px', overflow: 'hidden', margin: '0 auto', filter: bAndW ? 'grayscale(100%)' : `saturate(${saturation}%) contrast(${contrast}%)` }}>
            <img src={selectedImage} alt='edited' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <button onClick={handleReset} style={{ ...buttonStyle }}>
              Reset
            </button>
            <button onClick={handleSaveImage} style={{ ...buttonStyle }}>
              Save
            </button>
          </div>
        </div>
      )}
      <div style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: 'rgba(0,0,0,0.9)' }}>
        <input ref={fileInputRef} onChange={handleFileUpload} style={{ display: 'none' }} type='file' />
        <button
          onClick={() => fileInputRef.current.click()}
          style={{ ...buttonStyle }}
        >
          <img src={process.env.PUBLIC_URL + '/images/upload_button.png'} style={{ maxHeight: '60px' }} alt='upload-file' />
        </button>
        <button
          onClick={handleSaturationChange}
          style={{
            marginTop: '10px',
            backgroundColor: 'black',
            color: 'white',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
            borderRadius: '20px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <img src={process.env.PUBLIC_URL + '/images/saturation.jpeg'} style={{ maxHeight: '60px' }} alt='saturation-img' />
        </button>
        <button
          onClick={handlebAndWClick}
          style={{
            marginTop: '10px',
            backgroundColor: 'black',
            color: 'white',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
            borderRadius: '20px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <img src={process.env.PUBLIC_URL + '/images/round.gif'} style={{ maxHeight: '60px' }} alt='b&w-img' />
        </button>
        <button
          onClick={handleContrastChange}
          style={{
            marginTop: '10px',
            backgroundColor: 'black',
            color: 'white',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
            borderRadius: '20px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <img src={process.env.PUBLIC_URL + '/images/contrast.jpeg'} style={{ maxHeight: '60px' }} alt='contrast-img' />
        </button>
        <button 
        style={{
          marginTop: '10px',
          backgroundColor: 'transparent',
          color: 'white',
          textDecoration: 'none',
          display: 'inline-block',
          fontSize: '16px',
          borderRadius: '20px',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}>
          <img
            src={process.env.PUBLIC_URL + '/images/gallery.png'}
            style={{
              width: 'auto',
              height: 'auto',
              maxWidth: '100%',
              maxHeight: '60px',  
            }}
            alt='Gallery'
          />
        </button>
      </div>
    </div>
  );
};

export default App;*/
/*
const handleDownloadFiltered = () => {
  const imageElement = new Image();
  imageElement.crossOrigin = 'anonymous';

  imageElement.onload = () => {
    const Canvas = document.createElement('canvas');
    Canvas.width = imageElement.width;
    Canvas.height = imageElement.height;
    const context = Canvas.getContext('2d');
      if (bAndW) {
      context.filter = 'grayscale(100%)';
    } else {
      context.filter = `saturate(${saturation}%) contrast(${contrast}%)`;
    }

    context.drawImage(imageElement, 0, 0);

    const filteredImageDataUrl = Canvas.toDataURL('image/png');

    const downloadLink = document.createElement('a');
    downloadLink.href = filteredImageDataUrl;
    downloadLink.download = 'filtered_image.png';

    downloadLink.click();
  };

  // Set the source of the image element to the selected image
  imageElement.src = selectedImage;
  alert("Image downloaded successfully");
};*/