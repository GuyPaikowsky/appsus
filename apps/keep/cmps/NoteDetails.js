import {noteService} from "../services/note.service.js"

export default {
    template: `
      <section class="note-details note-form" v-if="note">
      <form @submit.prevent="saveNote" class="note-form" :style="{ backgroundColor: note.style.backgroundColor }">
        <div class="note-content">
          <h3>{{ note.title }}</h3>
          <textarea v-if="note.type === 'NoteTxt'" v-model="note.info.txt" placeholder="Take a note..."
                    required></textarea>
          <div v-else-if="note.type === 'NoteImg'">
            <img :src="note.info.url" alt="note.title" class="note-image">
            <textarea v-if="note.info.txt" v-model="note.info.txt" placeholder="Take a note..." required></textarea>
          </div>
          <div v-if="note.type === 'NoteTodos'">
            <ul class="todos-list">
              <li v-for="(todo, index) in note.info.todos" :key="index" class="task-line">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"
                     class="task-checkbox" @click.stop="toggleTodo(index)">
                  <path v-if="todo.done"
                        d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM17.99 9l-1.41-1.42-6.59 6.59-2.58-2.57-1.42 1.41 4 3.99z"/>
                  <path v-else
                        d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2 v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
                </svg>
                <span :class="{ 'todo-completed': todo.done }">{{ todo.txt }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div>Created {{ createdAgo }} ago</div>
        <button type="submit">Save</button>
      </form>
      </section>`,
    data() {
        return {
            note: null
        }
    },
    created() {
        const {noteId} = this.$route.params
        noteService.get(noteId)
            .then(note => {
                this.note = JSON.parse(JSON.stringify(note)) // deep copy
            })
            .catch(err => {
                alert(`Cannot load note ${err}`)
                this.$router.push('/note')
            })
    },
    methods: {
        saveNote() {
            noteService.save(this.note)
                .then(() => {
                    this.$router.push('/note')
                })
                .catch(err => {
                    alert(`Cannot save note ${err}`)
                })
        },
        toggleTodo(index) {
            this.note.info.todos[index].done = !this.note.info.todos[index].done;
            noteService.save(this.note)
                .catch(err => {
                    alert(`Cannot save note ${err}`)
                })
        }
    },
    computed: {
        createdAgo() {
            const diffTime = Math.abs(new Date() - new Date(this.note.createdAt));
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return `${diffDays} day(s)`;
        }
    }
}

// }import {noteService} from "../services/note.service.js"
//
// export default {
//     template: `
//       <section class="note-details note-form" v-if="note">
//       <form @submit.prevent="saveNote" class="note-form">
//         <div class="note-input-container">
//           <input v-model="note.title" placeholder="Title..." class="title-input">
//           <textarea v-if="note.type === 'NoteTxt'" v-model="note.info.txt" placeholder="Take a note..."
//                     required></textarea>
//           <img v-else-if="note.type === 'NoteImg'" :src="note.info.url" alt="note.title" class="note-image">
//           <ul v-else-if="note.type === 'NoteTodos'" class="todos-list">
//             <li v-for="(todo, index) in note.info.todos" :key="index" class="task-line">
//               <input type="checkbox" v-model="todo.done">
//               <input type="text" v-model="todo.txt">
//             </li>
//           </ul>
//         </div>
//         <div>Created {{ createdAgo }} ago</div>
//         <button type="submit">Save</button>
//       </form>
//       </section>
//     `,
//     data() {
//         return {
//             note: null
//         }
//     },
//     created() {
//         const {noteId} = this.$route.params
//         noteService.get(noteId)
//             .then(note => {
//                 this.note = JSON.parse(JSON.stringify(note)) // deep copy
//             })
//             .catch(err => {
//                 alert(`Cannot load note ${err}`)
//                 this.$router.push('/note')
//             })
//     },
//     methods: {
//         saveNote() {
//             noteService.save(this.note)
//                 .then(() => {
//                     this.$router.push('/note')
//                 })
//                 .catch(err => {
//                     alert(`Cannot save note ${err}`)
//                 })
//         }
//     },
//     computed: {
//         createdAgo() {
//             const diffTime = Math.abs(new Date() - new Date(this.note.createdAt));
//             const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//             return `${diffDays} day(s)`;
//         }
//     }
// }