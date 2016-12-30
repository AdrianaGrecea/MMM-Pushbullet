/* Magic Mirror
 * Module: MMM-Pushbullet
 */

var NodeHelper = require('node_helper');
var PushBullet = require('pushbullet');

module.exports = NodeHelper.create({
  start: function () {
    console.log('MMM-Pushbullet helper started ...');
  },

  openStream: function(api_key) {
    var self = this;
    try {
        var pusher = new PushBullet(api_key);
        // Just running this portion to validate connectivity
        // to Pushbullet.
        pusher.devices(function(error, response) {
            if (!error) {
                var stream = pusher.stream();
                stream.connect();
                console.log('Connected to Pushbullet stream.');
                stream.on('push', function(message) {
                  console.log('Recieved new push notification.');
                  console.log(message);
                  var message_type = message['type'];
                  if (message_type == 'sms_changed') {
                    var title = message['notifications'][0]['title'];
                    var body = message['notifications'][0]['body'];
                  }
                  if (message_type == 'mirror') {
                    var title = message['title'];
                    var body = message['body'];
                  }
                  if (typeof title !== 'undefined') {
                    console.log('Sending push to client');
                    payload = { title: title, message: body };
                    self.sendSocketNotification('PUSH',payload);
                  }
                });
                stream.on('error', function(error) {
                    console.log('Pushbullet stream error: ',error);
                });
            }else{
                console.log(error);
            }
        });
    }
    catch(err) {
        console.log('Unable to open stream to Pushbullet. ',err);
    }

  },


  //Subclass socketNotificationReceived received.
  socketNotificationReceived: function(notification, payload) {
      if (notification === 'INIT') {
          console.log('Initializing Pushbullet stream.');
          this.openStream(payload);
      }
  }

});