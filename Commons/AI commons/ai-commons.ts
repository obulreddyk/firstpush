import { test, expect, request, APIRequestContext } from "@playwright/test";
import config from "../../Config//ui-config.json";
import data from "../../Test-Data/AI/ai.json"

 export class AICommons {
    private requestContext!: APIRequestContext;

    async initializeRequestContext() {
        this.requestContext = await request.newContext();
    }

    // Common method to send a request and get the response.
    async getResponse(model: string, prompt: string): Promise<string> {

        await this.initializeRequestContext();

       const endpoint = config.Ollama.baseurl + config.Ollama.endpoint;

console.log("Base URL:", config.Ollama.baseurl);
console.log("API Endpoint:", config.Ollama.endpoint);
console.log("Final URL:", endpoint);
        const requestBody =data.ollama_basi_body;

        requestBody.model = model;
        requestBody.prompt = prompt;

        console.log(requestBody);

        // Allow slow model generation responses before timing out.
        const response = await this.requestContext.post(endpoint, {
            data: requestBody,
            timeout: 60000
        });

        if (!response.ok()) {
            throw new Error(
                `Ollama request failed (${response.status()}): ${await response.text()}`
            );
        }

        const json = await response.json();
        return json["response"];
    }
}