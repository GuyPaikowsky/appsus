import { noteService } from "../services/note.service.js"

export default {
	template: `
      <section class="note-details" v-if="note">
      <h2>
                <span @click="isEditing.title = !isEditing.title">
                    {{ isEditing.title ? '' : 'Edit' }}
                </span>
        <input v-if="isEditing.title" v-model="note.title" @blur="isEditing.title = false" type="text">
        <span v-else>{{ note.title }}</span>
      </h2>
      <p>
                <span @click="isEditing.txt = !isEditing.txt">
                    {{ isEditing.txt ? '' : 'Edit' }}
                </span>
        <input v-if="isEditing.txt" v-model="note.info.txt" @blur="isEditing.txt = false" type="text">
        <span v-else>{{ note.info.txt }}</span>
      </p>

      <div>Created {{ createdAgo }} ago</div>

      <button @click="saveNote">Save</button>
      </section>
	`,
	data() {
		return {
			note: null,
			isEditing: {
				title: false,
				txt: false
			}
		}
	},
	created() {
		const { noteId } = this.$route.params
		noteService.get(noteId)
			.then(note => {
				this.note = JSON.parse(JSON.stringify(note)) // deep copy
			})
			.catch(err => {
				alert('Cannot load note')
				this.$router.push('/note')
			})
	},
	methods: {
		saveNote() {
			noteService.save(this.note)
				.then(() => {
					this.$router.push('/note')
				})
				.catch(err => {
					alert('Cannot save note')
				})
		}
	},
	computed: {
		createdAgo() {
			const diffTime = Math.abs(new Date() - new Date(this.note.createdAt));
			const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
			return `${diffDays} day(s)`;
		}
	}
}