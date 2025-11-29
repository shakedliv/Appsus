// note service

import { utilService } from '../../services/util.service.js'
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
    const noteToSave = { ...note }

    if (noteToSave.info && Array.isArray(noteToSave.info.todos)) {
        noteToSave.info = {
            ...noteToSave.info,
            todos: noteToSave.info.todos.map(todo => ({
                id: todo.id || utilService.makeId(),
                txt: todo.txt,
                isDone: !!todo.isDone
            }))
        }
    }

    if (noteToSave.id) {
        return storageService.put(NOTE_KEY, noteToSave)
    }

    noteToSave.id = utilService.makeId()
    noteToSave.createdAt = noteToSave.createdAt || Date.now()
    noteToSave.isPinned = !!noteToSave.isPinned
    noteToSave.colorClass = noteToSave.colorClass || 'no-color'

    return storageService.post(NOTE_KEY, noteToSave)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function getEmptyNote(txt = '', type = 'NoteTxt') {
    const note = {
        id: null,
        type,
        isPinned: false,
        createdAt: Date.now(),
        colorClass: 'no-color',
        info: {},
    }

    if (type === 'NoteTxt') {
        note.info.title = ''
        note.info.txt = txt
    }

    if (type === 'NoteImg') {
        note.info.title = ''
        note.info.url = ''
    }

    if (type === 'NoteTodos') {
        note.info.title = ''
        note.info.todos = []
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
            colorClass: 'no-color',
            info: {
                txt: '🚀 Welcome Hodaya! Pinned, clean, no color.'
            },
        },

        {
            id: utilService.makeId(),
            createdAt: Date.now() - 1000 * 60 * 10,
            type: 'NoteImg',
            isPinned: false,
            colorClass: 'no-color',
            info: {
                url: 'https://images.pexels.com/photos/20787/pexels-photo.jpg',
                title: 'Important Doggo',
            },
        },

        {
            id: utilService.makeId(),
            createdAt: Date.now() - 1000 * 60 * 2,
            type: 'NoteTxt',
            isPinned: false,
            colorClass: 'no-color',
            info: {
                txt: 'Reminder: Be awesome today ✨',
            },
        },

        {
            id: utilService.makeId(),
            createdAt: Date.now() - 1000 * 60 * 25,
            type: 'NoteTodos',
            isPinned: false,
            colorClass: 'no-color',
            info: {
                title: 'Minimalist list',
                todos: [
                    getEmptyTodo('Breathe.', true),
                    getEmptyTodo('Relax.', false),
                ]
            },
        },

        {
            id: utilService.makeId(),
            createdAt: Date.now() - 1000 * 60 * 30,
            type: 'NoteImg',
            isPinned: true,
            colorClass: 'note-color-5',
            info: {
                url: 'https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg',
                title: 'Pinned Cat'
            },
        },

        {
            id: utilService.makeId(),
            createdAt: Date.now() - 1000 * 60 * 60 * 24,
            type: 'NoteTxt',
            isPinned: false,
            colorClass: 'note-color-9',
            info: {
                txt: 'Fullstack Me Baby!',
            },
        },

        {
            id: utilService.makeId(),
            createdAt: Date.now() - 1000 * 60 * 60 * 2,
            type: 'NoteTxt',
            isPinned: false,
            colorClass: 'note-color-11',
            info: {
                txt: 'Buy milk, cat food, coffee ☕',
            },
        },

        {
            id: utilService.makeId(),
            createdAt: Date.now() - 1000 * 60 * 5,
            type: 'NoteTodos',
            isPinned: false,
            colorClass: 'note-color-3',
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
