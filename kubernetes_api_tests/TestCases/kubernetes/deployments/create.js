/* globals $ */
/* eslint-env node, dirigible */

var settings = require('kubernetes/settings');
var deploymentsAPI = require('kubernetes/deployments');
var response = require('net/http/response');

var namespace = "default";
var applicationName = "benefits3";
var deploymentProtocol = "TCP";
var containerPort = 8080;
var deploymentReplicas = 1;
var deploymentImage = "docker.io/dirigiblelabs/dirigible-tomcat:latest";
var env = [];
var deploymentBody = generateDeploymentBody(namespace, applicationName, deploymentReplicas, deploymentImage, containerPort, deploymentProtocol, env);
var answer = deploymentsAPI.create(settings.server, settings.token, namespace, deploymentBody);
response.println(JSON.stringify(answer));
response.flush();
response.close();

function generateDeploymentBody(name, namespace, application, replicas, image, containerPort, protocol, env) {
	return {
	    "kind": "Deployment",
	    "apiVersion": "extensions/v1beta1",
	    "metadata": {
	        "name": name,
	        "namespace": namespace,
	        "labels": {
	            "application": application
	        }
	    },
	    "spec": {
	        "replicas": replicas,
	        "selector": {
	            "matchLabels": {
	                "application": application
	            }
	        },
	        "template": {
	            "metadata": {
	                "labels": {
	                    "application": application
	                }
	            },
	            "spec": {
	                "containers": [
	                    {
	                        "name": application,
	                        "image": image,
	                        "ports": [
	                            {
	                                "containerPort": containerPort,
	                                "protocol": protocol
	                            }
	                        ],
	                        "resources": {
	                        	"requests": {
	                        		"cpu": "200m"
	                        	}
	                        },
	                    	"env": env
	                    }
	                ]
	            }
	        }
	    }
	};
}
