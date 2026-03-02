
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
                        width: 280,
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
                        width: 350
                    },
                    legend: {
                        position: 'bottom',
                        fontSize: '10px'
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