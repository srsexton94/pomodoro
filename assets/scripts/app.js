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

const startPauseInterval = (bool) => {
  $('.start-pause').toggleClass('hidden')
  if (bool) {
    minInterval = setInterval(minTimer, 60000)
    secInterval = setInterval(secTimer, 1000)
  } else {
    clearInterval(minInterval)
    clearInterval(secInterval)
  }
}

const onReset = event => {
  startPauseInterval(false)
  $('.minutes').text('25')
  $('.seconds').text('00')
}

$(() => {
  $('#start').on('click', event => {
    event.preventDefault()
    startPauseInterval(true)
  })
  $('#pause').on('click', event => {
    event.preventDefault()
    startPauseInterval(false)
  })
  $('#reset').on('click', onReset)
})
