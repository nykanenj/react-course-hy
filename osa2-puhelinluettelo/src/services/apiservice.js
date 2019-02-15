import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development' ? 
    'https://polar-sierra-37503.herokuapp.com/api/persons' : '/api/persons';

const getAll = () => axios.get(baseURL).then(response => response.data);

const create = newObject => axios.post(baseURL, newObject).then(response => response.data);

const remove = id => axios.delete(`${baseURL}/${id}`).then(() => id);

const update = (newObject, id) => axios.put(`${baseURL}/${id}`, newObject).then(response => response.data);


export default {
    getAll,
    create,
    remove,
    update,
}
