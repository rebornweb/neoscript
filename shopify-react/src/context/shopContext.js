import React, { Component } from 'react'
import Client from 'shopify-buy'

const ShopContext = React.createContext();

const client = Client.buildClient({
    domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
    storefrontAccessToken: process.env.REACT_APP_SHOPIFY_API
});

export class ShopProvider extends Component {

  state = {
    product: {},
    products: [],
    checkout: {},
    isCartOpen: false,
    isMenuOpen: false
  }

  componentDidMount() {
    if(localStorage.checkout_id) {
      this.fetchCheckout(localStorage.checkout_id);
      } else {  this.createCheckout();
    }
  }


  createCheckout = async () => {
    const checkout = await client.checkout.create();
    localStorage.setItem('checkout_id', checkout.id);
    this.setState({ checkout: checkout });
  }

  fetchCheckout = async (checkoutId) => { 
    client.checkout
    .fetch(checkoutId)
    .then((checkout) => {
         this.setState({ checkout: checkout });
    });
  }

  addItemToCheckout = async () => { 

  }

  removeLineItem = async (lineItemIdsToRemove) => { 

  }

  fetchAllProducts = async () => { 
    const products = await client.products.fetchAll();
    this.setState({ products: products });
  }

  fetchProductWithHandle = async () => {
    const product = await client.product.fetchByHandle(handle);
    this.setState({ product: product });
  }

  closeCart = ()=> {

  }

  openCart = ()=> {
    
  }

  closeMenu = ()=> {
    
  }

  openMenu = ()=> {
    
  }

  render() {
    console.log(this.state.checkout);
    return (
      <ShopContext.Provider>
          {this.props.children}

      </ShopContext.Provider>
    )
  }
}

const ShopConsumer = ShopContext.Consumer;

export { ShopContext, ShopConsumer}

export default ShopProvider;
