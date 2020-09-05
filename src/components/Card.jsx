import React, { useState } from "react";
import CreateNote from "./CreateNote";
import Note from "./Note";

export default function Card() {
  let [flag, setFlag] = useState(0);
  let [clicked, setClicked] = useState(0);
  let [note, setNote] = useState([]);

  function handle() {
    setFlag((prev) => (flag = !prev));
    setClicked((pre) => (clicked = !pre));
  }

  function add(newNote) {
    if (newNote.title && newNote.content) {
      setNote((prev) => {
        return [...prev, newNote];
      });
    }
  }

  function delt(id){
    setNote(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });    
  }
 
  let c = " animate__animated animate__rotateOut";
  let d = " animate__animated animate__rotateIn";
  let arr = "crd ";
  if (clicked) {
    arr += c;
  } else arr += d;
  let y=0;

  function handleDragStart(event){
    y=parseInt(event.target.children.item(0).id,10);
  }
  function handleDragOver(event){
     event.preventDefault();
  }
  function handleDrop(event){
    event.preventDefault();
    let x=parseInt(event.target.id,10);
    let z=x;
    if(y<=x)
     z=x+1;
    let arr1=note.slice(0,z);
    let mid=note[y];
    let arr2=note.slice(z,note.length);
    let combinedArr=[];
    arr1.map((item,index)=>{
      if(arr1[index]!==mid)
      combinedArr.push(item);
       return null;
    });
    combinedArr.push(mid);
    arr2.map((item,index)=>{
      if(arr2[index]!==mid)
      combinedArr.push(item);      
      return null;
    });
    setNote(combinedArr);
   }
   
   function change(name,value,id,edit){
    if(edit===true){
       note.map((item,index)=>{
           if(index===parseInt(id,10)){
            item[name]=value;
            console.log(value);
           }
           return item;
       });
    setNote(note);
    }
   }
  function tick(id){
    setNote(prevNote=>{
      return prevNote.map((item,index)=>{
         if(id===index)
         note[id].color="#21bf73";
         return item;
      });
    });
   }
   
  return (
    <div>
      <button className={arr} onClick={handle}>
        +
      </button>
      {!!flag && <CreateNote onAdd={add} />}

      {!clicked && (
        <div className="wrapper-note">
          {note.map((noteItem, index) => {
            if(noteItem.content && noteItem.title)
            return (
            <div 
                draggable="true"  
                className="dr"
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}          
            >
              <Note
                key={index}
                id={index}
                width={85}
                title={noteItem.title}
                content={noteItem.content}
                startTime={noteItem.startTime}
                endTime={noteItem.endTime}
                priority={index+1}
                marginLeft={1}
                color={noteItem.color}
                onDelete={delt}
                onTick={tick}
                change={change}
              />
            </div> 
            );
            return false;

          })}
        </div>
      )}
    </div>
  );
}
