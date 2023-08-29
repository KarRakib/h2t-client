import React, { useEffect, useState } from 'react';

const Footer = () => {
  const [array, setArray] = useState([]);
  // console.log(array.sizes[0]);
  // console.log(array.images[0]);
  console.log(array);

  useEffect(() => {
    fetch('/product.json')
      .then(res => res.json())
      .then(data => setArray(data))
  }, [])

  return (
    <div>

      <div className="card w-96 bg-base-100 shadow-xl">
        <figure><img src="{array.images[0] } " alt="Shoes" /></figure>
        <div className="card-body">
          <h2 className="card-title">
            {array.brand}oo
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
          {array.map((product) => (
        <div key={product.product_id}>
          <h2>{product.name}</h2>
          {product.sizes.map((size) => (
            <p key={size.size_id}>{size.name}ooo</p>
          ))}
        </div>
      ))}
            
          </div>
        </div>
      </div>

    </div>
  );
};

export default Footer;