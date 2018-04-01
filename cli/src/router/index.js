import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Index from '../components/index'
import Loginpage from '@/components/login'
import Courselist from '../components/courselist'
import Addcourse from '../components/addcourse'
import Fieldlist from '../components/field';
import Addfield from '../components/addfield'
import Categorylist from '../components/categorylist'
import Addcategory from '../components/addcategory'
import Typelist from '../components/typelist'
import Addtype from '../components/addtype'
Vue.use(ElementUI);
Vue.use(Router)
export default new Router({
    routes: [
        {
            path: '/login',
            name: 'Loginpage',
            component: Loginpage
        },
        {
            path: '/',
            name: 'index',
            component: Index
        },
        {
            path: '/course-list',
            name: 'courselist',
            component: Courselist
        },
        {
            path: '/add-course',
            name: 'addcourse',
            component: Addcourse
        },
        {
            path: '/field-list',
            name: 'fieldlist',
            component: Fieldlist
        },
        {
            path: '/add-field',
            name: 'addfield',
            component: Addfield
        },
        {
            path: '/category-list',
            name: 'categorylist',
            component: Categorylist
        },
        {
            path: '/add-category',
            name: 'addcategory',
            component: Addcategory
        },
        {
            path: '/type-list',
            name: 'typelist',
            component: Typelist
        },
        {
            path: '/add-type',
            name: 'addtype',
            component: Addtype
        },
    ]
})
