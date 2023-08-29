import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


const AddProducts = () => {

  const initialProduct = {
    name: '',
    description: '',
    price: 0,
    category: '',
    color: '',
    sizes: [],
    rating: 0,
    reviews: [],
    images: []
  };

  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState(initialProduct);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  const {name, category,color,description,price,rating,sizes,reviews, images,code} = productData
 console.log(productData);
  const first= images[0]?.imageUrl
 const second= images[1]?.imageUrl
  const addProduct={
    name,code,
    color,sizes,reviews,
    category,images: [
      { id: 1, smallImage: first, largeImage: first },
      { id: 2, smallImage: second, largeImage: second }
    ],description,price,rating,
  }
  console.log('check',addProduct);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://h2t-server.vercel.app/products', addProduct)
    .then((response) => {
      // Handle successful response
      if(response.data){
        console.log(response.data);
        toast.success('Products Add')
      }
      console.log('Product data sent to MongoDB:', response.data);
      setProducts((prevState) => [...prevState, response.data]);
      setProductData(initialProduct);
    })
    .catch((error) => {
      // Handle error
      console.log('Error sending product data to MongoDB:', error);
    });
  };
  // console.log(productData);
  return (
    <div className="p-4">
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Product Name</span>
          </label>
          <input type="text"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleChange}
            placeholder="Product Name" className="input input-bordered input-accent w-full max-w-xs" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Product Code</span>
          </label>
          <input type="text"
            id="code"
            name="code"
            value={productData.code}
            onChange={handleChange}
            placeholder="# Product Code" className="input input-bordered input-accent w-full max-w-xs" />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={productData.description}
            onChange={handleChange}

            required
            className="input input-bordered input-accent w-full max-w-xs"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleChange}

            required
            className="input input-bordered input-accent w-full max-w-xs"
          />
        </div>
              <div>
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <select
            id="category"
            name="category"
            value={productData.category}
            onChange={handleChange}
            required
            className="select select-info w-full max-w-xs"
          >
            <option disabled selected>Select language</option>
            <option value="shoe">Shoe</option>
            <option value="wallet">Wallet</option>
            <option value="perfume">Perfume</option>
          </select>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Color</span>
          </label>
          <input
            type="text"
            id="color"
            name="color"
            value={productData.color}
            onChange={handleChange}
            required
            className="input input-bordered input-accent w-full max-w-xs"
          />
        </div>
        
        <div>
          <label className='label'>
            <span className='label-text'>Sizes</span>
          </label>
          {productData.sizes.map((size, index) => (
            <input
              key={index}
              type="text"
              name="sizes"
              value={size.size}
              className="input input-bordered input-accent max-w-xs"
              onChange={(e) => {
                const updatedSizes = [...productData.sizes];
                updatedSizes[index].size = e.target.value;
                setProductData((prevState) => ({
                  ...prevState,
                  sizes: updatedSizes
                }));
              }}
              required
            />
          ))}
          <button
            type="button" 
            className='btn'
            onClick={() =>
              setProductData((prevState) => ({
                ...prevState,
                sizes: [...prevState.sizes, { size: '' }]
              }))
            }
          >
            Add Size
          </button>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Rating</span>
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={productData.rating}
            onChange={handleChange}
            required
            className="input input-bordered input-accent w-full max-w-xs"
          />
        </div>
        <div>
          <label className="label">
            <span className='2xl'>Reviews</span>
          </label>
          {productData.reviews.map((review, index) => (
            <div key={index}>
              <input
                type="text"
                name="user"
                value={review.user}
                onChange={(e) => {
                  const updatedReviews = [...productData.reviews];
                  updatedReviews[index].user = e.target.value;
                  setProductData((prevState) => ({
                    ...prevState,
                    reviews: updatedReviews
                  }));
                }}
                required
              />
              <input
                type="number"
                name="rating"
                value={review.rating}
                onChange={(e) => {
                  const updatedReviews = [...productData.reviews];
                  updatedReviews[index].rating = e.target.value;
                  setProductData((prevState) => ({
                    ...prevState,
                    reviews: updatedReviews
                  }));
                }}
                required
              />
              <input
                type="text"
                name="comment"
                value={review.comment}
                onChange={(e) => {
                  const updatedReviews = [...productData.reviews];
                  updatedReviews[index].comment = e.target.value;
                  setProductData((prevState) => ({
                    ...prevState,
                    reviews: updatedReviews
                  }));
                }}
                required
              />
            </div>
          ))}
          <button
            type="button"
            className='btn'
            onClick={() =>
              setProductData((prevState) => ({
                ...prevState,
                reviews: [...prevState.reviews, { user: '', rating: 0, comment: '' }]
              }))
            }
          >
            Add Review
          </button>
        </div>
       
        <div>
          <label className="label">Images</label>
          {productData.images.map((image, index) => (
            <div key={index}>
              <input
                type="file"
                name="image"
                onChange={(e) => handleImageChange(e, index)}
                required
              />
              {image.previewURL && (
                <img src={image.previewURL} alt={`Image ${index}`} className="w-24 h-24" />
              )}
            </div>
          ))}
          <button
            type="button"
            className='btn'
            onClick={() =>
              setProductData((prevState) => ({
                ...prevState,
                images: [...prevState.images, { file: null, previewURL: '' }]
              }))
            }
          >
            Add Image
          </button>
        </div>
       <div className='px-auto'> <button className='btn btn-warning ' type="submit">Add Product</button></div>
      </form>
      
    </div>
  );
};

export default AddProducts;
