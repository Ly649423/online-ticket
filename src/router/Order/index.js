const Order = () => import('views/order/order.vue')

const Commenting = () => import('views/order/orderDetail/commenting.vue')
const Commented = () => import('views/order/orderDetail/commented.vue')
const Riding = () => import('views/order/orderDetail/riding.vue')
const Paying = () => import('views/order/orderDetail/paying.vue')

// const 

export default {
    path: "/order",
    component: Order,
    meta: {
        title: '我的车票'
    },
    children: [
        {
            path: '',
            redirect: 'riding'
        },
        {
            path: 'riding',
            component: Riding
        },
        {
            path: 'commenting',
            component: Commenting
        },
        {
            path: 'commented',
            component: Commented
        },
        {
            path: 'paying',
            component: Paying
        }
    ]
}