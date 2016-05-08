/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule todo.actions
 */

'use strict';

import fetch from 'isomorphic-fetch';
import { RECEIVE_TODOS, ADD_TODO, ERROR, TOGGLE_TODO } from '../constants';

/*
* Action Creators
*/
export const addTodo = (text) => {
    return (dispatch) => {
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: text
            })
        };
        
        return fetch('/api/todos', options)
            .then(response => response.json())
            .then(todo => dispatch(_addTodo(todo)))
            .catch(err => dispatch(_errorHandler(err)));
    }
};

const _addTodo = (todo) => {
    return {
        type: ADD_TODO,
        id: todo.id,
        isCompleted: todo.isCompleted,
        text: todo.text
    };
};

export const getTodos = () => {
    return (dispatch) => {
        return fetch('/api/todos')
            .then(response => response.json())
            .then(todo => dispatch(_receiveTodos(todo)))
            .catch(err => dispatch(_errorHandler(err)));
    }
};

const _receiveTodos = (todos) => {
    return {
        type: RECEIVE_TODOS,
        todos
    };
};

const _errorHandler = (err) => {
    console.log(err);
    return {
        type: ERROR,
        err
    };
};

const _toggleTodo = (todo) => {
    return {
        type: TOGGLE_TODO,
        id: todo.id,
        isCompleted: todo.isCompleted,
        text: todo.text
    }
};

export const toggleTodo = (id) => {
    return (dispatch) => {
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        
        return fetch(`/api/todos/${id}/toggle`, options)
            .then(response => response.json())
            .then(todo => dispatch(_toggleTodo(todo)))
            .catch(err => dispatch(_errorHandler(err)));
    }
};