import VueInfinityStack from './components/VueInfinityStack.vue';

export { VueInfinityStack }

// 可选：如果你希望支持 app.use() 方式注册
export default {
  install(app: any) {
    app.component('VueInfinityStack', VueInfinityStack)
  }
}