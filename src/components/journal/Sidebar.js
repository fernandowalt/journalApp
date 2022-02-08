import React from "react";
import { useDispatch } from "react-redux";
import { startLogout } from "../../actions/auth";
import { JournalEntries } from "./JournalEntries";
import { useSelector } from "react-redux";
import {startNewNote}from '../../actions/notes'





export const Sidebar = () => {
  const dispatch = useDispatch();

  const hendleLogout = () => {
    dispatch(startLogout());
  };

  const handleAddNew= ()=>{
    dispatch(startNewNote());




  }

  const { name } = useSelector((state) => state.auth);
  return (
    <aside className="journal__sidebar">
      <div className="journal-sidebar-navbar">
        <h3 className="mt-5">
          <i className="far fa-moon"></i>
          <span> {name}</span>
        </h3>
        <button className="btn" onClick={hendleLogout}>
          Logout
        </button>
      </div>

      <div className="journal__new-entry"
      onClick={handleAddNew}>
        <i className="far fa-calendar-plus fa-5x" />
        <p className="mt-5">New Entry</p>
      </div>

      <JournalEntries />
    </aside>
  );
};
