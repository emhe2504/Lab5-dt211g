import { courseDiagram } from "./diagram.js";
import { programDiagram } from "./diagram.js";
import { importCourses } from "./diagramFetch.js";
import { createMap } from "./map.js";
import { getSearch } from "./map.js";
import { mapPlace } from "./map.js";

"use strict"

document.addEventListener("DOMContentLoaded", init);

function init() {

    const navigation = document.getElementById("nav-list");
    const menu = document.getElementById("menu"); //Dess ligger här för slippa upprepningar

    getAnswer();
    getMenu(navigation, menu);
    clickMenu(navigation, menu); //skickas med till funktionerna
    click();

    if (document.getElementById("chart")) {
        importCourses();
    }

    if (document.getElementById("map")) {
        createMap();
    }

    window.addEventListener("resize", () => getMenu(navigation, menu)); //skickas även här
}

function getAnswer() {
    const button = document.getElementById("forAnswer");
    const answer = document.getElementById("answer");
    const bubble = document.getElementById("bubble3");
    const letter = document.getElementById("letter");

    if (bubble)
        button.addEventListener("click", () => {
            answer.classList.remove("is_hidden");
            letter.classList.remove("is_hidden");
        })
}

function getMenu(navigation, menu) {

    if (!navigation || !menu) return; //finns dem ej, gör ej

    if (window.innerWidth > 1250) {
        navigation.classList.remove("is_hidden");
        menu.classList.add("is_hidden");
    } else {
        navigation.classList.add("is_hidden");
        menu.classList.remove("is_hidden");
    }
}

function clickMenu(navigation, menu) {

    if (!navigation || !menu) return; //finns dem ej, gör ej

    if (menu) {
        menu.addEventListener("click", () => {

            navigation.classList.toggle("is_hidden"); //toggle nytt för mig, lägger till om klassen ej finns, tar bort om klassen finns
        })
    }
}

function click() {

    const button = document.getElementById("button");

    if (button) {
        button.addEventListener("click", getReaction);
    }

}

function getReaction() {

    const article = document.getElementById("int-art");
    const section = document.getElementById("int-sec");
    const main = document.getElementById("main");

    if (article.classList.contains("is_paused")) {
        article.classList.toggle("is_paused");
    } else {
        article.classList.toggle("is_paused");
    }

    if (section.classList.contains("is_paused")) {
        section.classList.toggle("is_paused");
    } else {
        section.classList.toggle("is_paused");
    }

    if (main.classList.contains("paused")) {
        main.classList.toggle("paused");
    } else {
        main.classList.toggle("paused");
    }
}