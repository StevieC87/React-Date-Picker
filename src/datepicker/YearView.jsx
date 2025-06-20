

export default function YearView(props) {

  const { yearsArray, yearfordisplay, setYearfordisplay, setShowYears
  } = props

  const selectnewyearfunction = (selectedyear) => {
    setYearfordisplay(selectedyear);
    setShowYears(false);
  };


  return (
    <div className='yeardiv'>
      {yearsArray && yearsArray.map((year, index) => (
        <div key={index} className={`yeardivitem ${year === yearfordisplay ? 'activeyear' : ''}`}
          onClick={(event) => { event.stopPropagation(); selectnewyearfunction(year) }}
        > <span className="curserpointer"> {year} </span></div>
      ))}
    </div>
  )
}