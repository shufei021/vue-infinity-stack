<template>
    <div
      style="position: fixed;top: 0;left: 0;bottom: 0;right: 0;width: 100%;backface-visibility: hidden;background-color: #fff;"
      ref="popupRef" 
      class="vue-infinity-stack" 
      :id="uuid || id" 
      :style="{
        zIndex: autoIndex ? maxZIndex : zIndex,
        transform: visible ? 'translateX(0)' : 'translateX(100%)',
        transition: isAnimation && hasAnimation ? 'transform 0.3s' : 'none'
      }">
      <slot v-if="slotVisible" />
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
  
  const props = defineProps({
    uuid: {
      type: String,
      default: ''
    },
    visible: Boolean,
    isAnimation: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: Number,
      default: 1000
    },
    autoIndex: Boolean,
    storeName: {
      type: String,
      default: 'historyState'
    },
    extra: {
      type: Object,
      default: () => ({})
    },
    storeType: {
      type: String,
      default: 'localStorage'
    },
    getContainer: {
      type: [Function, String],
      default: ''
    },
    isAsync: Boolean,
    ishasAnimation: {
      type: Function,
      default: () => { }
    }
  })
  
  const emit = defineEmits(['onOpen', 'onClose'])
  
  // 生成唯一UID方法
  const guid = () => Array.from({ length: 8 }, (_, i) => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) + ([1, 2, 3, 4].includes(i) ? '-' : '')).join('')
  
  // 响应式数据
  const popupRef = ref(null)
  const hasAnimation = ref(true)
  const slotVisible = ref(true)
  const isSynced = ref(false)
  const id = ref(`popuplayer_${guid()}`)
  const maxZIndex = ref(1000)
  let timer = null
  
  // 计算属性
  const store = () => {
    const name = props.storeName
    const storage = window[props.storeType]
    const parse = JSON.parse
    const stringify = JSON.stringify
    const old = storage.getItem(name) ? parse(storage.getItem(name)) : []
    return {
      reset() {
        if (!storage.getItem(name) || old.length) {
          storage.setItem(name, stringify([]))
        }
      },
      update(newVal) {
        storage.setItem(name, stringify([...old, newVal]))
      },
      getCur() {
        return old
      },
      pop() {
        old.pop()
        storage.setItem(name, stringify(old))
      },
      push(val) {
        storage.setItem(name, stringify([...old, val]))
      }
    }
  }
  
  const handlePopstate = (e) => {
    // 浏览器历史状态  （控制台可以直接输入：history）
    const curState = e.state?.id || ''
    // 获取当前的 本地popuplayer历史记录
    const historyState = store().getCur()
    // 获取弹出层的层级数
    const len = historyState.length
    // 如果 弹出层的层级数 有值 并且 当前的返回事件id值 不等于
    if (len && curState !== historyState[len - 1]) {
      if (historyState[len - 1] === id.value) {
        // 抛出关闭事件
        emit('onClose', { isPopstate: true }, props.extra)
        // 关闭弹出层
        emit('update:visible', false)
        // 删除弹出层id
        store().pop()
        // 点击物理返回键，直接触发 popstate 事件，走到这里 说明 上一步 已经同步删除了本地 弹出层id
        isSynced.value = true
        // 输入框失去焦点
        document.activeElement?.blur()
      }
    }
  }
  
  // 监听visible变化
  watch(() => props.visible, (val) => {
    if (timer) clearTimeout(timer)
  
    if (val) {
      slotVisible.value = true
    } else {
      timer = setTimeout(() => {
        slotVisible.value = false
        if (props.ishasAnimation) {
          hasAnimation.value = true
        }
      }, 300)
    }
  
    nextTick(() => {
      val ? show() : hide()
      window[val ? 'addEventListener' : 'removeEventListener']('popstate', handlePopstate)
    })
  })
  
  
  
  const show = () => {
    window.history.pushState({ id: id.value }, '')
    store().push(id.value)
    setTimeout(() => {
      emit('onOpen', id.value, props.extra)
    }, 200)
  }
  
  const hide = () => {
    if (isSynced.value) return (isSynced.value = false)
    emit('onClose', { isPopstate: false }, props.extra)
    store().pop()
    history.back()
  }
  
  const closeLv = () => {
    emit('update:visible', false)
  }
  
  const getMaxZIndex = () => {
    return Math.max(
      ...Array.from(document.querySelectorAll('*')).map(el =>
        parseInt(window.getComputedStyle(el).zIndex) || 1
      )
    )
  }
  
  const backLvBy = (targetLv, totalLv, callBack) => {
    for (let i = targetLv + 1; i <= totalLv; i++) {
      setTimeout(() => {
        callBack?.(i)
      }, i * 30)
    }
  }
  
  
  
  // 生命周期
  onMounted(() => {
    let container
    if (typeof props.getContainer === 'function') {
      container = props.getContainer()
    } else if (props.getContainer) {
      container = document.querySelector(props.getContainer)
    }
  
    container?.appendChild(popupRef.value)
  
    if (props.autoIndex) {
      maxZIndex.value = getMaxZIndex()
    }
  
    if (!props.isAsync) {
      const cache = store().getCur()
      const cacheLength = cache?.length || 0
      cacheLength && history.go(-cacheLength)
      store().reset()
    }
  })
  
  onBeforeUnmount(() => {
    window.removeEventListener('popstate', handlePopstate)
    if (popupRef.value?.parentNode) {
      popupRef.value.parentNode.removeChild(popupRef.value)
    }
  })
  
  // 暴露方法
  defineExpose({
    closeLv,
    backLvBy
  })
  </script>
  