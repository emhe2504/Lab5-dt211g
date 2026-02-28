
import { courseDiagram } from "./diagram.js";
import { programDiagram } from "./diagram.js";

/**
 * Fetchar antagningsstatistik från länk med JSON-data och skickar till diagramfunktioner
 */

export async function importCourses() {

    const link = "https://mallarmiun.github.io/Frontend-baserad-webbutveckling/Moment%205%20-%20Dynamiska%20webbplatser/statistik_sokande_ht25.json";

    try {
        const linkData = await fetch(link);
        const jsonData = await linkData.json(); 

        diagramInfo(jsonData);
        diagramInfoTwo(jsonData);
    }

    catch (error) {
        console.error(error);

        const errorPlace = document.getElementById("chart"); //Error-meddelande
        errorPlace.innerHTML = `
        <p>PROBLEM ATT LADDA DIAGRAM-DATA, vänligen testa igen..</p>
        `;

        const errorPlaceTwo = document.getElementById("chartTwo"); //Error-meddelande
        errorPlaceTwo.innerHTML = `
        <p>PROBLEM ATT LADDA DIAGRAM-DATA, vänligen testa igen..</p>
        `;
    }
}

/**
 * Fixar fram, sorterar och filtrerar data 
 * och skickar till stapeldiagram (courseDiagram)
 * @param {Array<Object>} jsonData - antagningsstatistik från API 
 */

function diagramInfo(jsonData) { 

    const allCourses = jsonData.filter(eachData => eachData.type === 'Kurs' || eachData.type === 'kurs'); //filtrera ut kurser
    const sortedCourses = allCourses.sort((a, b) => b.applicantsTotal - a.applicantsTotal); //flest sökanden först
    const topCourses = sortedCourses.slice(0, 6); //sex mest sökta

    const courses = [];
    const applicants = [];

    topCourses.forEach(course => { //pusha till respektive array
        courses.push(course.name);
        applicants.push(Number(course.applicantsTotal)); //nummer ej sträng
    });


    courseDiagram(applicants, courses);

};

/**
 * Fixar fram, sorterar och filtrerar data 
 * och skickar till cirkeldiagram (programDiagram)
 * @param {Array<Object>} jsonData - antagningsstatistik från API 
 */

function diagramInfoTwo(jsonData) { //Funktion för att fixa fram data till nästa diagram

    const allPrograms = jsonData.filter(eachData => eachData.type === 'Program' || eachData.type === 'program'); //filtrera ut program
    const sortedPrograms = allPrograms.sort((a, b) => b.applicantsTotal - a.applicantsTotal); //flest sökanden först
    const topPrograms = sortedPrograms.slice(0, 5); //fem mest sökta

    const programs = [];
    const programApplicants = [];

    topPrograms.forEach(program => { //pusha till respektive array
        programs.push(program.name);
        programApplicants.push(Number(program.applicantsTotal)); //nummer ej sträng
    });

    programDiagram(programApplicants, programs);

};










/* Nedan är för mitt eget lärande! */

/* Var ej nöjd med min gamla kod. Förstod redan när jag skrev den att göra om till arrayer och arbeta med siffror inte var ett
säkert sätt att arbeta, men hade problem med att nå "part" utanför forEach och arbetade jag i denna fick jag upprepningar.
Googlade, hittade "filter" och förstod att jag kunde sköta filtrering/sorteringen för alla delar och sedan pusha, istället för att dela upp i två delar. */

/* Nedan är min gamla kod "diagramInfo(data)", se ovan är hur jag gjorde om den */


/* 

 function diagramInfo(data) { //Steg 1 - funktion för att fixa fram data till diagram

    const allArrays = [];
    const applicants = []; //Hit kommer alla ansökningsantal för kurser
    const courses = [];

    data.forEach(part => { //För varje "del" i data, gör nedanstående

        const educationType = part.type;
        const applicantsTotal = part.applicantsTotal;

        allArrays.push(Object.values(part)); //Istället för array med objekt, array med arrayer

        if (educationType === 'Kurs' || educationType === 'Kurs') {

            applicants.push(applicantsTotal);
        }

    });

    const mostApplicants = applicants.sort((a, b) => b - a).slice(0, 6);  //sorterar ut de sex högsta ansökningsantalen på kurser

    allArrays.sort((a, b) => b[3] - a[3]); //Sortera alla array i storleksordning (flest sökande - minst sökande)

    allArrays.forEach(array => { //För varje array i allArrays
        const appliNumber = array[3]; //"Ta ut" värdet (totalt antal sökanden)

    if (mostApplicants.includes(appliNumber)) { //Om (totalt antal sökanden) finns i mostApplicants
        courses.push(array[1]); //Pusha motsvarande kursnamn till course
    }

    })

    courseDiagram(mostApplicants, courses); //Skickar arrayer med sex högsta ansökningsantalen respektive sex mest sökta kurser till diagrammet
};

*/