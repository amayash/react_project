import axios from 'axios'

function toJSON(data) {
    const jsonObj = {};
    const fields = Object.getOwnPropertyNames(data);
    for (const field of fields) {
        if (data[field] === undefined) {
            continue;
        }
        jsonObj[field] = data[field];
    }
    return jsonObj;
}

export default class Service {
    static dataUrlPrefix = 'http://localhost:8079/';

    static async readAll(url) {
        const response = await axios.get(this.dataUrlPrefix + url);
        return response.data;
    }

    static async read(url) {
        const response = await axios.get(this.dataUrlPrefix + url);
        return response.data;
    }

    static async create(url, data) {
        const response = await axios.post(this.dataUrlPrefix + url, toJSON(data)).catch((error) => {
            throw(error)
        });
        return response.data;
    }

    static async update(url, data) {
        const response = await axios.put(this.dataUrlPrefix + url, toJSON(data));
        return response.data;
    }

    static async delete(url) {
        const response = await axios.delete(this.dataUrlPrefix + url);
        return response.data.id ? response.data.id : response.error;
    }
}