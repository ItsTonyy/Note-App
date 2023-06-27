import { addDoc, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Split from 'react-split';
import Editor from './components/Editor';
import Sidebar from './components/SideBar';
import { db, notesCollection } from './firebase';

export default function App() {
	const [notes, setNotes] = useState([]);

	const [currentNoteId, setCurrentNoteId] = useState(notes[0]?.id || '');

	const currentNote =
		notes.find((note) => {
			return note.id === currentNoteId;
		}) || notes[0];

	useEffect(() => {
		const unsubscribe = onSnapshot(notesCollection, (snapshot) => {
			// Sync up our local notes array with the snapshot data
			const notesArr = snapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));

			setNotes(notesArr);
		});

		return unsubscribe;
	}, []);

	async function createNewNote() {
		const newNote = {
			body: "# Type your markdown note's title here",
		};
		const newNoteRef = await addDoc(notesCollection, newNote);
		setCurrentNoteId(newNoteRef.id);
	}

	function updateNote(text) {
		// Put the most recently-modified note at the top
		setNotes((oldNotes) => {
			const newArray = [];
			for (let i = 0; i < oldNotes.length; i++) {
				const oldNote = oldNotes[i];
				if (oldNote.id === currentNoteId) {
					newArray.unshift({ ...oldNote, body: text });
				} else {
					newArray.push(oldNote);
				}
			}
			return newArray;
		});
	}

	async function deleteNote(noteId) {
		const docRef = doc(db, "notes", noteId)
		await deleteDoc(docRef)
}

	return (
		<>
			<main>
				{notes.length > 0 ? (
					<Split sizes={[30, 70]} direction='horizontal' className='split'>
						<Sidebar
							notes={notes}
							currentNote={currentNote}
							setCurrentNoteId={setCurrentNoteId}
							newNote={createNewNote}
							deleteNote={deleteNote}
						/>
						{currentNoteId && notes.length > 0 && (
							<Editor currentNote={currentNote} updateNote={updateNote} />
						)}
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
	);
}
