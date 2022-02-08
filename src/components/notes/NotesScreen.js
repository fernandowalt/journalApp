import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NotesAppBar } from "./NotesAppBar";
import { useForm } from "../../hooks/useForm";

import { activeNote, startDeleting } from "../../actions/notes";
import Swal from "sweetalert2";

export const NotesScreen = () => {
  const dispatch = useDispatch();

  const { active } = useSelector((state) => state.notes);

  const [formValues, handleInputChange, reset] = useForm(active);

  const { body, title, id } = formValues;

  const activeId = useRef(active.id);

  useEffect(() => {
    if (active.id !== activeId.current) {
      reset(active);
      activeId.current = active.id;
    }
  }, [active, reset]);

  useEffect(() => {
    dispatch(activeNote(formValues.id, { ...formValues }));
  }, [formValues, dispatch]);

  const handleDelete = () => {
    dispatch(startDeleting(id));
    Swal.fire('Deleted note','Are you sure you want to delete the note?','success')
  };

  return (
    <div className="notes__main-content">
      <NotesAppBar />

      <div className="note__content">
        <input
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          autoComplete="off"
          name="title"
          value={title === undefined ? "" : title}
          onChange={handleInputChange}
        />
        <textarea
          type="text"
          placeholder="What happend today"
          className="notes__textarea"
          name="body"
          value={body === undefined ? "" : body}
          onChange={handleInputChange}
        />

        {active.url && (
          <div className="notes__image">
            <img src={active.url} alt="imagen"></img>
          </div>
        )}
      </div>

      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
