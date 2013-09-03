var $__generatorWrap = function(generator) {
  return $traceurRuntime.addIterator({
    next: function(x) {
      switch (generator.GState) {
        case 1:
          throw new Error('"next" on executing generator');
        case 3:
          throw new Error('"next" on closed generator');
        case 0:
          if (x !== undefined) {
            throw new TypeError('Sent value to newborn generator');
          }
        case 2:
          generator.GState = 1;
          if (generator.moveNext(x, 0)) {
            generator.GState = 2;
            return {
              value: generator.current,
              done: false
            };
          }
          generator.GState = 3;
          return {
            value: generator.yieldReturn,
            done: true
          };
      }
    },
    'throw': function(x) {
      switch (generator.GState) {
        case 1:
          throw new Error('"throw" on executing generator');
        case 3:
          throw new Error('"throw" on closed generator');
        case 0:
          generator.GState = 3;
          throw x;
        case 2:
          generator.GState = 1;
          if (generator.moveNext(x, 1)) {
            generator.GState = 2;
            return {
              value: generator.current,
              done: false
            };
          }
          generator.GState = 3;
          return {
            value: generator.yieldReturn,
            done: true
          };
      }
    }
  });
};
function select(channelFunctionPair) {
  var i = 0;
  var channel;
  for (i = 0; i < channelFunctionPair.length; i++) {
    var ch = channelFunctionPair[i][0];
    if (ch.length != 0) {
      channel = ch;
      break;
    }
  }
  if (channel == undefined) {
    setImmediate((function() {
      select(channelFunctionPair);
    }));
  } else {
    go(channelFunctionPair[i][1]);
  }
}
function selectforever(channelFunctionPair) {
  var i = 0;
  var channel;
  for (i = 0; i < channelFunctionPair.length; i++) {
    var ch = channelFunctionPair[i][0];
    if (ch.length != 0) {
      channel = ch;
      break;
    }
  }
  if (channel == undefined) {
    setImmediate((function() {
      selectforever(channelFunctionPair);
    }));
  } else {
    go(channelFunctionPair[i][1]);
    selectforever(channelFunctionPair);
  }
}
function go2(machine, step) {
  while (!step.done) {
    var arr = step.value(), state = arr[0], value = arr[1];
    switch (state) {
      case "park":
        setImmediate((function() {
          go2(machine, step);
        }));
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
  return (function() {
    if (chan.length == 0) {
      chan.unshift(val);
      return ["continue", null];
    } else {
      return ["park", null];
    }
  });
}
function take(chan) {
  return (function() {
    if (chan.length == 0) {
      return ["park", null];
    } else {
      var val = chan.pop();
      return ["continue", val];
    }
  });
}
var c = [];
var timer = [];
var timeOut = [];
selectforever([[c, function() {
  var $that = this;
  var $arguments = arguments;
  var $state = 0;
  var $storedException;
  var $finallyFallThrough;
  var acc;
  var $G = {
    GState: 0,
    current: undefined,
    yieldReturn: undefined,
    innerFunction: function($yieldSent, $yieldAction) {
      while (true) switch ($state) {
        case 0:
          this.current = take(c);
          $state = 1;
          return true;
        case 1:
          if ($yieldAction == 1) {
            $yieldAction = 0;
            throw $yieldSent;
          }
          $state = 3;
          break;
        case 3:
          acc = $yieldSent;
          $state = 5;
          break;
        case 5:
          document.getElementById("acceleration").innerHTML = acc;
          $state = 7;
          break;
        case 7:
          $state = -2;
        case -2:
          return false;
        case -3:
          throw $storedException;
        default:
          throw "traceur compiler bug: invalid state in state machine" + $state;
      }
    },
    moveNext: function($yieldSent, $yieldAction) {
      while (true) try {
        return this.innerFunction($yieldSent, $yieldAction);
      } catch ($caughtException) {
        $storedException = $caughtException;
        switch ($state) {
          default:
            this.GState = 3;
            $state = -2;
            throw $storedException;
        }
      }
    }
  };
  return $__generatorWrap($G);
}], [timer, function() {
  var $that = this;
  var $arguments = arguments;
  var $state = 0;
  var $storedException;
  var $finallyFallThrough;
  var tid;
  var $G = {
    GState: 0,
    current: undefined,
    yieldReturn: undefined,
    innerFunction: function($yieldSent, $yieldAction) {
      while (true) switch ($state) {
        case 0:
          this.current = take(timer);
          $state = 1;
          return true;
        case 1:
          if ($yieldAction == 1) {
            $yieldAction = 0;
            throw $yieldSent;
          }
          $state = 3;
          break;
        case 3:
          tid = $yieldSent;
          $state = 5;
          break;
        case 5:
          document.getElementById("timer").innerHTML = tid;
          $state = 7;
          break;
        case 7:
          $state = -2;
        case -2:
          return false;
        case -3:
          throw $storedException;
        default:
          throw "traceur compiler bug: invalid state in state machine" + $state;
      }
    },
    moveNext: function($yieldSent, $yieldAction) {
      while (true) try {
        return this.innerFunction($yieldSent, $yieldAction);
      } catch ($caughtException) {
        $storedException = $caughtException;
        switch ($state) {
          default:
            this.GState = 3;
            $state = -2;
            throw $storedException;
        }
      }
    }
  };
  return $__generatorWrap($G);
}]]);
select([[makeTimeout(500), function() {
  var $that = this;
  var $arguments = arguments;
  var $state = 0;
  var $storedException;
  var $finallyFallThrough;
  var test;
  var $G = {
    GState: 0,
    current: undefined,
    yieldReturn: undefined,
    innerFunction: function($yieldSent, $yieldAction) {
      while (true) switch ($state) {
        case 0:
          this.current = take(makeTimeout(0));
          $state = 1;
          return true;
        case 1:
          if ($yieldAction == 1) {
            $yieldAction = 0;
            throw $yieldSent;
          }
          $state = 3;
          break;
        case 3:
          test = $yieldSent;
          $state = 5;
          break;
        case 5:
          document.getElementById("timeout").innerHTML = "timed out";
          $state = 7;
          break;
        case 7:
          $state = -2;
        case -2:
          return false;
        case -3:
          throw $storedException;
        default:
          throw "traceur compiler bug: invalid state in state machine" + $state;
      }
    },
    moveNext: function($yieldSent, $yieldAction) {
      while (true) try {
        return this.innerFunction($yieldSent, $yieldAction);
      } catch ($caughtException) {
        $storedException = $caughtException;
        switch ($state) {
          default:
            this.GState = 3;
            $state = -2;
            throw $storedException;
        }
      }
    }
  };
  return $__generatorWrap($G);
}], [makeTimeout(1000), function() {
  var $that = this;
  var $arguments = arguments;
  var $state = 0;
  var $storedException;
  var $finallyFallThrough;
  var test;
  var $G = {
    GState: 0,
    current: undefined,
    yieldReturn: undefined,
    innerFunction: function($yieldSent, $yieldAction) {
      while (true) switch ($state) {
        case 0:
          this.current = take(makeTimeout(0));
          $state = 1;
          return true;
        case 1:
          if ($yieldAction == 1) {
            $yieldAction = 0;
            throw $yieldSent;
          }
          $state = 3;
          break;
        case 3:
          test = $yieldSent;
          $state = 5;
          break;
        case 5:
          document.getElementById("timer").innerHTML = "and this timed out but it should never";
          $state = 7;
          break;
        case 7:
          $state = -2;
        case -2:
          return false;
        case -3:
          throw $storedException;
        default:
          throw "traceur compiler bug: invalid state in state machine" + $state;
      }
    },
    moveNext: function($yieldSent, $yieldAction) {
      while (true) try {
        return this.innerFunction($yieldSent, $yieldAction);
      } catch ($caughtException) {
        $storedException = $caughtException;
        switch ($state) {
          default:
            this.GState = 3;
            $state = -2;
            throw $storedException;
        }
      }
    }
  };
  return $__generatorWrap($G);
}]]);
function makeTimeout(delay) {
  var timeOut = [];
  setTimeout((function() {
    go(function() {
      var $that = this;
      var $arguments = arguments;
      var $state = 0;
      var $storedException;
      var $finallyFallThrough;
      var $G = {
        GState: 0,
        current: undefined,
        yieldReturn: undefined,
        innerFunction: function($yieldSent, $yieldAction) {
          while (true) switch ($state) {
            case 0:
              this.current = put(timeOut, 'timeout after ' + delay + ' ms');
              $state = 1;
              return true;
            case 1:
              if ($yieldAction == 1) {
                $yieldAction = 0;
                throw $yieldSent;
              }
              $state = 3;
              break;
            case 3:
              $state = -2;
            case -2:
              return false;
            case -3:
              throw $storedException;
            default:
              throw "traceur compiler bug: invalid state in state machine" + $state;
          }
        },
        moveNext: function($yieldSent, $yieldAction) {
          while (true) try {
            return this.innerFunction($yieldSent, $yieldAction);
          } catch ($caughtException) {
            $storedException = $caughtException;
            switch ($state) {
              default:
                this.GState = 3;
                $state = -2;
                throw $storedException;
            }
          }
        }
      };
      return $__generatorWrap($G);
    });
  }), delay);
  return timeOut;
}
(function() {
  var reportInterval = 0;
  var accelerometer;
  var page = WinJS.UI.Pages.define("/default.html", {ready: function(element, options) {
      accelerometer = Windows.Devices.Sensors.Accelerometer.getDefault();
      if (accelerometer) {
        accelerometer.reportInterval = 200;
        accelerometer.addEventListener("readingchanged", onDataChanged);
      } else {
        WinJS.log && WinJS.log("No accelerometer found in your machine. Put one in there.", "sample", "error");
      }
    }});
  function onDataChanged(e) {
    var reading = e.reading;
    var xvalue = reading.accelerationX.toFixed(2);
    go(function() {
      var $that = this;
      var $arguments = arguments;
      var $state = 0;
      var $storedException;
      var $finallyFallThrough;
      var $G = {
        GState: 0,
        current: undefined,
        yieldReturn: undefined,
        innerFunction: function($yieldSent, $yieldAction) {
          while (true) switch ($state) {
            case 0:
              this.current = put(c, xvalue);
              $state = 1;
              return true;
            case 1:
              if ($yieldAction == 1) {
                $yieldAction = 0;
                throw $yieldSent;
              }
              $state = 3;
              break;
            case 3:
              $state = -2;
            case -2:
              return false;
            case -3:
              throw $storedException;
            default:
              throw "traceur compiler bug: invalid state in state machine" + $state;
          }
        },
        moveNext: function($yieldSent, $yieldAction) {
          while (true) try {
            return this.innerFunction($yieldSent, $yieldAction);
          } catch ($caughtException) {
            $storedException = $caughtException;
            switch ($state) {
              default:
                this.GState = 3;
                $state = -2;
                throw $storedException;
            }
          }
        }
      };
      return $__generatorWrap($G);
    });
  }
  var i = 0;
  setInterval((function() {
    go(function() {
      var $that = this;
      var $arguments = arguments;
      var $state = 0;
      var $storedException;
      var $finallyFallThrough;
      var $G = {
        GState: 0,
        current: undefined,
        yieldReturn: undefined,
        innerFunction: function($yieldSent, $yieldAction) {
          while (true) switch ($state) {
            case 0:
              this.current = put(timer, i++);
              $state = 1;
              return true;
            case 1:
              if ($yieldAction == 1) {
                $yieldAction = 0;
                throw $yieldSent;
              }
              $state = 3;
              break;
            case 3:
              $state = -2;
            case -2:
              return false;
            case -3:
              throw $storedException;
            default:
              throw "traceur compiler bug: invalid state in state machine" + $state;
          }
        },
        moveNext: function($yieldSent, $yieldAction) {
          while (true) try {
            return this.innerFunction($yieldSent, $yieldAction);
          } catch ($caughtException) {
            $storedException = $caughtException;
            switch ($state) {
              default:
                this.GState = 3;
                $state = -2;
                throw $storedException;
            }
          }
        }
      };
      return $__generatorWrap($G);
    });
  }), 76);
  setTimeout((function() {
    go(function() {
      var $that = this;
      var $arguments = arguments;
      var $state = 0;
      var $storedException;
      var $finallyFallThrough;
      var $G = {
        GState: 0,
        current: undefined,
        yieldReturn: undefined,
        innerFunction: function($yieldSent, $yieldAction) {
          while (true) switch ($state) {
            case 0:
              this.current = put(timeOut, 99);
              $state = 1;
              return true;
            case 1:
              if ($yieldAction == 1) {
                $yieldAction = 0;
                throw $yieldSent;
              }
              $state = 3;
              break;
            case 3:
              $state = -2;
            case -2:
              return false;
            case -3:
              throw $storedException;
            default:
              throw "traceur compiler bug: invalid state in state machine" + $state;
          }
        },
        moveNext: function($yieldSent, $yieldAction) {
          while (true) try {
            return this.innerFunction($yieldSent, $yieldAction);
          } catch ($caughtException) {
            $storedException = $caughtException;
            switch ($state) {
              default:
                this.GState = 3;
                $state = -2;
                throw $storedException;
            }
          }
        }
      };
      return $__generatorWrap($G);
    });
  }), 2500);
})();
