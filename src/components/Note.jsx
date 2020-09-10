import React from "react";
import "antd/dist/antd.css";

export default function Note(props) {
  let trashWidth = "20px";
  let [edit, setEdit] = React.useState(false);
  if (window.innerWidth < 600) trashWidth = "16px";

  function handleDelete(e) {
    props.onDelete(props.id);
  }
  function click(e) {
    props.onTick(props.id);
  }

  function handleClick() {
    setEdit(true);
  }
  function handleChange(event) {
    let nameClass = event.target.innerText;
    props.change(event.target.className, nameClass, props.id, edit);
  }
  let flag = 0;
  if (props.color === "#21bf73") flag = 1;
  return (
    <table
      className="note"
      id={props.id}
      style={{
        width: props.width + "vw",
        height: "auto",
        tableLayout: "fixed",
        marginLeft: props.marginLeft + "%"
      }}
    >
      <tr id={props.id}>
        <td
          id={props.id}
          style={{
            backgroundColor: props.color,
            columnWidth: "10%"
          }}
        ></td>
        <td
          id={props.id}
          style={{
            height: "auto",
            columnWidth: "auto",
            paddingLeft: "5%",
            wordBreak: "breakAll"
          }}
          colSpan="5"
        >
          <h1
            id={props.id}
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              wordBreak: "break-all"
            }}
            contentEditable={edit}
            onClick={handleClick}
            className="title"
            onBlur={handleChange}
          >
            {props.title}
          </h1>
        </td>
        <td id={props.id}></td>
        <td
          id={props.id}
          style={{
            textAlign: "center",
            borderTopRightRadius: "7px"
          }}
        >
          {!flag && (
            <img
              onClick={handleDelete}
              style={{ cursor: "pointer" }}
              src={"https://img.icons8.com/metro/20/706c61/trash.png"}
              width={trashWidth}
              alt="trash"
            />
          )}
        </td>
      </tr>
      <tr id={props.id}>
        <td
          id={props.id}
          style={{
            fontSize: "30px",
            backgroundColor: props.color,
            textAlign: "center",
            columnWidth: "10%",
            marginLeft: "5%"
          }}
        >
          {!flag && (
            <p
              id={props.id}
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                wordBreak: "break-all"
              }}
            >
              {props.priority}
            </p>
          )}
        </td>
        <td
          id={props.id}
          style={{ height: "auto", columnWidth: "100%", paddingLeft: "5%" }}
          colSpan="5"
        >
          <p
            id={props.id}
            onClick={handleClick}
            contentEditable={edit}
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              wordBreak: "break-all"
            }}
            onBlur={handleChange}
            className="content"
          >
            {props.content}
          </p>
        </td>

        <td id={props.id}></td>
        <td style={{ textAlign: "center" }} id={props.id}>
          {!flag && (
            <img
              id={props.id}
              onClick={click}
              style={{ paddingTop: "15%", cursor: "pointer" }}
              src="https://img.icons8.com/material-sharp/24/21bf73/double-tick.png"
              width={trashWidth}
              alt="tick"
            />
          )}
        </td>
      </tr>
      <tr id={props.id}>
        <td id={props.id} style={{ backgroundColor: props.color }}></td>
        <td id={props.id} style={{ paddingLeft: "5%" }}>
          {props.startTime}
        </td>
        <td style={{ paddingLeft: "20%" }}>
          {props.endTime}
        </td>
        <td id={props.id}></td>
        <td id={props.id}></td>
        <td id={props.id}></td>
        <td id={props.id}></td>
        <td id={props.id}></td>
      </tr>
    </table>
  );
}
