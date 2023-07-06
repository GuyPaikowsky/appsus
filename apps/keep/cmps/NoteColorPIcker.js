export default {
    props: ['note'],
    template: `
      <div class="color-picker">
      <div class="color-preview" :style="{ backgroundColor: chosenColor }"></div>
      <div class="color-options">
        <div
            v-for="color in colors"
            :key="color"
            class="color-option"
            :style="{ backgroundColor: color }"
            @click="chooseColor(color)" >
        </div>
      </div>
      </div>
    `,
    data() {
        return {
            chosenColor: '#FFFFFF',
            colors: ['#F28B82', '#FBBD05', '#FFF476', '#CCFF90', '#A7FFEB', '#CBF0F8', '#AFCBFA', '#D6AEFB', '#FDCFE8', '#E6C9A8', '#E8EAED'],
        }
    },
    methods: {
        chooseColor(color) {
            this.chosenColor = color;
            this.$emit('color-chosen', color);
        }
    },
}