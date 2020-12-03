import Vue from 'vue'
import VueRouter from 'vue-router'


const Home = () => import('views/home/Home.vue')
const Cart = () => import('views/cart/Cart.vue')
const Category = () => import('views/category/Category.vue')
const Profile = () => import('views/profile/Profile.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },{
    name: 'home',
    path: '/home',
    component: Home
  },{
    name: 'cart',
    path: '/cart',
    component: Cart
  },{
    name: 'category',
    path: '/category',
    component: Category
  },{
    name: 'profile',
    path: '/profile',
    component: Profile
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
