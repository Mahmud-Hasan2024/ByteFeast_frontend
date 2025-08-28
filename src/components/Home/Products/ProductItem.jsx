import defaultImage from "../../../assets/images/default_product.png";

const ProductItem = ({ product }) => {
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      
      <figure className="px-10 pt-10">
        
        <img
          src={product.image ?? defaultImage}
          alt={product.name}
          className="rounded-xl w-48 h-48 object-cover"
        />
      </figure>
      <div className="card-body items-center text-center">
        
        <h2 className="card-title">{product.name}</h2>
        <h3 className="font-bold text-xl text-amber-300">${product.price}</h3>
        <p>{product.description}</p>
        <div className="card-actions mt-1">
          
          <button className="btn btn-secondary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};
export default ProductItem;
