'use strict'

const bell = new Audio('./public/bell.mp3')
let minInterval
let secInterval

const breakSession = () => {
  bell.play()
  console.log('on break!')
}

const minTimer = () => {
  const min = parseInt($('.minutes').text())
  $('.minutes').text(min - 1)
}

const secTimer = () => {
  let sec = parseInt($('.seconds').text())
  const min = parseInt($('.minutes').text())
  if (min === 25) {
    $('.minutes').text('24')
  }
  if (sec === 0 && min === 0) {
    startPauseInterval(false)
    breakSession()
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
