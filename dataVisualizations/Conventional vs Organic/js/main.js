Plotly.d3.csv("../../dataMining/avocado-with-regions.csv", function(err, rows){
    function unpack(rows, key, region) {
        var array = new Array(2);
        array[0] = 0;
        array[1] = 0;
        for(var x = 0; x < rows.length; x++) {
            if (rows[x]['region'] == region) {
                if(rows[x][key] == 'conventional')
                {
                    array[0] += parseInt(rows[x]['Total Bags'], 10);
                }
                else {
                    array[1] += parseInt(rows[x]['Total Bags'], 10);
                }
            }
        }
        var total = array[0] + array[1];
        array[0] = array[0] / total * 100.0;
        array[1] = array[1] / total * 100.0;
        return array;
    }
    var allLabels = ['GreatLakes', 'Midsouth', 'Northeast', 'NorthernNewEngland', 'Plains', 'SouthCentral', 'Southeast', 'TotalUS', 'West', 'WestTexNewMexico'];

    var allValues = new Array(10);
    for(var x = 0; x < 10; x++)
    {
        allValues[x] = unpack(rows, 'type', allLabels[x]);
    }

    var ultimateColors = [
        ['rgb(85,207,60)', 'rgb(36,57,28)'],
        ['rgb(85,207,60)', 'rgb(36,57,28)'],
        ['rgb(85,207,60)', 'rgb(36,57,28)'],
        ['rgb(85,207,60)', 'rgb(36,57,28)']
    ];

    var actualLabels = ['Conventional', 'Organic'];
    var data = new Array(10);
    for(var cnt = 0; cnt < 10; cnt++)
    {
        data[cnt] = {
            values: allValues[cnt],
            labels: actualLabels,
            type: 'pie',
            name: allLabels[cnt],
            marker: {
                colors: ultimateColors[0]
            },
            domain: {
                row: 0,
                column: 0
            },
            hoverinfo: 'label+percent+name',
            textinfo: 'none'
        }
    }

    data[0].domain = {
        row: 0,
        column: 0
    }
    data[1].domain = {
        row: 0,
        column: 1
    }
    data[2].domain = {
        row: 0,
        column: 2
    }
    data[3].domain = {
        row: 1,
        column: 0
    }
    data[4].domain = {
        row: 1,
        column: 1
    }
    data[5].domain = {
        row: 1,
        column: 2
    }
    data[6].domain = {
        row: 2,
        column: 0
    }
    data[7].domain = {
        row: 3,
        column: 1
    }
    data[8].domain = {
        row: 2,
        column: 1
    }
    data[9].domain = {
        row: 2,
        column: 2
    }

    var annotations = new Array(10);
    for(var c = 0; c < 10; c++)
    {
        annotations[c] = {
            font: {
                size: 20
            },
            showarrow: false,
            text: allLabels[c],
            x: 0.17,
            y: 0.5
        }
    }

    //['GreatLakes', 'Midsouth', 'Northeast', 'NorthernNewEngland', 'Plains', 'SouthCentral', 'Southeast', 'TotalUS', 'West', 'WestTexNewMexico']
    annotations[0].x = 0.2;
    annotations[0].y = 1;
    annotations[1].x = 0.6;
    annotations[1].y = 1;
    annotations[2].x = 1;
    annotations[2].y = 1;
    annotations[3].x = 0.2;
    annotations[3].y = 0.75;
    annotations[4].x = 0.6;
    annotations[4].y = 0.75;
    annotations[5].x = 1;
    annotations[5].y = 0.75;
    annotations[6].x = 0.2;
    annotations[6].y = 0.45;
    annotations[7].x = 0.6;
    annotations[7].y = 0.15;
    annotations[8].x = 0.6;
    annotations[8].y = 0.45;
    annotations[9].x = 1;
    annotations[9].y = 0.5;

    var layout = {
        title: "Conventional vs Organic by Region",
        showlegend: true,
        grid: {rows: 4, columns: 3},
        height: 750,
        annotations: annotations
    };

    Plotly.newPlot('myDiv', data, layout, {showSendToCloud:true});
})