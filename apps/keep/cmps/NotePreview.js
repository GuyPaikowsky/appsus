export default {
	props: ['note'],
	template: `
      <article class="note-preview">
      <h3>{{ note.title }}</h3>
      <p>{{ note.info.txt }}</p>
      <span :class="['material-symbols-outlined', note.isPinned ? 'active': 'inactive']" @click="pinNote">push_pin</span>
      <RouterLink :to="'/note/' + note.id">
        <button>Details</button>
      </RouterLink>
      </article>
	`,
	methods: {
		pinNote() {
			this.$emit('update', { ...this.note, isPinned: !this.note.isPinned })
		}
	}
}

