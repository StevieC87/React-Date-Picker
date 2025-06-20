# REACT DATEPICKER INSTRUCTIONS

## 1. Copy the `datepicker/` Folder

Copy the `datepicker/` folder from `src`.

---

## 2. Import in Your File

```js
import Datepicker from "./datepicker/Datepicker.jsx";
import "./datepicker/Datepicker.css";
import { useState } from "react";
```

---

## 3. Define Datepicker Type

- **Single Date Only:**
  ```js
  const [multiple, setMultiple] = useState("");
  ```
- **Multiple Dates:**
  ```js
  const [multiple, setMultiple] = useState("yes");
  ```
- **Range:**
  ```js
  const [multiple, setMultiple] = useState("range");
  ```

---

## 4. State to Store Values

- **Single Date:**
  ```js
  const [selecteddate, setSelecteddate] = useState("");
  ```
- **Multiple Dates / Range:**
  ```js
  const [selecteddatesMulti, setSelecteddatesMulti] = useState([]);
  ```

---

## 5. Callback Function

```js
const handleDateChange = (newdate) => {
  if (typeof newdate === "object") {
    setSelecteddatesMulti(newdate);
  } else {
    setSelecteddate(newdate);
  }
};
```

---

## 6. Use the Datepicker Component

Set the date format (`DDMMYYYY`, `MMDDYYYY`, or `YYYYMMDD`). This is what will be displayed in the input form.

Nota bene: Dates in state are always stored as `yyyy-mm-dd`.

You can set it the week to start on Sunday or Monday by setting true/false to this prop: weekstartssunday={false} Or weekstartssunday={true}

```jsx
<Datepicker
  onDateChange={handleDateChange}
  dateprop={
    multiple === "yes" || multiple === "range"
      ? selecteddatesMulti
      : selecteddate
  }
  multipleprop={multiple}
  format="DDMMYYYY"
  displaya=""
  weekstartssunday={false}
/>
```

---

## 7. Complete Example

```jsx
import { useState } from "react";
import "./App.css";
import Datepicker from "./datepicker/Datepicker.jsx";
import "./datepicker/Datepicker.css";

function App() {
  const [multiple, setMultiple] = useState("range"); // "yes" or "range" for multiple selection, empty string for single date
  const [selecteddate, setSelecteddate] = useState("");
  const [selecteddatesMulti, setSelecteddatesMulti] = useState([]);

  const handleDateChange = (newdate) => {
    if (typeof newdate === "object") {
      setSelecteddatesMulti(newdate);
    } else {
      setSelecteddate(newdate);
    }
  };

  return (
    <>
      <Datepicker
        onDateChange={handleDateChange}
        dateprop={
          multiple === "yes" || multiple === "range"
            ? selecteddatesMulti
            : selecteddate
        }
        multipleprop={multiple}
        format="DDMMYYYY"
        displaya=""
        weekstartssunday={false}
      />
    </>
  );
}

export default App;
```
