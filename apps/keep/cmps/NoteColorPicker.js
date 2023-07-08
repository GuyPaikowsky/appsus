export default {
    props: ['note'],
    data() {
        return {
            chosenColor: '#FFFFFF',
            colors: ['#FFFFFF', '#F28B82', '#FBBD05', '#FFF476', '#CCFF90', '#A7FFEB', '#CBF0F8', '#AFCBFA', '#D6AEFB', '#FDCFE8', '#E6C9A8', '#E8EAED'],
        }
    },
    template: `
      <div class="color-picker">
      <div class="color-options">
        <div
            v-for="color in colors"
            :key="color"
            class="color-option"
            :style="{ backgroundColor: color }"
            @mouseover="previewColor(color)"
            @mouseleave="resetColor"
            @click="chooseColor(color)">
        </div>
      </div>
      </div>
    `,
    methods: {
        chooseColor(color) {
            this.chosenColor = color
            this.$emit('color-chosen', color)
        },
        previewColor(color) {
            this.$emit('color-preview', color)
        },
        resetColor() {
            this.$emit('color-reset')
        }
    }
}