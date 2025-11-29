// note service

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'


const NOTE_KEY = 'noteDB'

_createDemoNotes()

export const noteService = {
    query,
    get,
    save,
    remove,
    getEmptyNote,
}

function query() {
    return storageService.query(NOTE_KEY)
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function save(note) {

    if (note.info && note.info.todos) {
        note.info.todos = note.info.todos.map(todo => ({
            id: todo.id || utilService.makeId(),
            txt: todo.txt,
            isDone: !!todo.isDone
        }))
    }

    if (note.id) {
        note.colorClass = note.colorClass || utilService.getRandomKeepColor()
        return storageService.put(NOTE_KEY, note)

    } else {
        note.createdAt = Date.now()
        note.isPinned = false
        note.colorClass = note.colorClass || utilService.getRandomKeepColor()
        return storageService.post(NOTE_KEY, note)
    }
}



function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function getEmptyNote(txt = '', type = 'NoteTxt') {
    const note = {
        type,
        isPinned: false,
        createdAt: Date.now(),
        colorClass: utilService.getRandomKeepColor(),
        info: {},
    }
    if (type === 'NoteTxt') {
        note.info.txt = txt
    }
    return note
}

function _createDemoNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (notes && notes.length) return

    notes = [
        {
            id: utilService.makeId(),
            createdAt: Date.now() - 1000 * 60 * 60 * 12,
            type: 'NoteTxt',
            isPinned: true,
            colorClass: utilService.getRandomKeepColor(),
            info: {
                txt: '🚀 Welcome back Hodaya! This note is pinned.'
            },
        },
        {
            id: utilService.makeId(),
            createdAt: Date.now() - 1000 * 60 * 30,
            type: 'NoteImg',
            isPinned: true,
            colorClass: utilService.getRandomKeepColor(),
            info: {
                url: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg',
                title: 'Pinned Cat'
            },
        },

        {
            id: utilService.makeId(),
            createdAt: Date.now() - 1000 * 60 * 60 * 24,
            type: 'NoteTxt',
            isPinned: false,
            colorClass: utilService.getRandomKeepColor(),
            info: {
                txt: 'Fullstack Me Baby!',
            },
        },
        {
            id: utilService.makeId(),
            createdAt: Date.now() - 1000 * 60 * 60 * 2,
            type: 'NoteTxt',
            isPinned: false,
            colorClass: utilService.getRandomKeepColor(),
            info: {
                txt: 'Buy milk, cat food, coffee ☕',
            },
        },
        {
            id: utilService.makeId(),
            createdAt: Date.now() - 1000 * 60 * 10,
            type: 'NoteImg',
            isPinned: false,
            colorClass: utilService.getRandomKeepColor(),
            info: {
                url: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg',
                title: 'Important cat',
            },
        },
        {
            id: utilService.makeId(),
            createdAt: Date.now() - 1000 * 60 * 5,
            type: 'NoteTodos',
            isPinned: false,
            colorClass: utilService.getRandomKeepColor(),
            info: {
                title: 'Get my stuff together',
                todos: [
                    getEmptyTodo('Driving license', true),
                    getEmptyTodo('Coding power', false),
                ]
            },
        },
    ]

    utilService.saveToStorage(NOTE_KEY, notes)
}

function getEmptyTodo(txt = '', isDone = false) {
    return {
        id: utilService.makeId(),
        txt,
        isDone
    }
}
