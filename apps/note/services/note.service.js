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
    if (note.id){
        return storageService.put(NOTE_KEY, note)
        } else {
         note.createdAt = Date.now()
        note.isPinned = false
        note.style = note.style || { backgroundColor: '#ffffff' }
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
        style: {
            backgroundColor: '#ffffff',
        },
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
            createdAt: Date.now() - 1000 * 60 * 60 * 24,
            type: 'NoteTxt',
            isPinned: true,
            style: {
                backgroundColor: '#fff9c4',
            },
            info: {
                txt: 'Fullstack Me Baby!',
            },
        },
        {
            id: utilService.makeId(),
            createdAt: Date.now() - 1000 * 60 * 60 * 2,
            type: 'NoteTxt',
            isPinned: false,
            style: {
                backgroundColor: '#c8e6c9',
            },
            info: {
                txt: 'Buy milk, cat food, coffee ☕',
            },
        },
        {
            id: utilService.makeId(),
            createdAt: Date.now() - 1000 * 60 * 10,
            type: 'NoteImg',
            isPinned: false,
            style: {
                backgroundColor: '#bbdefb',
            },
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
            style: {
                backgroundColor: '#ffcdd2',
            },
            info: {
                title: 'Get my stuff together',
                todos: [
                    { txt: 'Driving license', isDone: true },
                    { txt: 'Coding power', isDone: false },
                ],
            },
        },
    ]

    utilService.saveToStorage(NOTE_KEY, notes)
}
