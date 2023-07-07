const MAX_CHAR = 150

export default {
	props: ['email'],
	template: `
		<RouterLink :to="'/email/' + id">
			<div class="email-preview">
				<p>
					<span class="email-title">{{ email.title }}</span> |
					<span class="email-content">{{ txt }}</span>
				</p>	
			</div>
		</RouterLink>
	`,
	data() {
		return {
			id: this.email.id,
			txt: '',
		}
	},
	created() {
		this.txt = this.email.txt.slice(0, MAX_CHAR - this.email.title.length) + '...'
	}
}