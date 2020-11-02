<template>
<div>
<div class="container">
        <div class="d-flex justify-content-center h-100">
            <div class="card">
                <div class="card-body">
                    <h3>Sign In</h3>
                    <form v-on:submit.prevent="loginUser">
                        <div class="input-group form-group">
                            <input type="text" v-model="name" class="form-control" placeholder="username">
                        </div>
                        <div class="input-group form-group">
                            <input v-model="password" type="password" class="form-control" placeholder="password">
                        </div>
                        <div class="row align-items-center remember">
                            <input type="checkbox">Remember Me
                        </div>
                        <div class="form-group">
                            <input type="submit" value="Login" class="btn float-right login_btn">
                        </div>
                    </form>
                </div>
                    <div class="d-flex justify-content-center links">
                        Don't have an account?<a href="#">Sign Up</a>
                    </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import axios from "axios"
 export default {
    name: 'login',
    data: function () {
      return {
        name: "",
        password: "",
        wrongCred: false 
      }
    },
    methods: {
      loginUser () {
            axios
            .post(`${process.env.VUE_APP_URL}/auth`, {
            name: this.username,
            password: this.password,
            })
            .then((res) => {
                console.log(res.data.result[0].msg)
                if (res.data.result[0].msg == "Token created, login success") {
                    localStorage.setItem("token", res.data.result[0].token);
                    localStorage.setItem("token", res.data.result[0].refreshToken);
                    alert("Login Berhasil");
                    this.$router.push({ name: "home" });
                } else {
                    alert(res.data.message);
                }
            });
        },
      },
  }
</script>

<style>
.container{
height: 100%;
align-content: center;
}
.card{
height: 370px;
border: none;
margin-top: 110px;
margin-bottom: auto;
width: 400px;
background-color: rgba(0,0,255,0.3) !important;
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
}
.text-muted{
    color: Black !important;
}
</style>