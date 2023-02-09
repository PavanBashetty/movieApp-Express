import { createRouter, createWebHistory } from "vue-router"
import homePageComp from './components/homePage.vue'
import aboutUsComp from './components/aboutUsPage.vue'
import signUpPageComp from './components/signUpPage.vue'
import loginPageComp from './components/loginPage.vue'
import headerPageComp from './components/header.vue'
import langingPageComp from './components/landingPage.vue'
import movieDetailsPageComp from './components/movieDetailPage.vue'
import ratedMovieListPageComp from './components/ratedMovieListPage.vue'
import userDetailPageComp from './components/userDetailPage.vue'

const routes = [
    {
        name: 'homePage',
        path: '/',
        component: homePageComp
    },
    {
        name:'aboutUsPage',
        path:'/aboutus',
        component: aboutUsComp
    },
    {
        name:'signUpPage',
        path:'/signup',
        component: signUpPageComp
    },
    {
        name:'loginPage',
        path:'/login',
        component: loginPageComp
    },
    {
        name:'headerPage',
        path:'/header',
        component: headerPageComp
    },
    {
        name:'landingPage',
        path:'/landingpage',
        component: langingPageComp
    },
    {
        name:'movieDetailPage',
        path:'/detail/:movieID',
        component: movieDetailsPageComp
    },
    {
        name:'ratedMovieListPage',
        path:'/ratedmovie',
        component: ratedMovieListPageComp
    },
    {
        name:'userDetailPage',
        path:'/userdetails',
        component: userDetailPageComp
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;

