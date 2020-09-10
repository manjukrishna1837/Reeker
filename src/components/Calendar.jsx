import React, { useState } from "react";
import Calendar from "react-calendar";
import CreateNote from "./CreateNote";
import Note from "./Note";
import 'react-calendar/dist/Calendar.css';

export default function CalendarView(props) {
  const d=new Date();
  const [dt, setDt] = useState(d);
  let [idN,setId]=useState(0);
  const [give, setGive] = useState([]);
  let [clicked, setClicked] = useState(0);
  let [f, setF] = useState(1);
  let [note,setNote]=useState();
  const x=[];  
  let pos1="";
  let ex = " animate__animated animate__rotateOut";
  let ey = " animate__animated animate__rotateIn";
  let arr = "crd ";
  if (clicked) {
    arr += ex;
  } else arr += ey;  document.body.style.backgroundColor = "#dff6f0";
  function onChange(e) {
    setGive(prev=>{
      return prev.map((item,index)=>{
        if(!(item.date-e) && item.content && item.title)
        {
          x.push(item);
        }
        return item;
      });
    });
    setNote(x);
    setF(0);
    setDt(e);
  } 

  function addNote(nte) {
    let newNote=[];
    note.map((item,ind)=>{
       newNote.push(item);
    });
    newNote.push(nte);
    nte.date=dt;
    nte.x=idN;
    setGive(prev=>{return [...prev,nte]});
    setId(++idN);
    setNote(newNote);
  }
    
  function delt(id){
    give.map((item,index)=>{
      if(id==item.x){
        props.onDelete(item);
       item.title=item.content=null;
      }
      return item;
    })
    setNote(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
      return noteItem.x!==id;
      });
    });    
  }
  
  let pos1g="";
  function handleDragStart(event){
    let x=parseInt(event.target.id,10);
    pos1=note.map(e=>{console.log(typeof e.x); return e.x}).indexOf(x);
    pos1g=give.map(e=>{console.log(typeof e.x); return e.x}).indexOf(x);
  }
  function handleDragOver(event){
     event.preventDefault();
  }
  function handleDrop(event){
    event.preventDefault();
    let x=parseInt(event.target.id,10);
    let pos2=note.map(e=>{return e.x}).indexOf(x);
    let pos2g=give.map(e=>{console.log(typeof e.x); return e.x}).indexOf(x);
    let temp1=give[pos1g];
    give[pos1g]=give[pos2g];
    give[pos2g]=temp1;
    let temp=note[pos1];
    note[pos1]=note[pos2];
    setNote(prev=>{
      return prev.map((it,ind)=>{
          if(ind==pos2)
          it=temp;
          return it;
      });
    })
   }

   function handle() {
    setClicked(!clicked);
   }

   function change(name,value,id,edit){
    if(edit===true){
       note.map((item,index)=>{
           if(index===parseInt(id,10)){
            item[name]=value;
           }
           return item;
       });
    setNote(note);
    }
   }
   
  function tick(id){
    setNote(prevNote=>{
      return prevNote.map((item,index)=>{
         if(id===item.x)
         item.color="#21bf73";
         return item;
      });
    });
   }

   function handleBack(){
    setF(!f);
   }
    
  return (
    <div>
      {!!f && (
        <div style={{  position:"sticky" ,marginTop: "30vh",width:"100vw",paddingLeft:"35%"}}>
          <Calendar className={["c1","c2"]} onChange={onChange} value={dt}/>
        </div>
      )}
      {!f && (
        <div>
        <button className={arr} onClick={handle}>+</button>
        <img onClick={handleBack} style={{position:"fixed",zIndex:"1",marginLeft:"10%",marginTop:"7.5%",cursor:"pointer"}} src="https://img.icons8.com/android/24/bbbbbb/left.png" alt="back"/>
        {!!clicked && <CreateNote onAdd={addNote} handle={handle}/>}
        {
        !clicked && (
          <div className="wrapper-note">
            {note.map((noteItem, index) => {
              if(noteItem.content && noteItem.title)
              return (
              <div 
                  draggable="true"  
                  className="dr"
                  id={noteItem.x}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}     
              >
                <Note
                  key={index}
                  id={noteItem.x}
                  date={noteItem.date}
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
      )}
    </div>
  );
}
