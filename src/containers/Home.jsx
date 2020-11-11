import { API } from "aws-amplify";
import { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }
      try {
        const notes = await loadNotes();
        setNotes(notes);
      } catch (e) {
        onError(e);
      }
      setIsLoading(false);
    }
    onLoad();
  }, [isAuthenticated]);

  function loadNotes() {
    return API.get("notes", "/invalid_notes");
  }

  function renderNotesList(notes) {
    return [{}].concat(notes).map((note, i) =>
      i !== 0 ? (
        <LinkContainer key={note.noteId} to={`/notes/${note.noteId}`}>
          <ListGroup.Item action>
            <h3>{note.content.trim().split("\n")[0]}</h3>
            {"Created: " + new Date(note.createdAt).toLocaleString()}
          </ListGroup.Item>
        </LinkContainer>
      ) : (
          <LinkContainer action key="new" to="/notes/new">
            <ListGroup.Item>
              <h4>
                <b>{"\uFF0B"}</b> Create a new note
              </h4>
            </ListGroup.Item>
          </LinkContainer>
        )
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p>A simple note taking app</p>
        <div>
          <Link to="/login" className="btn btn-info btn-lg">
            Log In
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Sign Up
          </Link>
        </div>
      </div>
    );
  }

  function renderNotes() {
    return (
      <div className="notes">
        <h1>Your Notes</h1>
        <ListGroup>
          {!isLoading && renderNotesList(notes)}
        </ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderNotes() : renderLander()}
    </div>
  );
}