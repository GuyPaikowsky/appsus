import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'

import NoteIndex from './apps/keep/pages/NoteIndex.js'
import NoteDetails from './apps/keep/pages/NoteDetails.js'
import NoteEdit from './apps/keep/pages/NoteIndex.js'

import EmailIndex from './apps/mail/pages/EmailIndex.js'
import EmailDetails from './apps/mail/pages/EmailDetails.js'
import EmailList from './apps/mail/cmps/EmailList.js'

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
			children: [
				{
					path: '',
					name: 'email list',
					component: EmailList

				},
				{
					path: ':emailId',
					name: 'email details',
					component: EmailDetails,
				},
				{
					path: 'trash',
					name: 'email trash',
					component: EmailList,
				},
				{
					path: 'draft',
					name: 'email draft',
					component: EmailList,
				},
				{
					path: 'sent',
					name: 'email sent',
					component: EmailList,
				},
				{
					path: 'important',
					name: 'email important',
					component: EmailList,
				},
				{
					path: 'starred',
					name: 'email important',
					component: EmailList,
				},
			]
		},
	],
}
export const router = createRouter(routerOptions)