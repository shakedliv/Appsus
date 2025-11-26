import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'MailDB'
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus',
}
_createMails()

export const mailsService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    setIsRead,
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY).then((mails) => {
        //   if (filterBy.subject) {
        //       const regExp = new RegExp(filterBy.subject, 'i')
        //       mails = mails.filter((mail) => regExp.test(mail.subject))
        //   }

        //   filterBy.isRead
        //       ? (mails = mails.filter((mail) => mail.isRead === true))
        //       : (mails = mails.filter((mail) => mail.isRead === false))

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

function getDefaultFilter(filterBy = { subject: '', isRead: false }) {
    return { subject: filterBy.subject, isRead: filterBy.isRead }
}
function setIsRead(mailID) {
    return get(mailID).then((mail) => {
        mail.isRead = true
        console.log('mail:', mail)
        return save(mail)
    })
}

function _createMails() {
    const mails = utilService.loadFromStorage(MAIL_KEY) || []
    const hour = 1000 * 60 * 60
    if (mails && mails.length) return

    for (let i = 0; i < 20; i++) {
        const creationTime =
            Date.now() - utilService.getRandomIntInclusive(0, hour * 1000)
        const mail = {
            id: utilService.makeId(),
            subject: utilService.makeLorem(3),
            body: utilService.makeLorem(50),
            createdAt: creationTime,
            isRead: Math.random() < 0.4,
            sentAt:
                creationTime - utilService.getRandomIntInclusive(0, hour * 999),
            removedAt: null,
            from: utilService.getRandomEmail(),
            to: loggedinUser.email,
        }
        mails.push(mail)
    }
    utilService.saveToStorage(MAIL_KEY, mails)
}

function getEmptyMail() {
    return {
        id: utilService.makeId(),
        subject: '',
        body: '',
        createdAt: Date.now(),
        isRead: false,
        sentAt: null,
        removedAt: null,
        from: loggedinUser.fullname,
        to: '',
    }
}
