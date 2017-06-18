/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');

var main = new UI.Card({
  title: 'Mycroft Ai',
  icon: 'images/myc.png'
});

var ws = new WebSocket('http://192.168.2.110/core');
ws.onopen = function(evt){ console.log("connected!"); };
ws.onopen = function(evt){ console.log("connected!"); };
ws.onmessage = function(evt) { console.log("message: " + JSON.stringify(evt.data)); };
ws.onerror = function(evt) { console.log("error"); };

main.show();

main.on('click', 'select', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Current Weather',
        subtitle: 'Current Weather'
      }, {
        title: 'Joke',
        subtitle: 'Tell me a joke'
      }, {
        title: 'Say Hello',
        subtitle: 'Hello World'
      }]
    }]
  });
  menu.on('select', function(e) {
    var socketmessage = {};
    socketmessage.type = "recognizer_loop:utterance";
    socketmessage.data = {};
    socketmessage.data.utterances = [e.item.subtitle];  
    ws.send(JSON.stringify(socketmessage));
  });
  menu.show();
});
