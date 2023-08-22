import * as pulumi from "@pulumi/pulumi";
import {
    ApiComponent,
    ContainerComponent
} from "@tazbruce/pulumi-quickstart-library";

// Import the program's configuration settings.
const config = new pulumi.Config();
const environment = pulumi.getStack();
const apiDomain = config.require("apiDomain");
const appUrl = config.require("appUrl");
const imageName = config.require("imageName");
const appPath = config.require("appPath");
const containerPort = config.requireNumber("containerPort");
const cpu = config.require("cpu");
const memory = config.require("memory");
const concurrency = config.requireNumber("concurrency");

const containerComponent = new ContainerComponent(imageName + "-container-" + environment, {
    environment: environment,
    imageName: imageName,
    appPath: appPath,
    memory: memory,
    cpu: cpu,
    containerPort: containerPort,
    concurrency: concurrency
});

// To use the API Gateway component, uncomment the following lines.
// This requires that you have an API Gateway domain configured.
/**
 * const apiComponent = new ApiComponent(imageName + "-api-" + environment, {
 *     environment: environment,
 *     imageName: imageName,
 *     containerUrl: containerComponent.serviceUrl,
 *     appDomain: appUrl,
 *     apiDomain: apiDomain
 * });
 */

// Export the URL of the service.
export const serviceUrl = containerComponent.serviceUrl;

// Export the API Gateway URL.
// export const apiEndpoint = apiComponent.apiEndpoint;


