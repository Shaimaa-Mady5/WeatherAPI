
const searchInput =document.getElementById('searchCity')
let data = []
// today
const todayDay = document.getElementById('todayDay')
const todayNumber = document.getElementById('todayNumber')
const todayMonth = document.getElementById('todayMonth')
const city =document.getElementById('city')
const todayTemp = document.getElementById('todayTemp')
const todayImg =document.getElementById('todayImg')
const todayDesc = document.getElementById('todayDesc')
const humidity =document.getElementById('humidity')
const windKm =document.getElementById('windKm')
const windDirection =document.getElementById('windDirection')

// tomorrow & after tomorrow
const nextDay =document.getElementsByClassName("next-day")
const nextDayImg =document.querySelectorAll('.next-day-img')
const nextMaxTemp = document.querySelectorAll('.next-temp')
const nextMinTemp = document.querySelectorAll('.next-min-temp')
const nextDescription =document.querySelectorAll('.next-weather-desc')


async function getData(searchCity='london'){
   let response =await fetch(`https://api.weatherapi.com/v1/forecast.json?key=605cb404598341b28b9143132241901&q=${searchCity}&days=3`)
   let data = await response.json()
  if(response.status==200){
    showFunData(data)
  }
}
getData()

function displayData(data){
    const todayDate = new Date()
    todayDay.innerHTML=todayDate.toLocaleDateString("en-us" , {weekday:"long"})
    todayNumber.innerHTML=todayDate.getDate()
    todayMonth.innerHTML=todayDate.toLocaleDateString("en-us" , {month:"long"})
    city.innerHTML=data.location.name
    todayTemp.innerHTML= data.current.temp_c
    todayImg.setAttribute('src' , data.current.condition.icon)
    todayDesc.innerHTML= data.current.condition.text
    humidity.innerHTML= data.current.humidity + "%"
    windKm.innerHTML= data.current.wind_kph + "km/h"
    windDirection.innerHTML = data.current.wind_dir
}

function displayNextDay(nextData){
    const dataArray = nextData.forecast.forecastday
    for(let i=0 ; i<2 ; i++){
        let tomorrowDate =new Date(dataArray[i+1].date)
       nextDay[i].innerHTML=tomorrowDate.toLocaleDateString("en-us" , {weekday:"long"})
        nextDayImg[i].setAttribute("src" , dataArray[i+1].day.condition.icon)
        nextMaxTemp[i].innerHTML = dataArray[i+1].day.maxtemp_c
        nextMinTemp[i].innerHTML = dataArray[i+1].day.mintemp_c
        nextDescription[i].innerHTML= dataArray[i+1].day.condition.text
    }
} 
 

function showFunData(fullaData){
    displayData(fullaData)
    displayNextDay(fullaData)
}

searchInput.addEventListener('input' , function(){
    let searchCity = searchInput.value 
    getData(searchCity)
    console.log(searchCity);
})
