import {utilService} from '../../../services/util.service.js'
import {storageService} from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'

let gFilterBy = {
	type: '',
	txt: '',
}

let gSortBy = {
	createdAt: 1
}

_createNotes()

export const noteService = {
	query,
	get,
	remove,
	save,
	getEmptyNote,
	// getNextCarId,
	getFilterBy,
	setFilterBy,
	// getCarCountBySpeedMap,
}
window.noteService = noteService

function query() {
	return storageService.query(NOTE_KEY).then(notes => {
		if (gFilterBy.txt) {
			const regex = new RegExp(gFilterBy.txt, 'i')
			notes = notes.filter(note => regex.test(note.info.txt) || regex.test(note.info.title))
		}

		if (gFilterBy.type) {
			notes = notes.filter(note => note.type === gFilterBy.type)
		}

		// Sorting by isPinned first and then by creation date.
		notes.sort((n1, n2) => {
			if (n1.isPinned && !n2.isPinned) {
				return -1
			} else if (!n1.isPinned && n2.isPinned) {
				return 1
			} else {
				if (gSortBy.date) {
					return (n2.createdAt - n1.createdAt) * gSortBy.date
				} else {
					return 0
				}
			}
		})

		return notes
	})
}

function get(noteId) {
	return storageService.get(NOTE_KEY, noteId)
		.then(note => _setNextPrevNoteId(note))
}

function _setNextPrevNoteId(note) {
	return storageService.query(NOTE_KEY)
		.then(notes => {
			const noteIdx = notes.findIndex(currNote => currNote.id === note.id)
			note.nextNoteId = notes[noteIdx + 1] ? notes[noteIdx + 1].id : notes[0].id
			note.prevNoteId = notes[noteIdx - 1]
				? notes[noteIdx - 1].id
				: notes[notes.length - 1].id
			return note
		})
}

function remove(noteId) {
	return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
	if (note.id) {
		return storageService.put(NOTE_KEY, note)
	} else {
		return storageService.post(NOTE_KEY, note)
	}
}

function getFilterBy() {
	return {...gFilterBy}
}

function setFilterBy(filterBy = {}) {
	if (filterBy.type !== undefined) gFilterBy.type = filterBy.type
	if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
	if (filterBy.isPinned !== undefined) gFilterBy.isPinned = filterBy.isPinned
	return gFilterBy
}

function setSortBy(sortBy = {}) {
	if (sortBy.createdAt !== undefined) gSortBy.createdAt = sortBy.createdAt
	return gSortBy
}

// function getNextCarId(carId) {
// 	return storageService.query(CAR_KEY).then(cars => {
// 		var idx = cars.findIndex(car => car.id === carId)
// 		if (idx === cars.length - 1) idx = -1
// 		return cars[idx + 1].id
// 	})
// }

// function getCarCountBySpeedMap() {
// 	return storageService.query(CAR_KEY).then(cars => {
// 		const carCountBySpeedMap = cars.reduce(
// 			(map, car) => {
// 				if (car.maxSpeed < 120) map.slow++
// 				else if (car.maxSpeed < 200) map.normal++
// 				else map.fast++
// 				return map
// 			},
// 			{slow: 0, normal: 0, fast: 0}
// 		)
// 		return carCountBySpeedMap
// 	})
// }

function getEmptyNote() {
	return {
		id: '',
		type: '',
		isPinned: false,
		info: {},
		title: '',
		style: {},
		createdAt: Date.now()

	}
}

// TODO: Add more notes
function _createNotes() {
	let notes = utilService.loadFromStorage(NOTE_KEY)
	if (!notes || !notes.length) {
		notes = []
		notes.push(_createNote({
			type: 'NoteTxt',
			info: 'Fullstack Me Baby!',
			title: 'My First Note',
			isPinned: false,
			style: {backgroundColor: '#00d'}
		}))
		notes.push(_createNote({
			type: 'NoteTxt',
			info: 'Meeting with John on Friday',
			title: 'Meeting',
			isPinned: false,
			style: {backgroundColor: '#90caf9'}
		}))
		notes.push(_createNote({
			type: 'NoteTxt',
			info: 'Who am I? I dont know',
			title: 'Reading',
			isPinned: true,
			style: {backgroundColor: '#a5d6a7'}
		}))
		notes.push(_createNote({
			type: 'NoteTxt',
			info: 'Pick up laundry ',
			title: 'Chores',
			isPinned: false,
			style: {backgroundColor: '#f48fb1'}
		}))
		notes.push(_createNote({
			type: 'NoteTxt',
			info: 'Plan 30 minute vacation on friday',
			title: 'Coding Academy',
			isPinned: true,
			style: {backgroundColor: '#ce93d8'}
		}))
		notes.push(_createNote({
			type: 'NoteTxt',
			info: 'Learn to cook ptitim',
			title: '',
			isPinned: false,
			style: {backgroundColor: '#80deea'}
		}))
		notes.push(_createNote({
			type: 'NoteTxt',
			info: 'Take care of my fleas',
			title: 'Health Concerns',
			isPinned: true,
			style: {backgroundColor: '#ffab91'}
		}))
		utilService.saveToStorage(NOTE_KEY, notes)
	}
}

function _createNote({type, info, title, isPinned, style, additionalInfo}) {
	const note = getEmptyNote()
	note.id = utilService.makeId()
	note.type = type
	note.title = title || ''
	note.info = typeof info === 'string' ? {txt: info} : {...info}
	note.isPinned = isPinned
	note.style = style
	if (additionalInfo) {
		if (note.type === 'NoteImg') {
			note.info.url = additionalInfo
		} else if (note.type === 'NoteTodos') {
			note.info.todos = additionalInfo
		}
	}
	return note
}