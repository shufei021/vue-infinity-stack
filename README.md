# VueInfinityStack

English | [简体中文](https://github.com/shufei021/vue-infinity-stack/blob/main/README_CN.md) 

[![npm version](https://img.shields.io/npm/v/vue-infinity-stack.svg)](https://www.npmjs.com/package/vue-infinity-stack)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**An infinite stacking popup layer component for Vue 3**

## Example
[codesandbox](https://cpqykl-5173.csb.app/)  [codesandbox-code](https://codesandbox.io/p/devbox/vueinfinitystack-demo-en-cpqykl)  

VueInfinityStack is a modern infinite stacking overlay solution designed exclusively for Vue 3, empowering simple yet elegant management of complex overlays. Whether handling simple dialogs, intricate multi-step wizards, or deeply nested user interfaces, VueInfinityStack delivers seamless and reliable management capabilities.

## Features
- 🌌 **Infinite Stacking** - Unlimited nested layers with visual hierarchy
- ⏳ **History Sync** - Perfect browser back/forward integration
- 🎚️ **Smart Layer Management** - Automatic z-index optimization
- 🌀 **Elegant Animations** - Smooth bezier-curve transitions
- 📱 **Responsive Design** - Flawless mobile & desktop experience

## API document

### Props
| Property Name | Type | Default Value | Description |
|:-----|:-----|:-----|:-----|
|visible|	Boolean|	-|	Controls the visibility of the popup layer|
|isAnimation|	Boolean|	true|	Enables/disables transition animations|
|zIndex|	Number|	1000|	Base z-index value for layer stacking|
|autoIndex|	Boolean|	false|	Enables automatic calculation of maximum z-index|
|storeName|	String|	'historyState'|	Identifier for state storage|
|storeType|	String|	'sessionStorage'|	Storage mechanism type (options: localStorage/sessionStorage)|

### Events

|Property Name|	parameter|	Description|
|:-----|:-----|:-----|
|onOpen|	(id: string, extra: object)	|Emitted when the popup layer is opened|
|onClose|	(event: { isPopstate: boolean }, extra: object)	|Emitted when the popup layer is closed|
