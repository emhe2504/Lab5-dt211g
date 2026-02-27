
import { courseDiagram } from "./diagram.js";

export async function importCourses() {

    const link = "https://mallarmiun.github.io/Frontend-baserad-webbutveckling/Moment%205%20-%20Dynamiska%20webbplatser/statistik_sokande_ht25.json";

    try {
        const linkData = await fetch(link);
        const jsonData = await linkData.json(); //Hämta data i länk - JSON-text till Javascript-objekt

        diagramInfo(jsonData);
    }

    catch (error) {
        console.error(error);

        const errorPlace = document.getElementById("chart"); //Error-meddelande
        errorPlace.innerHTML = `
        <p>PROBLEM ATT LADDA DIAGRAM-DATA, vänligen testa igen..</p>
        `;
    }
}

function diagramInfo(data) { //Steg 1 - funktion för att fixa fram data till diagram

    const applicants = []; //Hit kommer alla ansökningsantal för kurser

    data.forEach(part => { //För varje "del" i data, gör nedanstående

        const educationType = part.type;
        const applicantsTotal = part.applicantsTotal;

        if (educationType === 'Kurs' || educationType === 'Kurs') {

            applicants.push(applicantsTotal);
        }
        
    });

    const mostApplicants = applicants.sort((a, b) => b - a).slice(0, 6);  //sorterar ut de sex högsta ansökningsantalen på kurser
    courseDiagram(mostApplicants); //Skickar med till diagrammet
}