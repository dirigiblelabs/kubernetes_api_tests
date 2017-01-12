/* globals $ */
/* eslint-env node, dirigible */

var settings = require('kubernetes/settings');
var servicesAPI = require('kubernetes/services');
var response = require('net/http/response');

var namespace = "default";
var serviceName = "benefits2";
var applicationName = "benefits";
var serviceProtocol = "TCP";
var servicePort = 8081;
var serviceTargetPort = 8081;
var serviceType = "NodePort";
var serviceBody = generateServiceBody(serviceName, applicationName, serviceProtocol, servicePort, serviceTargetPort, serviceType);
var answer = servicesAPI.create(settings.server, settings.token, namespace, serviceBody);
response.println(JSON.stringify(answer));
response.flush();
response.close();

function generateServiceBody(name, namespace, application, protocol, port, targetPort, type) {
	return {
	    "kind": "Service",
	    "apiVersion": "v1",
	    "metadata": {
	        "name": name,
	        "namespace": namespace
	    },
	    "spec": {
	        "selector": {
	            "application": application
	        },
	        "ports": [
	            {
	                "protocol": protocol,
	                "port": port,
	        		"targetPort": targetPort
	            }
	        ],
	        "type": type
	    }
	};
}
