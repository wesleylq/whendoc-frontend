import axios from 'axios';

const api = axios.create({
    baseURL:'https://backend-when-doc.herokuapp.com/'
})

const apis = {
     saveUser: (newUser) => api.post("users",newUser),
     loadUsers: () => api.get('users'),
     savePatient: (newPatient) => api.post("paciente/cadastrar",newPatient),
     loadPatients: () => api.get('paciente')
}


export default apis;
