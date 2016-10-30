'use strict';

console.log('Loading function');

var PubNub = require('pubnub');

exports.handler = (event, context, callback) => {
	var pubnub = new PubNub({
	    publishKey : 'pub-c-82772049-53f1-4515-8458-65e353717814',
	    subscribeKey : 'sub-c-1ac7aae8-9ea9-11e6-a0c0-0619f8945a4f'
	});
	   
	function publishSampleMessage() {
	    var publishConfig = {
	        channel : "hello_world",
	        message : "Hello from PubNub Docs!"
	    }
	    pubnub.publish(publishConfig, function(status, response) {
	        console.log(status, response);
	    })
	}

	publishSampleMessage();
};
