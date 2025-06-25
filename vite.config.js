import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts'
export default defineConfig({
  plugins: [
    vue(),
    dts({ outputDir: 'dist' }) // 生成 .d.ts 类型声明文件
  ],
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'VueInfinityStack',
      fileName: (format) => `vue-infinity-stack.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
});