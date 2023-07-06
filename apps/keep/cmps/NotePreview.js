export default {
	props: ['note'],
	template: `
		<article class="note-preview">
		<div class="note-content">
			<h3>{{ note.title }}</h3>
			<p>{{ note.info.txt }}</p>
		</div>
		<div class="note-actions">
			<span :class="['material-symbols-outlined', note.isPinned ? 'active': '']" @click="pinNote">push_pin</span>
			<RouterLink :to="'/note/' + note.id">
				<button>Details</button>
			</RouterLink>
		</div>
		</article>
	`,
	methods: {
		pinNote() {
			this.$emit('update', { ...this.note, isPinned: !this.note.isPinned })
		}
	}
}