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
    console.log('newdate in handleDateChange', newdate)
    console.log(typeof newdate, 'typeof newdate')
    if (typeof newdate === 'object') {
      console.log('newdate is object');
      //setSelecteddate(newdate);
      //setSelecteddatesMulti(prevState => [...prevState, newdate]);
      setSelecteddatesMulti(newdate);
    }
    else {
      console.log(newdate, 'newdate in handleDateChange');
      //setDatepropDatepicker(newdate);
      setSelecteddate(newdate);
    }
  }


  return (
    <>
       <Datepicker onDateChange={handleDateChange}
            dateprop={(multiple === 'yes' || multiple === 'range') ? selecteddatesMulti : selecteddate} 
            multipleprop={multiple} format="DDMMYYYY"
            displaya=""

          />
    </>

    /* display: modal or popup default*/
  )
}
{/*  ref={dayPickerRef}  */ }
export default App
