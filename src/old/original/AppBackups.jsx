import { useState, useEffect, useRef } from 'react';
import './App.css'
import Datepicker from '../Datepicker.jsx';
//import * as bootstrap from 'bootstrap';
import './datepicker/Datepicker.css'
import './scss/styles.scss';
function App() {

  const dayPickerRef = useRef();
  const dateinputref = useRef(); 
  const dialogref = useRef();

  const[datepropDatepicker, setDatepropDatepicker] = useState('');
  const[selecteddate, setSelecteddate] = useState('');

  //; CALLBACK FUNCTION
  const handleDateChange = (newdate,setisopen2) => {
    console.log(newdate, 'newdate in handleDateChange');
    //setDatepropDatepicker(newdate);
    setSelecteddate(newdate);
  }
  const closedialogCallback = (closeyesno) => { 
    setIsOpen(closeyesno);
  }
  const [isOpen, setIsOpen] = useState(false);

  const testFunction = (e) => {
    console.log('testFunction');
    console.log(e.target.value);
   // setSelecteddate(e.target.value);
  }
  
  return (
    <>
 
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {/*  value={datepropDatepicker}  */}
      <input ref={dateinputref}className="form-control datepinput" type="text" name="datepicker" id="datepickerinput" value={selecteddate} aria-label="Datepicker" onClick={() => setIsOpen(true)} onChange={testFunction}/>
     
      {isOpen && (
      <dialog open ref={dialogref}>  
        <button onClick={() => setIsOpen(false)} autoFocus>Close</button>
      
        <Datepicker ref={dayPickerRef} onDateChange={handleDateChange} dateprop={selecteddate}
        closedialogCallback={closedialogCallback}
        />{/*  dateprop={datepropDatepicker} */}
      </dialog>
      )}
  a</>
  )
}

export default App
