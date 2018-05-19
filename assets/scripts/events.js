const getFormFields = require('../../lib/get-form-fields')

const api = require('./api')

const ui = require('./ui')

const store = require('./store')

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signUp(data)
    .then(ui.signUpSuccess)
    .then(() => onAutoSignIn(data))
    .catch(ui.signUpFailure)
}

const onAutoSignIn = function (data) {
  api.signIn(data)
    .then(ui.signInSuccess)
    .then(() => onGetMyTodos())
    .catch(ui.signInFailure)
}

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  // console.log(data)
  api.signIn(data)
    .then(ui.signInSuccess)
    .then(() => onGetMyTodos(event))
    // .then(() => onCompletedTodos(event))
    .catch(ui.signInFailure)
}

const onSignOut = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signOut(data)
    .then(ui.signOutSuccess)
    // .then(() => onGetNotes(event))
    .catch(ui.signOutFailure)
}

const onChangePW = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.changePW(data)
    .then(ui.changePWSuccess)
    .catch(ui.changePWFailure)
}

const onCreateTodo = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  store.data = data
  // console.log('data is: ', data)
  api.createTodo(data)
    .then(ui.createSuccess)
    .then(() => onGetMyTodos())
    .catch(ui.createFailure)
}

const onGetMyTodos = function () {
  api.getTodos()
    .then(ui.getMyTodosSuccess)
    .catch(ui.getMyTodosFailure)
}

const onCompletedTodos = (event) => {
  event.preventDefault()
  api.getCompletedTodos()
    .then(ui.getMyCompletedTodosSuccess)
    .catch(ui.getMyCompletedTodosFailure)
}

const onDestroyTodo = (event) => {
  event.preventDefault()
  const todoId = $(event.target).closest('button').attr('data-id')
  // console.log(todoId)
  api.destroyTodo(todoId)
    .then(ui.destroyTodoSuccess)
    .then(() => onGetMyTodos(event))
    .catch(ui.destroyTodoFailure)
}

const onCompletedDestroyTodo = (event) => {
  event.preventDefault()
  const todoId = $(event.target).closest('button').attr('data-id')
  // console.log(todoId)
  api.destroyTodo(todoId)
    .then(ui.destroyCompletedTodoSuccess)
    .then(() => onCompletedTodos(event))
    .then(() => onGetMyTodos(event))
    .catch(ui.destroyCompletedTodoFailure)
}

const onUpdateTodo = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  const todoId = $(event.target).closest('div').attr('data-id')
  api.updateTodo(data, todoId)
    .then(ui.updateTodoSuccess)
    .then(() => onGetMyTodos(event))
    .catch(ui.updateTodoFailure)
}

const onCompleteTodo = (event) => {
  event.preventDefault()
  const todoId = $(event.target).closest('button').attr('data-id')
  api.completeTodo(todoId)
    .then(ui.completeTodoSuccess)
    .then(() => onGetMyTodos(event))
    .catch(ui.completeTodoFailure)
}

const onBackOnListTodo = (event) => {
  event.preventDefault()
  const todoId = $(event.target).closest('button').attr('data-id')
  api.backOnListTodo(todoId)
    .then(ui.backOnListSuccess)
    .then(() => onCompletedTodos(event))
    .then(() => onGetMyTodos(event))
    .catch(ui.backOnListFailure)
}

// BONUS FEATURE events ------------------------
const onPublicTodos = (event) => {
  event.preventDefault()
  api.getCompletedTodos()
    .then(ui.getPublicTodosSuccess)
    .catch(ui.getPublicTodosFailure)
}
// end of BONUS FEATURE events ------------------------

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('.sign-out').on('click', onSignOut)
  $('#change_pass').on('submit', onChangePW)
  $('#myAllContent').on('click', '.complete', onCompleteTodo)
  $('#myAllContent').on('submit', '.updating-todo-form', onUpdateTodo)
  $('#myAllContent').on('click', '.destroy', onDestroyTodo)
  $('#createForm').on('submit', onCreateTodo)
  $('.completed_tasks').on('click', onCompletedTodos)
  $('#completed_task').on('click', '.back-to-list', onBackOnListTodo)
  $('#completed_task').on('click', '.destroy', onCompletedDestroyTodo)
  $('.public_todos').on('click', onPublicTodos)
}

module.exports = {
  addHandlers
}
