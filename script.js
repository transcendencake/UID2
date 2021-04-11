// DOM Elements
const time = document.querySelector('.time'),
  date = document.querySelector('.date'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  quote = document.querySelector('.quote'),
  city = document.querySelector('.city');

const weekDays = new Array("Mon","Tue","Wed","Thu","Fri","Sat","Sun"),
    monthNames = new Array("January","February","March","April","May","June",
      "July","August","September","October","November","December");

let picNum = (new Date()).getHours();

// Show Time
function showDateTime() {
  let today = new Date(),
    week = weekDays[today.getDay()],
    month = monthNames[today.getMonth()],
    day = today.getDate(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  if (min == 0 && sec == 0) setBgGreet();
  // Output Time
  date.innerHTML = `${week}<span>, </span>${day}<span> of </span>${month}`;
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )}`;

  setTimeout(showDateTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  setBg(hour);

  if (hour < 6) {
    greeting.textContent = 'Good night, ';
  } else if (hour < 12) {
    greeting.textContent = 'Good morning, ';
  } else if (hour < 18) {
    greeting.textContent = 'Good afternoon, ';
  } else {
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  }
}
function setBg(hour){
  let imgPath = "assets/images/" + hour +".jpg";
  console.log(imgPath);
  document.body.style.backgroundImage =
      `url('${imgPath}')`;
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      name.blur();
    }
  } else {
    if (e.target.innerText)
      localStorage.setItem('name', e.target.innerText);
    else 
      getName();
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      focus.blur();
    }
  } else {
    if (e.target.innerText)
      localStorage.setItem('focus', e.target.innerText);
    else 
      getFocus();
  }
}

function getCity() {
  if (localStorage.getItem('city') === null) {
    city.textContent = 'Minsk';
  } else {
    city.textContent = localStorage.getItem('city');
  }
}

// Set Focus
function setCity(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      city.blur();
    }
  } else {
    if (e.target.innerText)
    {
      localStorage.setItem('city', e.target.innerText);
      setForecast();
    }
    else 
      getCity();
  }
}

function onFocus(e) {
  e.target.textContent = "";
}

async function setQuote(){
  const url = "https://api.chucknorris.io/jokes/random";
  const result = await fetch(url);
  const data = await result.json();
  quote.innerText = '"' + data.value + '"';
}

async function setForecast(){
  let city;
  if (localStorage.getItem('city') === null)
    city = "Minsk";
  else 
    city = localStorage.getItem('city');
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c8b93e2a98caaa1e8339a0e2dac59dcf`;
  const result = await fetch(url);
  const data = await result.json();
  try {
    let iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.querySelector('.weatherIcon').src = iconUrl;
    document.querySelector('.temp').innerText = data.main.temp + "°";
    document.querySelector('.humidity').innerText = data.main.humidity + "%";
    document.querySelector('.wind').innerText = data.wind.speed + " m/s";
  }
  catch (e) {
    alert("Getting forecast error: " + e.message);
  }  
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('focus', onFocus);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('focus', onFocus);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
city.addEventListener('focus', onFocus);
document.querySelector('.changePic').addEventListener('click',
  () => { 
    picNum = (picNum + 1) % 24;
    setBg(picNum);
   });
document.querySelector('.changeQuote').addEventListener('click',
  () => { 
    setQuote();
   });

// Run
setForecast()
showDateTime();
setBgGreet();
getName();
getFocus();
getCity();
setQuote();