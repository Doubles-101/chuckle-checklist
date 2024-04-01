import { useEffect, useState } from "react"
import "./App.css"
import { deleteJoke, postNewJoke, putToggledJoke } from "./services/jokeService.jsx"
import stevePic from "./assets/steve.png"
import { retrieveAllJokes } from "./services/retrieveAllJokes.jsx"

export const App = () => {
  const [newJoke, setNewJoke] = useState([])
  const [allJokes, setAllJokes] = useState([])
  const [toldJokes, setToldJokes] = useState([])
  const [untoldJokes, setUntoldJokes] = useState([])


  // Use Effects
  useEffect(() => {
    retrieveAllJokes().then((jokeArray) => {
      setAllJokes(jokeArray)
      console.log("Jokes are being set")
    })
  }, [])

  useEffect(() => {
    const toldJokesArray = allJokes.filter(joke => joke.told === true)
    setToldJokes(toldJokesArray)
  }, [allJokes])

  useEffect(() => {
    const untoldJokesArray = allJokes.filter(joke => joke.told === false)
    setUntoldJokes(untoldJokesArray)
  }, [allJokes])


  // Misc functions
  const untoldJokeCounter = () => {
    return untoldJokes.length
  }

  const toldJokeCounter = () => {
    return toldJokes.length
  }

  const submitButtonClicked = () => {
    postNewJoke(newJoke)
    setNewJoke('')
    retrieveAllJokes().then((jokeArray) => {
      setAllJokes(jokeArray)})
  }

  const toggleButtonClicked = (joke) => {
    joke.told = !joke.told
    putToggledJoke(joke)
    retrieveAllJokes().then((jokeArray) => {
      setAllJokes(jokeArray)})
  }

  const deleteButtonClicked = (joke) => {
    deleteJoke(joke)
    retrieveAllJokes().then((jokeArray) => {
      setAllJokes(jokeArray)})
  }

  return (
    <div className="app-container">
      <div className="app-heading">
        <div className="app-heading-circle">
          <img className="app-logo" src={stevePic} alt="Good job Steve" />
        </div>
        <h1 className="app-heading-text">Chuckle Checklist</h1>
      </div>
      <div className="joke-add-form">
        <input
          className="joke-input"
          type="text"
          placeholder="New One Liner"
          value={(newJoke)}
          onChange={(event) => {
            setNewJoke(event.target.value)
          }}
        />
        <button className="joke-input-submit" onClick={submitButtonClicked}>Submit</button>
      </div>
      <div className="joke-lists-container">
        <div className="joke-list-container">
          <h2>Untold Jokes<span className="told-count">{untoldJokeCounter()}</span></h2>
          {untoldJokes.map((joke) => {
            return (
              <li className="joke-list-item">
                <p className="joke-list-item-text">{joke.text}</p>
                <span><div className="joke-list-action-toggle">
                  <button id={joke.id} onClick={() => {toggleButtonClicked(joke)}} >:D</button>
                  <button id={joke.id} onClick={() => {deleteButtonClicked(joke)}} >:X</button>
                </div></span>
              </li>
            )
          })}
        </div>
        <div className="joke-list-container">
          <h2>Told Jokes<span className="told-count">{toldJokeCounter()}</span></h2>
          {toldJokes.map((joke) => {
            return (
              <li className="joke-list-item">
                <p className="joke-list-item-text">{joke.text}</p>
                <span><div className="joke-list-action-toggle">
                 <button id={joke.id} onClick={() => {toggleButtonClicked(joke)}} >:D</button>
                 <button id={joke.id} onClick={() => {deleteButtonClicked(joke)}} >:X</button>
                </div></span>
              </li>
            )
          })}
        </div>
      </div>
    </div>
  )
}