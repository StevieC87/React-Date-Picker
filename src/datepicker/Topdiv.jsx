export default function Topdiv({
  monthfordisplay,
  setMonthfordisplay,
  yearfordisplay,
  setYearfordisplay,
  monthname,
  showmonth,
  setShowmonth,
  showyears,
  setShowYears
}) {
  const changemonth = (currentmonthnum, previousnext, yearfordisplay22) => {
    console.log('changing month');
    let cmonth = currentmonthnum;
    console.log(cmonth, 'cmonth');
    let cmonthnumber = cmonth;
    let cmonthnumberinjs = cmonthnumber;
    console.log(cmonthnumberinjs, 'cmonthnumberinjsFORNOWNOTTRUE');
    let newmonth;

    if (previousnext === 'previous') {
      console.log('going to previous month');
      if (cmonthnumberinjs === 1) {
        newmonth = 12;
        let newyear1 = yearfordisplay22 - 1;
        setMonthfordisplay(newmonth);
        setYearfordisplay(newyear1);
        console.log(newyear1, 'newyear1');
        console.log(typeof newyear1, 'newyear1 typeof');
      } else {
        newmonth = cmonthnumberinjs - 1;
        setMonthfordisplay(newmonth);
      }
    } else if (previousnext === 'next') {
      console.log('going to next month');
      if (cmonthnumberinjs === 12) {
        newmonth = 1;
        let newyear1 = yearfordisplay22 + 1;
        console.log(newyear1, 'newyear1');
        console.log(typeof newyear1, 'newyear1 typeof');
        setYearfordisplay(newyear1);
        setMonthfordisplay(newmonth);
      } else {
        console.log('next, not 12');
        newmonth = cmonthnumberinjs + 1;
        console.log(newmonth, 'newmonth');
        setMonthfordisplay(newmonth);
      }
    }
  };

  const changesetshowmonth = () => {
    if (showmonth === false) {
      setShowmonth(true);
      setShowYears(false);
    } else {
      setShowmonth(false);
    }
  };

  const showyearsfunction = () => {
    if (showyears === false) {
      setShowYears(true);
      setShowmonth(false);
    } else {
      setShowYears(false);
    }
  };

  const changeyearfunction = (plusorminus) => {
    let currentselectyear = yearfordisplay;
    if (plusorminus === 'plus') {
      let newyear = currentselectyear + 10;
      setYearfordisplay(newyear);
    } else if (plusorminus === 'minus') {
      let newyear = currentselectyear - 10;
      setYearfordisplay(newyear);
    }
  };
  return (
    <div className="topdivdp">
      {!showyears && (
        <div className="chevronsdp chevrondpleft" onClick={() => changemonth(monthfordisplay, 'previous', yearfordisplay)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
          </svg>
        </div>
      )}
      {showyears && (
        <div className="chevronsdp chevrondpleft" onClick={() => changeyearfunction('minus')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
          </svg>
        </div>
      )}
      <div className="monthnamedp">
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
      {showyears && (
        <div className="chevronsdp chevrondpleft" onClick={() => changeyearfunction('plus', yearfordisplay)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
          </svg>
        </div>
      )}
    </div>
  )
}