import React,{Component} from "react";
import {storeProducts,detailProduct} from './data';
const ProductContext = React.createContext();

class ProductProvider extends Component{

    state={
        products:[],
        detailProduct: detailProduct,
        cart:[],
        modalOpen:false,
        modalProduct:detailProduct,
        cartSubTotal:0,
        cartTax:0,
        cartTotal:0

    };
    componentDidMount(){
        this.setProducts();
    }
    getitem = id =>{
        const product = this.state.products.find(item=> item.id === id);
        return product;
    }
    handleDetail=(id)=>{
       const product = this.getitem(id);
       this.setState(()=>{
           return {detailProduct:product}
       })
    };
    addtoCart=id=>{
        let tempProducts=[...this.state.products];
        const index= tempProducts.indexOf(this.getitem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        this.setState(
            ()=>{
           
            return {products:tempProducts,cart:[...this.state.cart,product]}
        },
        ()=>
        {
          this.addTotals();
        }
        );
    };
    openModal=id =>{
        const product = this.getitem(id);
        this.setState(()=>{
            return {modalProduct:product,modalOpen:true }
        })
    };
    closeModal = id=>{
        this.setState(()=>{
           return{ modalOpen:false}
        })
    };
    setProducts=()=>{
        let tempProducts=[];
        storeProducts.forEach(item=>{
            const singleItem = {...item};
            tempProducts=[...tempProducts,singleItem]
        });
        this.setState(()=>{
        return { products:tempProducts};
         } )
    };
    increment=(id)=>{
       
        let tempCart=[...this.state.cart];
        const selectedProduct=tempCart.find(item=>item.id===id);
        const index= tempCart.indexOf(selectedProduct);
        const Product = tempCart[index];
        Product.count=Product.count+1;
        Product.total=Product.count*Product.price;

        this.setState(()=>{
          return{cart:[...tempCart]}
        },
        ()=>
       {this.addTotals();
        })
    }
    decrement=(id)=>{
        let tempCart=[...this.state.cart];
        const selectedProduct=tempCart.find(item=>item.id===id);
        const index= tempCart.indexOf(selectedProduct);
        const Product = tempCart[index];
        Product.count=Product.count-1;

  if(Product.count==0)
{
this.removeItem(id)
}
else{
    Product.total=Product.count*Product.price;
    this.setState(()=>{
        return{cart:[...tempCart]}
      },
      ()=>
     {this.addTotals();
      })

}
    }
    removeItem=(id)=>{
        let tempProducts=[...this.state.products];
        let tempCart=[...this.state.cart];
        tempCart=tempCart.filter(item=>item.id!==id);
        const index= tempProducts.indexOf(this.getitem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart=false;
        removedProduct.count=0;
        removedProduct.total=0;

        this.setState(
             ()=>{
                 return {
                     cart:[...tempCart],
                     products:[...tempProducts]
                 };
             },
            ()=> {
                  this.addTotals();
             }

        )
    }
    clearCart=()=>{
        this.setState(()=>{
         return{ cart:[]};
        },
        ()=>{
            this.setProducts();
        }
        )
    }
    addTotals=()=>{
        let subTotal = 0;
        this.state.cart.map(item=>(subTotal+=item.total));
        const tempTax = subTotal*0.1;
        const tax =parseFloat(tempTax.toFixed(2));
        const total = subTotal+tax;
        this.setState(()=>{
        return {
             cartSubTotal:subTotal,
             cartTax:tax,
             cartTotal:total
        };
      });
    };
    render()
    {
    
    return(
        <ProductContext.Provider value = {{...this.state ,
            handleDetail:this.handleDetail,
            addtoCart:this.addtoCart,
            openmodal:this.openModal,
            closeModal:this.closeModal,
            increment:this.increment,
            decrement:this.decrement,
            removeItem:this.removeItem,
            clearCart:this.clearCart
        }}
        
        >
            {this.props.children}
        </ProductContext.Provider>
    );
    }
    }

    const ProductConsumer = ProductContext.Consumer;
    export {ProductProvider,ProductConsumer}
