import NoteColorPicker from "./NoteColorPicker.js";

export default {
    props: ['note'],

    template: `
      <article class="note-preview" :style="{ backgroundColor: note.style.backgroundColor }">
      <RouterLink :to="'/note/' + note.id">
        <div class="note-content">
          <h3>{{ note.title }}</h3>
          <p>{{ note.info.txt }}</p>
        </div>
      </RouterLink>
      <div class="note-actions">
        <span :class="['material-symbols-outlined', note.isPinned ? 'active': '']" @click="pinNote">push_pin</span>
        <span class="material-symbols-outlined" @click="removeNote">delete</span>
        <span class="material-symbols-outlined" @click="toggleColorPicker">palette</span>
        <div class="color-picker-container" v-if="showColorPicker">
          <note-color-picker v-if="showColorPicker" @color-chosen="changeNoteColor"></note-color-picker>
        </div>
      </div>
      </article>

    `,
    data() {
        return {
            showColorPicker: false
        }
    },
    methods: {
        pinNote() {
            this.$emit('update', {...this.note, isPinned: !this.note.isPinned})
        },
        removeNote() {
            this.$emit('remove', this.note.id)
        },
        toggleColorPicker() {
            this.showColorPicker = !this.showColorPicker
            console.log("Color Picker Toggled:", this.showColorPicker);

        },
        changeNoteColor(color) {
            this.showColorPicker = false
            this.$emit('update', {...this.note, style: {backgroundColor: color}})
        }
    },
    components: {
        NoteColorPicker
    }
}