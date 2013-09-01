function go2(machine$2, step$3) {
    while (!step$3.done) {
        var arr$4 = step$3.value(), state$5 = arr$4[0], value = arr$4[1];
        switch (state$5) {
        case 'park':
            setTimeout(function () {
                go2(machine$2, step$3);
            }, 0);
            return;
            break;
        case 'continue':
            step$3 = machine$2.next(value);
            break;
        default:
            break;
        }
    }
}
function go(machine$6) {
    var gen$7 = machine$6();
    go2(gen$7, gen$7.next());
}
function put(chan$8, val$9) {
    return function () {
        if (chan$8.length == 0) {
            chan$8.unshift(val$9);
            return [
                'continue',
                null
            ];
        } else {
            return [
                'park',
                null
            ];
        }
    };
}
function take2(chan$10) {
    return function () {
        if (chan$10.length == 0) {
            return [
                'park',
                null
            ];
        } else {
            var val$11 = chan$10.pop();
            return [
                'continue',
                val$11
            ];
        }
    };
}
var c$0 = [];
'function*';
go(function () {
    while (true) {
        var val$13 = take2(f);
        document.getElementById('acceleration').innerHTML = val$13;
    }
});
(function () {
    var reportInterval$14 = 0;
    var accelerometer$15;
    var page$16 = WinJS.UI.Pages.define('/default.html', {ready: function (element$17, options$18) {
                accelerometer$15 = Windows.Devices.Sensors.Accelerometer.getDefault();
                if (accelerometer$15) {
                    var minimumReportInterval$19 = accelerometer$15.minimumReportInterval;
                    reportInterval$14 = minimumReportInterval$19 > 16 ? minimumReportInterval$19 : 16;
                    accelerometer$15.reportInterval = reportInterval$14;
                    accelerometer$15.addEventListener('readingchanged', onDataChanged);
                } else {
                    WinJS.log && WinJS.log('No accelerometer found', 'sample', 'error');
                }
            }});
    function onDataChanged(e$20) {
        var reading$21 = e$20.reading;
        var xvalue$22 = reading$21.accelerationX.toFixed(2);
        go(function () {
            put(c$0, xvalue$22);
        });
    }
}());