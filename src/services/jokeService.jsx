export const postNewJoke = async (joke) => {
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({text: joke, told: false})
    }

    await fetch('http://localhost:8088/jokes', postOptions)
}

export const putToggledJoke = async (joke) => {
    const postOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(joke)
    }

    await fetch(`http://localhost:8088/jokes/${joke.id}`, postOptions)
}

export const deleteJoke = async (joke) => {
    const postOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(joke)
    }

    await fetch(`http://localhost:8088/jokes/${joke.id}`, postOptions)
}