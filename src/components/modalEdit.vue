<template>
  <div>
    <b-modal
       id="modal-edit"
      ref="modal"
      title="Edit Item"
      @show="showProduct"
      @ok="editProduct"
      ok-title="Update"
    >
      <form ref="form"  @submit.stop.prevent="editProduct">
          <b-form-group
          :state="id"
          label="id"
          label-for="id"
          label-cols="3"
          invalid-feedback="Name is required"
          style="font-weight: bold"
        >
          <b-form-input
            id="id"
            v-model="id"
            :state="id"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          :state="nameState"
          label="Name"
          label-for="name-input"
          label-cols="3"
          invalid-feedback="Name is required"
          style="font-weight: bold"
        >
          <b-form-input
            id="name-input"
            v-model="name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          :state="imageState"
          label="Image"
          label-for="image-input"
          label-cols="3"
          invalid-feedback="Image is required"
          style="font-weight: bold"
        >
          <b-form-file
            v-if="!image"
            @change="onFileChange"
            id="image-input"
            :state="imageState"
            placeholder="Choose a image or drop it here..."
            drop-placeholder="Drop file here..."
            required
          ></b-form-file>
          <img v-if="image" :src="image" />
          <button v-if="image" class="btn btn-danger" @click="removeImage">
            Remove image
          </button>
        </b-form-group>
        <b-form-group
          :state="priceState"
          label="Price"
          label-for="price-input"
          label-cols="3"
          invalid-feedback="Price is required"
          style="font-weight: bold"
        >
          <b-form-input
            id="price-input"
            v-model="price"
            :state="priceState"
            required
          ></b-form-input>
        </b-form-group>  
                <b-form-group
          :state="stokState"
          label="Stok"
          label-for="stok-input"
          label-cols="3"
          invalid-feedback="Stok is required"
          style="font-weight: bold"
        >
          <b-form-input
            id="stok-input"
            v-model="stok"
            :state="stokState"
            required
          ></b-form-input>
        </b-form-group>    
      </form>
    </b-modal>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "Modal-Edit",    
    data() {
      return {
        nameState: null,
        imageState: null,
        priceState: null,
        stokState: null,
        name: null,
        image: null,
        price: null,
        stok: null,
        attachment: null,
        submittedNames: [],
        options: null,
        config: {
          headers: {
            "Content-Type": "multipart/form-data",
            "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlX3Rva2VuIjoiYWNjZXNzIiwidXVpZCI6ImQ4OTg1YzY2LTA2MGItNDdiZC1iNzJkLWRmMWE0YmU0NDcwOCIsImlhdCI6MTYwMDEzMTM0MiwiZXhwIjoxNjAwMTM0OTQyfQ.aCTcYb3cOEcNNaCKqkN584gf1qCXu6_qJDdzNSUtwPY",
          },
        },
      };
    },
    props: {
      id: {
        required: true,
      },
      getProduct: {
        type: Function,
        required: false,
      },
    },
    mounted() {
    },
    methods: {

      editProduct: async function() {
        try {
          if (!this.checkFormValidity()) {
            return;
          }
          let formData = new FormData();
          formData.append("id", this.id);
          formData.append("name", this.name);
          formData.append("image", this.attachment);
          formData.append("price", this.price);
          formData.append("stok", this.stok);
          const response = await axios.put(
            `${process.env.VUE_APP_URL}/api/product`,
            formData,
            this.config
          );
          this.product = response.data.data;
          alert("Data Diedit");
          this.getProduct();
          this.$nextTick(() => {
            this.$bvModal.hide("modal-prevent-closing");
          });
        } catch (error) {
          console.error(error);
        }
      },
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity();
        this.nameState = valid;
        this.imageState = valid;
        this.priceState = valid;
        this.stokState = valid;
        return valid;
      },
      showImage(image){
        return `${process.env.VUE_APP_URL}/public/upload/${image}`
      },
      showProduct: async function() {
        try {
          const response = await axios.get(
            `${process.env.VUE_APP_URL}/api/product/${this.id}`,
            this.config
          );
          this.name = response.data.data.name;
          this.image = this.showImage(response.data.data.image)
          this.price = response.data.data.price;
          this.stok = response.data.data.stok;
        } catch (error) {
          console.error(error);
        }
      },
      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.attachment = files[0];
        this.createImage(files[0]);
      },
      createImage(file) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.image = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      removeImage: function() {
        this.image = "";
      },
    },
  };
</script>

<style scoped>
  img {
    width: 50%;
    display: block;
    margin-bottom: 10px;
  }
</style>