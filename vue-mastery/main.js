//https://www.vuemastery.com/courses/intro-to-vue-3/list-rendering-vue3
const app = Vue.createApp({
    data() {
        return {
            product: 'Socks',
            image: './assets/images/socks_blue.jpg',
            inStock: true,
            details: ['50% cotton', '30% wool', '20% polyester']
        }
    }
})