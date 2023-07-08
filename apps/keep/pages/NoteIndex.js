import {noteService} from '../services/note.service.js'
import NoteFilter from '../cmps/NoteFilter.js'
import NoteAdd from '../cmps/NoteAdd.js';
import NoteList from '../cmps/NoteList.js'

export default {
    template: `
      <section class="note-index">
      <div class="sidebar-filter">
        <span @click="filterByType('NoteTxt')" class="material-symbols-outlined">text_fields</span>
        <span @click="filterByType('NoteImg')" class="material-symbols-outlined">image</span>
        <span @click="filterByType('NoteTodos')" class="material-symbols-outlined">check_box</span>
        <span @click="filterByType('')" class="material-symbols-outlined">sticky_note_2</span>
      </div>
      <NoteFilter @filter="setFilterBy"/>
      <NoteAdd @add="addNote"/>
      <NoteList
          v-if="notes"
          :notes="sortedNotes"
          @remove="removeNote"
          @update="updateNote"
      />
      </section>
    `,

    data() {
        return {
            showTitle: false,
            notes: [],
            filterBy: noteService.getFilterBy(),
            newNote: {
                type: 'NoteTxt',
                title: '',
                info: {
                    txt: ''
                },
                isPinned: false,
                style: {backgroundColor: '#FFFFFF'}
            }
        }
    },
    created() {
        this.setFilterBy(this.filterBy)
        this.getNotes()
    },
    computed: {
        sortedNotes() {
            return this.notes
        }
    },
    methods: {
        getNotes() {
            noteService.query()
                .then(notes => this.notes = notes)
        },
        setFilterBy(filterBy) {
            noteService.setFilterBy(filterBy)
            this.getNotes()
        },
        filterByType(type) {
            this.setFilterBy({ type }); // Set the filter to the selected type
            this.getNotes(); // Update the notes based on the filter
        },

        addNote(newNote) {
            console.log('Before save in NoteIndex:', newNote);
            noteService.save(newNote)
                .then(note => {
                    this.notes.unshift(note)
                    this.newNote = {
                        title: '',
                        info: {
                            txt: ''
                        },
                        isPinned: false,
                        style: {backgroundColor: '#FFFFFF'}
                    } // Reset form
                })
                .catch(err => {
                    console.error('Cannot add note', err)
                })
        },
        removeNote(noteId) {
            noteService.remove(noteId)
                .then(() => {
                    const idx = this.notes.findIndex(note => note.id === noteId)
                    this.notes.splice(idx, 1)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        updateNote(updatedNote) {
            console.log('NoteIndex updateNote updatedNote', updatedNote)
            noteService.save(updatedNote)
                .then(() => {
                    const idx = this.notes.findIndex(note => note.id === updatedNote.id)
                    this.notes.splice(idx, 1, updatedNote)
                    this.getNotes() // Refresh the notes array
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    components: {
        NoteList,
        NoteFilter,
        NoteAdd
    }
}