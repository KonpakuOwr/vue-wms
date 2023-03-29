import VueRouter from "vue-router";
import Vue from 'vue'
import Main from '../views/Main'
import Receipt from '../views/Receipt'
import User from "../views/User";
import Supplier from '../views/Supplier'
import Issue from "../views/Issue";
import Material from "../views/Material";
import Warehouse from '../views/Warehouse'
import UserForm from "../views/UserForm";
import Storage from "../views/Storage";
import Spu from "../views/Spu";
import Sku from "../views/Sku";
import Home from "../views/Home";
import SupplierForm from "../views/SupplierForm";
import WarehouseForm from "../views/WarehouseForm";
import ReceiptForm from "../views/ReceiptForm";
import SkuForm from "../views/SkuForm";
import Layout from "../components/Layout";
import Login from "../components/Login";

Vue.use(VueRouter)
export default new VueRouter({
    routes:[
        {
            path: '/',
            component: Layout,
            children:[{
                path: 'main',
                name: 'main',
                component: Main,
                children:[
                    {
                        path: 'home',
                        name: 'home',
                        component: Home
                    },
                    {
                        path: 'receipt',
                        name: 'receipt',
                        component: Receipt
                    },
                    {
                        path: 'receiptForm',
                        name: 'receiptForm',
                        component: ReceiptForm
                    },
                    {
                        path: 'issue',
                        name: 'issue',
                        component: Issue
                    },
                    {
                        path: 'material',
                        name: 'material',
                        component: Material
                    },
                    {
                        path: 'warehouse',
                        name: 'warehouse',
                        component: Warehouse
                    },
                    {
                        path: 'warehouseForm',
                        name: 'warehouseForm',
                        component: WarehouseForm
                    },
                    {
                        path: 'user',
                        name: 'user',
                        component: User
                    },
                    {
                        path: 'userForm',
                        name: 'userForm',
                        component: UserForm
                    },
                    {
                        path: 'supplier',
                        name: 'supplier',
                        component: Supplier
                    },
                    {
                        path: 'supplierForm',
                        name: 'supplierForm',
                        component: SupplierForm
                    },
                    {
                        path: 'storage',
                        name: 'storage',
                        component: Storage
                    },
                    {
                        path: 'spu',
                        name: 'spu',
                        component: Spu
                    },
                    {
                        path: 'sku',
                        name: 'sku',
                        component: Sku
                    },
                    {
                        path: 'skuForm',
                        name: 'skuForm',
                        component: SkuForm
                    },
                ]
            }]
        },
        {
            path: '/login',
            component: Login
        }
    ]
})
