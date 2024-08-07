export const sendRequest = async (url, method, config, token) => {
    if (method === 'GET' && token) {
        const responce = await fetch(`http://localhost:4000/api${url}`, {
            method,

            headers: {
                "Authorization": token,
                "Content-Type": "application/json",
            },
        })
        const result = await responce.json()
        return result
    } else if (token) {
        const responce = await fetch(`http://localhost:4000/api${url}`, {
            method,
            headers: {
                "Authorization": token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(config)
        })
        const result = await responce.json()
        return result
    } else if (method === 'GET') {
        const responce = await fetch(`http://localhost:4000/api${url}`, {
            method,

            headers: {
                "Content-Type": "application/json",
            },
        })
        const result = await responce.json()
        return result
    } else {
        const responce = await fetch(`http://localhost:4000/api${url}`, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(config)
        })

        const result = await responce.json()
        return result
    }
}


