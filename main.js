

let inp = document.getElementById('inp')
let btn = document.getElementById('btn')
let weather = document.getElementById('weather')
let sel = document.getElementById('sel')

async function getgovs() {
  const response = await fetch("governorates.json")
  const data = await response.json()
  for (let i = 0; i < data.length; i++) { sel.innerHTML += `<option>${data[i].governorate_name_en}</option>` }
}

getgovs()

 sel.onchange = function(){
  
  inp.value = sel.value
  
  btn.classList.add('red')

 }

function red() {
  if (inp.value !== '') {
    btn.classList.add('red')
  }else{
    btn.classList.remove('red')
  }
}

btn.onclick = (eo) => {


  weather.innerHTML = `<div class="spinner-border" style="width: 3rem; height: 3rem; margin-left:140px; margin-top:30px;" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`


  let  api = `https://api.openweathermap.org/data/2.5/weather?q=${inp.value}&units=metric&appid=2833809593787779dafc6f8d072c24e2`
  let datac;
  async function get() {

    const response = await fetch(api)


    const data = await response.json()

   
    if (data.message !== 'city not found') {

        console.log(data)
      show(data.main.temp, data.name, data.weather[0].main, data.main.humidity, data.wind.speed,data.sys.country)
    } else {
      weather.innerHTML = '<h4>Sorry this city is not in database yet</h4>'
    }

    datac = data;
  }


  

  inp.value =''
  sel.value = 'select'
  btn.classList.remove('red')

get()
}
function show(temp, name, clarity, humid, speed,country) {


  weather.innerHTML = `
 <h2 style="margin-left:20px; display:inline;">${name}</h2>(${country})
            <h3 style="margin-left:20px;">${temp}°c</h3>
            <div>
                <span>${clarity}</span>
                <span>humidity ${humid}% <i class="fa-solid fa-droplet"></i></i></span>
                <span>Wind speed ${speed}m/s <i class="fa-solid fa-wind"></i></span>
            </div>


 `

}







