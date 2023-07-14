const temperatureField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dataField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");
const background = document.querySelector(".container");
// console.log(2);
let target = "Kanpur";
const fetchData = async (target) => {



    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=923b6cd7f2084f8185675854231307&q=${target}`;

        const response = await fetch(url);
        const data = await response.json();

        // console.log(data);
        const { current: { temp_c, condition: { text, icon }, }, location: { name, localtime }, } = data;

        updateDom(temp_c, name, icon, text, localtime);
    }
    catch (error) {
        console.log(error);
        alert("Location not Found");
    }
};
function backgroundCondition(condition) {


    switch (condition) {
        case "Mist":
            background.style.backgroundImage = "url(./Mist.gif)";
            break;
        default:
            background.style.backgroundImage = "url(./Background.png)";

    }
    return;
}

function updateDom(temperature, city, emoji, condition, localtime) {

    temperatureField.innerText = temperature + "°";
    cityField.innerText = city;
    const exactTime = localtime.split(" ")[1];
    const exactDate = localtime.split(" ")[0];
    const exactDay = new Date(exactDate).getDay();

    // console.log(condition);

    emojiField.src = emoji;
    weatherField.innerText = condition;
    dataField.innerText = `${exactDate} - ${getDayFullName(exactDay)}  ${exactTime}`;
    backgroundCondition(condition);

}

function getDayFullName(num) {


    switch (num) {
        case 0:
            return "Sunday";

        case 1:
            return "Monday";
        case 2:
            return "Tuesday";

        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";

        case 5:
            return "Friday";
        case 6:
            return "Saturday";

    }
}
fetchData(target);
function search(e) {
    e.preventDefault();

    target = searchField.value;

    fetchData(target);
}


form.addEventListener("submit", search);
// function search(e) {
//     e.preventDefault();

//     target = searchField.value;
//     // console.log(target);

//     fetchData(target);
// }
// console.log("Hello");
// fetchData();

