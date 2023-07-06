export default {
	props: ['note'],
	template: `
		<article class="note-preview">
		<RouterLink :to="'/note/' + note.id">
		<div class="note-content">
			<h3>{{ note.title }}</h3>
			<p>{{ note.info.txt }}</p>
		</div>
		</RouterLink>			
		<div class="note-actions">
			<span :class="['material-symbols-outlined', note.isPinned ? 'active': '']" @click="pinNote">push_pin</span>
			<span class="material-symbols-outlined" @click="removeNote">delete</span>  <!-- Add this line -->
			
		</div>
		</article>
		
	`,
	methods: {
		pinNote() {
			this.$emit('update', { ...this.note, isPinned: !this.note.isPinned })
		},
		removeNote() {     // Add this method
			this.$emit('remove', this.note.id);
		}
	}
}