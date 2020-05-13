'use strict'

// const bell = new Audio('./public/bell.mp3')
let minInterval
let secInterval

const minTimer = () => {
  const min = parseInt($('.minutes').text())
  $('.minutes').text(min - 1)
}

const secTimer = () => {
  let sec = parseInt($('.seconds').text())
  if (sec === 0) {
    sec = 60
  }
  $('.seconds').text(sec - 1)
}

const timeControls = event => {
  const id = event.target.id
  if (id === 'start') {
    $('.start-pause').toggleClass('hidden')
    minInterval = setInterval(minTimer, 60000)
    secInterval = setInterval(secTimer, 1000)
  } else {
    clearInterval(minInterval)
    clearInterval(secInterval)
  }
  console.log(id)
}

const onReset = event => {
  $('.minutes').text('25')
  $('.seconds').text('00')
  console.log('Reset')
}

$(() => {
  $('.start-pause').on('click', timeControls)
  $('#reset').on('click', onReset)
})
