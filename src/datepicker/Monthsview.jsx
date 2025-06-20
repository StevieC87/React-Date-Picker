
export default function MonthsView(props) {

  const { setMonthfordisplay, setShowmonth } = props;
  const changemonthclick = (monthnumber) => {
    console.log(monthnumber, 'monthnumber');
    setMonthfordisplay(monthnumber);
    setShowmonth(false);
  };

  return (
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