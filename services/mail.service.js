import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const MAIL_KEY = 'MailDB'
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus',
}

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY).then((mails) => {
        if (filterBy.subject) {
            const regExp = new RegExp(filterBy.subject, 'i')
            mails = mails.filter((mail) => regExp.test(mail.subject))
        }

        filterBy.isRead
            ? (mails = mails.filter((mail) => mail.isRead === true))
            : (mails = mails.filter((mail) => mail.isRead === false))

        return mails
    })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
    //   .then((mail) => _setNextPrevMailId(mail))
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function _createMails() {
    const mails = utilService.loadFromStorage(BOOK_KEY) || []

    if (mails && mails.length) return

    for (let i = 0; i < 20; i++) {
        const mail = {
            id: utilService.makeId(),
            subject: utilService.makeLorem(3),
            body: utilService.makeLorem(50),
            createdAt: Date.now(),
            isRead: false,
            sentAt: null,
            removedAt: null,
            from: 'momo@momo.com',
            to: loggedinUser.email,
        }
        mails.push(mail)
    }
    utilService.saveToStorage(BOOK_KEY, mails)
}



function getEmptyMail() {
    return {
        fullName: 'new name',
        rating: 0,
        date: new Date().toISOString().slice(0, 10),
        txt: '',
       selected: 0,

            id: utilService.makeId(),
            subject: null,
            body: null,
            createdAt: Date.now(),
            isRead: false,
            sentAt: null,
            removedAt: null,
            from: null,
            to: null,
    }
}