import axios from "axios";

export const githubApi=axios.create({
    baseURL:"https://api.github.com/repos/facebook/react",
    headers:{Authorization:"Bearer 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"}
})