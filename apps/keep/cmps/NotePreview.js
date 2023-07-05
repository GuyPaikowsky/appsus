export default {
	props: ['note'],
	template: `
      <article class="note-preview">
	  	<h3>{{ note.title }}</h3>
      	<p>{{ note.info.txt }}</p>
      	<RouterLink :to="'/note/' + note.id">
		  <button>Details</button>
		</RouterLink>			
<!--		<RouterLink :to="'/note/edit/' + note.id">-->
<!--		  <button>Edit</button>-->
<!--		</RouterLink>-->
      </article>		`
}
// TODO: remove 'edit' route
