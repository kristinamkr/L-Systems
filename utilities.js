/* 
* addEvent helper function courtesy of Jon Duckett's JavaScript & JQuery (pg. 571)
*/

function addEvent(el, event, callback) 
{
    if ('addEventListener' in el) {                   // if addEventListener works
        el.addEventListener(event, callback, false);
    } else {                                          // otherwise
        el['e' + event + callback] = callback;        // make callback a method of el
        el[event + callback] = function() {           // add second method
            el['e' + event + callback](window.event); // use it to call prev fcn
        };
        el.attachEvent('on' + event, el[event + callback]); // use attachEvent()
                        // to call the second fcn which then calls the first one
    }
}

// have it return bool value 
function verifyImageData(img)
{
    var data = img.data.filter(function(e) {
        return e !== 0;
    });
    console.log(data);
}
