import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {ButtonContainer} from "./Button";
import {ProductConsumer} from '../context';

export class Details extends Component{
render(){
return(
    <ProductConsumer>
        {value=>{
            const {id,company,img,info,price,title,inCart}=value.detailProduct;
            return(
                <div className="container py-5">
                    <div className="row">
                        <div className="col-10 mx-auto text-cener 
                        text-slanted  text-blue my-5">
                            <h5>{title}</h5>
                        </div>
                    </div>
                    <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                       <img src={img} className="img-fluid" alt="product"/>
                    </div>
                    <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                  <h2>model: {title}</h2>
                  <h4  className="text-title text-uppercase text-muted mt-3 mb-2">
                    made by:<span className="text-uppercase"></span>

                  </h4>
                  <h4 className="text-blue">
                      <strong>
                          price: <span>$</span>
                          {price}
                      </strong>

                  </h4>
                  <p className="text-capitalize font-weight-bold mt-3 mb-0">
                      some info about the product
                  </p>
                  <p className="text-muted lead">{info}</p>
                  {/* buttons */}
                  <div>
                      <Link to="/">
            <ButtonContainer>Back to Products</ButtonContainer>
            </Link>
            <ButtonContainer
                   disabled={inCart?true:false}
                   onClick={()=>{
                       value.addtoCart(id);
                       value.openModal(id);
                   }}
                   >
            {inCart?"inCart": " add to cart"}
            </ButtonContainer>
                  </div>
                     </div>
                </div>
            );
        }}
    </ProductConsumer>
);
}
}
export default Details
