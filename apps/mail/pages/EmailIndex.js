import { emailService } from "../services/mail.service.js"
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import EmailList from '../cmps/EmailList.js'

export default {
    template: `
            <RouterLink to="/email">
                <section class="compose-container">
                <!-- TODO -->
                </section>
                <section class="email-index">
                    <EmailList :emails="emails"
                    @remove="removeEmail"/>
                </section>
            </RouterLink>
    `,
    data() {
        return {
            emails: []
        }
    },
    created() {
        emailService.query().then(emails => (this.emails = emails))
    },
    methods: {
        removeEmail(emailId) {
            emailService.remove(emailId).then(() => {
                const idx = this.emails.findIndex(email => email.id === emailId)
                this.emails.splice(idx, 1)
                showSuccessMsg('Email deleted')
            })
            .catch(err => showErrorMsg('Was unable to delete email'))
        }
    },
    computed: {

    },
    components: {
        EmailList,
    }
}