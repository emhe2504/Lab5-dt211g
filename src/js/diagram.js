
export function courseDiagram() {
    const options = {
        series: [{
            name: 'Servings',
            data: [44, 55, 41, 67, 22, 43]
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
            categories: ['Apples', 'Oranges', 'Strawberries', 'Pineapples', 'Mangoes', 'Bananas'
            ],
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
                gradientToColors: ['#da3675'],
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