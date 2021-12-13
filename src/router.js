import { createRouter, createWebHashHistory } from 'vue-router'

const index = {
  '/': () => import('./App.vue')
}

const routes = []
for (const r in index) routes.push({ path: r, component: index[r] })
export default createRouter({ history: createWebHashHistory(), routes })
