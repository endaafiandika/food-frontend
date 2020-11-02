<template>
  <div>
    <b-modal
      id="modal-add"
      ref="modal"
      title="Add Item"
      @ok="addProduct"
      ok-title="Add"
      hide-footer
    >
      <form ref="form" @submit.stop.prevent="addProduct">
        <b-form-group
          :state="nameState"
          label="Nama"
          label-for="name-input"
          label-cols="3"
          invalid-feedback="Nama is required"
          style="font-weight: bold"
        >
          <b-form-input
            id="name-input"
            v-model="nama"
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
          label="Harga"
          label-for="price-input"
          label-cols="3"
          invalid-feedback="Harga is required"
          style="font-weight: bold"
        >
          <b-form-input
            id="price-input"
            v-model="harga"
            :state="priceState"
            min="0"
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
            min="0"
            required
          ></b-form-input>
        </b-form-group>
            <button class="btn btn-primary" >add</button>     
      </form>
    </b-modal>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    name: "Modal-Add",
    props: {
      getProduct: {
        type: Function,
        required: false,
      },
    },
    data() {
      return {
        nameState: null,
        imageState: null,
        priceState: null,
        stokState: null,
        nama: null,
        image: null,
        harga: null,
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
    mounted() {
    },
    methods: {
      addProduct: async function() {
        try {
          if (!this.checkFormValidity()) {
            return;
          }
          let formData = new FormData();
          formData.append("nama", this.nama);
          formData.append("image", this.attachment);
          formData.append("harga", this.harga);
          formData.append("stok", this.stok);
          const response = await axios.post(
            `${process.env.VUE_APP_URL}/api/produk`,
            formData,
            this.config
          );
          this.data = response.data.data;  
          alert("Data Ditambahkan");
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
      resetModal() {
        this.nama = "";
        this.image = null;
        this.harga = "";
        this.stok = "";
        this.nameState = null;
        this.imageState = null;
        this.priceState = null;
        this.stokState = null;
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