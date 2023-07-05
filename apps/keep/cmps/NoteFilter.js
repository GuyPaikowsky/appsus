export default {
	template: `
        <section class="note-filter">
            <input 
                v-model="filterBy.txt" 
                type="text" 
                placeholder="search">
            <select v-model="filterBy.sortOrder">
                <option value="1">Newest to oldest</option>
                <option value="-1">Oldest to newest</option>
            </select>
        </section>
    `,
	data() {
		return {
			filterBy: {
				txt: '',
				sortOrder: 1,
			}
		}
	},
	watch: {
		filterBy: {
			handler() {
				this.$emit('filter', this.filterBy)
			},
			deep: true,
		}
	}
}