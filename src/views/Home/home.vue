<template>
    <div id="app">
      <div class="container-fluid">
      <div class="row">
        <b-navbar toggleable="lg col-md-9 food" type="light" variant="white">
            <b-icon icon="menu-button-wide" class="h3 mt-2" style="color:black"></b-icon>
          <div class="col-8 text-center">  
            <navbar-brand href="#" style="font-family: Airbnb Cereal App;" class="text-center">Food Items</navbar-brand>      
          </div>
          <b-navbar-nav>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          </b-navbar-nav>

          <b-collapse id="nav-collapse" is-nav>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <form @click="searchProduct">
                  <input
                      class="form-control"
                      type="text"
                      placeholder="Search"
                      aria-label="Search"
                      v-model="search"
                    />
                </form>

              <b-nav-item-dropdown text="" right>
                
                <b-dropdown-item @click="filterProduct('id')">id</b-dropdown-item>
                <b-dropdown-item @click="filterProduct('nama')">Berdasarkan Nama</b-dropdown-item>
                <b-dropdown-item @click="filterProduct('latest')">Terbaru</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>

        <b-navbar toggleable="lg col-md-3 cart justify-content-center head-cart"  variant="faded" type="light">
          <b-navbar-brand class="text-cart">Cart<span class="lingkaran">{{ cart.length }}</span></b-navbar-brand>
        </b-navbar>
      </div>
      </div>
    
  <!-- Leftbar -->
       <div class="row">
          <div class="col-md-1 bg-white" style="background: #FFFFFF; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25); position: relative;">
                <div style="font-size : 4em">
                  <router-link to="/history">
                    <b-icon icon="clipboard-check" class="h1 ml-4" style="color:black"></b-icon>
                  </router-link>
                    <b-icon icon="cart-plus" class="h1 ml-4 ikon" style="color:black;"></b-icon>
                    <b-icon icon="plus" class="h1 ml-4 ikon" style="color:green; outline:none; cursor:pointer;" v-b-modal.modal-add></b-icon>
                </div>
                <modalAdd :getProduct="getProduct" />  
          </div>

      <!-- RightBar -->
        <div class="place col-md-8 d-flex " >
          <div class="cont" v-for="item in data" :key="item.id" >
            <div @click="addCart(item)">
           <Items 
           :nama="item.nama" 
           :harga="item.harga" 
           :images="showImage(item.images)" />
           </div>
                <b-button variant="success" v-b-modal.modal-edit @click="itemId = item.id">Edit</b-button>
                <b-button variant="info ml-2"  @click="deleteProduct(item.id)" >Delete</b-button>   
           </div>
          </div>
          <div class="col-md-3" style="background: #FFFFFF;border: 1px solid #CECECE;font-family: Airbnb Cereal App;">
            <b-navbar toggleable="lg col-md-4 justify-content-center head-cart2"  variant="faded" type="light">
                <b-navbar-brand class="text-cart2" style="color:white">Cart<span class="lingkaran2">{{ cart.length }}</span></b-navbar-brand>
              </b-navbar>
            <div v-if="cart.length === 0">
                
                  <p class="text-center">Your cart is empty</p>
                  <p class="text-center">Please add some items from the menu</p>
            </div>
             
              <div v-for="item in cart" :key="item.id">  
                <b-img left :src="showImage(item.images)" alt="Left image" style="width:7em; margin-left: 10px;"></b-img>
                    <h5 class="name" style="margin-left:130px; margin-top:20px;">{{ item.nama }}</h5>
                    <h6 style="margin-left:130px;">{{ item.harga}}</h6>
                      <div class="mt-4" style="margin-top:0px;">
                        <b-button-group size="sm" style="margin-top:10px; margin-left:8px;">
                          <b-button @click="minus(item)" class="btn minus">-</b-button>
                          <div class="box-count">1</div>
                          <b-button @click="plus(item)" class="btn plus">+</b-button>
                      </b-button-group> 
                      
                      </div>
              </div>  
                   <div v-if="cart.length > 0">
                     <h5>Total</h5>
                      <b-button block variant="success" style="margin-top:20px;"  v-b-modal.modal-checkout>CheckOut</b-button>
                      <b-button block variant="info" @click="clear">Cancel</b-button>      
                        
                   </div>

            </div>
            </div>
                <modalEdit :id="itemId" :getProduct="getProduct" />
                <b-modal
      id="modal-checkout"
      @show="onCheckout()"
      @hidden="offCheckout()"
      hide-footer
      hide-header
    >
      <div class="row">
        <div class="col-6">
          <h4>Checkout</h4>
          <p>Cashier : Enda</p>
        </div>
        <div class="col-6">
          <p style="text-align: right;">Receipt no: 687789 </p>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <h6>Espresso</h6>
        </div>
        <div class="col-6 right">
          <h6> Rp : 10.000</h6>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <h6>Ppn 10%</h6>
        </div>
        <div class="col-6 right">
          <h6></h6>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-12 right">
          <h6></h6>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <h6>Payment: Cash</h6>
        </div>
      </div>
      <br />
      <b-button block variant="primary">
        Print
      </b-button>
      <h6 style="text-align: center; margin-top:10px">Or</h6>
      <b-button block variant="danger">Send Mail</b-button>   
    </b-modal>
                
  </div>
  
  
</template>

<script>
import axios from "axios";
import modalEdit from "@/components/modalEdit"
import modalAdd from "@/components/modalAdd";
import Items from "../../components/Items";

export default {
name: 'home',
components : {
Items,
modalAdd,
modalEdit
},

data() {
return {
    btnPlus: true,
    data : [],
    search: "",
    cart : [],
    max : '',
  }
  },

async mounted() {
this.getProduct()
},
methods: {
addCart(data) {
  this.cart.push(data)
},
getProduct(){
  axios
    .get(`${process.env.VUE_APP_URL}/api/produk`,{
      headers: {
        token:localStorage.getItem("token")
      },
  })
    .then((res) => {
      console.log(res)
      this.data = res.data;
  })
    .catch((err) => {
      console.log(err)
      this.data = [];
    })
},
filterProduct(category) {
  let url;
    if (category == "id") {
      url = "/api/produk/id/filter?order=id";
    } else if (category == "name") {
      url = "/api/produk/id/filter?order=name";
    } else if (category == "latest") {
      url = "/api/produk/id/filter?order=latest";
    }
  axios
    .get(process.env.VUE_APP_URL + url, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      console.log("from filter");
      console.log(res);
      this.data = res.data;
    })
    .catch((err) => {
      console.log(err);
      this.data = [];
    });
},
  deleteProduct: async function(id) {
    try {
      await axios.delete(
        `${process.env.VUE_APP_URL}/api/produk/${id}`,
        this.config
      );
      alert("Data Dihapus");
    } catch (error) {
      console.error(error);
    }
  },
  searchProduct(){
    axios
    .get(
      `${process.env.VUE_APP_URL}/api/produk/id/search?name=${this.search}&sensitive=true`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then((res) => {
      console.log("from search ");
      this.data = res.data;
    })
    .catch((err) => {
      console.log(err);
      this.data = [];
    });
},

showImage(images) {
    return `${process.env.VUE_APP_URL}/${images}`;
  },
  clear() {
    this.cart = [];
},

},
computed: {
  amount : () => {
    return (item) => item.amount;
  }
}

}

</script>


<style> 
.lingkaran{
    background: #57CAD5;
    border-radius: 100%;
    text-align: center;
    color: #FFFFFF;
    width: 30px;
    height: 30px;
    position: absolute;
    margin-left: 10px;    
}
.food{
   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
   }

.cart{
  box-shadow: 0px 4px 1px rgba(0, 0, 0, 0.25);
    z-index: 1;
}

.place{
  background: rgba(242, 244, 248, 0.3);
  flex-flow: row wrap;
  justify-content: space-around;
}

.box {  
    background: rgba(190, 195, 202, 0);
    position: relative;
}
.image_grid input {
    display: none;
  }

  
.image_grid input:checked + .caption {
    background: rgba(0, 0, 0, 0.5);
  }

  .image_grid input:checked + .caption::after {
    content:'';
    display: block;
    width: 100%;
    height: 61%;
    position: absolute;
    z-index: 1;
    background-image: linear-gradient(rgba(0, 0, 0, 0.4),rgba(0,0,0,0.4))
  }
  .empty-img{
    margin-left: 140px;
  }
  
  .plus {
  background: #FFFFFF !important;
  border: 1px solid #D2691E !important;
  box-sizing: border-box;
  width: 30px;
  text-align: center;
  font-size: 30px;
  height: 30px;
  color: #D2691E !important;
}
.minus {
  background: #FFFFFF!important;
  border: 1px solid #D2691E !important;
  box-sizing: border-box;
  width: 30px;
  text-align: center;
  font-size: 30px;
  height: 30px;
  color: #D2691E !important;
}
.box-count {
  background: #ffffff !important;
  border: 1px solid #D2691E !important;
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  padding-top: 4px;
  text-align: center;
  color: ##D2691E !important;
}
  

  @media only screen and (max-width: 767px) {
  .head-cart {
  background-color: white;
  height : 0px;
  display : none !important;
  }

  .lingkaran {
    display: none;
  }
  }
  
  @media only screen and (max-width: 767px) {
    .head-cart2 {
    background-color:#808080;
    }
    .text-cart2{
      color:black;
    }
    .lingkaran2 {
    background: #57CAD5;
    border-radius: 100%;
    text-align: center;
    color: #FFFFFF;
    width: 30px;
    height: 30px;
    position: absolute;
    margin-left: 10px;    

    }


  }

 
  

</style>
