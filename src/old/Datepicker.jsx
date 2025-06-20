import React from 'react';
import { useEffect, useState, useRef } from 'react';

//import 'bootstrap-icons/font/bootstrap-icons.css';
import { getmonthnumber, getmonthname, daysinmonth2, getdayofweek, getdayname, getWeeksInMonth, makearrayofdatesfromWeek } from './daypickerjs';


//; ----------------------------------------------------------------------
//.DATE RELATED FUNCTIONS
const Datepicker = React.forwardRef((props, ref) => {

  const [selectedateArray, setSelecteddateArray] = useState([]);
  const dayPickerRef = useRef();

  //this is for initial 
  const [selectedRANGEArray, setSelectedRANGEArray] = useState([]);
  const { dateprop, onDateChange, closedialogCallback, multiple, format } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [datepropDatepicker, setDatepropDatepicker] = useState('');

  const dateinputref = useRef();
  const dialogref = useRef();



  const testFunction = (e) => {
    console.log('testFunction');
    console.log(e.target.value);
    // setSelecteddate(e.target.value);
  }

  const [selecteddate2, setSelecteddate2] = useState('');
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  const [datepropstate, setDatepropState] = useState(dateprop);
  //STATES RELATED TO DATE PROP
  const [monthfromdate, setMonthfromdate] = useState('');
  const [yearfromdate, setYearfromdate] = useState(0);
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  const [formata, setFormat] = useState(format);
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //STATES WE SET FROM DATE / MONTH / YEAR
  const [monthnumber, setMonthnumber] = useState('');
  //TO DO 
  const [monthname, setMonthname] = useState('');
  const [daysinmonth, setDaysinmonth] = useState('');
  const [dayofweek, setDayofweek] = useState('');
  const [dayname, setDayname] = useState('');
  const [allweeksdates, setAllweeksdates] = useState([]);

  const [monthfordisplay, setMonthfordisplay] = useState(0);
  const [yearfordisplay, setYearfordisplay] = useState(0); //not sure about this

  const [multipleprop, setMultipleprop] = useState(multiple);
  // const[multipledatearray, setMultipledatearray] = useState([]);
  const [datepropPassed, setDatepropPassed] = useState(false);

  // FOR THE MONTHS CHANGE
  const [showmonth, setShowmonth] = useState(false);

  const [actuallytoday, setActuallytoday] = useState('');

  //; =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //. ON TODAYS DATE CHANGE -> 
  //; ===========================================================
  useEffect(() => {
    let todaydatex = new Date(); //example: 2021-05-05T10:00:00.000Z
    let todayx = todaydatex.toISOString().slice(0, 10);
    setActuallytoday(todayx);

  }, [])



  useEffect(() => {
    let monthfromdate1;
    let yearfromdate1;
    let getmonthnumberV;
    let getdayofweekV;
    let getdaynameV;
    let dateprop;
    let datetouse;

    if (datepropstate) {
      console.log('datepropstate', datepropstate)
      datetouse = datepropstate;
      console.warn('dateprop yes',)
      if (typeof datepropstate == 'object') {
        console.log('datepropstate is AN OBJECT')
        console.log(datepropstate.length, 'datepropstate.length')
        console.log(datepropstate, 'datepropstate')
        if (datepropstate.length == 0) {
          console.log('object no length PROP DATES MULTIPLE ^&&&')
          let todaydate1 = new Date(); //example: 2021-05-05T10:00:00.000Z
          let todaydateforsure = todaydate1.toISOString().slice(0, 10); // example: 2021-05-05

          console.log(todaydateforsure, 'todaydateforsurexx');
          datetouse = todaydateforsure;
        }

      }
      else if (typeof datepropstate == 'string') {
        console.log('datepropstate is A STRING')
        datetouse = datepropstate;
        setDatepropPassed(true);
      }

    }
    else if (!datepropstate) {

      console.warn('no datepropstate')
      if (selecteddate2) {
        console.log('selecteddate2HEREHERE', selecteddate2)
        let unformatdate = '';
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

        datetouse = unformatdate;
      }
      else if (!selecteddate2) {
        let todaydate1 = new Date(); //example: 2021-05-05T10:00:00.000Z
        let todaydateforsure = todaydate1.toISOString().slice(0, 10); // example: 2021-05-05


        console.log(todaydateforsure, 'todaydateforsurexx');
        datetouse = todaydateforsure;
      }
      // changeDateCallback(todaydateforsure)
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
    setDayname(getdaynameV);
    //  setMonthfromdate(monthfromdate1); 
    setYearfromdate(yearfromdate1);
    setMonthnumber(getmonthnumberV);
    setDayofweek(getdayofweekV);
  }, [selecteddate2, datepropstate])

  useEffect(() => {

    if (datepropPassed) {
      setSelecteddate2(datepropstate)

    }

  }, [datepropPassed])
  //; ===========================================================
  useEffect(() => {
    console.log('month OR YEAR for display CHANGED', monthfordisplay, yearfordisplay)
    //MAYBE ISSUE BECAUSE NOW WE HAVE JS MONTH -> AND MAYBE THE REST IS IN NORMAL MONTHS
    let getmonthnameV = getmonthname(monthfordisplay, yearfordisplay);
    setMonthname(getmonthnameV);
    console.log(getmonthnameV, 'getmonthnamev');

    let daysinmonth1V = daysinmonth2(monthfordisplay, yearfordisplay);
    console.log(daysinmonth1V, 'daysinmonth');
    setDaysinmonth(daysinmonth1V);


    //. BUILD WEEKS AND DATES ETC FOR DISPLAY
    //first get array of weeks in month
    let testweeks = getWeeksInMonth(monthfordisplay, yearfordisplay);
    console.log(testweeks, 'testweeks') //  [48, 49, 50, 51, 52]

    let mergedArray = [];

    let looptestweeks = testweeks.map((week, index) => {
      let weeknumberhere = week.weeknumber;
      let weekyearhere = week.year;
      //get array of dates from week (array of 7 date objects)
      //TODO mAYBE TURN THIS INTO STRINGS
      let arrayofdates = makearrayofdatesfromWeek(weeknumberhere, weekyearhere, monthfordisplay, monthname);
      mergedArray = [...mergedArray, ...arrayofdates];
      console.log(arrayofdates, 'arrayofdates')
      return arrayofdates;
    })
    console.log(mergedArray, 'mergedArray')
    setAllweeksdates(mergedArray);

    //  let testthis = makearrayofdatesfromWeek(testweeks[1], yearfromdate);
    //  console.log(testthis, 'testthis')

  }, [monthfordisplay, yearfordisplay])

  //; ===========================================================
  useEffect(() => {

    console.log('selecteddate2 changed', selecteddate2)

  }, [selecteddate2])
  //; ===========================================================
  //. CHEVRONS CHANGE MONTH
  const changemonth = (currentmonthnum, previousnext, yearfordisplay22) => {
    console.log('changing month')
    console.log(typeof yearfordisplay22, 'yearfordisplay22 typeof')
    //IN NORMAL MONTHS e.g 12 -> december, not js yet
    let cmonth = currentmonthnum;
    console.log(cmonth, 'cmonth')
    //convert to number
    // let cmonthnumber = parseInt(cmonth);
    let cmonthnumber = cmonth;
    //we get a number of the month A STRING - not js based (12 is december)

    //SO FIRST WE SHOULD SHIFT IT BACK TO JS MONTH 
    //so now jan is 0
    //  let cmonthnumberinjs = cmonthnumber - 1;
    let cmonthnumberinjs = cmonthnumber;
    console.log(cmonthnumberinjs, 'cmonthnumberinjsFORNOWNOTTRUE')
    let newmonth;

    //WRONG 
    //ADD A MONTH WITH JS 
    //MAKE A DATE FROM THAT MONTH
    if (previousnext === 'previous') {
      console.log('going to previous month')
      if (cmonthnumberinjs === 1) {
        newmonth = 12;
        let newyear1 = yearfordisplay22 - 1;
        setMonthfordisplay(newmonth);
        setYearfordisplay(newyear1);
        console.log(newyear1, 'newyear1')
        console.log(typeof newyear1, 'newyear1 typeof')
      }
      else {
        newmonth = cmonthnumberinjs - 1;
        setMonthfordisplay(newmonth);
      }

    }
    else if (previousnext === 'next') {
      console.log('going to next month')
      if (cmonthnumberinjs === 12) {
        newmonth = 1;
        let newyear1 = yearfordisplay22 + 1;
        console.log(newyear1, 'newyear1')
        console.log(typeof newyear1, 'newyear1 typeof')
        setYearfordisplay(newyear1);
        setMonthfordisplay(newmonth);

      }
      else {
        console.log('next, not 12')
        newmonth = cmonthnumberinjs + 1;
        console.log(newmonth, 'newmonth')
        setMonthfordisplay(newmonth);
      }

    }

  }
  const changedateLocal = (newdate) => {

    //if prop multiiple..
    if (multipleprop === 'yes') {

      //if it exists remove it 
      /*  if(selectedateArray.find(item => item == newdate)) {
         let newarray = selectedateArray.filter(item => item !== newdate);
         setSelecteddateArray(newarray);
 
       } */
      if (selectedateArray.find(item => item == newdate)) {
        //remove it
        console.log('exists')
        let newarray = selectedateArray.filter(item => item !== newdate);
        setSelecteddateArray(newarray);
      }
      else {
        //  let convertedArrayformat = convertFormatArray(selectedateArray);
        //  console.log(convertedArrayformat, 'convertedArrayformat')
        //   s
        //    setSelecteddateArray([...convertedArrayformat, newdate]);

        setSelecteddateArray([...selectedateArray, newdate]);
      }
    }
    else {
      console.log(newdate, 'newdate in changedateLocal')
      console.log(typeof newdate, 'newdate in changedateLocal')
      let dateparam = new Date(newdate);
      console.log(dateparam, 'dateparam')
      //set date TO FORMAT WE WANT
      let converteddatenow = convertFormat(newdate);
      console.log(converteddatenow, 'converteddatenow1111111')
      // setSelecteddate2(newdate);
      setSelecteddate2(converteddatenow);
    }
  }

  //; ===========================================================
  //. CHANGE DATE ON CLICK CALLBACK
  const changeDateCallback = (newdate) => {

    console.log(newdate, 'newdate4444444444')
    console.log(typeof newdate, 'newdate4444444444 typeof')
    onDateChange(newdate);

    console.log(newdate, 'newdate in changeDateCallback')
  }

  const closedialog = (newstate) => {
    setIsOpen(newstate); ``

  }
  //; ===========================================================
  //; OUTSIDE CLICK DETECTION - CLOSE DIALOG
  useEffect(() => {

    const handleClickOutside = (event) => {
      console.log(event.target, 'event.target')
      console.log(event.target.id, 'event.target.id')
      let targetid = event.target.id;
      //first see if i
      if (dateinputref.current && !dateinputref.current.contains(event.target)) {
        //setIsOpen(false);
        console.log('clickd outside datepicker input field')
        if (dialogref.current && !dialogref.current.contains(event.target)) {
          console.log('clicked outside dialogaaaa')
          //setIsOpen(false);
          if (isOpen === true) {
            setIsOpen(false);
            console.log('isopen')
          }
          else {
            console.log('isnotopen')
          }
          console.log('clicked outside')
          if (targetid === 'calendaricon') {
            console.log('clicked on calendar icon')
            setIsOpen(true);
          }
          else {
            setIsOpen(false);
          }


        }
        else {
          console.log('clicked inside')
        }

      }


      else if (dateinputref.current && dateinputref.current.contains(event.target)) {
        console.log('clicked inside datepicker input field')
      }

    }

    window.addEventListener('click', handleClickOutside);

    // Clean up the event listener
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
    //console.log('daypickerref useEffect called')

    /*    document.addEventListener("mousedown", handleClickOutside);
      return () => {
          document.removeEventListener("mousedown", handleClickOutside);
      };  */
  }, [dayPickerRef]);


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
          //convert to mm-dd
          if (format === 'DDMMYYYY') {

            dateArray.push(convertYMD2DMY(currentDate.toISOString().slice(0, 10))); // Format as DD-MM-YYYY
          }
          else if (format === 'MMDDYYYY') {
            dateArray.push(convertYMD2MDY(currentDate.toISOString().slice(0, 10))); // Format as MM-DD-YYYY
          }
          else if (format === 'YYYYMMDD') {
            dateArray.push(currentDate.toISOString().slice(0, 10)); // Format as YYYY-MM-DD
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
        return dateArray;
      }
      let alldatesbetween = geteverydaybetween(firstdate, enddate);
      console.log(alldatesbetween, 'alldatesbetween')
      setSelecteddateArray(alldatesbetween);
    }
    console.log(selectedRANGEArray, 'selectedRANGEArray22222')
  }, [selectedRANGEArray])

  useEffect(() => {
    console.log(selectedateArray, 'selectedateArray22222')
  }, [selectedateArray])

  const changesetshowmonth = () => {
    if (showmonth === false) {
      setShowmonth(true);
      setShowYears(false);
    }
    else {
      setShowmonth(false);
    }
  }
  // dispatch(setDateFordaypicker(todaydate));
  const changemonthclick = (monthnumber) => {
    console.log(monthnumber, 'monthnumber')
    setMonthfordisplay(monthnumber);
    setShowmonth(false);
  }
  //; GET YEARS 
  const [yearsArray, setYearsArray] = useState([]);
  const [showyears, setShowYears] = useState(false);
  useEffect(() => {
    //get current year 
    let selectedyear = yearfordisplay;
    //get 10 years before and after 
    let yearsbefore = selectedyear - 10;
    let yearsafter = selectedyear + 10;
    let yearsarray = [];
    for (let i = yearsbefore; i <= yearsafter; i++) {
      yearsarray.push(i);
    }
    console.log(yearsarray, 'yearsarray')
    setYearsArray(yearsarray);
  }, [yearfordisplay])

  //WHEN CLICK ON YEAR - shows years div
  const showyearsfunction = () => {

    if (showyears === false) {
      setShowYears(true);
      setShowmonth(false);
    }
    else {
      setShowYears(false);
    }

  }
  const changeyearfunction = (plusorminus) => {
    let currentselectyear = yearfordisplay;
    if (plusorminus === 'plus') {
      let newyear = currentselectyear + 10;
      setYearfordisplay(newyear);
    }
    else if (plusorminus === 'minus') {
      let newyear = currentselectyear - 10;
      setYearfordisplay(newyear);
    }
  }
  const selectnewyearfunction = (selectedyear) => {
    setYearfordisplay(selectedyear);
    setShowYears(false);
  }
  /* const convertYMD2DMY = (date) => { 
    //convert to dd-mm-yyyy
    if(date) {
      let datearray = date.split('-');
    let year = datearray[0];
    let month = datearray[1];
    let day = datearray[2];
    let newdate = `${day}-${month}-${year}`;
    return newdate;
    }
    else {
      return '';
    }
    
  }  */
  //s
  const convertYMD2DMY = (date) => {
    if (date) {
      let datearray = date.split('-');
      let year = datearray[0];
      let month = datearray[1];
      let day = datearray[2];
      let newdate = `${day}-${month}-${year}`;
      return newdate;
    }

  }

  const convertYMD2MDY = (date) => {
    if (date) {
      let datearray = date.split('-');
      let year = datearray[0];
      let month = datearray[1];
      let day = datearray[2];
      let newdate = `${month}-${day}-${year}`;
      return newdate;
    }
  }

  const convertDMY2YMD = (date) => {
    //convert to yyyy-mm-dd
    if (date) {
      let datearray = date.split('-');
      let day = datearray[0];
      let month = datearray[1];
      let year = datearray[2];
      let newdate = `${year}-${month}-${day}`;
      return newdate;
    }
    else {
      return '';
    }

  }
  const convertMDY2YMD = (date) => {
    if (date) {
      //alert(111)
      let datearray = date.split('-');
      let month = datearray[0];
      let day = datearray[1];
      let year = datearray[2];



      let newdate = `${year}-${month}-${day}`;
      // alert(newdate, 'newdate')
      return newdate;
    }
    else {
      return '';
    }

  }
  /*DO NEXT   const convertYMD2DMYarray = (datearray) => {  //date is string,  return string 
      //convert to dd-mm-yyyy
      if(
        datearray.length > 0
      ) {
        let count = datearray.length;
        let newdatearray = [];
  
        for(let i = 0; i < count; i++) {
          let date = datearray[i];
          let converted = convertYMD2DMY(date);
          newdatearray.push(converted);
        }
        return newdatearray;
      }
      else {
        return '';
      }
    }  */


  /* const convertYMD2DMYarray = (datearray) => {  //date is string,  return string
      //convert to dd-mm-yyyy
      if(
        datearray.length > 0
      ) {
        let count = datearray.length;
        let newdatearray = [];
  
        for(let i = 0; i < count; i++) {
          let date = datearray[i];
          let converted = convertYMD2DMY(date);
          newdatearray.push(converted);
        }
        return newdatearray;
      }
      else {
        return '';
      }
    } */

  const convertDMY2YMDarray = (datearray) => {  //date is string,  return string
    //convert to dd-mm-yyyy
    if (
      datearray.length > 0
    ) {
      let count = datearray.length;
      let newdatearray = [];

      for (let i = 0; i < count; i++) {
        let date = datearray[i];
        let converted = convertDMY2YMD(date);
        newdatearray.push(converted);
      }
      return newdatearray;
    }
    else {
      return '';
    }
  }

  const convertMDY2YMDarray = (datearray) => {  //date is string,  return string

    //convert to dd-mm-yyyy
    if (
      datearray.length > 0
    ) {
      let count = datearray.length;
      let newdatearray = [];

      for (let i = 0; i < count; i++) {
        let date = datearray[i];
        let converted = convertMDY2YMD(date);
        newdatearray.push(converted);
      }
      return newdatearray;
    }
    else {
      return '';
    }
  }

  const convertFormatArray = (datearray) => {
    let formatis = formata;
    if (formata === 'DDMMYYYY') {
      return convertDMY2YMDarray(datearray)
    }
    else if (formata === 'YYYYMMDD') {
      return (datearray)

    }
    else if (formata === 'MMDDYYYY') {
      return convertMDY2YMDarray(datearray)
    }
  }
  //MAYBE DETECT DATE 
  //ENFORCE DATE VALIDATION 
  //WHEN CHANGE DATE - DONT DO ANYTHING , UNTIL DATE IS VALID 

  const convertFormat = (date) => {
    let formatis = formata;

    if (formata === 'DDMMYYYY') {
      return convertYMD2DMY(date)
      //return convertDMY2YMD(date)
    }
    else if (formata === 'YYYYMMDD') {
      return (date)

    }
    else if (formata === 'MMDDYYYY') {

      return convertYMD2MDY(date)
    }
  }

  const validatedate = (date) => {

    let validORnot;
    //  let datePattern = /^(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])(-)\d{4}$/;
    let datePattern = /^\d{4}-(0[1-9]|1[0-2])-([0-2][0-9]|3[0-1])$/;
    validORnot = datePattern.test(date);
    return validORnot;

  }
  const validatedateArray = (datearray) => {
    //split array on comma,
    let checkifvalidonitsown = validatedate(datearray);
    if (checkifvalidonitsown) {
      return true;
    }
    else {
      //split see IF DATES ARE VALID INSIDE 
      let split = datearray.split(',');
      let countsplit = split.length;
      let validcount = 0;
      if (countsplit > 0) {
        for (let i = 0; i < countsplit; i++) {
          let date = split[i];
          let dateisvalid = validatedate(date);
          if (dateisvalid) {
            validcount++;
          }
        }
        if (validcount === countsplit) {
          return true;
        }
        else {
          return false;
        }
      }

    }

  }

  //her eto decide whether chevrons change month or year
  //have two chevrons, one for month, one for year

  //| -----------------------------------------------------------
  return (
    <>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {/*  value={datepropDatepicker}  */}
      <div className="datepickerwrapper" >
        <div className="datepickerformgroupdiv" onClick={() => setIsOpen(true)}>
          <input
            //placehodler maybe convert today's date 

            ref={dateinputref}
            className="datepickerinput datepinput"
            type="text"
            name="datepicker"
            id="datepickerinput"
            value={
              selectedateArray && selectedateArray.length > 0 ? selectedateArray : selecteddate2
              /* convertYMD2DMY(selecteddate2) convertYMD2DMYarray(selectedateArray)   */
            }
            aria-label="Datepicker" onClick={() => setIsOpen(true)}
            /* onChange={{testFunction} */
            onChange={e => {
              let proceed = false;
              if (selectedateArray && selectedateArray.length > 0) {
                //validate dates before setting them - OTHERWISE BUGGY if date not finished
                //alert('arry changed')
                proceed = true;
                // MAYBE HAVE TO CONVERT DATE HERE DUNNO TEST
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
                // alert('changed')
                // Otherwise, update selecteddate2
                //convert date to yyymmdd from ddmmyyyy 
                // let converteddate = convertDMY2YMD(e.target.value);
                let validdateis = validatedate(e.target.value)
                console.log(validdateis, 'validdateis')
                //   if(validdateis) {
                //     alert('valid')
                proceed = true;
                setSelecteddate2(e.target.value);
                //   }
                //   else if (!validdateis) {
                //    alert('not valid')
                //     }
                //PUT THSI STUFF IN A USE EFFECT MAYBE - INSTEAD OF A CHANGE. WHEN I CLICK AND THE DATE CHANGES, IT DOESNT TRIGGER AN ONCHANGE ON THE INPUT APPARENTLY
              }
            }

            }
          />

          <svg style={{ zIndex: '200', width: '20px', height: '20px', backgroundColor: 'white' }} id="calendaricon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar3 bi inputicon" viewBox="0 0 16 16">
            <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z" />
            <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
          </svg>

          {/* onClick={() => clickopen} */}

        </div>

        {isOpen && (
          <div className="dialog" ref={dialogref}  >   {/*  ref={ref} */}
            {/*  <button onClick={() => setIsOpen(false)} autoFocus>Close</button> */}

            {/*  dateprop={datepropDatepicker} */}
            <div className="mydaypickerwrapper"   >
              <div className="topdivdp">

                {!showyears && (<div className="chevronsdp chevrondpleft" onClick={() => changemonth(monthfordisplay, 'previous', yearfordisplay)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                  </svg>
                </div>
                )}
                {showyears && (<div className="chevronsdp chevrondpleft" onClick={() => changeyearfunction('minus')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                  </svg>
                </div>
                )}
                <div className="monthnamedp" >
                  <span className="curserpointer" onClick={() => changesetshowmonth()}>{monthname} </span>
                  <span className="curserpointer" onClick={() => showyearsfunction()}>  {yearfordisplay}  </span>
                </div>

                {!showyears && (
                  <div className="chevronsdp chevrondpright" onClick={() => changemonth(monthfordisplay, 'next', yearfordisplay)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                    </svg>
                  </div>
                )}
                {showyears && (<div className="chevronsdp chevrondpleft" onClick={() => changeyearfunction('plus', yearfordisplay)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                  </svg>
                </div>
                )}


              </div>
              {!showmonth && !showyears && (
                <div className="mydatepickergrid">
                  <div className="dayofweek">Mon</div>
                  <div className="dayofweek">Tue</div>
                  <div className="dayofweek">Wed</div>
                  <div className="dayofweek">Thu</div>
                  <div className="dayofweek">Fr</div>
                  <div className="dayofweek">Sat</div>
                  <div className="dayofweek">Sun</div>

                  {allweeksdates && allweeksdates.map((day, index) => (
                    <div
                      key={day.datetxt}
                      onClick={() => {
                        console.log(allweeksdates, 'allweeksdates123123')
                        if (multipleprop === 'yes') {
                          //alert('clicked')
                          //first check if it exists in the array already
                          if (selectedateArray.find(item => item == day.datetxt)) {
                            //   alert('exists')
                            //remove it
                            console.log('exists')
                            let newarray = multipledatearray.filter(item => item !== day.datetxt);
                            //    setMultipledatearray(newarray);
                            setSelecteddateArray(newarray);
                            changeDateCallback(newarray);
                          }

                          else {
                            console.log('multiple')
                            console.log(typeof day.datetxt, 'day.datetxt typeof')
                            console.log(day.datetxt, 'day.datetxtsssssss')

                            //convert array 
                            // let convertedArrayformat = convertFormatArray(multipledatearray);
                            //  console.log(convertedArrayformat, 'convertedArrayformat')

                            //  setMultipledatearray([...multipledatearray, convertFormat(day.datetxt)]);
                            setSelecteddateArray([...selectedateArray, convertFormat(day.datetxt)]);
                            changeDateCallback([...selectedateArray, convertFormat(day.datetxt)]);
                            changedateLocal(convertFormat(day.datetxt));

                          }
                        }
                        else if (multipleprop === 'range') {
                          // alert(day.datetxt)
                          //  selectedRANGEArray, setSelectedRANGEArray

                          if (selectedRANGEArray.length < 2) {
                            //clear arrauy
                            setSelectedRANGEArray([...selectedRANGEArray, day.datetxt]);
                          }
                          else if (selectedRANGEArray.length >= 2) {
                            //clear arrauy
                            setSelectedRANGEArray([]);
                            setSelectedRANGEArray([day.datetxt]);
                            //NEED A USE EFFECT HERE 
                          }
                          //      setSelectedRANGEArray([day.datetxt]);
                        }
                        else {
                          changeDateCallback(day.datetxt);
                          closedialog(false);
                          changedateLocal(day.datetxt);
                        }
                      }}


                      className={
                        `dpdatebox 
                        ${day.monthname !== monthname ? 'grey' : ''} 
                        ${selecteddate2 === convertFormat(day.datetxt) ? 'activedatebadge' : ''} 
                        ${day.datetxt === actuallytoday ? 'todaycss' : ''} 
                        ${selectedRANGEArray && selectedRANGEArray.find(item => item == day.datetxt) ? 'activedatebadge' : ''}
                        
                        ${selectedateArray &&
                          selectedateArray.find(item => item == convertFormat(day.datetxt)) ? 'activedatebadge' : ''} `}

                      data-date={convertFormat(day.datetxt)} data-monthname={day.monthname} data-monthnumber={day.monthnumber} /* data-dayname={day.dayname} data-dayofweek={day.dayofweek} data-dayofweeknumber={day.dayofweeknumber} data-year={day.year} data-day={day.day} data-month={day.month} */
                    /*   tabIndex={0} */
                    /*   onKeyDown={(event) => handleKeyDown(event, index)}
            */
                    >
                      {day.datetxt.split('-')[2]}

                    </div>
                  ))}

                </div>
              )}
              {showmonth && !showyears && (
                <div className="monthsdiv">
                  <div className="monthdiv curserpointer" id="1" onClick={(event) => { event.stopPropagation(); changemonthclick(1) }}>January</div>
                  <div className="monthdiv curserpointer" id="2" onClick={(event) => { event.stopPropagation(); changemonthclick(2) }}>February</div>
                  <div className="monthdiv curserpointer" id="3" onClick={(event) => { event.stopPropagation(); changemonthclick(3) }}>March</div>
                  <div className="monthdiv curserpointer" id="4" onClick={(event) => { event.stopPropagation(); changemonthclick(4) }}>April</div>
                  <div className="monthdiv curserpointer" id="5" onClick={(event) => { event.stopPropagation(); changemonthclick(5) }}>May</div>
                  <div className="monthdiv curserpointer" id="6" onClick={(event) => { event.stopPropagation(); changemonthclick(6) }}>June</div>
                  <div className="monthdiv curserpointer" id="7" onClick={(event) => { event.stopPropagation(); changemonthclick(7) }}>July</div>
                  <div className="monthdiv curserpointer" id="8" onClick={(event) => { event.stopPropagation(); changemonthclick(8) }}>August</div>
                  <div className="monthdiv curserpointer" id="9" onClick={(event) => { event.stopPropagation(); changemonthclick(9) }}>September</div>
                  <div className="monthdiv curserpointer" id="10" onClick={(event) => { event.stopPropagation(); changemonthclick(10) }}>October</div>
                  <div className="monthdiv curserpointer" id="11" onClick={(event) => { event.stopPropagation(); changemonthclick(11) }}>November</div>
                  <div className="monthdiv curserpointer" id="12" onClick={(event) => { event.stopPropagation(); changemonthclick(12) }}>December</div>

                </div>
              )
              }
              {showyears && !showmonth && (

                <div className='yeardiv'>
                  {yearsArray && yearsArray.map((year, index) => (

                    <div key={index} className={`yeardivitem ${year === yearfordisplay ? 'activeyear' : ''}`}
                      /*   onClick={() => selectnewyearfunction(year)} */
                      onClick={(event) => { event.stopPropagation(); selectnewyearfunction(year) }}
                    > <span className="curserpointer"> {year} </span></div>
                  ))}

                </div>
              )}

            </div>
          </div>
        )}
      </div>



    </>

  )


})

Datepicker.displayName = 'Mydaypicker2';
export default Datepicker;
/*   onClick={() => dispatch(setDateFordaypicker(day.datetxt))} */