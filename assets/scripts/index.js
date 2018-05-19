
'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const authEvents = require('./events')

// $('.all-todos').hide()
// $('.create-todo').hide()
$('.sign-out').hide()
$('.a-change-pass').hide()
$('#createContent').hide()
$('#myAllContent').hide()
$('.completed_tasks').hide()
$('.public_todos').hide()
$('.user-message').text('What\'s on your Bucket List?  Log in to create one!')

$(() => {
  authEvents.addHandlers()
})
