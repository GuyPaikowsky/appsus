import { emailService } from "../services/email.service.js"
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import EmailFilter from "../cmps/EmailFilter.js"
import EmailList from '../cmps/EmailList.js'

export default {
    template: `
            <RouterLink class="email-index-container" to="/email">

                <!-- COMPOSE - NEW EMAIL -->
                <fieldset class="compose-bar">
                    <legend>C</legend>
                    <button @click="onCompose">Compose</button>
                </fieldset>

                <!-- SEARCH BAR -->
                <fieldset class="search-bar flex justify-center">
                    <legend>search icon</legend>
                    <!-- TODO -->
                    <input v-model="searchTxt" type="text" placeholder="Search mail" />
                </fieldset>

                <!-- FILTER NAV -->
                <!-- <EmailFilter class="label-container"/>  -->
                <EmailFilter class="label-container"
                    @filter="setFilterBy"/>

                <!-- EMAILS - MAIN -->
                <section class="email-container">
                    <RouterView :emails="emails" @remove="removeEmail"/>
                </section>

                <div v-if="isCompose">

                </div>
            </RouterLink>
    `,
    data() {
        return {
            emails: [],

            searchTxt: null,
            filterBy: null,

            isCompose: false,
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
        onCompose() {
            console.log('compose');
            this.isCompose = true
        },
        setFilterBy(filterBy) {
            console.log('EmailIndex - filterBy is:', filterBy);
            this.filterBy = filterBy
            console.log('BEFORE CALLING SERVICE THIS.FILTERBY:', this.filterBy);
            emailService.setFilterBy(this.filterBy)
            this.getEmails()
        },
    },
    computed: {

    },
    components: {
        EmailList,
        EmailFilter,
    },
    // watch: {
    //     filterBy: {
    //         handler() {
                
    //             emailService.setFilterBy(this.filterBy)
    //             this.getEmails()
    //         }
    //     }
    // }
}