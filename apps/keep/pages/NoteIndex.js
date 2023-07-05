import {noteService} from '../services/note.service.js'
import NoteFilter from '../cmps/NoteFilter.js'
import NoteList from '../cmps/NoteList.js'

export default {
	template: `
      <section class="note-index">
      <div class="note-form">
        <form @submit.prevent="addNote">
          <input v-model="newNote.title" placeholder="Title...">
          <div>
            <textarea v-model="newNote.info.txt" placeholder="Note..." required></textarea>
          </div>
          <button type="submit">Add Note</button>
        </form>
      </div>

      <NoteFilter @filter="setFilterBy"/>
      <NoteList
          v-if="notes"
          :notes="sortedNotes"
          @remove="removeNote"
          @update="updateNote"/>
      </section>
	`,
	data() {
		return {
			notes: [],
			filterBy: null,
			newNote: {
				title: '',
				info: {
					txt: ''
				},
				isPinned: false
			}
		}
	},
	computed: {
		sortedNotes() {
			let notes = [...this.notes]
			if (this.filterBy) {
				const regex = new RegExp(this.filterBy.txt, 'i')
				notes = notes.filter(note => regex.test(note.info.txt))
				if (this.filterBy.sortOrder !== undefined) {
					notes.sort((n1, n2) => (n1.createdAt - n2.createdAt) * this.filterBy.sortOrder)
				}
			}
			return notes.sort((a, b) => b.isPinned - a.isPinned)
		}
	},
	created() {
		noteService.query()
			.then(notes => this.notes = notes)
	},
	methods: {
		addNote() {
			noteService.save(this.newNote)
				.then(note => {
					this.notes.unshift(note)
					this.newNote = {title: '', info: {txt: ''}, isPinned: false} // Reset form
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
				.then((result) => {
					console.log('noteService.save result', result)
					const idx = this.notes.findIndex(note => note.id === updatedNote.id)
					this.notes.splice(idx, 1, updatedNote)
				})
				.catch(err => {
					console.log(err)
				})
		},
		setFilterBy(filterBy) {
			this.filterBy = filterBy
		}
	},
	components: {
		NoteList,
		NoteFilter
	}
}
