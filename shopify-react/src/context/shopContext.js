import React, { Component } from 'react'
import Client from 'shopify-buy'

const client = Client.buildClient({
    domain: 'fakestoreapi.myshopify.com',
    storefrontAccessToken: '<KEY>'
});

export class ShopProvider extends Component {
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default ShopProvider;
