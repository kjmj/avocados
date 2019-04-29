Plotly.d3.csv("../../dataMining/avocado-with-regions.csv", function(err, rows){

    function unpack(rows, key, region) {
        var total = 0;
        index = 0;
        for(var cnt = 0; cnt < rows.length; cnt++) {
            if (region == rows[cnt]['region']) {
                total += parseInt(rows[cnt][key], 10);
                index++;
            }
        }
        if(total > 0)
        {
            total /= index;
        }
        return total;
    }

    var regions = ['GreatLakes', 'Midsouth', 'Northeast', 'NorthernNewEngland', 'Plains', 'SouthCentral', 'Southeast', 'West', 'WestTexNewMexico'];
    var prices = new Array(10);
    var bags = new Array(10);
    var total = 0;

    for(var x = 0; x < 10; x++)
    {
        var avgprice = unpack(rows, 'AveragePrice', regions[x]);
        var totalbags = unpack(rows, 'Total Bags', regions[x]);
        prices[x] = avgprice;
        bags[x] = totalbags;
        if(x != 7) {
            total += bags[x];
        }
    }

    var percentages = new Array(10);
    for(var x = 0; x < 10; x++)
    {
        if(x == 7)
        {
            percentages[x] = 1.0;
        }
        else
        {
            percentages[x] = bags[x] / total;
        }
    }

    var trace1 = {
        x: regions,
        y: prices,//price,
        text: ['GreatLakes<br>percentage of total US: ' + percentages[0], 'Midsouth<br>percentage of total US: ' + percentages[1], 'Northeast<br>percentage of total US: ' + percentages[2], 'NorthernNewEngland<br>percentage of total US: ' + percentages[3], 'Plains<br>percentage of total US: ' + percentages[4], 'SouthCentral<br>percentage of total US: ' + percentages[5], 'Southeast<br>percentage of total US: ' + percentages[6], 'TotalUS<br>percentage of total US: ' + percentages[7], 'West<br>percentage of total US: ' + percentages[8], 'WestTexNewMexico<br>percentage of total US: ' + percentages[9]],
        mode: 'markers',
        marker: {
            size: bags,//x_axis,
            sizeref: 75.0,
            sizemode: 'area',
            color: '#33cc33'
        }
    };

    var data = [trace1];

    var layout = {
        title: 'Region vs Average Price vs Total Number of Bags Sold',
        xaxis: {title: "Region"},
        yaxis: {title: "Average Price"},
        showlegend: false,
        height: 700,
        width: 1500
    };

    Plotly.newPlot('myDiv', data, layout);
})