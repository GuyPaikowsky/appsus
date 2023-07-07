export default {
    template: `

        <nav class="email-filter">
            <ul class="clean-list label-container">
                <li><RouterLink @click="setFilter('showInbox')" to="/email">Inbox</RouterLink></li>
                <li><RouterLink @click="setFilter('showStarred')" to="/email/starred">Starred</RouterLink></li>
                <li><RouterLink @click="setFilter('showImportant')" to="/email/important">Important</RouterLink></li>
                <li><RouterLink @click="setFilter('showSent')" to="/email/sent">Sent</RouterLink></li>
                <li><RouterLink @click="setFilter('showDraft')" to="/email/draft">Draft</RouterLink></li>
                <li><RouterLink @click="setFilter('showTrash')" to="/email/trash">Trash</RouterLink></li>
            </ul>
        </nav>
    `,
    data() {
        return {
            filterBy: {
                showInbox: undefined,
                showDraft: undefined,
                showStarred: undefined,
                showImportant: undefined,
                showSent: undefined,
                showTrash: undefined,
            }
        }
    },
    methods: {
        setFilter(filterKey) {
            // console.log('filterBy', this.filterBy);
            this.resetFilterBy()
            // console.log('filterBy', this.filterBy);
            this.filterBy[filterKey] = true
            console.log('filterBy before emit', this.filterBy);
            this.$emit('filter', this.filterBy)
        },
        resetFilterBy() {
            for (const key of Object.keys(this.filterBy)) {
                this.filterBy[key] = false
            }
            console.log('resetFilter:', this.filterBy);
        }
    }
}