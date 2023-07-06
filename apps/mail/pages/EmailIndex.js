import { emailService } from "../services/email.service.js"
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import EmailList from '../cmps/EmailList.js'

export default {
    template: `
            <RouterLink class="email-index-container" to="/email">

                <!-- COMPOSE - NEW EMAIL -->
                <fieldset class="compose-bar">
                    <legend>C</legend>
                    <button>Compose</button>
                </fieldset>

                <!-- SEARCH BAR -->
                <fieldset class="search-bar flex justify-center">
                    <legend>search icon</legend>
                    <!-- TODO -->
                    <input v-model="searchTxt" type="text" placeholder="Search mail" />
                </fieldset>

                <!-- FILTER NAV -->
                <nav class="label-container">
                    <ul class="clean-list label-container">
                    <li><RouterLink to="/email">Inbox</RouterLink></li>
                        <li><a href="#">Starred</a></li>
                        <li><a href="#">Important</a></li>
                        <li><a href="#">Sent</a></li>
                        <li><a href="#">Draft</a></li>
                        <li><a href="#">Draft</a></li>
                        <li><RouterLink to="/email/trash">Trash</RouterLink></li>
                    </ul>
                </nav>

                <!-- EMAILS - MAIN -->
                <section class="email-container">
                    <RouterView :emails="emails" @remove="removeEmail"/>
                </section>
            </RouterLink>
    `,
    data() {
        return {
            emails: [],

            searchTxt: '',
            // showDraft: null,
            // showTrash: null,
            // showUnread: null,
            // showSent: null,
        }
    },
    created() {
        this.getEmails()
    },
    methods: {
        getEmails() {
            emailService.query().then(emails => (this.emails = emails))
        },
        removeEmail(emailId) {
            emailService.remove(emailId).then(() => {
                const idx = this.emails.findIndex(email => email.id === emailId)
                this.emails.splice(idx, 1)
                showSuccessMsg('Email deleted')
            })
            .catch(err => showErrorMsg('Was unable to delete email'))
        },
        onTrashView() {
            console.log('youre trash!!');
        },
    },
    computed: {

    },
    components: {
        EmailList,
    },
    watch: {
        searchTxt: {
            handler() {
                const filterBy = { txt: this.searchTxt }
                emailService.setFilterBy(filterBy)
                this.getEmails()
            }
        }
    }
}