<script setup>
import { PlusIcon } from '@heroicons/vue/outline'

const data = [{ bg: 'bg-blue-200', text: 'text-blue-500', content: ['蓝', 'Blue'] },
  { bg: 'bg-red-200', text: 'text-red-500', content: ['红', 'Red'] },
  { bg: 'bg-gray-200', text: 'text-black', content: ['黑', 'Black'] },
  { bg: 'bg-yellow-200', text: 'text-yellow-500', content: ['黄', 'Yellow'] },
  { bg: 'bg-purple-200', text: 'text-purple-500', content: ['紫', 'Purple'] },
  { bg: 'bg-green-200', text: 'text-green-500', content: ['绿', 'Green'] },
  { bg: 'bg-cyan-200', text: 'text-cyan-500', content: ['青','Cyan'] },
  { bg: 'bg-orange-200', text: 'text-orange-500', content: ['橙','Orange'] },
  { bg: 'bg-pink-200', text: 'text-pink-500', content: ['粉','Pink'] }]

const rate = [0.65, 0.5, 0.35, 0.2, 0.2, 0.2, 0.2]

let style = $ref({})
let plus = $ref('')
let auto = $ref(false)
style.bg = 'bg-white'
style.text = 'bg-black-500'
style.content = 'Hello!'

let time0 = $ref(0)
let reverse = $ref(false)
let combo = $ref(-1)
let stage = $ref(0)
let usedtime = $ref(0)
let lasttap = $ref(0)
let onetap = $ref(0)
let colorPlus = $ref('')
let ans = true

const res = []

const renderPlus = () => {
  const alpha = Math.random() * 360
  const theta = Math.random() * 3.1416
  const r = 80
  return `transform: translate(${r * Math.cos(theta)}px, ${r * Math.sin(theta)}px) rotate(${alpha}deg)`
}

async function save() {
  const newHandle = await window.showSaveFilePicker();
  const writableStream = await newHandle.createWritable();
  const blob = new Blob([JSON.stringify(res)], {type : 'application/json'})
  await writableStream.write(blob);
  await writableStream.close();
}

function change () {
  if (combo == 1) {
    lasttap = Date.now()
    res.push([style.bg, style.text, style.content, ans, reverse, colorPlus, lasttap.toFixed(3)])
  }
  else {
    onetap = (Date.now() - lasttap) / 1000
    lasttap = Date.now()
    res.push([style.bg, style.text, style.content, ans, reverse, colorPlus, onetap.toFixed(3)])
  }
  if (combo == 30) stage = 1
  if (combo == 60) stage = 2
  if (combo == 90) stage = 3
  if (combo == 120) stage = 4
  if (combo == 150) stage = 5
  if (combo == 180) stage = 6
  ans = Boolean(Math.random() < rate[stage])
  const L = stage > 3 ? 9 : 7
  const b = Math.floor(Math.random() * L)
  const c = Math.floor(Math.random() * L)
  const t = ans ? c : (() => { let res = c; while (res == c) res = Math.floor(Math.random() * L); return res })()
  if (stage > 1 && Math.random() < 0.3) style.bg = data[b].bg
  else style.bg = 'bg-white'
  style.text = data[t].text
  if (stage > 0 && Math.random() < 0.3) style.text += ' rotate-180'
  style.content = data[c].content[0]
  if (stage > 2 && Math.random() < 0.3) style.content = data[c].content[1]
  if (stage > 5 && Math.random() < 0.3) {
    plus = renderPlus()
    colorPlus = data[ans ? (() => { let res = c; while (res == c) res = Math.floor(Math.random() * L); return res })() : c].text
  }
  else plus = ''
  if (stage > 4 && Math.random() < 0.3) {
    reverse = true
    ans = ans ? false : true
  }
  else reverse = false 
}

function manual (a) {
  if (!time0 || auto) return
  if (a == ans) combo ++
  else {
    stop()
    return
  }
  change()
}

function start () {
  time0 = Date.now()
  clock = setInterval(() => { usedtime = (Date.now() - time0) / 1000 }, 16)
}

function stop () {
  console.log({ usedtime, stage, combo })
  res.push([usedtime, stage, combo])
  clearInterval(clock)
  time0 = 0
  lasttap = 0
  onetap = 0
  style.bg = 'bg-white'
  style.text = 'bg-black-500'
  style.content = 'Hello!'
  combo = -1
  stage = 0
  reverse = false
  ans = true
}

let clock

const sleep = ms => new Promise(r => setTimeout(r, ms))

async function zijidong () {
  if (auto && time0) {
    combo ++
    change()
  }
  await sleep(1000)
  zijidong()
}

zijidong()

</script>

<template>
  <div class="all-transition h-screen flex flex-col items-center justify-center" :class="style.bg">
    <div class="relative flex flex-col items-center justify-center border-black border-4 w-2/3 h-2/3" @click.left="manual(true)" @click.right="manual(false)" @contextmenu.prevent>
      <div class="all-transition text-8xl" :class="style.text">{{ style.content }}</div>
      <div v-if="!time0" class="text-4xl cursor-pointer all-transition mt-10 font-mono" @click="start">CLICK HERE TO START</div>
      <div v-if="reverse" class="text-4xl text-red-500 all-transition mt-10 font-mono">REVERSE</div>
    </div>
    <button class="absolute buttom-8 right-8 text-4xl font-mono" @click="save">SAVE</button>
    <button class="absolute buttom-8 left-8 text-4xl font-mono" @click="auto = !auto">AUTO: {{ auto ? 'ON' : 'OFF'}}</button>
    <plus-icon v-if="plus" class="fixed w-24 h-24" :style="plus" :class="colorPlus"/>
  </div>
  <div v-if="time0" class="absolute top-8 right-8 text-4xl font-mono">used time: {{ usedtime.toFixed(3) }}, stage: {{ stage }}, combo: {{ combo }}</div>
  <button v-if="time0" class="all-transition absolute top-8 left-8 text-4xl font-mono" :class="style.text" @click="stop">GIVE UP</button>
</template>
