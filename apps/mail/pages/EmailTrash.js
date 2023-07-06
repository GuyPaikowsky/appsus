import EmailPreview from '../cmps/EmailPreview.js'
import { emailService } from '../services/email.service.js';

export default {
    props: ['emails'],
    template: `
        <section v-if="emails" class="email-list">
            <ul class="clean-list">
                <li v-for="email in emails" :key="email.id">
                    <EmailPreview :email="email"/>
                    <section>
                        <button @click="onRemoveEmail(email.id)">x</button>
                        <!-- <button @click="onOpenEmail(email.id)">read more</button> -->
                    </section>
                </li>
            </ul>

        </section>
    `,
    data() {
        return {
            filterBy: { showTrash: true }
        }
    },
    created() {
        emailService.setFilterBy(this.filterBy)
        this.getEmails()

    },
    methods: {
        getEmails() {
            emailService.query().then(emails => (this.emails = emails))
            console.log('trash', this.emails);
        },
        onRemoveEmail(emailId) {
            console.log('onRemoveEmail', emailId);
            this.$emit('remove', emailId)
        },
        onOpenEmail(emailId) {
            console.log('onOpenEmail', emailId);
            this.$emit('open', emailId)
        }
    },
    components: {
        EmailPreview,
    },
}