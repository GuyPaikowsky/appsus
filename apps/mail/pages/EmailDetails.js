import { emailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

export default {
    template: `
        <section class="email-details">
            <h1>{{ email.title }}</h1>
            <p>{{ email.txt }}</p>
            <section class="actions">
                <h3>Previous Email</h3>
                <h3>Delete</h3>
                <h3>Next Email</h3>
            </section>
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
            .catch( err => showErrorMsg('Error: something went wrong while attempting to open this email') )
    }
}