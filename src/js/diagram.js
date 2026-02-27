
export function courseDiagram(mostApplicants, courses) {
    const options = {
        series: [{
            name: 'Servings',
            data: mostApplicants
        }],
        chart: {
            height: 350,
            width: 700,
            type: 'bar',
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                columnWidth: '50%',
            }
        },
        colors: ['pink', 'pink'],
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
}