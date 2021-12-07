import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Books from '../views/BooksList.vue'
import AddBook from '../views/AddBook.vue'
import UserProfile from '../views/UserProfile.vue'
import UpdateBook from '../views/UpdateBook.vue'
import Emprunts from '../views/emprunts.vue'
import Historique from '../views/historique.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/books',
    name: 'Books',
    component: Books
  },
  {
    path: '/addbook',
    name: 'Addbook',
    component: AddBook
  },
  {
    path: '/updatebook/:id',
    name: 'Updatebook',
    component: UpdateBook
  },
  {
    path: '/userprofile',
    name: 'userprofile',
    component: UserProfile
  },
  {
    path: '/emprunts',
    name: 'Emprunts',
    component: Emprunts
  },
  {
    path: '/historique',
    name: 'Historique',
    component: Historique
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
