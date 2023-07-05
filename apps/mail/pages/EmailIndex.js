import { emailService } from "../services/mail.service.js"
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import EmailList from '../cmps/EmailList.js'

export default {
    template: `
            <RouterLink to="/email">
                <section class="email-index">
                    <EmailList :emails="emails"/>
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

    },
    computed: {

    },
    components: {
        EmailList,
    }
}