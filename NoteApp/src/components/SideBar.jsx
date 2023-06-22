import PropTypes from 'prop-types'

export default function Sidebar({notes, currentNote, setCurrentNoteId, deleteNote, newNote}) {
  const noteElements = notes.map((note) => (
      <div key={note.id}>
          <div
              
              className={`title ${
                  note.id === currentNote.id ? "selected-note" : ""
              }`}
              onClick={() => setCurrentNoteId(note.id)}
          >
              <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
              <button 
                  className="delete-btn"
                  onClick={(event) => deleteNote(event, note.id)}
              >
                  <i className="gg-trash trash-icon"></i>
              </button>
          </div>
      </div>
  ))

  return (
      <section className="pane sidebar">
          <div className="sidebar--header">
              <h3>Notes</h3>
              <button className="new-note" onClick={newNote}>+</button>
          </div>
          {noteElements}
      </section>
  )
}

Sidebar.propTypes = {
    notes: PropTypes.string,
    currentNote: PropTypes.string,
    setCurrentNoteId: PropTypes.string,
    deleteNote: PropTypes.string,
    newNote: PropTypes.string
}


