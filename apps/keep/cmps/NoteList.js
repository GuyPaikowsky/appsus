import NotePreview from './NotePreview.js'

export default {
	props: ['notes'],
	template: `
      <section class="note-list">
	  <TransitionGroup name="list">
		  <div v-for="note in notes" :key="note.id">
			  <NotePreview :note="note" 
						   @update="onUpdateNote"
						   @remove="onRemoveNote"/>
		  </div>
	  </TransitionGroup>

      </section>
	`,
	methods: {
		onRemoveNote(noteId) {
			this.$emit('remove', noteId)
		},
		onUpdateNote(updatedNote) {
			console.log('NoteList onUpdateNote updatedNote', updatedNote)
			this.$emit('update', updatedNote)
		}
	},
	components: {
		NotePreview
	},
}