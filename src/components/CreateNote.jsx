import React from "react";
import "antd/dist/antd.css";
import { TimePicker } from "antd";
import moment from "moment";

export default function Create(prop) {
  let marginLeft = "0px";
  let marginLeft2 = "0px";
  if (window.innerWidth >= 412) {
    marginLeft = "30px";
    marginLeft2 = "90px";
  }

  const [note, setNote] = React.useState({
    title: "",
    content: "",
    startTime: "",
    endTime: "",
    color:"yellow"
  });
  const [value1, setValue1] = React.useState(null);
  const [value2, setValue2] = React.useState(null);
  function handle(e) {
    prop.onAdd(note);
    setNote({
      title: "",
      content: "",
      startTime: "",
      endTime: "",
      color:"yellow"
    });
    setValue1(null);
    setValue2(null);
    e.preventDefault();
  }

  function onChange1(time, timeString) {
    setValue1(time);
    setNote((prev) => {
      return {
        ...prev,
        startTime: timeString
      };
    });
  }
  function onChange2(time, timeString) {
    setValue2(time);

    if (timeString <= note.startTime) {
      let x = note.startTime.substring(0, 2);
      let y = note.startTime.substring(3, 5);
      let z = note.startTime.substring(6, 8);
      y = (parseInt(y, 10) + 10) % 60;
      if (y >= 0 && y <= 10) {
        x = parseInt(x, 10) + 1;
        x = x.toString();
      }
      timeString = x + ":" + y.toString() + ":" + z;
    }
    setNote((prev) => {
      return {
        ...prev,
        endTime: timeString
      };
    });
  }

  function handleChange(props) {
    let { name, value } = props.target;

    setNote((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
    props.preventDefault();
  }

  return (
    <div
      style={{ marginTop: "170px", position: "absolute", marginLeft: "40px" }}
    >
      <form>
        <div className="form-row">
          <div className="form-group col-md-6 form-block">
            <label htmlFor="inputTitle4">Title</label>
            <input
              type="text"
              name="title"
              className="form-control "
              style={{ width: "85vw" }}
              id="inputText4"
              onChange={handleChange}
              value={note.title}
              placeholder="Title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Note</label>
            <textarea
              className="form-control"
              style={{ width: "85vw" }}
              name="content"
              onChange={handleChange}
              value={note.content}
              id="exampleFormControlTextarea1"
              placeholder="Write Something..."
              rows="5"
            ></textarea>
          </div>
          <div className="form-group" style={{ marginRight: marginLeft }}>
            <label htmlFor="exampleFormControlInput1">Start time</label>
            <TimePicker
              className="form-control"
              value={value1}
              onChange={onChange1}
              style={{ height: "37px" }}
              defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
            />
          </div>
          <div className="form-group" style={{ marginRight: marginLeft2 }}>
            <label htmlFor="exampleFormControlInput1">End time</label>
            <TimePicker
              className="form-control"
              id="endTime"
              value={value2}
              onChange={onChange2}
              style={{ height: "37px" }}
              defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handle}
          style={{ backgroundColor: "#4371d0" }}
          class="btn btn-secondary btn-lg mt-3"
        >
          Add Note
        </button>
      </form>
    </div>
  );
}
