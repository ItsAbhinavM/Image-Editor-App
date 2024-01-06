import React, { useState, useRef, useEffect } from 'react';

const App = () => {
  const fileInputRef = useRef();
  const [selectedImage, setSelectedImage] = useState();
  const [originalImage, setOriginalImage] = useState();
  const [saturation, setSaturation] = useState(100);
  const [bAndW, setBAndW] = useState(false);
  const [contrast, setContrast] = useState(100);
  const [showGallery,setShowGallery]=useState(false);
  const [editedImages,setEditedImages]= useState([]);
  const [currentImageIndex,setCurrentImageIndex]=useState(0);


  /*useEffect(() => {
  // LOADING saved image from local storage
  const editedImage = JSON.parse(localStorage.getItem('editedImage'));
  if (editedImage) {
    setSelectedImage(editedImage.url);
    setSaturation(editedImage.saturation);
    setBAndW(editedImage.bAndW);
    setContrast(editedImage.contrast);
  } else {
    const selectedImage = localStorage.getItem('selectedImage');
    if (selectedImage) {
      setSelectedImage(selectedImage);
    } else {
      const originalImage=localStorage.getItem('originalImage');
      if (originalImage) {
        selectedImage(originalImage);
      }
    }
  }

  // LOADING saved gallery images from local storage
  const savedGalleryImages = JSON.parse(localStorage.getItem('galleryImages'));
  if (savedGalleryImages) {
    setEditedImages(savedGalleryImages);
  }
}, []);*/
useEffect(() => {
  // Load saved image information from localStorage
  const savedImage = JSON.parse(localStorage.getItem('editedImage'));
  if (savedImage) {
    setSelectedImage(savedImage.url);
    setSaturation(savedImage.saturation);
    setBAndW(savedImage.bAndW);
    setContrast(savedImage.contrast);
  }
}, []); // Run only on component mount

useEffect(() => {
  // Save edited image information to localStorage
  if (selectedImage) {
    localStorage.setItem('editedImage', JSON.stringify({
      url: selectedImage,
      saturation,
      bAndW,
      contrast,
    }));
  }
}, [selectedImage, saturation, bAndW, contrast]);


  useEffect(() => {
    // SAVING the edited image to local stroage
    if (selectedImage) {
      localStorage.setItem('editedImage', JSON.stringify(selectedImage));
    }
  }, [selectedImage]);

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImage(imageUrl);
      setOriginalImage(imageUrl);
      setBAndW(false);

      localStorage.setItem('originalImage',imageUrl);
    }
  };

  const handleReset = () => {
    setSelectedImage(originalImage);
    setSaturation(100);
    setBAndW(false);
    setContrast(100);
  };

  /*const handleSaveImage = () => {
    if (selectedImage) {
      const updatedImages = [
        ...editedImages,
        { url: selectedImage, saturation, bAndW, contrast }
      ];
      setCurrentImageIndex(updatedImages.length - 1);
      setEditedImages(updatedImages);
      localStorage.setItem('galleryImages', JSON.stringify(updatedImages));
      localStorage.setItem('editedImages',JSON.stringify({url:selectedImage,saturation,bAndW,contrast}));
    }
    setShowGallery(false);
    alert('Image saved successfully!');
  };*/

  const handleSaveImage = () => {
    if (selectedImage) {
      const updatedImages = [
        ...editedImages,
        { url: selectedImage, saturation, bAndW, contrast }
      ];
      setCurrentImageIndex(updatedImages.length - 1);
      setEditedImages(updatedImages);
      localStorage.setItem('galleryImages', JSON.stringify(updatedImages));
      alert('Image saved successfully!');
    }
    setShowGallery(false);
  };
  

  const handleSaturationClick = () => {
    setSaturation(saturation === 100 ? 200 : 100);
  };

  const handleBAndWClick = () => {
    setBAndW(!bAndW);
  };

  const handleContrast = () => {
    setContrast(contrast === 100 ? 200 : 100);
  };

  const handleShowImage = () => {
    if (selectedImage) {
      setShowGallery(!showGallery);
    }
  };

  const handleDownloadFiltered = () => {
    const imageElement = new Image();
    imageElement.crossOrigin = 'anonymous';

    imageElement.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = imageElement.width;
      canvas.height = imageElement.height;
      const context = canvas.getContext('2d');

      if (bAndW) {
        context.filter = 'grayscale(100%)';
      } else {
        context.filter = `saturate(${saturation}%) contrast(${contrast}%)`;
      }

      context.drawImage(imageElement, 0, 0);

      const filteredImageDataUrl = canvas.toDataURL('image/png');

      const downloadLink = document.createElement('a');
      downloadLink.href = filteredImageDataUrl;
      downloadLink.download = 'filtered_image.png';

      downloadLink.click();
    };

    imageElement.src = selectedImage;
    alert('Are you sure you want to download !');
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
        <button onClick={() => fileInputRef.current.click()} style={{ ...buttonStyle }}>
          <img src={process.env.PUBLIC_URL + '/images/upload_button.png'} style={{ maxHeight: '60px' }} alt='upload-file' />
        </button>
        <button onClick={handleSaturationClick} style={{ ...buttonStyle }}>
          <img src={process.env.PUBLIC_URL + '/images/saturation.jpeg'} style={{ maxHeight: '60px' }} alt='saturation-img' />
        </button>
        <button onClick={handleBAndWClick} style={{ ...buttonStyle }}>
          <img src={process.env.PUBLIC_URL + '/images/round.gif'} style={{ maxHeight: '60px' }} alt='b&w-img' />
        </button>
        <button onClick={handleContrast} style={{ ...buttonStyle }}>
          <img src={process.env.PUBLIC_URL + '/images/contrast.jpeg'} style={{ maxHeight: '60px' }} alt='contrast-img' />
        </button>
        <button onClick={handleDownloadFiltered} style={{ ...buttonStyle }}>
          <img
            src={process.env.PUBLIC_URL + '/images/download.png'}
            style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '60px' }}
            alt='Download'
          />
        </button>
        <button onClick={handleShowImage} style={{ ...buttonStyle }}>
          Gallery
        </button>

      </div>
      {showGallery && (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px', background: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
      <button onClick={() => setShowGallery(false)}>Close Gallery</button>
      {editedImages.map((image, index) => (
        <img
          key={index}
          src={image.url}
          alt={`edited-${index}`}
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '80vh',
            objectFit: 'contain',
            filter: image.bAndW ? 'grayscale(100%)' : `saturate(${image.saturation}%) contrast(${image.contrast}%)`,
            display: index === currentImageIndex ? 'block' : 'none',
          }}
        />
      ))}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? editedImages.length - 1 : prev - 1))}>Prev</button>
        <button onClick={() => setCurrentImageIndex((prev) => (prev === editedImages.length - 1 ? 0 : prev + 1))}>Next</button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};
export default App;