const config = require('./config')

const store = require('./store')

const signUp = function (data) {
  return $.ajax({
    url: config.apiUrl + '/sign-up',
    method: 'POST',
    data
  })
}

const signIn = function (data) {
  // console.log(data)
  return $.ajax({
    url: config.apiUrl + '/sign-in',
    method: 'POST',
    data
  })
}

const signOut = function () {
  return $.ajax({
    url: config.apiUrl + '/sign-out/', // + store.user.id,
    method: 'DELETE',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const changePW = function (data) {
  return $.ajax({
    url: config.apiUrl + '/change-password/',
    method: 'PATCH',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}
//
const getTodos = function () {
  return $.ajax({
    url: config.apiUrl + '/todos/',
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const getCompletedTodos = function () {
  return $.ajax({
    url: config.apiUrl + '/todos/',
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateTodo = function (data, todoId) {
  return $.ajax({
    url: config.apiUrl + '/todos/' + todoId,
    method: 'PATCH',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'todo': {
        'title': data.todo.title,
        'text': data.todo.text,
        'location': data.todo.location
      }
    }
  })
}

const completeTodo = function (todoId) {
  return $.ajax({
    url: config.apiUrl + '/todos/' + todoId,
    method: 'PATCH',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'todo': {
        'completed': true
      }
    }
  })
}

const backOnListTodo = function (todoId) {
  return $.ajax({
    url: config.apiUrl + '/todos/' + todoId,
    method: 'PATCH',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'todo': {
        'completed': false
      }
    }
  })
}

const createTodo = function (data) {
  // console.log(data)
  // console.log(store)
  return $.ajax({
    url: config.apiUrl + '/todos',
    method: 'POST',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'todo': {
        'title': data.todo.title,
        'text': data.todo.text,
        'location': data.todo.location,
        'completed': false
      }
    }
  })
}

const destroyTodo = function (todoId) {
  return $.ajax({
    url: config.apiUrl + '/todos/' + todoId,
    method: 'DELETE',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  signUp,
  signIn,
  signOut,
  changePW,
  getTodos,
  updateTodo,
  createTodo,
  destroyTodo,
  completeTodo,
  getCompletedTodos,
  backOnListTodo
}
