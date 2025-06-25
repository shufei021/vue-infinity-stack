<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, nextTick,defineProps, withDefaults } from 'vue'

// 定义 props 类型
interface Props {
  uuid?: string
  visible: boolean
  isAnimation?: boolean
  zIndex?: number
  autoIndex: boolean
  storeName?: string
  extra?: Record<string, any>
  storeType?: 'localStorage' | 'sessionStorage'
  getContainer?: (() => HTMLElement) | string
  isAsync?: boolean
  ishasAnimation?: () => void
}

// 定义 emit 事件类型
type Emits = {
  (e: 'update:visible', value: boolean): void
  (e: 'onOpen', id: string, extra: Record<string, any>): void
  (e: 'onClose', payload: { isPopstate: boolean }, extra: Record<string, any>): void
}


const props = withDefaults(defineProps<Props>(), {
  uuid: '',
  isAnimation: true,
  zIndex: 1000,
  storeName: 'historyState',
  extra: () => ({}),
  storeType: 'localStorage',
  getContainer: '',
  isAsync: false,
  ishasAnimation: () => {}
})
const emit = defineEmits<Emits>()

// 响应式数据
const popupRef = ref<HTMLElement | null>(null)
const hasAnimation = ref(true)
const slotVisible = ref(false)
const isSynced = ref(false)
const id = ref(`popuplayer_${guid()}`)
const maxZIndex = ref(1000)
let timer: ReturnType<typeof setTimeout> | null = null

// guid 生成器
function guid(): string {
  return Array.from({ length: 8 }, (_, i) =>
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  ).join('')
}

// 缓存操作
function store() {
  const name = props.storeName || 'historyState'
  const storage = (window as any)[props.storeType || 'localStorage']
  const old = storage.getItem(name) ? JSON.parse(storage.getItem(name)!) : []
  return {
    reset() {
      if (!storage.getItem(name) || old.length) {
        storage.setItem(name, JSON.stringify([]))
      }
    },
    update(newVal: any) {
      storage.setItem(name, JSON.stringify([...old, newVal]))
    },
    getCur() {
      return old
    },
    pop() {
      old.pop()
      storage.setItem(name, JSON.stringify(old))
    },
    push(val: any) {
      storage.setItem(name, JSON.stringify([...old, val]))
    }
  }
}

// 处理浏览器返回按钮
function handlePopstate(e: PopStateEvent) {
  const curState = e.state?.id || ''
  const historyState = store().getCur()
  const len = historyState.length
  const is = len && curState !== historyState[len - 1] && historyState[len - 1] === id.value
  if (is) {
    emit('onClose', { isPopstate: true }, props.extra || {})
    emit('update:visible', false)
    store().pop()
    isSynced.value = true
    const activeEl = document.activeElement
    if (activeEl instanceof HTMLElement) {
      activeEl.blur()
    }
  }
}

// 监听 visible 变化
watch(() => props.visible, (val) => {
  if (timer) clearTimeout(timer)
  if (val) {
    slotVisible.value = true
  } else {
    timer = setTimeout(() => {
      slotVisible.value = false
      if (typeof props.ishasAnimation === 'function') {
        hasAnimation.value = true
      }
    }, 300)
  }

  nextTick(() => {
    val ? show() : hide()
    window[val ? 'addEventListener' : 'removeEventListener']('popstate', handlePopstate as (e: Event) => void)
  })
})

// 打开弹出层逻辑
function show() {
  window.history.pushState({ id: id.value }, '')
  store().push(id.value)
  setTimeout(() => {
    emit('onOpen', id.value, props.extra || {})
  }, 200)
}

// 关闭弹出层逻辑
function hide() {
  if (isSynced.value) {
    isSynced.value = false
    return
  }
  emit('onClose', { isPopstate: false }, props.extra || {})
  store().pop()
  history.back()
}

// 获取最大 z-index
function getMaxZIndex() {
  return Math.max(
    ...Array.from(document.querySelectorAll('*')).map(el =>
      parseInt(window.getComputedStyle(el).zIndex) || 1
    )
  )
}

// 层级递归回退动画控制
function backLvBy(targetLv: number, totalLv: number, callBack?: (i: number) => void) {
  for (let i = targetLv + 1; i <= totalLv; i++) {
    setTimeout(() => {
      callBack?.(i)
    }, i * 30)
  }
}

// mounted 生命周期
onMounted(() => {
  let container: HTMLElement | null = null
  if (typeof props.getContainer === 'function') {
    container = props.getContainer()
  } else if (props.getContainer) {
    container = document.querySelector(props.getContainer)
  }
  container?.appendChild(popupRef.value!)

  if (props.autoIndex) {
    maxZIndex.value = getMaxZIndex()
  }

  if (props.isAsync) return
  asyncHandler()
})

// 异步组件初始化方法
function asyncHandler() {
  const cache = store().getCur()
  const cacheLength = cache?.length || 0
  if (cacheLength) history.go(-cacheLength)
}

// beforeUnmount 生命周期
onBeforeUnmount(() => {
  window.removeEventListener('popstate', handlePopstate)
  if (popupRef.value?.parentNode) {
    popupRef.value.parentNode.removeChild(popupRef.value)
  }
})

// 暴露方法给父组件
defineExpose({
  asyncHandler,
  backLvBy
})
</script>

<template>
  <div
    style="position: fixed;top: 0;left: 0;bottom: 0;right: 0;width: 100%;backface-visibility: hidden;background-color: #fff;"
    ref="popupRef"
    class="popup-layer"
    :id="uuid || id"
    :style="{
      zIndex: autoIndex ? maxZIndex : zIndex,
      transform: visible ? 'translateX(0)' : 'translateX(100%)',
      transition: isAnimation && hasAnimation ? 'transform 0.3s' : 'none'
    }"
  >
    <slot v-if="slotVisible" />
  </div>
</template>