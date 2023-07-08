import { noteService } from "../services/note.service.js"

export default {
	template: `
		<section class="note-details note-form" v-if="note">
		<form @submit.prevent="saveNote" class="note-form">
			<div class="note-input-container">
				<input v-model="note.title" placeholder="Title..." class="title-input">
				<textarea v-model="note.info.txt" placeholder="Take a note..." required></textarea>
			</div>
			<div>Created {{ createdAgo }} ago</div>
			<button type="submit">Save</button>
		</form>
		</section>
	`,
	data() {
		return {
			note: null
		}
	},
	created() {
		const { noteId } = this.$route.params
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
		saveNote() {
			noteService.save(this.note)
				.then(() => {
					this.$router.push('/note')
				})
				.catch(err => {
					alert(`Cannot save note ${err}`)
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