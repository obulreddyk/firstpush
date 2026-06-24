import { test, expect } from '@playwright/test';
import { AICommons } from '../../Commons/AI commons/ai-commons'

test.describe('Ollama API Tests', () => {

    let aiCommons: AICommons;

    test.beforeEach(async () => {
        aiCommons = new AICommons();
    });

    test('Verify model returns response for valid prompt', async () => {

        const response = await aiCommons.getResponse(
            'gemma4:latest',
            'What is Playwright?'
        );

        console.log(response);

        expect(response).toBeTruthy();
        expect(response.length).toBeGreaterThan(0);
    });

    test('Verify model returns response for coding prompt', async () => {

        const response = await aiCommons.getResponse(
            'gemma4:latest',
            'Write a JavaScript function to add two numbers'
        );

        console.log(response);

        expect(response).toContain('function');
    });

});