
/**
 * Skapar stapeldiagram med sex mest sökta kurser
 * @param {number[]} mostApplicants - ansökningsantal för kurserna
 * @param {string[]} courses - sex mest sökta kurserna
 */

export function courseDiagram(mostApplicants, courses) {

    const options = {
        series: [{
            name: 'Total applicants',
            data: mostApplicants
        }],
        chart: {
            height: 450,
            width: 700,
            type: 'bar',
        },
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
                right: 0
            }
        },
        xaxis: {
            labels: {
                rotate: -45
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

export function programDiagram(programApplicants, programs) {


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
                color: ['white']
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    const chartTwo = new ApexCharts(document.querySelector("#chartTwo"), options);
    chartTwo.render();
}