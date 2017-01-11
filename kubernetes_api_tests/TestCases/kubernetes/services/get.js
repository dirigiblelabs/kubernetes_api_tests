/* globals $ */
/* eslint-env node, dirigible */

var settings = require('kubernetes/settings');
var servicesAPI = require('kubernetes/services');
var response = require('net/http/response');

var service = servicesAPI.get(settings.server, settings.token, "default", "benefits");
response.println(JSON.stringify(service));
response.flush();
response.close();
