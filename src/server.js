import { createServer } from 'http'
import { once } from 'events'
import { randomUUID } from 'crypto'
const Database = new Map()

function respondJSON(data, response) {
    return response.end(JSON.stringify(data))
}

async function hanlder(request, response) {
    const { method } = request

    if(method === 'GET') {
        return respondJSON([...Database.values()], response);
    }

    if(method === 'POST') {
        const body = JSON.parse(await once(request, 'data'))
        const id = randomUUID()
        Database.set(id, body)

        return respondJSON({ ok: 1}, response);
    }

    if(method === 'DELETE') {
        return respondJSON({ ok: 1}, response);
    }

    response.end('hello world')
}

export default createServer(hanlder)