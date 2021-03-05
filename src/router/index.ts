import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import SearchResults from "@/views/SearchResults.vue";
import GuessingGame from "@/views/GuessingGame.vue";
import Results from "@/views/Results.vue";


Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'home',
        component: GuessingGame
    },
    {
        path: '/results',
        name: 'results',
        component: Results
    },
    {
        path: '/search-results/:term/:username',
        name: 'SearchResults',
        component: SearchResults,
        props: true
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
