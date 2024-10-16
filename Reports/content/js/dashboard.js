/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 87.5, "KoPercent": 12.5};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.68125, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "Delete User"], "isController": false}, {"data": [0.3, 500, 1500, "Visit Perftractor - Handling Cache-4"], "isController": false}, {"data": [1.0, 500, 1500, "Get List of Users"], "isController": false}, {"data": [0.9, 500, 1500, "Visit Perftractor - Handling Cache-2"], "isController": false}, {"data": [1.0, 500, 1500, "Visit Perftractor - Handling Cache-3"], "isController": false}, {"data": [0.95, 500, 1500, "Visit Perftractor - Handling Cache-0"], "isController": false}, {"data": [0.5, 500, 1500, "Login"], "isController": false}, {"data": [0.75, 500, 1500, "Visit Perftractor - Handling Cache-1"], "isController": false}, {"data": [0.05, 500, 1500, "Visit Perftractor - Handling Cache"], "isController": false}, {"data": [1.0, 500, 1500, "Partially Update User"], "isController": false}, {"data": [0.0, 500, 1500, "Endpoint Is Incorrect"], "isController": false}, {"data": [1.0, 500, 1500, "Create User"], "isController": false}, {"data": [1.0, 500, 1500, "Update User"], "isController": false}, {"data": [1.0, 500, 1500, "Create User - Using CSV"], "isController": false}, {"data": [0.0, 500, 1500, "Create User Randomly"], "isController": false}, {"data": [0.45, 500, 1500, "Visit Bing - Handling Cookies "], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 160, 20, 12.5, 637.9312500000002, 46, 3657, 350.5, 1293.3000000000004, 2542.1499999999955, 3642.97, 16.563146997929607, 1586.432251229296, 5.104004917184265], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Delete User", 10, 0, 0.0, 351.9, 343, 380, 348.0, 378.2, 380.0, 380.0, 22.026431718061676, 17.122109030837002, 5.097914372246696], "isController": false}, {"data": ["Visit Perftractor - Handling Cache-4", 10, 0, 0.0, 1332.0, 616, 2028, 1301.0, 1999.7, 2028.0, 2028.0, 4.878048780487805, 1835.861280487805, 1.1432926829268293], "isController": false}, {"data": ["Get List of Users", 10, 0, 0.0, 345.6, 340, 352, 343.5, 352.0, 352.0, 352.0, 28.409090909090907, 52.46249112215909, 6.103515625], "isController": false}, {"data": ["Visit Perftractor - Handling Cache-2", 10, 0, 0.0, 285.9, 149, 655, 225.5, 642.0, 655.0, 655.0, 6.578947368421052, 516.9228001644736, 1.567639802631579], "isController": false}, {"data": ["Visit Perftractor - Handling Cache-3", 10, 0, 0.0, 92.80000000000001, 46, 328, 62.0, 309.00000000000006, 328.0, 328.0, 13.071895424836601, 71.64011437908496, 3.1658496732026142], "isController": false}, {"data": ["Visit Perftractor - Handling Cache-0", 10, 0, 0.0, 291.2, 149, 563, 183.5, 553.9000000000001, 563.0, 563.0, 6.8493150684931505, 169.1125321061644, 1.4313998287671232], "isController": false}, {"data": ["Login", 10, 0, 0.0, 923.0999999999999, 509, 1226, 947.5, 1224.0, 1226.0, 1226.0, 8.097165991902834, 6.847798582995951, 2.3326796558704452], "isController": false}, {"data": ["Visit Perftractor - Handling Cache-1", 10, 0, 0.0, 579.0, 165, 1300, 453.0, 1277.2, 1300.0, 1300.0, 7.686395080707148, 1246.3144336087626, 1.7789801114527288], "isController": false}, {"data": ["Visit Perftractor - Handling Cache", 10, 0, 0.0, 2912.7, 1226, 3657, 3071.0, 3654.7, 3657.0, 3657.0, 2.536783358701167, 1641.908255644343, 2.9306784309994924], "isController": false}, {"data": ["Partially Update User", 10, 0, 0.0, 343.3999999999999, 338, 355, 343.0, 354.1, 355.0, 355.0, 25.839793281653744, 23.720122739018088, 7.797359496124031], "isController": false}, {"data": ["Endpoint Is Incorrect", 10, 10, 100.0, 357.50000000000006, 340, 429, 352.0, 421.6, 429.0, 429.0, 21.73913043478261, 164.63569972826087, 4.39453125], "isController": false}, {"data": ["Create User", 10, 0, 0.0, 347.2, 341, 358, 346.0, 357.6, 358.0, 358.0, 27.932960893854748, 25.638857367318437, 8.1289280726257], "isController": false}, {"data": ["Update User", 10, 0, 0.0, 347.4, 339, 357, 347.0, 356.5, 357.0, 357.0, 25.773195876288657, 23.482804445876287, 7.550740979381443], "isController": false}, {"data": ["Create User - Using CSV", 10, 0, 0.0, 348.3, 340, 364, 345.5, 363.2, 364.0, 364.0, 26.954177897574127, 24.44564942722372, 7.443985849056604], "isController": false}, {"data": ["Create User Randomly", 10, 10, 100.0, 348.7, 340, 360, 349.5, 359.5, 360.0, 360.0, 26.31578947368421, 24.534847861842106, 7.915296052631579], "isController": false}, {"data": ["Visit Bing - Handling Cookies ", 10, 0, 0.0, 1000.2, 600, 1848, 990.5, 1779.3000000000002, 1848.0, 1848.0, 5.277044854881266, 1173.529745217678, 1.164660290237467], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["404/Not Found", 10, 50.0, 6.25], "isController": false}, {"data": ["Test failed: headers expected to contain /Md. Niaz Morshed/", 10, 50.0, 6.25], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 160, 20, "404/Not Found", 10, "Test failed: headers expected to contain /Md. Niaz Morshed/", 10, "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Endpoint Is Incorrect", 10, 10, "404/Not Found", 10, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Create User Randomly", 10, 10, "Test failed: headers expected to contain /Md. Niaz Morshed/", 10, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
