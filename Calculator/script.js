const soundEffect = new Audio(`./click-button-140881.mp3`);

function playSound()
{
  soundEffect.currentTime = 0; // reset the audio to the beginning to play sound each time
  soundEffect.play();
}

function concatTextboxValue(inputValue)
{
  playSound();
  const inputTextbox = document.getElementById(`inputTextbox_ID`);
  inputTextbox.value = String(inputTextbox.value).concat(inputValue);
}

let myStack = [];
function pushToStack(textboxValue, selectedOperator)
{
  playSound();
  if (myStack.length == 0 && textboxValue == 0)
  {
    //do nothing
  }
  else
  {
    myStack.push(textboxValue);
    myStack.push(selectedOperator);
    console.log(myStack);
  }
  document.getElementById(`inputTextbox_ID`).value = ``;
}

let displayAnswer; //global variable

function calculate()
{
  playSound();

  myStack.push(document.getElementById(`inputTextbox_ID`).value);
  myStack = myStack.reverse();
  console.log(myStack);

  while (myStack.length != 1)
  {
    const value1 = Number(myStack.pop()),
      selectedOperator = myStack.pop(),
      value2 = Number(myStack.pop());

    if (selectedOperator == `+`)
    {
      myStack.push(value1 + value2);
    }
    else if (selectedOperator == `-`)
    {
      myStack.push(value1 - value2);
    }
    else if (selectedOperator == `*`)
    {
      myStack.push(value1 * value2);
    }
    else if (selectedOperator == `/`)
    {
      myStack.push(value1 / value2);
    }
    else if (selectedOperator == `%`)
    {
      myStack.push(value1 / 100);
    }
    console.log(myStack);
  }
  displayAnswer = document.getElementById(`inputTextbox_ID`).value = myStack.pop(); //saving answer for Ans key
}

function calculatedAnswer()
{
  playSound();
  document.getElementById(`inputTextbox_ID`).value = displayAnswer;
}

function clearStackAndDisplay()
{
  playSound();
  while (myStack.length != 0)
  {
    myStack.pop();
  }
  document.getElementById(`inputTextbox_ID`).value = ``;
}

function clearTextbox()
{
  playSound();
  document.getElementById(`inputTextbox_ID`).value = ``;
}

function removeLastDigit()
{
  playSound();
  const display = document.getElementById(`inputTextbox_ID`);
  const currentValue = display.value;
  display.value = currentValue.slice(0, -1); //removes the last digit on calculator screen
}

document.addEventListener
(`keydown`, function allowNumAndOperators(event)
  {
    if (event.key === `Enter`)
    {
      calculate();
    }
    else if ((event.key >= `0` && event.key <= `9`) || event.key === `.`) {
      concatTextboxValue(event.key);
    }
    else if
    (
      event.key === `-` ||
      event.key === `+` ||
      event.key === `*` ||
      event.key === `/` ||
      event.key === `%`
    )
    {
      pushToStack(document.getElementById("inputTextbox_ID").value, event.key);
    }
    else if(event.key === `Backspace`)
    {
      removeLastDigit();
    }
    else if(event.key === `Delete`)
    {
      clearTextbox();
    }
    else if(event.key === `Escape`)
    {
      clearStackAndDisplay();
    }
  }
);
