var moment = require('moment');

Plotly.d3.csv("../../dataMining/test.csv", function(err, rows){

    function unpack(rows, key, region) {
        return rows.map(function(row) {
            if(region == row['region'] && row['type'] == 'conventional')
            {
                if(key === 'Date') {
                    moment('2017-06-10T16:08:00').format('MM/DD/YYYY');
                    // d = dateFormat(row[key], "yyyy-mm-dd");
                    console.log(d)
                    return d;
                }
                return row[key];
            }
        });
    }

    var regions = ['GreatLakes', 'Midsouth', 'Northeast', 'NorthernNewEngland', 'Plains', 'SouthCentral', 'Southeast', 'TotalUS', 'West', 'WestTextNewMexico'];
    var data = new Array(10);


    for(var x = 0; x < 10; x++)
    {
        data[x] = {
            type: "scatter",
            name: regions[x],
            mode: "lines",
            x: unpack(rows, 'Date', regions[x]),
            y: unpack(rows, 'AveragePrice', regions[x])
        }
    }

    var layout = {
        title: 'Time vs Average Price per Region',
        xaxis: {
            title: 'Date',
            range: ['2015-01-01', '2018-12-31'],
            type: 'date'
        },
        yaxis: {
            title: 'Average Price',
            autorange: true,
            range: [86.8700008333, 138.870004167],
            type: 'linear'
        },
        height: 720,
        width: 1500
    };

    Plotly.newPlot('myDiv', data, layout);
})