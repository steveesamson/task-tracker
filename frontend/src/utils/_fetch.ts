import { getInstance } from "../hooks/useSession";

const deriveErrorMessage = (error: any) => {
    return error instanceof Error ? error.message : error.toString();
}
// Decorate with token
const withHeaders = () => {
    const instance = getInstance();

    return {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${instance}`
        }
    };
}
// HTTP methods to interract with API
const get = async (_url: string, params = {}) => {
    const API_HOST = import.meta.env.VITE_API_URL;
    const url = `${API_HOST}${_url}`;
    const _URL = [url, new URLSearchParams(params).toString()].join("?");
    const init = {
        method: "GET",
        mode: 'cors',
        ...withHeaders()
    } as RequestInit;
    try {
        const response = await fetch(_URL, init);
        const status = response.status;
        return { ...await response.json(), status };
    } catch (e) {
        const error = deriveErrorMessage(e);
        console.log(`Error: ${error}`);
        return { error: `There was an HTTP error.`, status: 400 };
    }
}
const post = async (_url: string, params = {}) => {
    const API_HOST = import.meta.env.VITE_API_URL;
    const url = `${API_HOST}${_url}`;
    const init = {
        method: "POST",
        mode: 'cors',
        ...withHeaders(),
        body: JSON.stringify(params)
    } as RequestInit;
    try {
        const response = await fetch(url, init);
        const status = response.status;
        return { ...await response.json(), status };
    } catch (e) {
        const error = deriveErrorMessage(e);
        console.log(`Error: ${error}`);
        return { error: `There was an HTTP error.`, status: 400 };
    }
}
const put = async (_url: string, params = {}) => {
    const API_HOST = import.meta.env.VITE_API_URL;
    const url = `${API_HOST}${_url}`;
    const init = {
        method: "PUT",
        mode: 'cors',
        ...withHeaders(),
        body: JSON.stringify(params)
    } as RequestInit;

    try {
        const response = await fetch(url, init);
        const status = response.status;
        return { ...await response.json(), status };
    } catch (e) {
        const error = deriveErrorMessage(e);
        console.log(`Error: ${error}`);
        return { error: `There was an HTTP error.`, status: 400 };
    }
}

const del = async (_url: string, params = {}) => {
    const API_HOST = import.meta.env.VITE_API_URL;
    const url = `${API_HOST}${_url}`;
    const _URL = [url, new URLSearchParams(params).toString()].join("?");
    const init = {
        method: "DELETE",
        mode: 'cors',
        ...withHeaders(),
    } as RequestInit;
    try {
        const response = await fetch(_URL, init);
        const status = response.status;
        return { ...await response.json(), status };
    } catch (e) {
        const error = deriveErrorMessage(e);
        console.log(`Error: ${error}`);
        return { error: `There was an HTTP error.`, status: 400 };
    }
}

export { get, post, put, del };