import React from "react";
import { NotesAppBar } from "./NotesAppBar";

export const NotesScreen = () => {
  return (
    <div className="notes__main-content">
      <NotesAppBar />

      <div className="note__content">
        <input
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          autoComplete="off"
        />
        <textarea
        placeholder="What happend today" 
        className="notes__textarea" />
        <div 
        className="notes__image">
          <img 
          src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/the-walking-dead-episodio-17-1614593931.jpeg?crop=1.00xw:1.00xh;0,0&resize=768:*" alt="imagen"></img>
          

        </div>
      </div>
    </div>
  );
};
