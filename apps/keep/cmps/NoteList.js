import NotePreview from './NotePreview.js'

export default {
	props: ['notes'],
	template: `
      <section class="note-list">
      <TransitionGroup name="list">
        <NotePreview
		  v-for="note in notes"
		  :key="note.id"
		  :note="note"
          @update="onUpdateNote"/>
          <section class="actions">
            <span class="material-symbols-outlined" @click="onRemoveNote(note.id)">delete</span>
          </section>
		  
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
		NotePreview,
	},
}

//
// import NotePreview from './NotePreview.js'
//
// export default {
// 	props: ['notes'],
// 	template: `
//       <section class="note-list">
//       <TransitionGroup name="list" tag="ul">
//         <li v-for="note in notes" :key="note.id">
//           <NotePreview :note="note" @update="onUpdateNote"/>
//           <section class="actions">
//             <span class="material-symbols-outlined" @click="onRemoveNote(note.id)">delete</span>
//           </section>
//         </li>
//       </TransitionGroup>
//       </section>
// 	`,
// 	methods: {
// 		onRemoveNote(noteId) {
// 			this.$emit('remove', noteId)
// 		},
// 		onUpdateNote(updatedNote) {
// 			console.log('NoteList onUpdateNote updatedNote', updatedNote)
// 			this.$emit('update', updatedNote)
// 		}
// 	},
// 	components: {
// 		NotePreview,
// 	},
// }
