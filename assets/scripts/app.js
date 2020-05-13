'use strict'

const bell = new Audio('./public/bell.mp3')
const store = require('./store')
let minInterval
let secInterval

const breakSession = () => {
  bell.play()
  store.onbreak = true
  $('.minutes').text('5')
  $('.seconds').text('00')
  startPauseInterval(true)
}

const minTimer = () => {
  const min = parseInt($('.minutes').text())
  $('.minutes').text(min - 1)
}

const hitZero = () => {
  startPauseInterval(false)
  if (store.onbreak) {
    store.onbreak = false
    reset()
  } else {
    breakSession()
  }
}

const secTimer = () => {
  let sec = parseInt($('.seconds').text())
  const min = parseInt($('.minutes').text())
  if (min === 25) {
    $('.minutes').text('24')
  }
  if (min === 5 && store.onbreak) {
    $('.minutes').text('4')
  }
  if (sec === 0 && min === 0) {
    hitZero()
    return
  } else if (sec === 0) {
    sec = 60
  }
  let newSec = `${sec - 1}`
  if (newSec.length === 1) {
    newSec = `0${newSec}`
  }
  $('.seconds').text(newSec)
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

const reset = event => {
  startPauseInterval(false)
  $('.minutes').text('25')
  if (store.onbreak) {
    $('.minutes').text('5')
  }
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
  $('#reset').on('click', reset)
})
