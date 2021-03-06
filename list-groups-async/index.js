'use strict';

const api = require('@avimesa/infra-api-amqp');

const listGroupsAsyncExample = async function() {
	console.log("list-groups-async");

	api.setConnParams({
		hostname: 'queues.avimesacorp.net',
		apiKey: '',
		apiPassword: '',
	});

	const response = await api.listGroupsAsync();

	if (response.err){
		console.log("Error");
	} else {
		for (var i = 0; i < response.groups.length; i++) {
			const g = response.groups[i];
			console.log(g.group_id + " - " + g.acct_id);
		}
	}
};

listGroupsAsyncExample();
