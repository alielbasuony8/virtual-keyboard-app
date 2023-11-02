const keyboardContainer = document.querySelector(".container");
const input = document.querySelector("textarea");
const keys = document.querySelectorAll(".key");
const arrows = document.querySelectorAll(".arrow-key");
const chars = document.querySelectorAll(".char");
const spaceKey = document.querySelector(".space-key");
const shiftKeys = document.querySelectorAll(".shift-key");
const shiftKey = document.querySelector(".shift-key");
const enterKey = document.querySelector(".enter-key");
const tabKey = document.querySelector(".tab-key");
const capsLockKey = document.querySelector(".capslock-key");
const capsLamp = document.querySelector(".capslamp");
const backSpaceKey = document.querySelector(".backspace-key");
const ctrlKey = document.querySelector(".ctrl-key");
const altKey = document.querySelector(".alt-key");
const clearAllKey = document.querySelector(".clear-all");
const toggleLang = document.querySelector(".toggle");
const upKey = document.querySelector(".up-key");
const leftKey = document.querySelector(".left-key");
const downKey = document.querySelector(".down-key");
const rightKey = document.querySelector(".right-key");



let mode;
let isUpperCase = false;
let isCapsOn = false;
input.focus();
keyboardContainer.addEventListener("click", function (e) {
  let target = e.target;
  if (target.tagName === "BUTTON" && target.classList.contains("key")) {
    if (target.classList.contains("char")) {
      input.value += target.textContent;
      setData();
      isUpperCase = false;
      updateKeyboard();
      if(isCapsOn){
        upperCase()
        updateIdicator()
      }
      shiftKeys.forEach((e)=>{
        e.classList.remove('clicked')
      })
    } else if (target === spaceKey) {
      addSpace();
      setData();
    } else if (target === tabKey) {
      addLargeSpace();
      setData();
    } else if (target === enterKey) {
      addNewLine();
      setData();
    } else if (target === backSpaceKey) {
      removeLastChar();
      setData();
    }
    else if (target === clearAllKey) {
      clearInput();
      setData();
    }
    e.preventDefault();
  }
});

for (let char of chars) {
  char.setAttribute("current-text", char.textContent);
}
function getData() {
  mode = localStorage.getItem("mode") || "En";
  if (mode === "Ar") {
    for (let char of chars) {
      char.textContent = keyboardChars[char.getAttribute("current-text")];
      char.setAttribute("current-text", char.textContent);
    }
    input.style.direction = "rtl";
    input.setAttribute("placeholder", "أكتب شيئًا");
    toggleLang.textContent = "EN";
  }
  if (sessionStorage.getItem("input")) {
    input.value = sessionStorage.getItem("input");
  }
}
getData();
function languageToggle() {
  if (mode === "En") {
    for (let char of chars) {
      char.textContent = reversedChars[char.getAttribute("current-text")];
      char.setAttribute("current-text", char.textContent);
      input.style.direction = "ltr";
      input.setAttribute("placeholder", "Type anything");
      toggleLang.textContent = "AR";
    }
  } else if (mode === "Ar") {
    for (let char of chars) {
      char.textContent = keyboardChars[char.getAttribute("current-text")];
      char.setAttribute("current-text", char.textContent);
    }
    toggleLang.textContent = "EN";
  }
}

toggleLang.addEventListener("click", () => {
  if (mode === "En") {
    mode = "Ar";
    input.style.direction = "rtl";
    input.setAttribute("placeholder", "أكتب شيئًا");
  } else if (mode === "Ar") {
    mode = "En";
  }
  languageToggle();
  setData();
});

function setData() {
  localStorage.setItem("mode", mode);
  input.addEventListener("focus", function () {
    sessionStorage.setItem("input", `${input.value}`);
  });
}
function addSpace() {
  input.value += " ";
}
function addLargeSpace() {
  input.value += "   ";
}

function addNewLine() {
  input.value += "\n";
}
function removeLastChar() {
  input.value = input.value.slice(0, input.value.length - 1);
}
function clearInput(){
  input.value = ""
}

shiftKeys.forEach((btn) =>{
  btn.addEventListener('click',()=>{
    isUpperCase = !isUpperCase
    shiftKeys.forEach((e)=>{
      e.classList.add('clicked')
    })
    updateKeyboard()
  })
})

function updateKeyboard(){
  for(let char of chars){
    if(mode === "Ar"){
      if(isUpperCase){
        char.textContent = shiftWhenArabic[char.getAttribute("current-text")]
      }else{
        char.textContent = char.getAttribute("current-text");
      }
      
    }
    if(mode === "En"){
      if(isUpperCase){
        char.textContent = shiftWhenEnglish[char.getAttribute("current-text")]
      }else{
        char.textContent = char.getAttribute("current-text");
      }
      
    }
  }
}
capsLockKey.addEventListener('click',()=>{
  
  if(!isCapsOn){
    isCapsOn = ! isCapsOn
    upperCase()
    updateIdicator()
  }else{
    isCapsOn = false
    updateIdicator()
    updateKeyboard()
  }
  
})

function upperCase(){
  for(let char of chars){
    if(mode === "Ar"){
      if(isCapsOn){
        char.textContent = shiftWhenArabic[char.getAttribute("current-text")]
      }else{
        char.textContent = char.getAttribute("current-text");
      }
      
    }
    if(mode === "En"){
      if(isCapsOn){
        char.textContent = shiftWhenEnglish[char.getAttribute("current-text")]
      }
      
    }
  }
}

function updateIdicator(){
  if(isCapsOn){
    capsLamp.style.display = 'inline';
  }
  if(!isCapsOn){
    capsLamp.style.display = 'none';
  }
}