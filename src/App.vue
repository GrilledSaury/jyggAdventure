<script setup>

const data = [{ bg: 'bg-blue-200', text: 'text-blue-500', content: ['蓝', 'blue'] },
  { bg: 'bg-red-200', text: 'text-red-500', content: ['红', 'red'] },
  { bg: 'bg-gray-200', text: 'text-black', content: ['黑', 'black'] },
  { bg: 'bg-yellow-200', text: 'text-yellow-500', content: ['黄', 'yellow'] },
  { bg: 'bg-purple-200', text: 'text-purple-500', content: ['紫', 'purple'] },
  { bg: 'bg-green-200', text: 'text-green-500', content: ['绿', 'green'] }]

const rate = [0.7, 0.6, 0.5, 0.4, 0.3]

let style = $ref({})
style.bg = 'bg-white'
style.text = 'bg-black-500'
style.content = 'Hello!'

let time0 = $ref(0)
let reverse = $ref(false)
let combo = $ref(0)
let stage = $ref(0)
let usedtime = $ref(0)

let ans = true

function change (a) {
  if (!time0) return
  if (a == ans) {
    combo ++
  }
  else {
    stop()
    return
  }
  if (combo == 25) stage = 1
  if (combo == 50) stage = 2
  if (combo == 75) stage = 3
  if (combo == 100) stage = 4
  ans = Boolean(Math.random() < rate[stage])
  const L = data.length
  const b = Math.floor(Math.random() * L)
  const c = Math.floor(Math.random() * L)
  let t = c
  if (!ans) while (t == c) t = Math.floor(Math.random() * L)
  if (stage > 1 && Math.random() < 0.1) style.bg = data[b].bg
  else style.bg = 'bg-white'
  style.text = data[t].text
  if (stage > 0 && Math.random() < 0.1) style.text += ' rotate-180'
  style.content = data[c].content[0]
  if (stage > 2 && Math.random() < 0.1) style.content = data[c].content[1]
  if (stage > 3 && Math.random() < 0.1) {
    reverse = true
    ans = ans ? false : true
  }
  else reverse = false
}

function start () {
  time0 = Date.now()
  clock = setInterval(() => { usedtime = (Date.now() - time0) / 1000 }, 16)
}

function stop () {
  console.log({ usedtime, stage, combo })
  clearInterval(clock)
  time0 = 0
  style.bg = 'bg-white'
  style.text = 'bg-black-500'
  style.content = 'Hello!'
  combo = 0
  stage = 0
  ans = true
}

let clock


</script>

<template>
  <div class="all-transition h-screen flex flex-col items-center justify-center" :class="style.bg" @click.left="change(true)" @click.right="change(false)" @contextmenu.prevent>
    <div class="all-transition text-8xl" :class="style.text">{{ style.content }}</div>
    <div v-if="!time0" class="text-4xl cursor-pointer all-transition mt-10 font-mono" @click="start">CLICK HERE TO START</div>
    <div v-if="reverse" class="text-4xl text-red-500 all-transition mt-10 font-mono">REVERSE</div>
  </div>
  <div v-if="time0" class="absolute top-8 right-8 text-4xl font-mono">used time: {{ usedtime }}, stage: {{ stage }}, combo: {{ combo }}</div>
  <button v-if="time0" class="absolute top-8 left-8 text-4xl font-mono" :class="style.text" @click="stop">GIVE UP</button>
</template>
