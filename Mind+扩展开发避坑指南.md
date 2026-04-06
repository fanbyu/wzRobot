# Mind+ 第三方扩展开发避坑指南

> 基于 Mind+ v1.8.1 RC3.0 + wzRobot 综合驱动库开发实践总结

---

## 1. 参数占位符格式：必须用 `[PARAM_NAME]`，不能用 `%1`

**错误写法**（会导致 UI 积木挤在一起/渲染异常）：
```typescript
//% block="设置灵敏度为 %1" blockType="command"
//% num.shadow="range" num.params.min=0 num.params.max=1000
```

**正确写法**：
```typescript
//% block="设置灵敏度为 [NUM]" blockType="command"
//% NUM.shadow="range" NUM.params.min=0 NUM.params.max=1000
```

**结论**：Mind+ v1.8.1 的参数占位符是 `[参数名]`（方括号+参数名），与参数注解中的名称对应。`%1`、`%2`、`%参数名` 格式均会导致 UI 渲染崩溃。

---

## 2. 下拉菜单：用 `_menus` JSON 文件，不用全局 enum

**正确做法**：在 `arduinoC/_menus/arduino.json` 中定义菜单：
```json
{
    "CHANNEL": {
        "menu": [
            ["第1路", "1"],
            ["第2路", "2"]
        ]
    },
    "WIRE_COLOR": {
        "menu": [
            ["白线", "1"],
            ["黑线", "0"]
        ]
    }
}
```

**在 main.ts 中引用**：
```typescript
//% block="读取 [CHANNEL] 模拟值" blockType="reporter"
//% CHANNEL.shadow="dropdown" CHANNEL.options="CHANNEL" CHANNEL.defl="1"
```

**注意**：
- `options` 值对应 `_menus` JSON 中的**菜单键名**
- `defl` 使用菜单的**值**（如 `"1"`），**不是** `ENUM.MEMBER` 格式
- enum 和 `_menus` **不要同时定义同名菜单**，会导致冲突

---

## 3. 函数签名：只用 `parameter: any`，不加 `block: any`

**错误写法**：
```typescript
export function myFunc(parameter: any, block: any) { ... }
```

**正确写法**（对齐 Sentry2 官方样例）：
```typescript
export function myFunc(parameter: any) { ... }
```

**影响**：`reporter` 和 `boolean` 类型的积木如果带了 `block: any` 参数，拖到编辑区后**不会自动生成代码**。

---

## 4. 代码生成 Order：用 `Generator.ORDER_UNARY_POSTFIX`

**reporter/boolean 类型积木**返回值时：
```typescript
Generator.addCode([`_5line_track.GetState()`, Generator.ORDER_UNARY_POSTFIX]);
```

**不要用** `Blockly.Arduino.ORDER_ATOMIC`，这是旧版写法。

---

## 5. config.json 的 files 字段不能为空

Mind+ 会警告 "files字段不能为空"。必须列出所有资源文件：
```json
{
    "asset": {
        "arduinoC": {
            "main": "main.ts",
            "files": [
                "_menus/arduino.json",
                "_locales/zh-cn.json",
                "_images/icon.svg",
                "_images/featured.png"
            ]
        }
    }
}
```

---

## 6. 打包 libraries：只打包 libraries.zip，不要打包解压后的源文件

**错误**：`build.py` 复制整个 `libraries/` 目录（含所有 .h/.cpp 源文件）
**正确**：只复制 `libraries/libraries.zip`

Mind+ 只识别 `libraries.zip`，多余的源文件不会影响功能但会增大包体积（从 242KB 涨到 338KB+），且某些场景可能导致异常。

---

## 7. namespace 必须与 config.json 的 id 一致

```json
{ "id": "wzRobot" }
```
```typescript
namespace wzRobot { ... }
```

---

## 8. Windows PowerShell 下恢复 git 二进制文件会被损坏

**错误**（PowerShell 管道会转换编码）：
```
git show main:arduinoC/_images/featured.png > featured.png
```

**正确**（用 Python 避免编码转换）：
```python
import subprocess
result = subprocess.run(['git', 'show', 'main:arduinoC/_images/featured.png'], capture_output=True)
with open('featured.png', 'wb') as f:
    f.write(result.stdout)
```

---

## 9. 完整的积木定义模板（对齐 Sentry2 官方样例）

```typescript
//% color="#28BFE6" iconWidth=50 iconHeight=40
namespace yourExtensionId {

    // 分类标签（无参数）
    //% block="分类名称" blockType="tag" weight=100
    export function categoryTag(parameter: any) {}

    // 命令积木（无参数）
    //% block="执行某操作" blockType="command"
    export function doSomething(parameter: any) {
        Generator.addInclude("lib_inc", `#include "Lib.h"`);
        Generator.addCode(`lib.doSomething();`);
    }

    // 命令积木（带 range 参数）
    //% block="设置数值为 [NUM]" blockType="command"
    //% NUM.shadow="range" NUM.params.min=0 NUM.params.max=1000 NUM.defl=500
    export function setValue(parameter: any) {
        let num = parameter.NUM.code;
        Generator.addCode(`lib.setValue(${num});`);
    }

    // 报告积木（返回值）
    //% block="获取 [CH] 数值" blockType="reporter"
    //% CH.shadow="dropdown" CH.options="CHANNEL" CH.defl="1"
    export function getValue(parameter: any) {
        let ch = parameter.CH.code;
        Generator.addCode([`lib.getValue(${ch})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    // 布尔积木（条件判断）
    //% block="检测到 [TYPE]" blockType="boolean"
    //% TYPE.shadow="dropdown" TYPE.options="TYPES" TYPE.defl="0"
    export function detectType(parameter: any) {
        let type = parameter.TYPE.code;
        Generator.addCode([`(lib.getState() == ${type})`, Generator.ORDER_UNARY_POSTFIX]);
    }
}
```

---

## 10. 调试排查方法：二分法逐步添加积木

当出现 UI 异常时：
1. 先只保留 tag（分类标签），确认基础正常
2. 每次只加 **1 个积木函数**，构建后测试
3. 定位到具体哪个积木/哪行注解导致异常
4. 对照官方样例（如 Sentry2）逐字对比

---

## 参考文件结构

```
project/
├── config.json              # 扩展配置（id/name/files）
├── build.py                 # 打包脚本
├── arduinoC/
│   ├── main.ts              # 积木定义
│   ├── _menus/
│   │   └── arduino.json     # 下拉菜单定义
│   ├── _locales/
│   │   └── zh-cn.json       # 中文翻译
│   ├── _images/
│   │   ├── icon.svg         # 图标（<5KB）
│   │   └── featured.png     # 封面图（<200KB）
│   └── libraries/
│       └── libraries.zip    # 库文件（只打包此zip）
```
