import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import productsArr from "./productsArr";
import ProductCard from "./productCard";

import { StoreContext } from '../StoreContext';
import { useContext } from 'react';
const StorePage = () => {
    const {addToCart} = useContext(StoreContext)
  const storeDisplay = productsArr.map((product) => {
    return (
        <Col style={{marginBottom: "1rem"}}>
            <div key={product.id}>
              
      <ProductCard
        productLink = {`/store/${product.id}`}
        title={product.title}
        imageUrl={product.imageUrl}
        price={product.price}
        addToCart = {() => addToCart(product)}
      />
      
      </div>
      </Col>
    );
  });
  return (
  <div style={{padding: "1rem 3rem"}}>
    <h3 style={{textAlign: "center"}}>The Store</h3>
    <Row>
    {storeDisplay}
    </Row>
  </div>);
};
export default StorePage;
