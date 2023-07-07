export default {
    template: `
      <div class="note-form">
      <form @submit.prevent="addNote">
        <div class="note-input-container" @click="expandForm">
          <input v-if="showTitle" v-model="newNote.title" placeholder="Title..." class="title-input">
          <div v-if="newNote.type === 'NoteTodos'">
            <div v-for="(todo, index) in newNote.info.todos" :key="index" class="task-line">
              <svg @click.prevent="toggleDone(index)"
                   xmlns="http://www.w3.org/2000/svg"
                   height="24px"
                   viewBox="0 0 24 24"
                   width="24px"
                   fill="#000000"
                   class="task-checkbox">
                <path v-if="todo.done"
                      d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM17.99 9l-1.41-1.42-6.59 6.59-2.58-2.57-1.42 1.41 4 3.99z"/>
                <path v-else
                      d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
              </svg>
              <input v-model="todo.txt" :class="{'todo-completed': todo.done}" class="task-input">
            </div>
            <div class="task-line">
              <input v-model="todoTxt" placeholder="Add new task..." class="task-input">
              <button @click.prevent="addTodoItem" class="add-task-button">Add task</button>
            </div>
          </div>
          <textarea v-if="newNote.type !== 'NoteTodos'"
                    v-model="newNote.info.txt"
                    :placeholder="placeholderText"
                    required/>
        </div>

        <div v-if="showTitle" class="btn-type-container">
          <span class="material-symbols-outlined"
                @click="setNoteType('NoteTxt')">text_fields</span>
          <span class="material-symbols-outlined"
                @click="setNoteType('NoteImg')">image</span>
          <span class="material-symbols-outlined"
                @click="setNoteType('NoteTodos')">check_box</span>
        </div>
      </form>
      <button @click="onAddNote">Add Note</button>
      </div>`,

    data() {
        return {
            showTitle: false,
            newNote: {
                type: 'NoteTxt',
                title: '',
                info: {
                    txt: '',
                    todos: []
                },
                style: {backgroundColor: '#FFFFFF'}
            },
            todoTxt: ''
        }
    },
    // TODO: For testing purposes only, remove later
    watch: {
        'newNote.type': function (newType, oldType) {
            console.log(`Note type changed from ${oldType} to ${newType}`)
        }
    },
    computed: {
        placeholderText() {
            return this.newNote.type === 'NoteImg' ? 'Enter image URL...' : 'Take a note...'
        }
    },
    methods: {
        checkURL(url) {
            try {
                new URL(url)
                return true
            } catch (_) {
                return false
            }
        },
        onAddNote() {
            if (this.newNote.type === 'NoteImg') {
                this.newNote.info.url = this.newNote.info.txt
                if (!this.checkURL(this.newNote.info.url)) {
                    console.log('Image URL is not valid.')
                    return
                }
            }
            this.addNote()
        },
        addNote() {
            if (this.newNote.type === 'NoteTodos') {
                delete this.newNote.info.txt
            }
            if (this.newNote.type === 'NoteImg') {
                let enteredURL = this.newNote.info.txt
                try {
                    new URL(enteredURL)
                    this.newNote.info = {url: enteredURL}
                } catch (_) {
                    console.log('Invalid URL')
                    return
                }
            }
            this.$emit('add', this.newNote)
            this.showTitle = false
            this.newNote = {
                type: this.newNote.type,
                title: '',
                info: {
                    txt: '',
                    todos: []
                },
                isPinned: false,
                style: {backgroundColor: '#FFFFFF'}
            }
        },
        toggleDone(index) {
            this.newNote.info.todos[index].done = !this.newNote.info.todos[index].done
        },
        addTodoItem() {
            if (this.todoTxt.trim() !== '') {
                this.newNote.info.todos.push({txt: this.todoTxt, done: false})
                this.todoTxt = ''
            }
        },
        expandForm() {
            this.showTitle = true
        },
        setNoteType(type) {
            this.newNote.type = type
        }
    }
}