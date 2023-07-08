import { noteService } from "../services/note.service.js"

export default {
    template: `
      <section class="note-details note-form" v-if="note">
      <form class="note-form" :style="{ backgroundColor: note.style.backgroundColor }">
        <div class="note-content">
          <input type="text" v-model="note.title" :style="{ backgroundColor: note.style.backgroundColor }" required/>
          <textarea v-if="note.type === 'NoteTxt'" v-model="note.info.txt" placeholder="Take a note..."
                    :style="{ backgroundColor: note.style.backgroundColor }" required></textarea>
          <div v-else-if="note.type === 'NoteImg'">
            <img :src="note.info.url" alt="note.title" class="note-image">
            <textarea v-if="note.info.txt" v-model="note.info.txt" placeholder="Take a note..."
                      :style="{ backgroundColor: note.style.backgroundColor }" required></textarea>
          </div>
          <div v-if="note.type === 'NoteTodos'">
            <ul class="todos-list">
              <li v-for="(todo, index) in note.info.todos" :key="index" class="task-line"
                  :style="{ backgroundColor: note.style.backgroundColor }">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"
                     class="task-checkbox" @click.stop="toggleTodo(index)">
                  <path v-if="todo.done"
                        d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM17.99 9l-1.41-1.42-6.59 6.59-2.58-2.57-1.42 1.41 4 3.99z"/>
                  <path v-else
                        d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2 v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
                </svg>
                <input type="text" v-model="todo.txt" :class="{ 'todo-completed': todo.done }"
                       :style="{ backgroundColor: note.style.backgroundColor }"
                       @keyup.enter.stop="index === note.info.todos.length - 1 && addTodo()"/>
              </li>
              <div class="new-todo" :style="{ backgroundColor: note.style.backgroundColor }">
                <input type="text" v-model="newTodo" placeholder="Add a new todo item" @keyup.enter="addTodo()"/>
              </div>
            </ul>
          </div>
          <div>Created {{ createdAgo }}</div>
        </div>
      </form>
      </section>
    `,
    data() {
        return {
            note: null,
            newTodo: ''
        }
    },
    created() {
        const {noteId} = this.$route.params
        noteService.get(noteId)
            .then(note => {
                this.note = JSON.parse(JSON.stringify(note)) // deep copy
            })
            .catch(err => {
                alert(`Cannot load note ${err}`)
                this.$router.push('/note')
            })
    },
    methods: {
        addTodo() {
            if (!this.newTodo) return
            this.note.info.todos.push({txt: this.newTodo, done: false})
            this.newTodo = ''
            this.saveNote()
        },
        saveNote() {
            noteService.save(this.note)
                .then(() => {
                    // Saved successfully
                })
                .catch(err => {
                    alert(`Cannot save note ${err}`)
                })
        },
        toggleTodo(index) {
            this.note.info.todos[index].done = !this.note.info.todos[index].done
        }
    },
    computed: {
        createdAgo() {
            const diffTime = Math.abs(new Date() - new Date(this.note.createdAt))
            const diffMinutes = Math.floor((diffTime / 1000) / 60)
            const diffHours = Math.floor((diffTime / (1000 * 60 * 60)))
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
            const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7))

            if (diffMinutes < 1) return 'Just now'
            else if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`
            else if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
            else if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
            else return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`
        }
    }
}