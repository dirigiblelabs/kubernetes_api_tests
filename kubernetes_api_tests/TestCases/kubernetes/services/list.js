/* globals $ */
/* eslint-env node, dirigible */

var settings = require('kubernetes/settings');
var servicesAPI = require('kubernetes/services');
var response = require('net/http/response');

var list = servicesAPI.list(settings.server, settings.token, "default");
response.println(JSON.stringify(list));
response.flush();
response.close();
