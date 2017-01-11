/* globals $ */
/* eslint-env node, dirigible */

var settings = require('kubernetes/settings');
var deploymentsAPI = require('kubernetes/deployments');
var response = require('net/http/response');

var service = deploymentsAPI.delete(settings.server, settings.token, "default", "benefits3");
response.println(JSON.stringify(service));
response.flush();
response.close();
