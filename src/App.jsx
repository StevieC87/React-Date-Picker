import { useState } from 'react';
import './App.css'
import Datepicker from './datepicker/Datepicker.jsx';
import './datepicker/Datepicker.css'
import './scss/styles.scss';
function App() {


  const [multiple, setMultiple] = useState('range'); //yes or range for range or  empty string for single date selection
  const [selecteddate, setSelecteddate] = useState('');
  const [selecteddatesMulti, setSelecteddatesMulti] = useState([]);

  //; CALLBACK FUNCTI
  const handleDateChange = (newdate) => {
    if (typeof newdate === 'object') {
      setSelecteddatesMulti(newdate);
    }
    else {
      setSelecteddate(newdate);
    }
  }


  return (
    <>
       <Datepicker onDateChange={handleDateChange}
            dateprop={(multiple === 'yes' || multiple === 'range') ? selecteddatesMulti : selecteddate} 
            multipleprop={multiple} format="DDMMYYYY"
            displaya=""
            weekstartssunday={true}

          />
    </>

  )
}
export default App
