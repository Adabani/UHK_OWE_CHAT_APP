import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TalkerView from '../views/TalkerView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ChatView from '../views/ChatView.vue'

const isLoggedIn = () => {
  return localStorage.getItem('code')
}

const protectedRoutes = ["talker", "chat"]


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path:"/talker",
    name: "talker",
    component: TalkerView
  },
  {
    path:"/login",
    name: "login",
    component: LoginView
  },
  {
    path:"/register",
    name: "register",
    component: RegisterView
  },
  {
    path:"/chat/:IDchatRooms",
    name:"chat",
    component:ChatView,
    props: true,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isProtected = protectedRoutes.includes(to.name)
  if(isProtected && !isLoggedIn()){
      next({
          path: '/login'
      })
  }else next()
})


export default router
