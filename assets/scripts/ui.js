const store = require('./store')

const showMyTodosTemplate = require('./templates/my-todo-listing.handlebars')
const showMyTodosCompleteTemplate = require('./templates/my-completed-listing.handlebars')
const showPublicTodos = require('./templates/public.handlebars')

// const eve = require('./events.js')
// const api = require('./api.js')

const signUpSuccess = (data) => {
  $('#modal1').modal('toggle')
  // $('.modal').modal('hide')
  $('.user-message').text('Welcome to Team Tomorrow\'s Bucket List Application! Please sign in to start!')
  setTimeout(() => $('.user-message').text(''), 5000)
  $('input[type=text]').val('')
  $('input[type=password]').val('')
}

const signUpFailure = () => {
  // $('.failedmessage1').text('Failed to Sign Up')
  setTimeout(() => $('.failedmessage1').text('Failed to Sign Up'), 300)
}

const signInSuccess = (data) => {
  store.user = data.user
  // console.log(data)
  $('.user-message').text('Welcome to your bucket list!')
  setTimeout(() => $('.user-message').text(''), 5000)
  $('#modal2').modal('hide')
  $('input[type=text]').val('')
  $('input[type=password]').val('')
  $('.a-sign-up').hide()
  $('.a-sign-in').hide()
  $('#myAllContent').show()
  $('#createContent').show()
  $('.sign-out').show()
  $('.a-change-pass').show()
  $('.completed_tasks').show()
  $('.public_todos').show()
}

const signInFailure = () => {
  $('.failedmessage2').text('Failed to Sign In')
}

const changePWSuccess = () => {
  $('.user-message').text('Your Password was changed successfully')
  setTimeout(() => $('.user-message').text(''), 5000)
  $('#modal3').modal('toggle')
  $('input[type=text]').val('')
  $('input[type=password]').val('')
}

const changePWFailure = () => {
  $('.failedmessage3').text('Failed to Change Password')
}

const signOutSuccess = () => {
  // $('.user-message').text('Please come back again!')
  // setTimeout(() => $('.user-message').text(''), 5000)
  $('.a-sign-up').show()
  $('.a-sign-in').show()
  $('.sign-out').hide()
  $('.a-change-pass').hide()
  $('#myAllContent').hide()
  $('#createContent').hide()
  $('.completed_tasks').hide()
  $('.public_todos').hide()
  $('#sign-up')[0].reset()
  $('#sign-in')[0].reset()
  $('#createForm')[0].reset()
  $('.failedmessage1').text('')
  $('.failedmessage2').text('')
  $('.user-message').text('What\'s on your Bucket List?  Log in to create one!')
  store.user = null
  store.data = null
}

const signOutFailure = () => {
  $('.user-message').text('Your Weren\'t able to Sign Out')
  setTimeout(() => $('.user-message').text(''), 5000)
}

const getMyTodosSuccess = (data) => {
  const myTodos = []
  data.todos.forEach((el) => {
    if (el.owner === store.user._id) {
      if (el.completed === false) {
        myTodos.unshift(el)
      }
    }
  })
  // console.log(myTodos)
  const showTodosHtml = showMyTodosTemplate({
    todos: myTodos
    // .sort(function (a, b) {return b.id - a.id})
  })
  $('#myAllContent').html(showTodosHtml)
  if (myTodos.length === 0) {
    $('#myAllContent').html('<h3 class="myHeader">Your Bucket List is currently empty!</h3>')
  }
}

const getMyCompletedTodosSuccess = (data) => {
  // console.log(data)
  const myTodos = []
  data.todos.forEach((el) => {
    if (el.owner === store.user._id) {
      if (el.completed === true) {
        myTodos.unshift(el)
      }
    }
  })
  // console.log(myTodos)
  const showTodosHtml = showMyTodosCompleteTemplate({
    todos: myTodos
    // .sort(function (a, b) {return b.id - a.id})
  })
  $('#completed_task').html(showTodosHtml)
  if (myTodos.length === 0) {
    $('#completed_task').html('<h2 class="failedmessage4 fm">Your list is empty</h2>')
  }
}

const getMyTodosFailure = () => {
  $('.failedmessage4').text('Sorry, but your list is not available at the moment')
  setTimeout(() => $('.failedmessage4').text(''), 5000)
}

const getMyCompletedTodosFailure = () => {
  $('.user-message').text('Sorry, but your list is not available at the moment')
  setTimeout(() => $('.user-message').text(''), 5000)
}

const updateTodoSuccess = () => {
  $('.user-message').text('Your Todo was updated')
  setTimeout(() => $('.user-message').text(''), 5000)
  $('.modal').modal('hide')
  // console.log('update worked')
}

const updateTodoFailure = () => {
  $('.user-message').text('Sorry, could not be updated')
  setTimeout(() => $('.user-message').text(''), 5000)
}

const completeTodoSuccess = () => {
  $('.user-message').text('Your Todo was completed')
  setTimeout(() => $('.user-message').text(''), 5000)
  // $('.modal').modal('hide')
  // console.log('update worked')
}

const completeTodoFailure = () => {
  $('.user-message').text('Sorry, could not be completed')
  setTimeout(() => $('.user-message').text(''), 5000)
}

const backOnListSuccess = () => {
  $('.failedmessage4').text('Your Todo is back to the list')
  setTimeout(() => $('.failedmessage4').text(''), 5000)
  // $('.modal').modal('hide')
  // console.log('update worked')
}

const backOnListFailure = () => {
  $('.failedmessage4').text('Sorry, could not be changed')
  setTimeout(() => $('.failedmessage4').text(''), 5000)
}

const createSuccess = () => {
  $('#createForm')[0].reset()
  $('.user-message').text('Added to your list')
  setTimeout(() => $('.user-message').text(''), 5000)
}

const createFailure = () => {
  $('.user-message').text('Sorry, Todo could not be created')
  setTimeout(() => $('.user-message').text(''), 5000)
}

const destroyTodoSuccess = () => {
  $('.user-message').text('Your todo has been Deleted')
  setTimeout(() => $('.user-message').text(''), 5000)
}

const destroyTodoFailure = () => {
  $('.user-message').text('Sorry, Todo could not be deleted')
  setTimeout(() => $('.user-message').text(''), 5000)
}

const destroyCompletedTodoSuccess = () => {
  $('.failedmessage4').text('Your todo has been Deleted')
  setTimeout(() => $('.failedmessage4').text(''), 5000)
}

const destroyCompletedTodoFailure = () => {
  $('.failedmessage4').text('Sorry, Todo could not be deleted')
  setTimeout(() => $('.failedmessage4').text(''), 5000)
}

// BONUS FEATURE UI------------------------------------
const getPublicTodosSuccess = (data) => {
  const publicTodos = []
  data.todos.forEach((el) => {
    publicTodos.unshift(el)
  })
  const showTodosHtml = showPublicTodos({
    todos: publicTodos
    // .sort(function (a, b) {return b.id - a.id})
  })
  $('#public_task').html(showTodosHtml)
  if (publicTodos.length === 0) {
    $('#public_task').html('<h2 class="failedmessage4 fm">Be the first to create a bucket list ever!</h2>')
  }
}

const getPublicTodosFailure = () => {
  $('.failedmessage5').text('Sorry, but the public list is not available at the moment')
  setTimeout(() => $('.failedmessage5').text(''), 5000)
}
// End of BONUS FEATURE UI------------------------------------

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePWSuccess,
  changePWFailure,
  signOutSuccess,
  signOutFailure,
  getMyTodosSuccess,
  getMyTodosFailure,
  updateTodoSuccess,
  createSuccess,
  createFailure,
  updateTodoFailure,
  destroyTodoSuccess,
  destroyTodoFailure,
  completeTodoFailure,
  completeTodoSuccess,
  getMyCompletedTodosSuccess,
  getMyCompletedTodosFailure,
  destroyCompletedTodoFailure,
  destroyCompletedTodoSuccess,
  backOnListFailure,
  backOnListSuccess,
  getPublicTodosSuccess,
  getPublicTodosFailure
}
