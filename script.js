go();
window.addEventListener('resize', go);

function go(){
    if(document.documentElement.clientWidth < 470) {
        document.querySelector('.std').innerText = "std dev";
    } else {
        document.querySelector('.std').innerText = "Std Deviation";
    }
}

var eurUsd = document.getElementById('myEurUsdChart').getContext('2d');

var eurUsdData = {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['date', 'date'],
        datasets: [{
            label: 'EUR/USD',
            backgroundColor: 'rgba(102, 140, 255, 0.5)',
            borderColor: 'rgb(102, 140, 255)',
            data: [0.1, 0.1]
        }]
    },

    // Configuration options go here
   options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                position: 'right',
                stacked: false,
                gridLines: {
                    display: true,
                }
            }],
            xAxes: [{
                title: {
                    padding: 8
                },
                stacked: true,
                gridLines: {
                    display: true
                }
            }]
        }
    }
}

var gbpUsd = document.getElementById('myGbpUsdChart').getContext('2d');

var gbpUsdData = {
    // The type of chart we want to create
           type: 'line',

    // The data for our dataset
    data: {
        labels: ['date', 'date'],
        datasets: [{
            label: 'GBP/USD',
            backgroundColor: 'rgba(100, 180, 255, 0.5)',
            borderColor: 'rgb(100, 180, 255)',
            data: [0.1, 0.1]
        }]
    },

    // Configuration options go here
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                position: 'right',
                stacked: false,
                gridLines: {
                    display: true,
                }
            }],
            xAxes: [{
                title: {
                    padding: 8
                   },
                stacked: true,
                gridLines: {
                    display: true
                }
            }]
        }
    }
}

var usdChf = document.getElementById('myUsdChfChart').getContext('2d');

var usdChfData = {
    
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['date', 'date'],
        datasets: [{
            label: 'USD/CHF',
            backgroundColor: 'rgba(120, 100, 255, 0.5)',
            borderColor: 'rgb(120, 100, 255)',
                 borderColor: 'rgb(120, 100, 255)',
            data: [0.1, 0.1]
        }]
    },

    // Configuration options go here
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                position: 'right',
                stacked: false,
                gridLines: {
                    display: true,
                }
            }],
            xAxes: [{
                title: {
                    padding: 8
                },
                stacked: true,
                gridLines: {
                    display: true
                }
            }]
         }
    }
}

var myEurUsdChart = new Chart(eurUsd, eurUsdData);

var myGbpUsdChart = new Chart(gbpUsd, gbpUsdData);

var myUsdChfChart = new Chart(usdChf, usdChfData);

var ws_path = 'ws://' + window.location.host + ":8001/ws/currency/";
var socket = new WebSocket(ws_path);

socket.onmessage = function(event){
    var currencies = JSON.parse(event.data);

    // EUR/USD data

    var eurUsdYData = currencies[0].price_list.split(',').map(Number);

    var eurUsdXData = currencies[0].date.split(',');

    eurUsdData.data.datasets[0].data = eurUsdYData;

    eurUsdData.data.labels = eurUsdXData;

    myEurUsdChart.update();
     
    // GBP/USD Data

    var gbpUsdYData = currencies[1].price_list.split(',').map(Number);

    var gbpUsdXData = currencies[1].date.split(',');

    gbpUsdData.data.datasets[0].data = gbpUsdYData;

    gbpUsdData.data.labels = gbpUsdXData;

    myGbpUsdChart.update();

    // USD/CHF data

    var usdChfYData = currencies[2].price_list.split(',').map(Number);

    var usdChfXData = currencies[2].date.split(',');

    usdChfData.data.datasets[0].data = usdChfYData;

    usdChfData.data.labels = usdChfXData;

    myUsdChfChart.update();
    
    // info

    var div_price = document.querySelectorAll('.price');
    var div_percent = document.querySelectorAll('.percent');
    var div_mean = document.querySelectorAll('.mean');
    var div_median = document.querySelectorAll('.median');
    var div_mode = document.querySelectorAll('.mode');
    var div_sdev = document.querySelectorAll('.sdev');

    for (var i = 0; i < div_percent.length; i++) {
        div_price[i].className = ("price");
        div_price[i].classList.add(currencies[i].state);
        div_price[i].innerText = currencies[i].price;
        div_percent[i].className = ("percent");
        div_percent[i].classList.add(currencies[i].state);
        div_percent[i].innerText = currencies[i].percent+"%";
        div_mean[i].innerText = currencies[i].mean;
        div_median[i].innerText = currencies[i].median;
        div_mode[i].innerText = currencies[i].mode;
        div_sdev[i].innerText = currencies[i].sdev;
        }
}                                                         
