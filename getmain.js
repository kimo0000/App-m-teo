const jourSemaine = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];

let aujourdhui = new Date();
let options = {weekday : "long"};

let jourActuelle = aujourdhui.toLocaleDateString("fr-FR", options)
    jourActuelle = jourActuelle.charAt(0).toUpperCase() + jourActuelle.slice(1);
    //console.log(jourActuelle, aujourdhui);

let tabOrdreJourSemaine = jourSemaine.slice(jourSemaine.indexOf(jourActuelle)).concat(jourSemaine.slice(0, jourSemaine.indexOf(jourActuelle)));
//console.log(tabOrdreJourSemaine);

export default tabOrdreJourSemaine;



