import moment from "moment";
import { useDispatch } from "react-redux";
import { activeNote } from "../../actions/notes";

export const JournalEntry = ({ id, date, body, title, url }) => {
  const mes = moment(date).format("MMMM");
  const dia = moment(date).format("Do");


  const dispatch = useDispatch();

  const handleEntryClick = () => {
    dispatch(activeNote(id, { date, body, title, url }));
  };

  return (
    <div className="journal__entry  animate__animated animate__fadeIn animate__faster" onClick={handleEntryClick}>
      {url && (
        <div
          className="journal__entry-picture"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${url})`,
          }}
        ></div>
      )}

      <div className="journal__entry-body">
        <p className="journal__entry-title">{title}</p>

        <p className="journal__entry-content">{body}</p>
      </div>
      <div className="journal__entry-date-box">
        <span> {mes}</span>
        <h4>{dia}</h4>
       
      </div>
    </div>
  );
};
