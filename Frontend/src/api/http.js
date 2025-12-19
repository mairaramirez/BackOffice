const BASE_URL = 'http://localhost:3000/api';
//const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

export async function http(path, options = {}) {
    const url = `${BASE_URL}${path}`;

    const config = {
        headers: { 'Content-Type': 'application/json' },
        ...options
    };

    if (config.body && typeof config.body !== 'string') {
        config.body = JSON.stringify(config.body);
    }

    const res = await fetch(url, config);

    if (!res.ok) {
        const message = await res.text();
        throw new Error(`HTTP ${res.status}: ${message}`);
    }

    return res.json();
}
