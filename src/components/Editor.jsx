import { useState } from 'react'
import ReactMde from "react-mde"
import Showdown from "showdown"
import PropTypes from 'prop-types'

export default function Editor({ tempNoteText, setTempNoteText }) {
  const [selectedTab, setSelectedTab] = useState("write")

  const converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true,
  })  

  return (
      <section className="editor">
          <ReactMde
              value={tempNoteText?.body}
              onChange={setTempNoteText}
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
              generateMarkdownPreview={(markdown) =>
                  Promise.resolve(converter.makeHtml(markdown))
              }
              minEditorHeight={80}
              heightUnits="vh"
          />
      </section>
  )
}

Editor.propTypes = {
    tempNoteText: PropTypes.string,
    setTempNoteText: PropTypes.string,
}