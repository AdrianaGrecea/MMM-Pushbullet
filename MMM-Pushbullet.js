var forge = require('node-forge');
var PushBullet = require('pushbullet');

var pusher = new PushBullet('o.xMB61XaFMIbvuwZ2maPXArVYclzXvpG4');

var stream = pusher.stream();
stream.connect();
console.log('Connected to PushBullet stream');
stream.on('push', function(message) {
    
    var message_type = message['type'];
    if (message_type == 'sms_changed') {
    var title = 'Message from ' + message['notifications'][0]['title'];
    var body = message['notifications'][0]['body'];
    }
    if (message_type == 'mirror') {
    var title = message['title'];
    var body = message['body'];
    }

if (typeof title !== 'undefined') {
console.log('Title: ',title);
console.log('Body: ',body);
}

});

stream.on('error', function(error) {
    console.log(error);
});
