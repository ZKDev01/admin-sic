import Login from 'pages/Login.vue'
import User from 'pages/User.vue'
import Index from 'pages/Index.vue'
import Vpn from 'pages/Vpn.vue'
import Block from 'pages/BlockUser.vue'
import EmptyLayout from 'layouts/EmptyLayout.vue'
import MainLayout from 'layouts/MainLayout.vue'
import Error404 from 'pages/Error404.vue'

const routes = [
  {
    path: '/auth',
    meta: { free: true },
    component: EmptyLayout,
    children: [{ path: 'login', name: 'Login', component: Login }],
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', name: 'Home', component: Index },
      { path: 'user', name: 'User', component: User },
      { path: 'vpn', name: 'Vpn', component: Vpn },
      { path: 'block', name: 'Block', component: Block },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: Error404, // Manejo correcto del error 404 en Vue 3
  },
]

export default routes
