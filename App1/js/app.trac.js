
function select(channelFunctionPair) {
    var i = 0;
    var channel;
    // Find the index of a non-empty channel
    for (i = 0; i < channelFunctionPair.length; i++) {
        var ch = channelFunctionPair[i][0];
        if (ch.length != 0) { 
            channel = ch;
            break;
        }
    }
    if (channel  == undefined) {
        setImmediate(()=> {select(channelFunctionPair);});
    } else {
        // execute channel, hopefully channel is in closure of machine
        go(channelFunctionPair[i][1]);
    }  
}


function selectforever(channelFunctionPair) {
    var i = 0;
    var channel;
    // Find the index of a non-empty channel
    for (i = 0; i < channelFunctionPair.length; i++) {
        var ch = channelFunctionPair[i][0];
        if (ch.length != 0) { 
            channel = ch;
            break;
        }
    }
    if (channel  == undefined) {
        setImmediate(()=> {selectforever(channelFunctionPair);});
} else {
// execute channel, hopefully channel is in closure of machine
// wrap in callback
    go(channelFunctionPair[i][1]);
    selectforever(channelFunctionPair);
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

selectforever([
    [c, function*(){
        var acc = yield take(c);
        document.getElementById("acceleration").innerHTML = acc;
    }],
    [timer, function*(){
        var tid = yield take(timer);
        document.getElementById("timer").innerHTML = tid;
    }]]);

// Perhaps replicate some of the more interesting examples from golang
// For example timing out a web-request

select([
    [makeTimeout(500), function*(){
        document.getElementById("timeout").innerHTML = yield take(["timed out"]);
        document.getElementById("timeout").innerHTML = yield take(makeTimeout(1000));
        document.getElementById("timeout").innerHTML = "woooow....";
    }],
    [makeTimeout(1000), function*(){
        document.getElementById("timeout").innerHTML = yield take(["and this timed out but it should never"]);
    }]]);



//(function run (){
//    select([
//        [c, function*(){
//            var acc = yield take(c);
//            document.getElementById("acceleration").innerHTML = acc;
//            run();
//        }],
//        [timer, function*(){
//            var tid = yield take(timer);
//            document.getElementById("timer").innerHTML = tid;
//            run();
//        }],
//        [timeOut, function*(){
//            var tid = yield take(timeOut);
//            document.getElementById("timer").innerHTML = "TIMEOUT";
//            document.getElementById("acceleration").innerHTML = "TIMEOUT";
//        }]]);
//    })();

function makeTimeout(delay) {
    var timeOut = [];
    setTimeout( () => {
        go(function* () {
            yield put(timeOut, 'timeout after ' + delay + ' ms');
        });
        },delay);
    return timeOut;
}
 

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