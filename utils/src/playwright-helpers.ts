import { Page, Response } from "@playwright/test";




export function getCredentialsForApp(): { email: string; password: string; } {
    if (!process.env.EMAIL || !process.env.PASSWORD) {
        throw new Error('Missing Email and Password for enviornment variables');
    }
    return {
        email: process.env.EMAIL,
        password: process.env.PASSWORD
    };
}

export async function waitForSuccessFulResponse(page: Page): Promise<Response> {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error("Timeout waiting for dashboard response")), 15000);

        page.on('response', async (res) => {
            if (res.url().endsWith('/dashboard/index') && res.status() === 200) { // need to write detail explanation of this line
                resolve(res);
            }
        });
    });
}