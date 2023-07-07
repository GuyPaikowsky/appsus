export default {
    template: `
      <div class="note-form">
      <form @submit.prevent="addNote">
        <div class="note-input-container" @click="expandForm">
          <input v-if="showTitle" v-model="newNote.title" placeholder="Title..." class="title-input">
          <textarea v-model="newNote.info.txt" :placeholder="placeholderText" required></textarea>
        </div>
        <div v-if="showTitle" class="btn-container">
          <span class="material-symbols-outlined" @click="setNoteType('NoteTxt')">text_fields</span>
          <span class="material-symbols-outlined" @click="setNoteType('NoteImg')">image</span>
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
                    txt: ''
                },
                style: {backgroundColor: '#FFFFFF'}
            }
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
            } else if (this.newNote.type === 'NoteTodos') {
                this.newNote.info.todos = this.newNote.info.txt
            }
            this.addNote()
        },
        addNote() {
            if (this.newNote.type === 'NoteImg') {
                let enteredURL = this.newNote.info.txt
                try {
                    new URL(enteredURL)
                    this.newNote.info = { url: enteredURL }
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
                    txt: ''
                },
                isPinned: false,
                style: {backgroundColor: '#FFFFFF'}
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