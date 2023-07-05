import { emailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

export default {
    template: `
        <section class="email-details">
            <h1>{{ email.title }}</h1>
            <p>{{ email.txt }}</p>
        </section>
    `,
    data() {
        return {
            email: null,
        }
    },
    created() {
        const { emailId } = this.$route.params
        emailService.get( emailId )
            .then( email => this.email = email )
            .catch( err => showErrorMsg('Error: something went wrong with opening this email') )
    }
}