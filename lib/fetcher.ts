import axios from 'axios'

const fetcher = (url: string) => axios.get(url).then((res)=> {
    
    res.data; 
    return res.data
})

export default fetcher