import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import emailList from '../../../assets/data/emails.json' assert { type: 'json' }
const EMAIL_KEY = 'emailDB'

var gFilterBy = { isRead: null}
// var gMailSortBy = { txt: '' }
// var gMailPageIdx

_createEmails()

export const emailService = {
    query,
    get,
    remove,
    save,
    getEmptyEmail,
    getFilterBy,
    setFilterBy,
    getNextEmailId,
}

function query() {
    return storageService.query(EMAIL_KEY).then(emails => emails)
}

function get(emailId) {
    return storageService.get(EMAIL_KEY,emailId)
}

function remove(emailId) {
    return storageService.remove(EMAIL_KEY, emailId)
}

function save(email) {
    if (email.id) {
        return storageService.put(EMAIL_KEY, email)
    }
    else {
        return storageService.post(EMAIL_KEY, email)
    }
}

function getEmptyEmail(title = '', txt = '') {
    return { id: '', title, txt }
}

function getFilterBy() {
    return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.isRead !== undefined) gFilterBy.isRead = filterBy.isRead
}

function getNextEmailId(emailId) {
    return storageService.query(EMAIL_KEY)
        .then(emails => {
            let idx = emails.findIndex(email => email.id === emailId)
            if (idx === emails.length - 1) idx = -1
            return emails[idx + 1].id
        })
}

function _createEmails() {
    let emails = utilService.loadFromStorage(EMAIL_KEY)
    if (!emails || !emails.length) {
        emails = emailList
        utilService.saveToStorage(EMAIL_KEY, emails)
    }
}

function _createEmail(title = '', txt = '') {
    const email = getEmptyEmail(title, txt)
    email.id = utilService.makeId()
    return email
}