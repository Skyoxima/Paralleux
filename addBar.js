import { editBars } from './editBars.js';

function addBar() {
  const xTicksSpans = document.querySelectorAll('.x-ticks'),
        zXTickPsn = xTicksSpans[0].getBoundingClientRect(),          // z ~ zero-th
        lastTickPsn = xTicksSpans[xTicksSpans.length - 1].getBoundingClientRect(),
        blockerDiv = document.querySelector('.blocker'),
        addBarPopUp = document.querySelector('.add-bar-pu'),
        barPlaneDiv = document.querySelector('#bar-plane'),
        addBarBtn = document.getElementById('add-bar-btn'),
        newBarVal = document.getElementById("new-bar-val"),
        newBarLabel = document.getElementById("new-bar-label"),
        newBarColor = document.getElementById("bar-color-picker"),
        popUpSubmitBtn = document.getElementById("pop-up-submit"),
        popUpCancelBtn = document.getElementById("pop-up-cancel");
  
  // Entering the pop-up by using the button on the Control Panel
  addBarBtn.onclick = () => {
    document.querySelector("#edit-bar-tooltip").classList.remove("active-tooltip");
    popUpSubmitBtn.disabled = true;
    addBarPopUp.style.display = 'block';
    blockerDiv.style.display = 'block';
  }
  
  // live validation of inputted values for the new bar
  newBarVal.oninput = () => {
    if(newBarVal.value === "")                                                  // disable the add button for all invalid inputs i.e no value to set to
      popUpSubmitBtn.disabled = true;
    else {
      newBarVal.value = newBarVal.value.replace(/^\.|[^0-9\.]||10.|(?<=\.\d\d).*/g, "");      
      popUpSubmitBtn.disabled = false;
    }
  }
  // ^\. → . cannot be at the start of the string
  // [^0-9\.] → don't allow any text other than digits and decimal
  // (?<=\.\d*)\. → if there is already a decimal, don't allow another decimal
  //- 1[^0\.] → 1 should not be followed by any digit except 0 or a decimal point, _if_ there isn't a decimal already ahead
  //- [2-9]\d → 2-9 should not be followed by any number
  // → any number should not be followed by anything except decimal, _if_ there isn't a decimal already
  // 10. → 10 should not be followed by anything (10 is the max limit)
  // (?<=\.\d\d).* → decimal should be followed by at most 2 digits, rest should not be allowed

  // With the entered data, adding the new bar on the canvas when Add is clicked
  popUpSubmitBtn.onclick = () => {
    let bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.background = newBarColor.value === "#ffffff" ? "#FAFAFA" : newBarColor.value; // to not make an invisible bar
    bar.style.setProperty("--stands-for-text", `"${newBarLabel.value}"`);
    bar.setAttribute("bar-value", newBarVal.value);
    bar.setAttribute("bar-number", barPlaneDiv.childElementCount);

    const barWidth = (lastTickPsn.left - zXTickPsn.left) * (parseFloat(newBarVal.value) / 10);
    bar.style.width = `${barWidth}px`;
    barPlaneDiv.appendChild(bar);
    barPlaneDiv.lastChild.animate(
      [
        {width: "0px", opacity: 0},
        {width: `${barWidth}px`, opacity: 1}
      ], {
        duration: 1500,
        iterations: 1,
        easing: "ease-out"
      }
    );
    barPlaneDiv.lastChild.addEventListener("click", editBars);      // for editing tool tip
    yAxisBarIndxAndVal();
    
    // reset the pop-up field before finalising the submit, keeps it ready for next new bars
    newBarVal.value = "";
    newBarLabel.value = "";
    newBarColor.value = "#ffc0cb";
    addBarPopUp.style.display = 'none';
    blockerDiv.style.display = 'none';
  }

  popUpCancelBtn.onclick = () => {
    addBarPopUp.style.display = 'none';
    blockerDiv.style.display = 'none';
  }
}; //IIFE (Immediately Invoked Function Expression) to have hold of all the necessary elements already and local event handlers for add bar pop-up(pu) buttons and fields
