import { addDoc, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import Split from 'react-split'
import Editor from './components/Editor'
import Sidebar from './components/SideBar'
import { db, notesCollection } from './firebase'

export default function App() {
	const [notes, setNotes] = useState([])

	const [currentNoteId, setCurrentNoteId] = useState('')

	const currentNote =
		notes.find((note) => {
			return note.id === currentNoteId
		}) || notes[0]

	const sortedNotes = notes.sort((a, b) => b.updatedAt - a.updatedAt)

	console.log(sortedNotes)

	useEffect(() => {
		const unsubscribe = onSnapshot(notesCollection, (snapshot) => {
			// Sync up our local notes array with the snapshot data
			const notesArr = snapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}))

			setNotes(notesArr)
		})

		return unsubscribe
	}, [])

	useEffect(() => {
		if (!currentNoteId) {
			setCurrentNoteId(notes[0]?.id)
		}
	}, [notes])

	useEffect(() => {}, [notes])

	async function createNewNote() {
		const newNote = {
			body: "# Type your markdown note's title here",
			createdAt: Date.now(),
			updatedAt: Date.now(),
		}
		const newNoteRef = await addDoc(notesCollection, newNote)
		setCurrentNoteId(newNoteRef.id)
	}

	async function updateNote(text) {
		// Put the most recently-modified note at the top
		const docRef = doc(db, 'notes', currentNoteId)
		await setDoc(docRef, { body: text, updateAt: Date.now() }, { merge: true })
	}

	async function deleteNote(noteId) {
		const docRef = doc(db, 'notes', noteId)
		await deleteDoc(docRef)
	}

	return (
		<>
			<main>
				{notes.length > 0 ? (
					<Split sizes={[30, 70]} direction='horizontal' className='split'>
						<Sidebar
							notes={sortedNotes}
							currentNote={currentNote}
							setCurrentNoteId={setCurrentNoteId}
							newNote={createNewNote}
							deleteNote={deleteNote}
						/>
						<Editor currentNote={currentNote} updateNote={updateNote} />
					</Split>
				) : (
					<div className='no-notes'>
						<h1>You have no notes</h1>
						<button className='first-note' onClick={createNewNote}>
							Create one now
						</button>
					</div>
				)}
			</main>
		</>
	)
}
