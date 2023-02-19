import React, {useState, useEffect} from 'react'
import Preview from './components/preview'
import Message from './components/message'
import NotesContainer from './components/notes/notesContainer'
import NotesList from './components/notes/notesList'
import Note from './components/notes/note'
import NoteForm from './components/notes/noteForm'
import Alert from './components/alert'

import './App.css';


function App() {
  
  const [notes,setNotes] = useState([]);
  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");
  const [selectedNote,setSelectedNote] = useState(null);
  const [creating,setCreating] = useState(false);
  const [editing,setEditing] = useState(false);
  const [validationErrors, setValidationErrors] = useState([])
  //create local storage
  useEffect(()=>{
    if(localStorage.getItem('notes')){

      setNotes(JSON.parse(localStorage.getItem('notes')))
    }else{
      localStorage.setItem('notes', JSON.stringify([]))
    }
  },[])
  //rest validation error array
  useEffect(()=>{
    if(validationErrors.length !== 0){
      setTimeout(()=>{
        setValidationErrors([])
      },3000)
    }
  },[validationErrors])
  //save to local storage
  const saveToLocalStorage= (key,value)=>{
    localStorage.setItem(key, JSON.stringify(value))
    console.log('localStorage')
  }
  //validation function
  const validate =()=>{
    const validationErrors = []
    let passed = true
    if(!title){
      validationErrors.push('Title is required')
      passed = false
    }
    if(!content){
      validationErrors.push('Content is required')
      passed =false
    }
    setValidationErrors(validationErrors)
    return passed
  }
  //change title of observation
  const changeTitleHandler = (e) => {
    setTitle(e.target.value);
  };
  //change content of observation
  const changeContentHandler = (e) => {
    setContent(e.target.value);
  };
  //save notes
  const saveNoteHandler =()=>{
    if(!validate()) return
    const note ={
      id:new Date(),
      title:title,
      content:content      
    }
    
    const updatedNodes = [...notes,note]
    setNotes(updatedNodes)
    setCreating(false)
    setSelectedNote(note.id)
    console.log('saved')
    setTitle('')
    setContent('')
    saveToLocalStorage('notes',updatedNodes)
  }
  //edit obsevation
  const editNoteHandler =()=>{
    const note = notes.find(note=> note.id === selectedNote)
    setEditing(true)
    setTitle(note.title)
    setContent(note.content)
  }
  const getAddNote = () => {
    
    //<Message title = {title} content={content}/>
        
    return (
      <NoteForm
        formTitle="إضافة ملاحظة جديدة"
        title={title}
        content={content}
        titleChanged={changeTitleHandler}
        contentChanged={changeContentHandler}
        submitText="حفظ"
        submitClicked={saveNoteHandler}
        />
    );
  };
  const note = notes.find(note=>{
    return note.id === selectedNote;
  })
  //adding notes
  const addNoteHandler = ()=>{
    setCreating(true);
    setEditing(false)
    setTitle("")
    setContent("")
  }
  //select note
  const SelectNoteHandler = (noteId) => {
    setSelectedNote(noteId);
    setCreating(false);
    setEditing(false)
    
  }
  //udate notes
  const updateNoteHandler = () =>{
    if(!validate()) return
    const updatedNodes = notes.map(note=>{
      if(note.id === selectedNote){
        return {
        ...note,
          title:title,
          content:content
        }
      }
      return note;
    })
    
    setNotes(updatedNodes)
    setEditing(false)
    setTitle("")
    setContent("")
    saveToLocalStorage('notes',updatedNodes)
  }
  //delete note
  const deleteNoteHandler = () =>{
    const updatedNodes = notes.filter(note=>{
      return note.id!== selectedNote;
    })
    setNotes(updatedNodes)
    setSelectedNote(null)
    saveToLocalStorage('notes',updatedNodes)
  }
  const getPreview = () => {
    if(notes.length === 0){
      return <Message title="لايوجد ملاحظة">لايوجد ملاحظة</Message>
    }
    if(!selectedNote){
      return <Message title="الرجاء اختيار ملاحظة"></Message>
    }
    let noteDisplay = (
      <div>
        <h2>{note.title}</h2>
        <h2>{note.content}</h2>
      </div>
    )
    if(editing){
      noteDisplay=(
        <NoteForm
        formTitle="تعديل ملاحظة"
                title={title}
        content={content}
        titleChanged={changeTitleHandler}
        contentChanged={changeContentHandler}
        submitText="تعديل"
        submitClicked={updateNoteHandler}
        />
      )
    }
    return (
      <div>
        {!editing && 
          <div className="note-operations">
            <a href="#" onClick={editNoteHandler}>
              <i className="fa fa-pencil-alt" />
            </a>
            <a href="#" onClick={deleteNoteHandler}>
              <i className="fa fa-trash" />
            </a>
          </div>
        }
        <div>
          {noteDisplay}
        </div>
      </div>
    );
  };
  
  return (
    <div className="App">
      <NotesContainer>
        <NotesList>
          {notes.map((note) =>
           <Note key={note.id} 
           title={note.title} 
          noteClicked={()=>SelectNoteHandler(note.id)}
            active={selectedNote === note.id}
          />)}
        </NotesList>
        
        <button className="add-btn" onClick={addNoteHandler}>+</button>
        
      </NotesContainer>
      
        <Preview>{creating ? getAddNote() : getPreview()}</Preview>
        {validationErrors.length !== 0 && <Alert validationMessages={validationErrors}/>}
    </div>
  );
}

export default App;
