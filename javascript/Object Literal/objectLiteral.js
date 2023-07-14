export default (address) => {
    const newAddress = {
        city: address.city,
        state: address.state,
        country: 'United States'
    };
    
    let {city, state, country} = newAddress;
    console.log(`The City is: ${city}, In the state of ${state}, in the country ${country}, `);
}





