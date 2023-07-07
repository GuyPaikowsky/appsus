export default {
    props: ['txt', 'length'],
    template: `
    <div>
      <p v-if="isShortText">{{ shortText }}</p>
      <p v-else>{{ txt }}</p>
      <button v-if="!isShortText" @click="toggleText">{{ buttonText }}</button>
    </div>
  `,
    data() {
        return {
            isShortText: true
        }
    },
    computed: {
        shortText() {
            return this.txt.slice(0, this.length || 100) + (this.txt.length > this.length ? '...' : '')
        },
        buttonText() {
            return this.isShortText ? 'Read More' : 'Read Less'
        }
    },
    methods: {
        toggleText() {
            this.isShortText = !this.isShortText
        }
    }
}