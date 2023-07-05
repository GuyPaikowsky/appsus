export default {
	props: ['email'],
	template: `
      <article class="email-preview">
      	<h2>{{ email.title }}</h2>
      	<p>{{ email.txt }}</p>
      </article>
	`
}