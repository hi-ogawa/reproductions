import { useRef, useState } from "react";
import "./styles.css";

export function DateRangePicker() {
  const calendar = useRef<HTMLDivElement>(null);
  const [month, setMonth] = useState("March 2027");
  const [checkIn, setCheckIn] = useState<number>();
  const [checkOut, setCheckOut] = useState<number>();
  const [saved, setSaved] = useState(false);

  function selectDay(day: number) {
    if (!checkIn) {
      setCheckIn(day);
      return;
    }
    setCheckOut(day);
    calendar.current?.hidePopover();
  }

  return (
    <>
      <section className="picker" aria-labelledby="picker-title">
        <div className="kicker">Date range</div>
        <h1 id="picker-title">Choose travel dates</h1>
        <p className="property">Maison Callas · Nice, France</p>
        <div className="dates">
          <label>
            Check in
            <button
              className="date-button"
              aria-label="Choose check in"
              onClick={() => calendar.current?.showPopover()}
            >
              {checkIn ? `${checkIn} Apr` : "Choose date"}
              <span>{checkIn ? "Sunday" : "Flexible"}</span>
            </button>
          </label>
          <label>
            Check out
            <button className="date-button" aria-label="Check out">
              {checkOut ? `${checkOut} Apr` : "Choose date"}
              <span>{checkOut ? "Thursday" : "Flexible"}</span>
            </button>
          </label>
        </div>
        <button className="save" onClick={() => setSaved(true)}>
          Save dates
        </button>
        {saved && (
          <div className="status" role="status">
            <span className="check">✓</span>
            <span>Dates saved</span>
          </div>
        )}
      </section>
      <div ref={calendar} className="calendar-popover" popover="auto">
        <div className="calendar-head">
          <strong>{month}</strong>
          <button className="next-month" onClick={() => setMonth("April 2027")}>
            Next month
          </button>
        </div>
        <div className="week">
          <span>M</span>
          <span>T</span>
          <span>W</span>
          <span>T</span>
          <span>F</span>
          <span>S</span>
          <span>S</span>
        </div>
        <div className="days">
          {Array.from({ length: 28 }, (_, index) => {
            const day = index + 1;
            const selected = day === checkIn || day === checkOut;
            const inRange = checkIn && checkOut && day > checkIn && day < checkOut;
            return (
              <button
                className={`day${selected ? " selected" : ""}${inRange ? " range" : ""}`}
                key={day}
                onClick={() => selectDay(day)}
              >
                {day}
              </button>
            );
          })}
        </div>
        <p className="calendar-note">Select check-in and check-out dates</p>
      </div>
    </>
  );
}
