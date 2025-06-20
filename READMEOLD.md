# BOOTSTRAP MULTIPLE DATEPICKER FOR REACT

- You only need to copy 3 files:
  - Datepicker.css
  - Datepicker.jsx 
  - and daypicker.ts 
- Put these 3 files in a folder
- Then you need to call the Datepicker component, from the component you want to use it in.

- Import 2 files
   - import Datepicker from './datepicker/Datepicker.jsx';
   - import './datepicker/Datepicker.css'
   - import { useState } from 'react';

- Then: SET STATES. 
   - First is to define the type of datepicker you want, single multiple or range. 
      - For singel, leave it empty  const [multiple, setMultiple] = useState('');
      - For multiple: write 'yes'. const [multiple, setMultiple] = useState('yes');
      - For range: write 'range'  const [multiple, setMultiple] = useState('range');
      
  - The second two states:  this is where your dates will be stored
  - const [multiple, setMultiple] = useState('range'); //yes or range for range or  empty string for single date selection
  - const [selecteddate, setSelecteddate] = useState('');
  - const [selecteddatesMulti, setSelecteddatesMulti] = useState([]);

  - THEN YOU NEED YOUR CALLBACK FUNCTION to retrive the dates 
  - const handleDateChange = (newdate) => {
    console.log('newdate in handleDateChange', newdate)
    console.log(typeof newdate, 'typeof newdate')
    if (typeof newdate === 'object') {
      console.log('newdate is object');
      //setSelecteddate(newdate);
      //setSelecteddatesMulti(prevState => [...prevState, newdate]);
      setSelecteddatesMulti(newdate);
    }
    else {
      console.log(newdate, 'newdate in handleDateChange');
      //setDatepropDatepicker(newdate);
      setSelecteddate(newdate);
    }
  }

- FINALLY YOU NEED TO PUT THE DATEPICKER IN YOUR RETURN STATEMENT 
- here you can set the DATEFORMAT (ddmmyyyy) or (mmddyyyy) or (yyyymmdd)

  return (
    <>
      <Datepicker onDateChange={handleDateChange}
        dateprop={multiple == 'yes' ? selecteddatesMulti : selecteddate}
        multiple={multiple} /* format="MMDDYYYY" */ format="DDMMYYYY"
        displaya=""
      />
    </>

    
### Instructions for Using the Multiple Date Selection Component

1. **Set Up the Import Statements**
   - Import the necessary React hooks (`useState` and `useRef`) and styles to use the Datepicker component in your app. 
   - Your import statements should look like this:
     ```javascript
     import { useState, useRef } from 'react';
     import './App.css';
     import Datepicker from './datepicker/Datepicker.jsx';
     import './datepicker/Datepicker.css';
     import './scss/styles.scss';
     ```

2. **Define State Variables**
   - Inside your main component (e.g., `App`), define the state variables for managing date selections.
   - Use `multiple` to determine if multiple dates are allowed.

   - Use `selecteddate` for single date selection and `selecteddatesMulti` for multiple date selections.

   Example:
   ```javascript
   const [multiple, setMultiple] = useState(''); // Empty for single date selection, 'yes' for multiple, 'range' for range
   const [selecteddate, setSelecteddate] = useState('');
   const [selecteddatesMulti, setSelecteddatesMulti] = useState([]);
   ```

3. **Create a Callback Function for Date Changes**
   - Define the `handleDateChange` function to handle date changes. This function will receive `newdate` as an argument.
   - Check the type of `newdate`:
     - If it’s an object (array of dates for multiple selection), update `selecteddatesMulti`.
     - If it’s a single string, update `selecteddate`.

   Example:
   ```javascript
   const handleDateChange = (newdate) => {
       if (typeof newdate === 'object') {
           setSelecteddatesMulti(newdate); // Update multi-date state
       } else {
           setSelecteddate(newdate); // Update single date state
       }
   };
   ```

4. **Use the Datepicker Component**
   - Add the `Datepicker` component within the return statement of your `App` function.
   - Pass the following props:
     - `onDateChange`: Assign the `handleDateChange` function.
     - `dateprop`: Assign the correct date state based on the `multiple` selection state.
     - `multiple`: Pass `multiple` to indicate whether multiple selection is active.
     - `format`: Specify the date format, e.g., `"MMDDYYYY"`.
     - `displaya`: Leave blank to use the default display mode (popup/modal).

   Example:
   ```javascript
   return (
       <Datepicker 
           onDateChange={handleDateChange}
           dateprop={multiple === 'yes' ? selecteddatesMulti : selecteddate}
           multiple={multiple}
           format="MMDDYYYY"
           displaya=""
       />
   );
   ```

5. **Run the App**
   - Start your development server to test the component.
   - Ensure that both single and multiple date selections function correctly according to the `multiple` state.

6. **Optional: Toggle between Single and Multiple Date Selection**
   - You can add a button or input element to toggle the `multiple` state between `''` (single) and `'yes'` (multiple) based on user preference.

---

This guide should give you a straightforward setup and usage for your multiple date selection component. Adjustments may be needed depending on specific requirements.
