import Axios from 'axios'

const axios = Axios.create({
    baseURL: process.env.ххххххххххх,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true,
})

export default axios
