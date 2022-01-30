import React from "react";

export const JournalEntry = () => {
  return (
    <div className="journal__entry">
      <div
        className="journal__entry-picture"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(https://besthqwallpapers.com/Uploads/1-11-2017/26526/thumb2-astronaut-4k-earth-space-galaxy.jpg)`,
        }}
      ></div>

      <div className="journal__entry-body">
        <p className="journal__entry-title">Un nuevo dia</p>
        <p className="journal__entry-content">
          lorennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
        </p>
      </div>
      <div className="journal__entry-date-box">
        <span> Monday</span>
        <h4>28</h4>

      </div>


    </div>
  );
};
