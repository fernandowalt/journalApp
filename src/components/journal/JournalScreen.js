import React from "react";
import { useSelector } from "react-redux";
import { NotesScreen } from "../notes/NotesScreen";
import { NotingSelected } from "./NotingSelected";

import { Sidebar } from "./Sidebar";

export const JournalScreen = () => {
  const { active } = useSelector((state) => state.notes);

  return (
    <div className="journal__main-content animate__animated animate__fadeIn animate__faster">
      <Sidebar />

      <main>{active ? <NotesScreen /> : <NotingSelected />}</main>
    </div>
  );
};
