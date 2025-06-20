import React from 'react';
import { useEffect, useState, useRef } from 'react';

//import 'bootstrap-icons/font/bootstrap-icons.css';
import { getmonthnumber, getmonthname, daysinmonth2, getdayofweek, getdayname, getWeeksInMonth, makearrayofdatesfromWeek, convertYMD2DMY, convertDMY2YMD, convertDMY2YMDarray, convertMDY2YMDarray, convertFromSystemFormattodesiredformat } from './daypickerjs';

import Dialog from './Dialog.jsx'

//; ----------------------------------------------------------------------
//.DATE RELATED FUNCTIONS
const Datepicker = React.forwardRef((props, ref) => {

  const [selectedateArray, setSelecteddateArray] = useState([]);
  //this is for initial 
  const [selectedRANGEArray, setSelectedRANGEArray] = useState([]);
  const { dateprop, onDateChange, closedialogCallback, multipleprop, format } = props;
  const [isOpen, setIsOpen] = useState(false);
  const dateinputref = useRef();
  //const dialogref = useRef();

  const [selecteddate2, setSelecteddate2] = useState('');
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  //STATES RELATED TO DATE PROP
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  const [monthfordisplay, setMonthfordisplay] = useState(0);
  const [yearfordisplay, setYearfordisplay] = useState(0); //not sure about this


  // const[multipledatearray, setMultipledatearray] = useState([]);
  const [datepropPassed, setDatepropPassed] = useState(false);

  // FOR THE MONTHS CHANGE


  const [actuallytoday, setActuallytoday] = useState('');

  //. SET TODAY useeffect ---------------------------
  useEffect(() => {
    let todaydatex = new Date(); //example: 2021-05-05T10:00:00.000Z
    let todayx = todaydatex.toISOString().slice(0, 10);
    setActuallytoday(todayx);

  }, [])

  //. IF PROPS PASSED -> SET Month, year, and set prop values to state
  //also triggered when date changes 
  useEffect(() => {

    let monthfromdate1;
    let yearfromdate1;
    let getdayofweekV;
    let getdaynameV;
    let datetouse;
    let getmonthnumberV;

    if (dateprop) {
      console.log('dateprop', dateprop)
      datetouse = dateprop;
      console.warn('dateprop yes',)
      if (typeof dateprop == 'object') {
        console.log('dateprop is AN OBJECT')
        console.log(dateprop.length, 'dateprop.length')
        console.log(dateprop, 'dateprop')
        if (dateprop.length == 0) {

          console.log('object no length PROP DATES MULTIPLE ^&&&')
          let todaydate1 = new Date(); //example: 2021-05-05T10:00:00.000Z
          let todaydateforsure = todaydate1.toISOString().slice(0, 10); // example: 2021-05-05

          console.log(todaydateforsure, 'todaydateforsurexx');
          datetouse = todaydateforsure;


        }
        else {
          setSelecteddateArray(dateprop);
          datetouse = dateprop[0]; //use first date in array
          console.log(datetouse, 'datetouse from dateprop array')
        }

      }
      else if (typeof dateprop == 'string') {
        console.log('dateprop is A STRING')
        datetouse = dateprop;
        setDatepropPassed(true);
      }

    }
    else if (!dateprop) {
      console.warn('no dateprop')
      if (selecteddate2) {
        console.log('selecteddate2HEREHERE', selecteddate2)

        //! DATE IS ALWAYS SYSTEM FORMAT YYYY-MM-DD
        /* let unformatdate = '';
        if (format === 'DDMMYYYY') {
          console.log('HEREYO')
          unformatdate = convertDMY2YMD(selecteddate2)
          console.log(unformatdate, 'unformatdate')
        }
        else if (format === 'YYYYMMDD') {
          unformatdate = selecteddate2;

        }
        else if (format === 'MMDDYYYY') {
          // alert('here')
          unformatdate = convertMDY2YMD(selecteddate2);
          console.log(unformatdate, 'unformatdate2')
        }

        datetouse = unformatdate; */
        datetouse = selecteddate2
      }
      else if (!selecteddate2) {
        let todaydate1 = new Date(); //example: 2021-05-05T10:00:00.000Z
        let todaydateforsure = todaydate1.toISOString().slice(0, 10); // example: 2021-05-05
        console.log(todaydateforsure, 'todaydateforsurexx');
        datetouse = todaydateforsure;
      }
    }

    console.log('initial date', datetouse)
    //|get month and year from date
    monthfromdate1 = datetouse.slice(5, 7); //e.g. 07d
    yearfromdate1 = datetouse.slice(0, 4); // e.g. 2024

    let monthtonumber = parseInt(monthfromdate1);
    console.log(monthtonumber, 'monthtonumber')
    let yeartonumber = parseInt(yearfromdate1);
    console.log(yeartonumber, 'yeartonumber')

    setMonthfordisplay(monthtonumber);
    setYearfordisplay(yeartonumber);
    getmonthnumberV = getmonthnumber(datetouse); //  e.g. 12
    getdayofweekV = getdayofweek(datetouse); //e.g. 1
    getdaynameV = getdayname(getdayofweekV); //e.g. monday
    console.log(getdaynameV, 'getdayname');

  }, [selecteddate2, dateprop])

  //. DUNNO WHAT THIS FOR -----------------
  useEffect(() => {
    if (datepropPassed) {
      setSelecteddate2(dateprop)
    }
  }, [datepropPassed])


  const closedialog = (newstate) => {
    setIsOpen(newstate); ``
  }



  //, ============= RANGE PICKER ==================

  //.THIS FOR RANGE PICKER
  useEffect(() => {
    if (selectedRANGEArray.length === 2) {
      let firstdate = selectedRANGEArray[0];
      let enddate = selectedRANGEArray[1];

      let geteverydaybetween = (startDate, endDate) => {
        let start = new Date(startDate);
        let end = new Date(endDate);
        let dateArray = [];
        let currentDate = start;

        while (currentDate <= end) {

          // let datemodded = currentDate.toISOString().slice(0, 10);
          //  console.log(datemodded, 'datemoddeddatemoddeddatemoddeddatemodded')
          dateArray.push(currentDate.toISOString().slice(0, 10)); // Format as YYYY-MM-DD


          currentDate.setDate(currentDate.getDate() + 1);
        }
        return dateArray;
      }
      let alldatesbetween = geteverydaybetween(firstdate, enddate);
      console.log(alldatesbetween, 'alldatesbetween')
      setSelecteddateArray(alldatesbetween);
      onDateChange(alldatesbetween);

    }

  }, [selectedRANGEArray])




  /*
  
    const onchangeinput = (e) => {
      let proceed = false;
      if (selectedateArray && selectedateArray.length > 0) {
        //validate dates before setting them - OTHERWISE BUGGY if date not finished
        //alert('arry changed')
  
          proceed = true;
         let valueinput = dateinputref.current.value;
         let valueinputarray = valueinput.split(',');
         console.log(valueinputarray, 'valueinputarray')
         //back to string with the comma 
   
         console.log(valueinput, 'valueinput')
         // setSelecteddateArray([valueinput]);
         setSelecteddateArray(valueinputarray);
         //  setMultipledatearray(valueinputarray);
    
  
      }
      else {
        let validdateis = validatedate(e.target.value)
        console.log(validdateis, 'validdateis')
        proceed = true;
        setSelecteddate2(e.target.value);
      }
    } */

  //| -----------------------------------------------------------

  const selectedarrayformattedforuserpreferences = (datesarray) => {
    let formatit = datesarray.map(date => {
      console.log(date, 'date123123')
      return convertFromSystemFormattodesiredformat(format, date);
    });

    return formatit;
  }

  //, this is for the INPUT - for display according to user prefrences - but statea always stays system format yyyy-mm-dd
  const Whattoshow = () => {
    console.log(selectedateArray, 'selectedateArrayselectedateArray')
    if (!multipleprop) {
      return selecteddate2 ? convertFromSystemFormattodesiredformat(format, selecteddate2) : '';
    }
    else if (multipleprop === 'yes') {

      if (selectedateArray && selectedateArray.length > 0) {
        let formattearray = selectedarrayformattedforuserpreferences(selectedateArray);
        console.log(formattearray, 'formattearray')
        return formattearray.join(', ');
      }

    }
    else if (multipleprop === 'range') {
      if (selectedateArray && selectedateArray.length > 0) {
        /*    let formattearray = selectedarrayformattedforuserpreferences(selectedateArray);
           console.log(formattearray, 'formattearray')
           return formattearray.join(','); */
        let getfirstdate = selectedateArray[0];
        let getlastdate = selectedateArray[selectedateArray.length - 1];
        let formattedfirstdate = convertFromSystemFormattodesiredformat(format, getfirstdate);
        let formattedlastdate = convertFromSystemFormattodesiredformat(format, getlastdate);
        return `${formattedfirstdate} - ${formattedlastdate}`;
      }
    }
  }

  return (
    <>
      {/* THIS IS THE INPUT FIELD  */}
      <div className="datepickerwrapper" >
        {selecteddate2}
        <div className="datepickerformgroupdiv" onClick={() => setIsOpen(true)}>
          <input
            /* ref={dateinputref} */
            className="datepickerinput datepinput"
            type="text"
            name="datepicker"
            id="datepickerinput"
            value={
              Whattoshow() ?? ""
            }
            /* convertYMD2DMY(selecteddate2) convertYMD2DMYarray(selectedateArray)   */
            aria-label="Datepicker" onClick={() => setIsOpen(true)}
            // onChange={e => onchangeinput(e)}
            onChange={() => {
              console.log('donothign')
            }}
          />
          <svg
            style={{ zIndex: '200', width: '20px', height: '20px', backgroundColor: 'white' }} id="calendaricon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar3 bi inputicon" viewBox="0 0 16 16">
            <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z" />
            <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
          </svg>

        </div>
        {/* THIS IS THE DIALOG  */}
        {isOpen && (
          <Dialog
            monthfordisplay={monthfordisplay}
            setMonthfordisplay={setMonthfordisplay}
            yearfordisplay={yearfordisplay}
            setYearfordisplay={setYearfordisplay}
            selectedateArray={selectedateArray}
            setSelecteddateArray={setSelecteddateArray}
            selectedRANGEArray={selectedRANGEArray}
            setSelectedRANGEArray={setSelectedRANGEArray}
            selecteddate2={selecteddate2}
            setSelecteddate2={setSelecteddate2}
            onDateChange={onDateChange}
            closedialog={closedialog}
            multipleprop={multipleprop}
            actuallytoday={actuallytoday}
            format={format}
          />
        )}
      </div>
    </>
  )
})

Datepicker.displayName = 'Mydaypicker2';
export default Datepicker;
