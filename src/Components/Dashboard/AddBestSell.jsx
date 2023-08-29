import React, { useState } from 'react';



const AddBestSell = () => {
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const updatedImages = [...productData.images];
      updatedImages[index].file = file;
      updatedImages[index].previewURL = reader.result;

      setProductData((prevState) => ({
        ...prevState,
        images: updatedImages
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
      uploadImageToImgBB(file)
        .then((response) => {
          const imageUrl = response.data.data.url;
          const updatedImages = [...productData.images];
          updatedImages[index].imageUrl = imageUrl;
          setProductData((prevState) => ({
            ...prevState,
            images: updatedImages
          }));
        })
        .catch((error) => {
          console.log(error);
          // Handle error if image upload fails
        });
    }
  };

  const uploadImageToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
      params: {
        key: 'cbfb7d8c5faf7c3480bcb78217e37287'
      }
    });

    return response;
  };

    const ima ="https://i.ibb.co/x1C6rs0/flash-1.webp"
  
    const [selectedImage, setSelectedImage] = useState(ima);
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };
  
  const images = [
    { id: 1, smallImage: "https://i.ibb.co/x1C6rs0/flash-1.webp", largeImage: "https://i.ibb.co/x1C6rs0/flash-1.webp" },
    { id: 2, smallImage:" https://i.ibb.co/3yVykxL/watch-2.webp",largeImage:" https://i.ibb.co/3yVykxL/watch-2.webp" },
    { id: 3, smallImage:"https://i.ibb.co/GFnQpds/watch-1.webp",largeImage:"https://i.ibb.co/GFnQpds/watch-1.webp" },
    // Add more image objects here
  ];

  return (
    <div className="p-4">
      <div className="flex flex-wrap justify-center">
        {images.map((image) => (
          <div
            key={image.id}
            className="w-32 h-32 m-2 cursor-pointer"
            onClick={() => handleImageClick(image.largeImage)}
          >
            <img src={image.smallImage} alt={`Small Image ${image.id}`} className="w-full h-full" />
          </div>
        ))}
      </div>
      <div className="mt-4">
        {selectedImage && (
          <img src={selectedImage} alt="Selected Image" className="w-full" />
        )}
      </div>
    </div>
  );
};

export default AddBestSell;