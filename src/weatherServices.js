export async function getData({city,units}){
    const response =await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f1fdf851066634b9f7232b4759637d73&units=${units}`)
    if(response.ok) return response.json();
    console.log(response);
    throw response;
}