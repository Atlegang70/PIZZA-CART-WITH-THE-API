remove(pizza){

    const params = {

      cart_code: this.cartId,
      pizza_id : pizza.id
    } 

    return axios.post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/remove', params)



    .catch(err => alert(err) );
  },



  remove(pizza){
    const params = {
    cart_code: this.cartCode,
    pizza_id: pizza.id
  }
       axios
       .post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/remove', params)  
       .then( () => { 
              this.massage = "pizza(s) removed from the cart"
            }) 
     
           
            
        },
        <template x-for="pizza in featured.pizzas"> 
        

    <p x-text="pizza.flavour"></p>
      <p x-text="pizza.size"></p>
      <p> R<span x-text="pizza.price"></span> </p>
      <p> </p><button @click="add(pizza);paye = true">Buy</button></p>

</template>
<div x-text="massage"></div>
<div x-text="cartId"></div>