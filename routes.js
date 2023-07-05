import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'

import NoteIndex from './apps/keep/pages/NoteIndex.js'
import NoteDetails from './apps/keep/pages/NoteDetails.js'
import NoteEdit from './apps/keep/pages/NoteIndex.js'

import EmailIndex from './apps/mail/pages/EmailIndex.js'
import EmailDetails from './apps/mail/pages/EmailDetails.js'

const {createRouter, createWebHashHistory} = VueRouter

const routerOptions = {
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			component: HomePage,
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
		},
		{
			path: '/email',
			component: EmailIndex,
		},
		{
			path: '/email/:emailId',
			component: EmailDetails,
		},
	],
}
export const router = createRouter(routerOptions)