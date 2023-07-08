export default {
	template: `
        <section class="note-filter">

<!--		<div class="search-icon">-->
<!--			<i class="material-symbols-outlined">search</i>-->
<!--		</div>-->
		<div class="filter-search-container">
            <input
                v-model="filterBy.txt" 
                type="text" 
                placeholder="Search"/>
		</div>
		
<!--            <select v-model="filterBy.sortOrder">-->
<!--                <option value="1">Newest to oldest</option>-->
<!--                <option value="-1">Oldest to newest</option>-->
<!--            </select>-->
		
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