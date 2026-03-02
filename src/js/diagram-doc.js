
/**
 * Fetchar antagningsstatistik från länk med JSON-data och skickar till diagramfunktioner
 */

async function importCourses() {

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
        errorPlace.innerHTML = `<p>PROBLEM ATT LADDA DIAGRAM-DATA, vänligen testa igen..</p>`;

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


/**
 * Skapar stapeldiagram med sex mest sökta kurser
 * @param {number[]} mostApplicants - ansökningsantal för kurserna
 * @param {string[]} courses - sex mest sökta kurserna
 */

function courseDiagram(mostApplicants, courses) {

    const options = {
        series: [{
            name: 'Total applicants',
            data: mostApplicants
        }],
        chart: {
            height: 900,
            width: 700,
            type: 'bar'
        },
        responsive: [
            {
                breakpoint: 1024,
                options: {
                    chart: {
                        width: 500,
                        height: 850
                    }
                }
            },
            {
                breakpoint: 850,
                options: {
                    chart: {
                        width: 400,
                        height: 750
                    },
                    xaxis: {
                        labels: {
                            style: {
                                fontSize: '10px'
                            },
                        }
                    }
                }
            },
            {
                breakpoint: 700,
                options: {
                    chart: {
                        width: 350,
                        height: 700
                    }
                }
            },
            {
                breakpoint: 500,
                options: {
                    chart: {
                        width: 320,
                        height: 700
                    }
                }
            }
        ],
        plotOptions: {
            bar: {
                borderRadius: 10,
                columnWidth: '50%',
            }
        },
        colors: ['#df6dbd'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: 0
        },
        grid: {
            show: true,
            padding: {
                left: 0,
                right: 0,
                bottom: 300
            }
        },
        xaxis: {
            labels: {
                rotate: -80,
                style: {
                    fontSize: '12px'
                },
            },
            categories: courses,
            tickPlacement: 'between',
            axisTicks: { show: true },
        },
        yaxis: {
            title: {
                text: 'Antal sökande',
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: "horizontal",
                shadeIntensity: 0.25,
                gradientToColors: ['#f8f3f6'],
                inverseColors: false,
                opacityFrom: 0.75,
                opacityTo: 0.85,
                stops: [0, 100]
            },
        }
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
}

/**
 * Skapar cirkeldiagram med fem mest sökta program
 * @param {number[]} programApplicants - ansökningsantal för programmen
 * @param {string[]} programs - fem mest sökta programmen
 */

function programDiagram(programApplicants, programs) {


    const options = {
        series: programApplicants,
        chart: {
            width: 700,
            type: 'pie',
        },
        labels: programs,
        colors: ["#55031e", "#800830", "#cc104e", "#fa6194", "#ffb8d0"],
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '12px',
                color: ['white']
            }
        },
        legend: {
            labels: {
                style: {
                    fontSize: '12px'
                }
            }
        },
        responsive: [
            {
                breakpoint: 800,
                options: {
                    chart: {
                        width: 400
                    },
                    legend: {
                        position: 'bottom',
                        fontSize: '11px'
                    },
                    dataLabels: {
                        enabled: true,
                        style: {
                            fontSize: '10px',
                        }
                    }
                }
            },
            {
                breakpoint: 900,
                options: {
                    chart: {
                        width: 600
                    }
                }
            }
        ]
    };

    const chartTwo = new ApexCharts(document.querySelector("#chartTwo"), options);
    chartTwo.render();
}