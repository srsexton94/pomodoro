'use strict'

const bell = new Audio('./public/bell.mp3')
const store = require('./store')
let minInterval
let secInterval

const breakSession = () => {
  bell.play()
  store.onbreak = true
  $('.minutes').text(store.break)
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
  if (min === store.session) {
    $('.minutes').text(store.session - 1)
  }
  if (min === store.break && store.onbreak) {
    $('.minutes').text(store.break - 1)
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
  $('#start').removeClass('hidden')
  $('#pause').addClass('hidden')
  $('.minutes').text(store.session)
  if (store.onbreak) {
    $('.minutes').text(store.break)
  }
  $('.seconds').text('00')
}

$(() => {
  $('.start-pause').on('click', () => {
    $('.start-pause').toggleClass('hidden')
  })
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
