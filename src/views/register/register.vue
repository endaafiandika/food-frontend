<template>
<div>
<div class="container">
        <div class="d-flex justify-content-center h-100">
            <div class="card">
                <div class="card-body">
                    <h3>Sign Up</h3>
                    <form v-on:submit.prevent="register">
                        <div class="input-group form-group">
                            <input type="text" v-model="username" class="form-control" placeholder="username">
                        </div>
                        <div class="input-group form-group">
                            <input v-model="password" type="password" class="form-control" placeholder="password">
                        </div>
                        <div class="form-group">
                            <input type="submit" value="Submit" class="btn float-right login_btn">
                        </div>
                    </form>
                </div>
                    <div class="d-flex justify-content-center links">
                        Have an account?<a href="/">Sign In</a>
                    </div>
                    <br>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import axios from "axios"
export default {
    name: 'register',
    data: function () {
      return {
        username: "",
        password: "",
        wrongCred: false 
      }
    },
    methods: {
      register () {
            axios
            .post(`${process.env.VUE_APP_URL}/api/user`, {
            username: this.username,
            password: this.password,
            })
            .then((res) => {
                console.log(res.data.result[0].username)
                if (res.data.result[0].username == this.username) {
                    alert("Register Succes");
                    this.$router.push({ name: "login" });
                } else {
                    alert(res.data.message);
                }
            });
        },
      },
  }
</script>

<style scoped>

.container{
height: 100%;
align-content: center;
background-size:contain;
}

.card{
height: 270px;
border: none;
margin-top: 110px;
margin-bottom: auto;
width: 400px;
border-radius: 25px;
box-shadow: 7px 7px 7px;
background-image: url("images/bg-01.jpg");
}

.social_icon span:hover{
color: white;
cursor: pointer;
}
.card-header h3{
color: white;
}
.social_icon{
position: absolute;
right: 20px;
top: -45px;
}
.input-group-prepend span{
width: 50px;
background-color: #FFC312;
color: black;
border:0 !important;
}
input:focus{
outline: 0 0 0 0  !important;
box-shadow: 0 0 0 0 !important;
}
.remember{
color: black;
}
.remember input
{
width: 20px;
height: 20px;
margin-left: 15px;
margin-right: 5px;
}
.login_btn{
color: black;
background-color: cornflowerblue;
width: 100px;
}
.login_btn:hover{
color: black;
background-color: white;
}
.links{
color: black;
}
.links a{
margin-left: 4px;
color: white;
}
.text-muted{
    color: Black !important;
}
</style>