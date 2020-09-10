import React from "react";
import Note from "./Note";

export default function Trash(prop) {
  return prop.note.map((item, index) => {
    return (
      <Note
        key={index}
        width={85}
        title={item.title}
        content={item.content}
        startTime={item.startTime}
        endTime={item.endTime}
        priority={index + 1}
        marginLeft={1}
        color={item.color}
      />
    );
  });
}
