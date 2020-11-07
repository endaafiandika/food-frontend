import Vue from "vue"
import VueRouter from "vue-router"
import home  from  './views/Home/home' 
import about from './views/History/history'
import login from './views/login/login'
import register from './views/register/register'

Vue.use(VueRouter)

const routes = [
    {
        path: "/home",
        name: "home",
        component: home,
    },
    {
        path: "/register",
        name: "register",
        component: register,
    },
    {
        path: "/",
        name: "login",
        component: login,
    },
    {
        path: "/history",
        name: "history",
        component: about,
    },
]

const mainRouter = new VueRouter({
    mode: 'history',
    routes,
})

export default  mainRouter