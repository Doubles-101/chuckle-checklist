export const retrieveAllJokes = async () => {
    return await fetch('http://localhost:8088/jokes').then(res => res.json())
}