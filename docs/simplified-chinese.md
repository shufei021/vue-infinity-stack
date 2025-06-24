# VueInfinityStack

[English](../README.md) | 简体中文 


VueInfinityStack 是一款专为 Vue 3 设计的现代化无限层叠弹层解决方案，它让复杂弹层管理变得简单而优雅。无论是简单的对话框、复杂的多步骤向导，还是深度嵌套的用户界面，VueInfinityStack 都能提供流畅、可靠的管理能力。

无限层叠的 Vue 3 弹层组件 - 轻松管理复杂弹层场景


## feature

- 🌌 无限层叠能力
- ⏳ 历史记录同步
- 🎚️ 智能层级管理
- 🌀 优雅过渡动画
- 📱 响应式设计

## API 文档

### Props
|属性名|	类型|	默认值|	说明|
|:-----|:-----|:-----|:-----|
|visible|	Boolean|	无|	控制弹层显示/隐藏|
|isAnimation|	Boolean|	true|	是否启用动画|
|zIndex|	Number|	1000|	基础层级|
|autoIndex|	Boolean|	false|	是否自动计算最大层级|
|storeName|	String|	'historyState'|	存储名称|
|storeType|	String|	'sessionStorage'|	存储类型 (localStorage/sessionStorage)|

### Events

|事件名|	参数|	说明|
|:-----|:-----|:-----|
|onOpen|	(id: string, extra: object)	|弹层打开时触发|
|onClose|	(event: { isPopstate: boolean }, extra: object)	|弹层关闭时触发|
