# Mind+ 扩展库格式对比与迁移指南

## 一、两种格式概述

Mind+ 扩展库存在两种格式：

| 特性 | 自带库 (旧版) | 用户库 (新版 V1.6.2+) |
|------|--------------|----------------------|
| 配置文件 | `lib.json` | `config.json` |
| 主入口 | `main.js` | `arduinoC/main.ts` |
| 积木定义 | `xxx_blocks.js` | `main.ts` 中的 `//% block` 注解 |
| 代码生成 | `xxx_code.js` | `main.ts` 中的 `Generator` API |
| 工具箱 | `xxx_toolbox.js` | 自动生成 |
| 多语言 | `language.js` | `_locales/zh-cn.json` |
| 下拉菜单 | 硬编码在 JS 中 | `_menus/主板名.json` |
| 库文件 | 需手动安装 | `libraries/libraries.zip` |
| 导出分享 | ❌ 不支持 | ✅ `.mpext` 文件 |
| 多主板支持 | ❌ 单一主板 | ✅ 多主板配置 |

---

## 二、文件结构对比

### 自带库结构 (ext_five_sensor)
```
ext_five_sensor/
├── lib.json              # 扩展库配置
├── main.js               # 入口文件，加载各模块
├── emakfun_blocks.js     # 积木外观定义
├── emakfun_code.js       # 代码生成器
├── emakfun_toolbox.js    # 工具箱XML
├── language.js           # 多语言
└── static/               # 静态资源
```

### 用户库结构 (mindplus_example)
```
five_new_sensor/
├── config.json                    # 扩展库配置
└── arduinoC/
    ├── main.ts                    # 积木定义 + 代码生成
    ├── _locales/
    │   └── zh-cn.json             # 中文翻译
    ├── _menus/
    │   ├── arduino.json           # Arduino下拉菜单
    │   ├── esp32.json             # ESP32下拉菜单
    │   └── ...
    ├── _images/
    │   ├── featured.png           # 封面图
    │   └── icon.svg               # 图标
    └── libraries/
        └── libraries.zip          # C++库文件
```

---

## 三、核心差异详解

### 1. 积木定义方式

**自带库** - 使用 Blockly JSON API：
```javascript
Blockly.Blocks['EXT_FIVE_INIT'] = {
    init: function () {
        this.jsonInit({
            "message0": "五路巡线模块初始化IIC接口",
            "colour": '#28BFE6',
            "extensions": ["shape_statement"]
        });
    }
};
```

**用户库** - 使用 TypeScript 注解：
```typescript
//% block="五路巡线模块初始化IIC接口" blockType="command" color="#28BFE6"
export function initSensor(parameter: any, block: any) {
    // 代码生成逻辑
}
```

### 2. 代码生成方式

**自带库** - 直接操作 Blockly.Arduino：
```javascript
Blockly.Arduino['EXT_FIVE_INIT'] = function (block) {
    Blockly.Arduino.definitions_['include'] = `#include "InfraredTracking.h"`;
    return `_5line_track.Init();\n`;
}
```

**用户库** - 使用 Generator API：
```typescript
Generator.addInclude('id', '#include "InfraredTracking.h"');
Generator.addSetup('id', 'Wire.begin();');
Generator.addObject('id', 'Type', 'code');
Generator.addCode('code');
```

### 3. 多语言处理

**自带库** - JS 模块导出：
```javascript
const zh_cn = {
    blocklyMessage: {
        EXT_FIVE_INFRARED_TRACKING: '五路循迹模块'
    }
}
module.exports = [zh_cn, en];
```

**用户库** - JSON 文件：
```json
{
    "namespace.functionName|block": "中文文本"
}
```

---

## 四、迁移映射表

| 自带库文件 | 用户库文件 | 迁移说明 |
|-----------|-----------|---------|
| `lib.json` | `config.json` | 字段名和结构调整 |
| `emakfun_blocks.js` | `main.ts` 中的 `//% block` | JSON → TS 注解 |
| `emakfun_code.js` | `main.ts` 中的函数体 | 改写成 Generator API 调用 |
| `emakfun_toolbox.js` | 无需单独文件 | 由 `main.ts` 自动生成 |
| `language.js` | `_locales/zh-cn.json` | JS → JSON 格式 |
| 硬编码下拉 | `_menus/主板.json` | 提取为独立配置文件 |
| 无库依赖 | `libraries/libraries.zip` | 打包 C++ 库文件 |

---

## 五、能否相互转化？

### ✅ 自带库 → 用户库（推荐）
- 完全可行，是官方推荐的迁移方向
- 可以获得多主板支持、导出分享等功能
- 工作量中等，主要是格式转换

### ❌ 用户库 → 自带库（不推荐）
- 技术上可行，但会丢失功能
- 无法还原多主板支持
- 无法自动处理库依赖
- 下拉菜单需硬编码，维护困难

---

## 六、迁移步骤

1. **创建目录结构**
2. **编写 `config.json`**
3. **编写 `main.ts`**（核心工作）
4. **创建 `_locales/zh-cn.json`**
5. **创建 `_menus/arduino.json`**
6. **打包 `libraries/libraries.zip`**
7. **本地测试导入**

---

## 七、Generator API 参考

| 方法 | 说明 |
|------|------|
| `Generator.addInclude(id, code)` | 添加头文件引用 |
| `Generator.addObject(id, type, code)` | 声明全局对象 |
| `Generator.addSetup(id, code)` | 在 setup() 中添加代码 |
| `Generator.addCode(code)` | 添加执行代码 |
| `Generator.addEvent(...)` | 定义事件回调 |
| `Generator.board` | 获取当前主板类型 |

---

*文档生成时间：2026-03-31*
