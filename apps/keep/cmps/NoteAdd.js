import { noteService } from '../services/note.service.js'

export default {
    template: `
    <div class="note-form">
        <form @submit.prevent="addNote">
            <div class="note-input-container" @click="expandForm">
                <input v-if="showTitle" v-model="newNote.title" placeholder="Title..." class="title-input">
                <textarea v-model="newNote.info.txt" placeholder="Take a note..." required></textarea>
            </div>
            <div v-if="showTitle" class="btn-container">
            </div>
        </form>
        <button type="submit">Add Note</button>

    </div>`,
    data() {
        return {
            showTitle: false,
            newNote: {
                title: "",
                info: {
                    txt: ""
                }
            }
        }
    },
    methods: {
        addNote() {
            this.$emit('add', this.newNote)
            this.showTitle = false
            this.newNote = {
                title: "",
                info: {
                    txt: ""
                }
            }
        },
        expandForm() {
            this.showTitle = true
        }
    }
}