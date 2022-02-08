import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";

import { types } from "../types/types";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const docRef = await db.collection(`${uid}/journal/notes`).add(newNote);

    dispatch(activeNote(docRef.id, newNote));
    dispatch(addNewNote(docRef.id, newNote));
  };
};

const addNewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: {
    id,
    ...note,
  },
});
export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const starLoginNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});

export const startSaveNote = (active) => {
  return async (dispatch, getSate) => {
    const { uid } = getSate().auth;

    if (!active.url) {
      delete active.url;
    }

    const noteToFirestore = { ...active, date: new Date().getTime() };
    delete noteToFirestore.id;

    await db.doc(`${uid}/journal/notes/${active.id}`).update(noteToFirestore);
    dispatch(refreshNote(active.id, noteToFirestore));
    Swal.fire("save", active.title, "success");
  };
};

export const refreshNote = (id, note) => ({
  type: types.notesUpdated,
  payload: {
    id,
    note: {
      id,
      ...note,
    },
  },
});

export const startUploadingImage = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes;

    Swal.fire({
      title: "Uploading...",
      text: "Please wait...",
      showConfirmButton: false,
      allowOutsideClick: false,
      willOpen: () => Swal.showLoading(),
    });

    const fileUrl = await fileUpload(file);

    activeNote.url = fileUrl;

    dispatch(startSaveNote(activeNote));

    Swal.close();
  };
};

export const startDeleting = (id) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    await db.doc(`${uid}/journal/notes/${id}`).delete();

    dispatch(deleteNote(id));
  };
};
export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id,
});

export const noteLogout = () => ({
  type: types.notesLogoutCleaning,
});
