## setup

enter target folder

`npm i`

`npm run dev`



## color list

红 黄 绿 黑 蓝 青 紫 **橙 粉**

Red Yellow Green Black Blue Cyan Purple **Orange Pink**



## difficulty setting

| stage             | match rate | strike condition | strike rate |
| ----------------- | ---------- | ---------------- | ----------- |
| 0. 无干扰         | 65%        | null             | 100%        |
| 1. 字上下颠倒     | 50%        | combo>=30        | 30%         |
| 2. 底色换为浅色   | 35%        | combo>=60        | 30%         |
| 3. 字的语言       | 20%        | combo>=90        | 30%         |
| 4. 颜色增加橙&粉  | 20%        | combo>=120       | 100%        |
| 5. 左右交换控制   | 20%        | combo>=150       | 30%         |
| 6. 周围十字形干扰 | 20%        | combo>=180       | 30%         |

