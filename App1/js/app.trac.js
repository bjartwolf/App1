function go2(machine, step) {
  while(!step.done) {
    var arr   = step.value(),
        state = arr[0],
        value = arr[1];

    switch (state) {
      case "park":
        setTimeout(function() { go2(machine, step); },0);
        return;
        break;
      case "continue":
        step = machine.next(value);
        break;
      default:
        break;
    }
  }
}

function go(machine) {
  var gen = machine();
  go2(gen, gen.next());
}

function put(chan, val) {
  return function() {
    if(chan.length == 0) {
      chan.unshift(val);
      return ["continue", null];
    } else {
      return ["park", null];
    }
  };
}

function take(chan) {
  return function() {
    if(chan.length == 0) {
      return ["park", null];
    } else {
      var val = chan.pop();
      return ["continue", val];
    }
  };
}

var c = [];

go(function* () {
	while(true) {
		// infinite loops ftw!
		// just need to build with traceur in node.js to produce valid js...
	    var val = yield take(c);
   	    document.getElementById("acceleration").innerHTML = val;
  }
});


(function () {
    var reportInterval = 0;
    var accelerometer;

    var page = WinJS.UI.Pages.define("/default.html", {
        ready: function (element, options) {
            accelerometer = Windows.Devices.Sensors.Accelerometer.getDefault();
            if (accelerometer) {
                // Select a report interval that is both suitable for the purposes of the app and supported by the sensor.
                // This value will be used later to activate the sensor.
                var minimumReportInterval = accelerometer.minimumReportInterval;
                reportInterval = minimumReportInterval > 16 ? minimumReportInterval : 16;
	            accelerometer.reportInterval = reportInterval;
		        accelerometer.addEventListener("readingchanged", onDataChanged);
            } else {
                WinJS.log && WinJS.log("No accelerometer found in your machine. Put one in there.", "sample", "error");
            }
        },
    });

    function onDataChanged(e) {
    	var reading = e.reading;
    	var xvalue =reading.accelerationX.toFixed(2);
    	go(function* () {
			yield put(c, xvalue);
    	});
    }
})();