declare module 'vue-infinity-stack' {
    import { Component, Plugin } from 'vue'
  
    // 具名导出的组件
    const VueInfinityStack: Component
  
    // 插件对象（用于 app.use(...)）
    const plugin: Plugin
  
    // 导出组件和插件
    export { VueInfinityStack }
    export default plugin
  }