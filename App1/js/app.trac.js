
function select(selectmap) {
    var i = 0;
    var channel;
    // Find the index of a non-empty channel
    for (i = 0; i < selectmap.length; i++) {
        var ch = selectmap[i][0];
        if (ch.length != 0) { 
            channel = ch;
            break;
        }
    }
    if (channel  == undefined) {
        setImmediate(()=> {select(selectmap);});
    } else {
        // execute channel, hopefully channel is in closure of machine
        go(selectmap[i][1]);
    }  
}


function go2(machine, step) {
  while(!step.done) {
    var arr   = step.value(),
        state = arr[0],
        value = arr[1];
    switch (state) {
      case "park":
        setImmediate(() => { go2(machine, step); });
        return;
        break   ;
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
  return () => {
    if(chan.length == 0) {
      chan.unshift(val);
      return ["continue", null];
    } else {
      return ["park", null];
    }
  };
}

function take(chan) {
  return () => {
    if(chan.length == 0) {
      return ["park", null];
    } else {
      var val = chan.pop();
      return ["continue", val];
    }
  };
}

var c = [];
var timer = [];
var timeOut = [];
var run = function (){
    select([
        [c, function*(){
            var acc = yield take(c);
            document.getElementById("acceleration").innerHTML = acc;
            run();
        }],
        [timer, function*(){
            var tid = yield take(timer);
            document.getElementById("timer").innerHTML = tid;
            run();
        }],
        [timeOut, function*(){
            var tid = yield take(timeOut);
            document.getElementById("timer").innerHTML = "TIMEOUT";
            document.getElementById("acceleration").innerHTML = "TIMEOUT";
        }]]);
    };
run();


(function () {
    var reportInterval = 0;
    var accelerometer;

    var page = WinJS.UI.Pages.define("/default.html", {
        ready: function (element, options) {
            accelerometer = Windows.Devices.Sensors.Accelerometer.getDefault();
            if (accelerometer) {
	            accelerometer.reportInterval = 200;
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

    var i = 0;
    setInterval( () => {
    	go(function* () {
    	    yield put(timer, i++);
    	});
    },76)


    setTimeout( () => {
        go(function* () {
            yield put(timeOut, 99);
        });
    },2500)
})();