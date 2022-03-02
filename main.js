// variables
const search_bar = document.querySelector('.search-bar');
const search_button = document.querySelector('.search-button')
const main_card = document.querySelector('.main-card');

// funtion to display report
const display_weather = (data,city) =>{

   
    // // variables
    const {temperature : temp } = data;
    const {wind} = data;
    const {description : desc} = data;
    // const {forecast : cast} = data;

    const first_el = document.createElement('div');
    first_el.classList.add('weather');
    first_el.classList.add('loading');
    first_el.id = 'sub-card'
    let  first_el_html = `
             <h2 class="city">weather in ${city}</h2> 
            <h1 class="location_temp">Temperature : ${temp} </h1> 
            <div class="location_wind">Wind : ${wind} kmph</div>
            <div class="location_desc">Comfort Level : ${desc}</div>
    `;
    setTimeout(()=>{
        first_el.classList.remove('loading');
    },200)
    
    first_el.innerHTML += first_el_html;
    main_card.appendChild(first_el);

    // 

}
const remove_weather_report = () =>{
    const weather = document.querySelector('#sub-card');
    if(weather){
        main_card.removeChild(weather)
    }
    return;
}
// function to fetch data -- done
const fetchReport = (city) =>{

    fetch( `https://goweather.herokuapp.com/weather/${city}`)
    .then((response)=>{
        if(!response.ok){
            alert('No weather report found')
            throw new Error('No weather report found')
        }
        return response.json();
    })
    .then((data)=>{
        display_weather(data,city);
    })
    .catch((err)=>{
        console.log(err)
    })
}
// function to search weather report --done
const search = () =>{
    if(!search_bar.value){
        alert('please enter city !');
        return ;
    }
    fetchReport(search_bar.value);
    search_bar.value = '';
}

// EventListners
search_bar
.addEventListener('keydown',(event)=>{
    if(event.key == 'Enter'){
        remove_weather_report();
        search();
    }
})
search_button
.addEventListener('click',(event)=>{
    remove_weather_report();
    search();
})