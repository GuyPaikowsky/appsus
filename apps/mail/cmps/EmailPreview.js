export default {
	props: ['email'],
	template: `
		<RouterLink :to="'/email/' + id">
			<article class="email-preview">
				<h2>{{ email.title }}</h2>
				<p>{{ email.txt }}</p>
			</article>
		</RouterLink>
	`,
	data() {
		return {
			id: this.email.id
		}
	}
}