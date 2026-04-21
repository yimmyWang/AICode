# Snake Game (HTML/CSS/JS)

一个基于原生 `HTML + CSS + JavaScript` 实现的浏览器贪吃蛇小游戏，代码按文件职责拆分，开箱即用。

## 项目结构

```text
snake-game/
├─ index.html
├─ css/
│  └─ style.css
└─ js/
   └─ game.js
```

## 如何运行

1. 打开项目目录。
2. 直接双击 `snake-game/index.html`，或用浏览器打开该文件。
3. 页面加载后按空格键开始游戏。

## 操作说明

- `方向键` 或 `W/A/S/D`：控制蛇移动
- `空格`：开始游戏
- `重新开始` 按钮：重开一局

## 功能特性

- 蛇身移动与食物随机生成
- 吃到食物后增长并加分
- 撞墙/撞自身游戏结束
- 实时分数显示
- 本地最高分记录（`localStorage`）

## 游戏截图

> 将截图文件放到 `assets/images/` 目录，然后替换下方示例文件名。

![游戏主界面截图](assets/images/snake-screenshot.png)

## GIF 演示

> 将 GIF 文件放到 `assets/images/` 目录，然后替换下方示例文件名。

![贪吃蛇游戏演示](assets/images/snake-demo.gif)

## 技术栈

- HTML5 Canvas
- CSS3
- Vanilla JavaScript (ES6)
