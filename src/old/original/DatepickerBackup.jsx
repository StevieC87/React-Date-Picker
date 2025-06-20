import React from 'react';
import { useEffect, useState } from 'react';

import 'bootstrap-icons/font/bootstrap-icons.css';
import {getmonthnumber, getmonthname, daysinmonth2, getdayofweek, getdayname, getWeeksInMonth, makearrayofdatesfromWeek} from '../daypickerjs';


//; ----------------------------------------------------------------------
//.DATE RELATED FUNCTIONS
    const Datepicker = React.forwardRef((props,ref) => {
        const {dateprop, onDateChange, closedialogCallback} = props;
       

    const[selecteddate2, setSelecteddate2] = useState('');
    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    const[datepropstate, setDatepropState] = useState(dateprop);
    //STATES RELATED TO DATE PROP
    const[monthfromdate, setMonthfromdate] = useState('');
    const[yearfromdate, setYearfromdate] = useState(0);
    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    //STATES WE SET FROM DATE / MONTH / YEAR
    const[monthnumber, setMonthnumber] = useState('');
    //TO DO 
    const[monthname, setMonthname] = useState('');
    const[daysinmonth, setDaysinmonth] = useState('');
    const[dayofweek, setDayofweek] = useState('');
    const[dayname, setDayname] = useState('');
    const [allweeksdates, setAllweeksdates] = useState([]);

    const[monthfordisplay, setMonthfordisplay] = useState(0);
    const[yearfordisplay, setYearfordisplay] = useState(0); //not sure about this
    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    //if no date: get todays MONTH only
    //if date: use that date
    //IF I WANT IT BLANK WHEN IT OPENS - ideally
  
        
    //; =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    //. ON TODAYS DATE CHANGE -> 
    useEffect(() => {
        let monthfromdate1;
        let yearfromdate1;
        let getmonthnumberV;
        let getdayofweekV;
        let getdaynameV;
        let dateprop;
        let datetouse;
      if(datepropstate) {
        console.log('datepropstate', datepropstate)
        datetouse = datepropstate;
        console.warn('dateprop yes', )
     
      }
      else if(!datepropstate) {
       console.warn('no dateprop')
       let todaydate1 = new Date(); //example: 2021-05-05T10:00:00.000Z
       let todaydateforsure = todaydate1.toISOString().slice(0, 10); // example: 2021-05-05
    
        console.log(todaydateforsure, 'todaydateforsurexx');
        datetouse = todaydateforsure;

       // changeDateCallback(todaydateforsure)
      }
        //-= Related to DATE prop  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
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
                let weekyearhere =  week.year;
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
        //console.log(typeof monthfromdate1, 'monthfromdate1')
        //console.log(monthfromdate1, 'monthfromdate1') 
        //console.log(yearfromdate1, 'yearfromdate1')
        //console.log(getmonthnumberV, 'getmonthnumber');
        //console.log(getdayofweekV, 'getdayofweek');

        
    //. -----------------------------------------------------------
    useEffect(() => {
        
        console.log('selecteddate2 changed', selecteddate2)

    }, [selecteddate2])

    const[testrandom, setTestrandom] = useState('');
    //. CHEVRONS CHANGE MONTH
    const changemonth = (currentmonthnum, previousnext, yearfordisplay22) => {
        console.log('changing month')
        console.log(typeof yearfordisplay22,'yearfordisplay22 typeof')
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
        if(previousnext === 'previous') {
            console.log('going to previous month')
            if(cmonthnumberinjs === 1) {
                newmonth = 12; 
                let newyear1 = yearfordisplay22 - 1;
                setMonthfordisplay(newmonth);
                setYearfordisplay(newyear1);
                console.log(newyear1, 'newyear1')
                console.log(typeof newyear1, 'newyear1 typeof')
            }
            else {
                 newmonth  = cmonthnumberinjs - 1;
                 setMonthfordisplay(newmonth);
            }
          
        }
        else if (previousnext === 'next') {
            console.log('going to next month')
            if(cmonthnumberinjs === 12) {
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
                 console.log(newmonth,'newmonth')
                 setMonthfordisplay(newmonth);
            }
          
        }  
 


       
       
      
       
        //make date from that month
      //  let madeupdate = new Date(yearfromdate, newmonth, 1);
      //  console.log(madeupdate, 'madeupdate')
      //  console.log(cmonthnumberinjs, 'cmonthnumberinjs');
       // console.log(newmonth, 'newmonth')


    }
    const changedateLocal = (newdate) => {
        console.log(newdate, 'newdate in changedateLocal')
        console.log(typeof newdate, 'newdate in changedateLocal')
        let dateparam = new Date(newdate);
        console.log(dateparam, 'dateparam')
        setSelecteddate2(newdate);
        setTestrandom(newdate);
      
        
    }
    //. CHANGE DATE ON CLICK CALLBACK
    const changeDateCallback = (newdate) => {
        onDateChange(newdate);
      
        console.log(newdate, 'newdate in changeDateCallback')
    }   

    const closedialogCallback2 = (newstate) => {
        closedialogCallback(newstate);
      
    }

    // dispatch(setDateFordaypicker(todaydate));

  
    //| -----------------------------------------------------------
    return (
            <div className="mydaypickerwrapper"   ref={ref}  >
                <div className="topdivdp">
              
                    <div className="chevronsdp chevrondpleft" onClick={() => changemonth(monthfordisplay, 'previous', yearfordisplay)}>
                        <i className="bi bi-chevron-left"></i>
                    </div>
                    <div className="monthnamedp">
                        { monthname } 
                        <span>  </span>  {  yearfordisplay } 
                    </div>
                    
                    <div className="chevronsdp chevrondpright" onClick={() => changemonth(monthfordisplay, 'next', yearfordisplay)}>
                    <i className="bi bi-chevron-right"></i>
                </div>

            </div>
            
            <div className="mydatepickergrid">
                <div className="dayofweek">{ testrandom }</div>
                <div className="dayofweek">Tue</div>
                <div className="dayofweek">Wed</div>
                <div className="dayofweek">Thu</div>
                <div className="dayofweek">Fr</div>
                <div className="dayofweek">Sat</div>
                <div className="dayofweek">Sun</div>

            { allweeksdates && allweeksdates.map((day, index) => (
                <div 
                key={index}
                onClick={() => {
                    changeDateCallback(day.datetxt);
                    closedialogCallback2(false);
                    changedateLocal(day.datetxt); 
                } }
                    
                    
                className={`dpdatebox ${day.monthname !== monthname ? 'grey' : ''} ${datepropstate === day.datetxt ? 'activedatebadge' : ''}`}
                
                data-date={day.datetxt} data-monthname={day.monthname} data-monthnumber={day.monthnumber} data-dayname={day.dayname} data-dayofweek={day.dayofweek} data-dayofweeknumber={day.dayofweeknumber} data-year={day.year} data-day={day.day} data-month={day.month}
                >
                    {day.datetxt.split('-')[2]}
                  
                    </div>
                ))}
        
            </div>
        </div>
        
    )
                
    
    })

    Datepicker.displayName = 'Mydaypicker2';
export default Datepicker;
/*   onClick={() => dispatch(setDateFordaypicker(day.datetxt))} */

/* 
    //here we make array like monday tuesday wenesday etc, but with numbers
   
    function boxesweekdays35() {
        let arrayboxesdayofweek = [];
        for (let i = 0; i < 35; i++) {
            console.log(i, 'i in boxesweekdays35')
            let getdayofweek = getboxdayofweek(i);
            arrayboxesdayofweek.push(getdayofweek);
        }
        console.log(arrayboxesdayofweek, 'arrayboxesdayofweek in boxesweekdays35')
        return arrayboxesdayofweek;
        
    }
 */

    //OLD STUFF

     /* //THIS ISNMT USED BUT IT'S GOOD THE DATES OF FIRST MONTH ARE CORRECT BUT NOT ENOUGH I THINK THIS IS OLD
    useEffect(() => {
       if (daysinmonth) { 
            const daysarray = loopmonthdays(daysinmonth, date); 
            console.log(daysarray, 'daysarray in useEffect');
            setArrayofDateObjects(daysarray); 
        } 
    }, [daysinmonth, date])
       */
    //style component