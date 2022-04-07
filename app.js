import tabOrdreJourSemaine from './getmain.js'; 
//console.log("depuid main js " + tabOrdreJourSemaine)

//declarer un cle pour mettre le lien API
const APIKEY = 'bbf877193f9eb468639faa3c3092c326';

//declarer un variable empty 
let resultaAPI;

//appeler les elements depuis leur class pour le tab en milieux
const temp = document.querySelector('.temp');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');

//appeler les element du tab par heure et temperature
const heure = document.querySelectorAll('.heure');
const temper = document.querySelectorAll('.temper');

//apeler les jour de la semaine
const jour = document.querySelectorAll('.jour');
const semaine = document.querySelectorAll('.semaine');

//appeler l'icone
const imgIcone = document.querySelector('.img_icone');

//appeler icone de chargement
const logoChargenment = document.querySelector('.overlay_chargement');

//appeller la methode getCurrentPosition() avec la geolocation
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        let lat = position.coords.latitude;
        let long =position.coords.longitude;
        appelAPI(lat, long);
    })
}

//creez une function pour appeler l'API
function appelAPI(lat, long) {
     fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&lang=fr&exclude=minutely&appid=${APIKEY}`)
     .then(reponse => {
         return reponse.json();
     })
     .then(data => {
         resultaAPI = data;
         //console.log(resultaAPI);

         temp.innerText = resultaAPI.current.weather[0].description;
         temperature.innerText = `${Math.trunc(resultaAPI.current.temp)}°`;
         localisation.innerText = resultaAPI.timezone;

// prendre tout les heure 
         let heureActuelle = new Date().getHours();

         for(let i = 0; i < heure.length; i++) {
             
            let heureIncrement = heureActuelle + i * 3;
             
            if(heureIncrement > 24) {
                  heure[i].innerText = `${heureIncrement - 24} H`;
            }else if (heureIncrement === 24) {
                  heure[i].innerText = "00 H";
            }else {
                  heure[i].innerText = `${heureIncrement} H`;
            }
        }

//prendre la temprerature
         for(let j = 0; j < temper.length; j++) {
             temper[j].innerText = `${Math.trunc(resultaAPI.hourly[j * 3].temp)} °`;
         }

//les troie premier lettre du jour
        for(let k = 0; k < tabOrdreJourSemaine.length; k++) {
             jour[k].innerText = tabOrdreJourSemaine[k].slice(0, 3);
        }

//les temperature de chaque jour des
        for(let m = 0; m < 7; m++) {
            semaine[m].innerText = `${Math.trunc(resultaAPI.daily[m + 1].temp.day)} °`;
        }

//icone dynamique
        if(heureActuelle >= 6 || heureActuelle < 21 ) {
            imgIcone.src = `resources/jour/${resultaAPI.current.weather[0].icon}.svg`;
        }else {
             imgIcone.src = `resources/nuit/${resultaAPI.current.weather[0].icon}.svg`;
        }

//logo de chargement 
        logoChargenment.classList.add('show');


     })
}


