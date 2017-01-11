/* globals $ */
/* eslint-env node, dirigible */

var settings = require('kubernetes/settings');
var deploymentsAPI = require('kubernetes/deployments');
var response = require('net/http/response');

var list = deploymentsAPI.list(settings.server, settings.token, "default");
response.println(JSON.stringify(list));
response.flush();
response.close();
