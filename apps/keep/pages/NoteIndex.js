import {noteService} from '../services/note.service.js'
// import {showSuccessMsg, showErrorMsg} from '../../../services/event-bus.service.js'

import NoteFilter from '../cmps/NoteFilter.js'
import NoteList from '../cmps/NoteList.js'

export default {
	template: `
      <section class="note-index">
      <RouterLink to="/note/edit">Add Note</RouterLink>
      <NoteFilter @filter="setFilterBy"/>
      <NoteList
          v-if="notes"
          :notes="sortedNotes"
          @remove="removeNote"/>
      </section>    `,
	data() {
		return {
			notes: [],
			filterBy: null,
		}
	},
	computed: {
		sortedNotes() {
			if (!this.filterBy) return this.notes
			const regex = new RegExp(this.filterBy.txt, 'i')
			let notes = this.notes.filter(note => regex.test(note.info.txt))
			if (this.filterBy.sortOrder !== undefined) {
				notes.sort((n1, n2) => (n1.createdAt - n2.createdAt) * this.filterBy.sortOrder)
			}
			return notes
		}
	},
	created() {
		noteService.query()
			.then(notes => this.notes = notes)
	},
	methods: {
		removeNote(noteId) {
			noteService.remove(noteId)
				.then(() => {
					const idx = this.notes.findIndex(note => note.id === noteId)
					this.notes.splice(idx, 1)
					// showSuccessMsg('Note removed')
				})
				.catch(err => {
					console.log(err)
					// showErrorMsg('Cannot remove note')
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