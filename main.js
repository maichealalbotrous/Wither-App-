let containar = document.querySelector(".containar");
let serch_input = document.querySelector(".input");
let serch_button = document.querySelector(".button");
const apikey= "863242cfb2b1d357e6093d9a4df19a4b";
const apilink="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function showwether(city)
{
    let response = await fetch(apilink+city+`&appid=${apikey}`);
    let data = await response.json();
  
document.querySelector(".h3").innerHTML = data.name;
document.querySelector(".h2").innerHTML = data.main.temp+"c";
document.querySelector(".p1").innerHTML = data.main.humidity+"%";
document.querySelector(".p4").innerHTML = data.wind.speed;

}


serch_button.addEventListener('click',function()
{
    serch_input.value='';
    showwether(serch_input.value);

})   

showwether()