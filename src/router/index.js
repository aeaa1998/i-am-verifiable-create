import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import Gallery from '@/views/Gallery.vue'
const routes = [
    {
        path: "/",
        name: "Gallery",
        component: Gallery
      },
    {
        path: "/credential/:address",
        name: "CredentialDetail",
        // route level code-splitting
        // this generates a separate chunk (register.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "CredentialDetail" */ "../views/CredentialDetail.vue"),
      },
]


const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});


export default router