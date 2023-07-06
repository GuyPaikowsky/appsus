import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import emailList from '../../../assets/data/emails.json' assert { type: 'json' }

const EMAIL_KEY = 'emailDB'

var gFilterBy = { showUnread: false, showTrash: false, showDraft: false, showSent: false, txt: '', }
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
    return storageService.query(EMAIL_KEY).then(emails => {

        const keys = Object.keys(emails[0])

        if (gFilterBy.showUnread) {
            emails = emails.filter(email => !email.isRead)
        }

        if (gFilterBy.showDraft) {
            emails = emails.filter(email => email.isDraft)
        }

        if (gFilterBy.showSent) {
            emails = emails.filter(email => email.isSent)
        }

        if (gFilterBy.showTrash) {
            emails = emails.filter(email => email.isTrash)
        }
        else {
            emails = emails.filter(email => !email.isTrash)
        }

        if (gFilterBy.txt) {
            const regex = new RegExp(gFilterBy.txt, 'i')
            emails = emails.filter(email => {
                // enabaling to, from, title and txt searching
                for (const key of keys) {
                    if (regex.test(email[key])) return true
                }
                return false
            })
        }

        console.log(emails);
        return emails
    })
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
    if (filterBy.showUnread !== undefined) gFilterBy.showUnread = filterBy.showUnread
    if (filterBy.showTrash !== undefined) gFilterBy.showTrash = filterBy.showTrash
    if (filterBy.showDraft !== undefined) gFilterBy.showDraft = filterBy.showDraft
    if (filterBy.showSent !== undefined) gFilterBy.showSent = filterBy.showSent
    if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    console.log('setfilter', gFilterBy);
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
    // let emails = []      // is used as a dev tool to reset emails from local storage
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