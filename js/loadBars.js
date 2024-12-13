import { addBarToDOM } from "./addBar.js";
import { BASE_BAR_ANIM_OPTS, BASE_BAR_ANIM_STR } from "./constants.js";
import { DOM_ELEMENTS } from "./dom.js";
import { barAnimator } from "./otherFunctions.js";
import {removeAllBars, yAxisBarIndxAndVal} from "./paralleux.js"

export async function loadBars() {
  const loadedBars = await new Response(DOM_ELEMENTS.loadBarsFile.files[0]).json();  //! understand this line...
  const allBars = loadedBars.allBars;
        
  removeAllBars();                                                                         // clear the screen before loading the uploaded bars
  for(let i = 0; i < allBars.length; i++) {
    const barWidth = addBarToDOM(allBars[i].barLabel, allBars[i].barColor, allBars[i].barValue);
    barAnimator(DOM_ELEMENTS.barPlane.lastElementChild, [BASE_BAR_ANIM_STR, {width: `${barWidth}px`, opacity: 1}], BASE_BAR_ANIM_OPTS)
    yAxisBarIndxAndVal();
  }
  DOM_ELEMENTS.loadBarsFile.value = null
}