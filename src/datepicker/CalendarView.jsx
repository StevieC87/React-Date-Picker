import { convertTOSYSTEMFormat } from './daypickerjs'

export default function CalendarView({
  allweeksdates,
  monthname,
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
}) {

  const onclickdate = (e, day) => {
    console.log(allweeksdates, 'allweeksdates123123');
    //! WE RECEIVE DATE format in default : YYYY-MM-DD
    if (!multipleprop) { //if single date option

      onDateChange(day);
      setSelecteddate2(day);
      closedialog(false);
    }
    else if (multipleprop === 'yes') {
      if (selectedateArray.find(item => item == day)) {
        let newarray = selectedateArray.filter(item => item !== day);
        setSelecteddateArray(newarray);
        onDateChange(newarray);
      }
      else {
        console.log('multiple');
        setSelecteddateArray([...selectedateArray, day]);
        onDateChange([...selectedateArray, day]);
        //  setSelecteddate2(day); // i think this is just to show currently selected date in the daylong maybe - not sure
      }
    } else if (multipleprop === 'range') {
      if (selectedRANGEArray.length === 0) {
        setRangestartDate(day)
      }
      if (selectedRANGEArray.length < 2) {
        let getcurrentdate = selectedRANGEArray[0];
        if (day === getcurrentdate) {
          //  setRangesingledayselected(true);
          setRangestartDate(day)
          setRangeendDate(day);
          setSelectedRANGEArray([day]);
        }
        setSelectedRANGEArray([...selectedRANGEArray, day]);
      } else if (selectedRANGEArray.length >= 2) {
        /*   setSelectedRANGEArray([]); */
        setRangestartDate(day)
        setRangeendDate('')
        setSelecteddateArray([]);
        setSelectedRANGEArray([day]);
      }
    }
  };

  const weekarray = (weekstartssunday) => {
    if (weekstartssunday) {
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    }
    else {
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    }
  }

  return (
    <div className="mydatepickergrid">
      {weekarray(weekstartssunday).map((day, index) => (
        <div key={index} className="dayofweek">
          {day}

        </div>
      ))}

      {allweeksdates && allweeksdates.map((day, index) => (
        //! allweeksdates is in default system format yyyy-mm-dd
        <div
          key={`${day.datetxt}+${index}`}
          data-date={day.datetxt} data-monthname={day.monthname} data-monthnumber={day.monthnumber}
          onClick={(e) => onclickdate(e, day.datetxt)}
          className={
            `dpdatebox 
         ${day.monthname !== monthname ? 'grey' : ''} 
     
         ${selecteddate2 === day.datetxt ? 'activedatebadge' : ''} 
         ${day.datetxt === actuallytoday ? 'todaycss' : ''} 
         ${selectedRANGEArray && selectedRANGEArray.find(item => item === day.datetxt) ? 'activedatebadge' : ''}
         ${selectedateArray &&
              selectedateArray.find(item => item == day.datetxt) ? 'activedatebadge' : ''} 
        ${day.datetxt === rangestartDate ? 'rangestart' : ''}
        ${day.datetxt === rangeendDate ? 'rangeend' : ''}
        
        `}>
          {day.datetxt.split('-')[2]}
        </div>
      ))}
    </div>
  )
}