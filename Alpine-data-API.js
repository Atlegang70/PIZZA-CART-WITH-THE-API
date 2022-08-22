document.addEventListener('alpine:init', () => {
    Alpine.data('pizzaCartWithAPIWidget', function() {
      return {
        init() {
            // call the api to load data into the screen here
            axios
            .get('https://pizza-cart-api.herokuapp.com/api/pizzas')
            .then((result) => {
             this.pizzas = result.data.pizzas;
             }) 
            .then(() => {
             return this.createCart();
             }) 
             .then((result) => {
                return this.cartId = result.data.cart_code;
                }) 
                .catch(err => alert(err) );

       axios
       .get('https://pizza-cart-api.herokuapp.com/api/pizzas/featured')
      .then((result)=>{
       this.featured = result.data;
      

     })

     
      
            },

           
           
        createCart(){
            return axios.get('https://pizza-cart-api.herokuapp.com/api/pizza-cart/create?username' + this.username)
        },

        showCart(){
            axios
            .get('https://pizza-cart-api.herokuapp.com/api/pizza-cart/'+ this.cartId +'/get')
            .then((result) => {
                this.cart = result.data;
            });

        },
        featured:{},
        pizzas: [],
        cartId: '',
        massage: '',
        username: '',
        cart: { total: 0 },
        showCheckout: false,
        removeCheckout: true,

       
        

          
     add(pizza){

        
      const params = {
        cart_code: this.cartId,
        pizza_id: pizza.id
      } 

      axios
      .post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/add', params)

      .then( () => { 
        this.massage = "pizza(s) added to the cart"
        this.showCart();
      })
      
      

      },
      remove(pizza){

        const params = {
    
          cart_code: this.cartId,
          pizza_id : pizza.id
        } 
    
         axios
        .post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/remove', params)
        .then(()=>{

        this.massage = 'pizza(s) removed from the cart';
        this.showCart();

        })
    
    
    
        .catch(err => alert(err) );
      },
      paymentAmount: 0,
      paymentStatus: 'no payment made',
      paye: false,
      

      pay(){
     
        cartcode = {
        cart_code: this.cartId,
        }

        axios
        .post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/pay', cartcode)
        .then(()=>{

         if(this.paymentAmount > this.cart.total){
         this.paymentStatus="paid"
        
         setTimeout(()=>{

         this.cart = {total:0};

         }, 2000);

         setTimeout(function(){
          location.reload();
         }, 1000)
        
         }
         if(this.paymentAmount < this.cart.total){
          this.paymentStatus="NOT Enough Amount"
          
          }
        })
      
      },
      
      
        
      }
    });
})
