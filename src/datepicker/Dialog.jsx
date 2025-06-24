import React, { useEffect, useState, useRef } from 'react';
import {
  getmonthnumber, getmonthname, daysinmonth2, getdayofweek, getdayname, getWeeksInMonth, makearrayofdatesfromWeek, convertYMD2DMY, convertDMY2YMD, convertDMY2YMDarray, convertMDY2YMDarray,
  convertFromSystemFormattodesiredformat
} from './daypickerjs';
import Topdiv from './Topdiv';
import MonthsView from './Monthsview';
import YearView from './YearView';
import CalendarView from './CalendarView';

export default function Dialog(props) {
  const {
    monthfordisplay,
    setMonthfordisplay,
    yearfordisplay,
    setYearfordisplay,
    selectedateArray,
    setSelecteddateArray,
    selectedRANGEArray,
    setSelectedRANGEArray,
    selecteddate2,
    setSelecteddate2,
    onDateChange,
    closedialog,
    multipleprop,
    actuallytoday,
    format,
    weekstartssunday,
    rangestartDate,
    rangeendDate,
    setRangestartDate,
    setRangeendDate,
    setRangesingledayselected
  } = props;

  const dialogref = useRef();
  const [monthname, setMonthname] = useState('');
  const [allweeksdates, setAllweeksdates] = useState([]);
  const [showmonth, setShowmonth] = useState(false);
  const [yearsArray, setYearsArray] = useState([]);
  const [showyears, setShowYears] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogref.current && !dialogref.current.contains(event.target)) {
        closedialog(false);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closedialog]);


  //. FROM MONTH, YEAR -> BUILD CALENDAR VIEW ------------------------
  //! THIS RETURNS IN THE SYSTEM FORMAT YYYY-MM-DD
  //! takes in month, and year -> RETURS ARRAY OF days to display 
  useEffect(() => {
    console.log('month OR YEAR for display CHANGED', monthfordisplay, yearfordisplay);
    let getmonthnameV = getmonthname(monthfordisplay, yearfordisplay);
    setMonthname(getmonthnameV);
    console.log(getmonthnameV, 'getmonthnamev');

    let daysinmonth1V = daysinmonth2(monthfordisplay, yearfordisplay);
    console.log(daysinmonth1V, 'daysinmonth');

    let testweeks = getWeeksInMonth(monthfordisplay, yearfordisplay);
    console.log(testweeks, 'testweeks');

    let mergedArray = [];

    let looptestweeks = testweeks.map((week, index) => {
      let weeknumberhere = week.weeknumber;
      let weekyearhere = week.year;
      let arrayofdates = makearrayofdatesfromWeek(weeknumberhere, weekyearhere, monthfordisplay, monthname);
      mergedArray = [...mergedArray, ...arrayofdates];
      console.log(arrayofdates, 'arrayofdates');


      return arrayofdates;
    });
    console.log(mergedArray, 'mergedArray');
    setAllweeksdates(mergedArray);
  }, [monthfordisplay, yearfordisplay]);


  //. FORM DISPLAYED YEAR - SET FUTURE/PAST YEAR

  useEffect(() => {
    let selectedyear = yearfordisplay;
    let yearsbefore = selectedyear - 10;
    let yearsafter = selectedyear + 10;
    let yearsarray = [];
    for (let i = yearsbefore; i <= yearsafter; i++) {
      yearsarray.push(i);
    }
    console.log(yearsarray, 'yearsarray');
    setYearsArray(yearsarray);
  }, [yearfordisplay]);


  return (
    <div className="dialog" ref={dialogref}>
      <div className="mydaypickerwrapper">
        <Topdiv
          monthfordisplay={monthfordisplay}
          setMonthfordisplay={setMonthfordisplay}
          yearfordisplay={yearfordisplay}
          setYearfordisplay={setYearfordisplay}
          monthname={monthname}
          showmonth={showmonth}
          setShowmonth={setShowmonth}
          showyears={showyears}
          setShowYears={setShowYears}
        />
        {!showmonth && !showyears && (
          <CalendarView
            allweeksdates={allweeksdates}
            monthname={monthname}
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
            weekstartssunday={weekstartssunday}
            rangestartDate={rangestartDate}
            rangeendDate={rangeendDate}
            setRangestartDate={setRangestartDate}
            setRangeendDate={setRangeendDate}
            setRangesingledayselected={setRangesingledayselected}
          />
        )}
        {showmonth && !showyears && (
          <MonthsView setMonthfordisplay={setMonthfordisplay} setShowmonth={setShowmonth}
          />
        )}
        {showyears && !showmonth && (
          <YearView setYearfordisplay={setYearfordisplay} setShowYears={setShowYears} yearsArray={yearsArray} yearfordisplay={yearfordisplay} />
        )}
      </div>
    </div>
  );
}