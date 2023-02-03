import axios from "axios";
const apiKey=import.meta.env.VITE_REACT_API_KEY
console.log(apiKey)
export const githubApi=axios.create({
    baseURL:"https://api.github.com/repos/facebook/react",
    headers:{Authorization:`Bearer ${apiKey}` }
})