import AboutUs from './views/AboutUs.js'

import NoteIndex from './apps/keep/pages/NoteIndex.js'
import NoteDetails from './apps/keep/cmps/NoteDetails.js'
import NoteEdit from './apps/keep/pages/NoteIndex.js'

const {createRouter, createWebHashHistory} = VueRouter

const routerOptions = {
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			component: NoteIndex,
		},
		{
			path: '/about',
			component: AboutUs,
		},
		{
			path: '/note',
			component: NoteIndex
		},
		{
			path: '/note/:noteId',
			component: NoteDetails
		},
		{
			path: '/note/edit/:noteId?',
			component: NoteEdit
		}
	],
}
export const router = createRouter(routerOptions)