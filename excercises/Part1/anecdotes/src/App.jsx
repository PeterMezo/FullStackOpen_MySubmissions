import { useState } from 'react'

//Interactive side
const AnecdoteDisplay = ({selected, votes}) => {
  return(
    <>
      <div>
        <h1 style={{textAlign:"center"}}>Your Daily Anecdote</h1>
        <h2 style={{textAlign:"center"}}>"{selected}"</h2>
        <p>Up votes: {votes}</p>

      </div>
    </>
  )
}
const Switch = ({onClick}) => {
  return(
    <>
        <button onClick={onClick}>Next anecdote</button> 
    </>
  )
}
const Vote = ({onClick}) => {
  return(
    <>
    <button onClick={onClick}>Vote</button>
    </>
  )
}
//Displaying the most popualr anecdote
const PopularAnecdote = ({anecdote, votes}) =>{
  return(
    <>
      <hr/>
      <h1 style={{textAlign:"center"}}>Highest Voted Anecdote</h1>
      <h2 style={{textAlign:"center"}}>{anecdote}</h2>
      <hr/>
      <p>People endorsing: {votes}</p>
    </>
  )
}
//BONUS element: adding new note to the library
const AddAnecdote = ({onClick}) => {
return(
  <>
  <div>
      <span>"<input id="add-anec" type='text'/>"</span>
      <button onClick={() => onClick(document.getElementById("add-anec").value)}>Submit</button>
  </div>
  </>
)
}

//Main
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState( new Array(anecdotes.length).fill(0))
  const [library, setLibrary] = useState(anecdotes)
  const [show, setShow] = useState(false)

  const nextSelected = () => {
    const currAnec = Math.floor(Math.random()*library.length)
    setSelected(currAnec)
  }
  const addVote = () => {
    const newVotes = [...votes]
    newVotes[selected] = votes[selected] + 1
    setShow(true)
    setVotes(newVotes)
  }
  const appendLibrary = (newPiece) => {
    setLibrary(library.concat(newPiece))
  }
  
  if (!show) {
    return(
      <>
    <div style={{ width:"50%", margin:"0 auto"}}>
      <AnecdoteDisplay selected = {library[selected]} votes={votes[selected]} />
    </div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px', gap:"20px" }}>
        <div>
          <Vote onClick={addVote}/>
          <Switch onClick={nextSelected}/>
          <AddAnecdote onClick={appendLibrary}/>
        </div>
      </div>
    </>
    )
  } else {

  const highestVote = Math.max(...votes)
  const popularAnecdote = library[votes.indexOf(highestVote)]


  return (
    <>
    <div style={{ width:"50%", margin:"0 auto"}}>
      <AnecdoteDisplay selected = {library[selected]} votes={votes[selected]} />
      </div>
      <div style={{ width:"50%", margin:"0 auto"}}>
        <Vote onClick={addVote}/>
        <Switch onClick={nextSelected}/>
        <AddAnecdote onClick={appendLibrary}/>
      </div>
    <div>
      <div style={{width:"50%", margin:"0 auto"}}>
        <PopularAnecdote anecdote={popularAnecdote} votes={highestVote}/>
      </div>
    </div>
    </>
  )
}
}

export default App