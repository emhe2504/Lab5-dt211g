
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
        colors: ['#F6F09F', 'pink'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: 0
        },
        grid: {
            show: true,
            row: {
                colors: ['#f5b1d8', '#f89fc9']
            },
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
                gradientToColors: ['#db1360'],
                inverseColors: false,
                opacityFrom: 0.85,
                opacityTo: 0.85,
                stops: [0, 100]
            },
        }
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
};


export function programDiagram(programApplicants, programs) {


    const options = {
        series: programApplicants,
        chart: {
            width: 700,
            type: 'pie',
        },
        labels: programs,
        colors: ["#850E35", "#EE6983", "#fda9a9", "#f8e2de", "#FCF5EE"],
        dataLabels: {
            enabled: true,
            style: {
                colors: ['white', 'white', "white", "#850E35", "#850E35"]
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