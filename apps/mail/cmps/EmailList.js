import EmailPreview from './EmailPreview.js'

export default {
    props: ['emails'],
    template: `
        <section class="email-list">
            <ul class="clean-list">
                <li class="email" v-for="email in emails" :key="email.id">
                    <EmailPreview :email="email"/>
                    <section>
                        <button @click="onRemoveEmail(email.id)">x</button>
                        <!-- <button @click="onOpenEmail(email.id)">read more</button> -->
                    </section>
                </li>
            </ul>

        </section>
    `,
    methods: {
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