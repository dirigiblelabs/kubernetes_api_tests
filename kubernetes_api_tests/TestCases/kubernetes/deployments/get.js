/* globals $ */
/* eslint-env node, dirigible */

var settings = require('kubernetes/settings');
var deploymentsAPI = require('kubernetes/deployments');
var response = require('net/http/response');

var service = deploymentsAPI.get(settings.server, settings.token, "default", "benefits");
response.println(JSON.stringify(service));
response.flush();
response.close();
