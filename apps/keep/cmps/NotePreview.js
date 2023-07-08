import NoteColorPicker from "./NoteColorPicker.js";
import NoteReadMore from "./NoteReadMore.js";

export default {
    props: ['note'],
    template: `
      <article :class="['note-preview', note.isPinned ? 'pinned-preview' : '']"
               :style="{ backgroundColor: previewColor || note.style.backgroundColor }">
      <div class="note-content">
        <h3>{{ note.title }}</h3>
        <RouterLink :to="'/note/' + note.id">
          <NoteReadMore v-if="note.type === 'NoteTxt'" :txt="note.info.txt" :length="100"/>
          <div v-else-if="note.type === 'NoteImg'">
            <img :src="note.info.url" alt="note.title" class="note-image">
            <NoteReadMore v-if="note.info.txt" :txt="note.info.txt" :length="100"/>
          </div>
        </RouterLink>
        <div v-if="note.type === 'NoteTodos'">
          <ul class="todos-list">
            <li v-for="(todo, index) in note.info.todos" :key="index" class="task-line">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"
                   class="task-checkbox" @click.stop="toggleTodo(index)">
                <path v-if="todo.done"
                      d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM17.99 9l-1.41-1.42-6.59 6.59-2.58-2.57-1.42 1.41 4 3.99z"/>
                <path v-else
                      d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2 v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
              </svg>
              <RouterLink :to="'/note/' + note.id" :class="{ 'todo-completed': todo.done }">{{ todo.txt }}</RouterLink>
            </li>
          </ul>
        </div>
      </div>
      <div class="note-actions">
        <span :class="['material-symbols-outlined', note.isPinned ? 'active pinned': '', 'pin-button']"
              @click="pinNote">push_pin</span>
        <span class="material-symbols-outlined" @click="removeNote">delete</span>
        <span class="material-symbols-outlined" @click="toggleColorPicker">palette</span>
        <div class="color-picker-container" v-if="showColorPicker">
          <note-color-picker v-if="showColorPicker" @color-chosen="changeNoteColor" @color-preview="onColorPreview"
                             @color-reset="onColorReset"></note-color-picker>
        </div>
      </div>
      </article>
    `,
    data() {
        return {
            showColorPicker: false,
            previewColor: null
        };
    },
    methods: {
        pinNote() {
            this.$emit('update', {...this.note, isPinned: !this.note.isPinned});
        },
        removeNote() {
            this.$emit('remove', this.note.id);
        },
        toggleColorPicker() {
            this.showColorPicker = !this.showColorPicker;
            this.previewColor = null;
        },
        changeNoteColor(color) {
            this.showColorPicker = false;
            this.previewColor = null;
            this.$emit('update', {...this.note, style: {backgroundColor: color}});
        },
        onColorPreview(color) {
            this.previewColor = color;
        },
        onColorReset() {
            this.previewColor = null;
        },
        toggleTodo(index) {
            this.note.info.todos[index].done = !this.note.info.todos[index].done;
            this.$emit('update', this.note);
        }
    },
    components: {
        NoteColorPicker,
        NoteReadMore
    }
}
