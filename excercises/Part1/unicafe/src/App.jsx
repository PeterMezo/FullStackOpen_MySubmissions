import { useState } from 'react'

//Getting feedback and handling submission
const Button = ({onClick, history, type}) => {
  return(
    <>
    <button onClick={()=>{
      onClick();
      history[0](history[1])
    }}>{type}</button>
    </>
  )
}

const Feedback = ({statePack}) => {
  return (
    <>
      <h1>Your feedback matters</h1>
      <Button onClick={statePack.addGood} history={[statePack.addHistory, "Good"]} type="good"/>
      <Button onClick={statePack.addNeutral} history={[statePack.addHistory, "Neutral"]} type="neutral"/>
      <Button onClick={statePack.addBad} history={[statePack.addHistory, "Bad"]} type="bad"/>   
         
    </>
  )
}

//Displaying results bottom-up structure
const StatisticsLine = ({text, value}) => {
  return(
    <>
      <td>{text}:</td><td>{value}</td>
    </>
  )
}
const AnalysisLine = ({text, value, append}) => {
  return(
    <>
      <td>{text}:</td><td>{value}{append}</td>
    </>
  )
}

const Statistics = ({goodCounter, neutralCounter, badCounter, statPack}) => {

  const checkAvg = isNaN(statPack.avg) ? 0 : statPack.avg
  const checkPos = isNaN(statPack.pos) ? 0 : statPack.pos

  if (statPack.sum == 0){
    return(
      <>
      <h1>Statistics</h1>
        <p>No feedback given yet...</p>
      </>
    )
  } else {

  return(
    <>
    <h1>Statistics</h1>
    <table>
      <tbody>
        <tr>
        <StatisticsLine text={"Good"} value={goodCounter}/>
        </tr>
        <tr>
        <StatisticsLine text={"Neutral"} value={neutralCounter}/>
        </tr>
        <tr>
        <StatisticsLine text={"Bad"} value={badCounter}/>
        </tr>
        <tr>
        <AnalysisLine text={"All"} value={statPack.sum} append=""/>
        </tr>
        <tr>
        <AnalysisLine text={"Average"} value={checkAvg} append="%"/>
        </tr>
        <tr>
        <AnalysisLine text={"Positive"} value={checkPos} append="%"/>
        </tr>
      </tbody>
    </table>
    </>
  )
}
}

//Displaying history
const History = ({history}) => {
  //first randomise history using the Fischer-Yaffle shuffle
    const shuffledHistory = [...history]; 
      for (let i = shuffledHistory.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledHistory[i], shuffledHistory[j]] = [shuffledHistory[j], shuffledHistory[i]];
    }

    const barHeight = history.length == 0 ? "0px" : "100px"
    
  return(
    <>
    <h1>Anonymised, randomised history</h1>
    <div style={{
      width:"500px", 
      height: barHeight,
      display: "flex", 
      flexDirection: "row", 
      justifyContent: "flex-start", 
      flexWrap: "wrap",
      overflowY:"auto"
      }}>
      {shuffledHistory.map((item, index) => {
        const style = {width:"50px", height:"20px", border:"1px solid black", display:"inline", padding:"2px", margin:"2px", alignText:"center", transition:"all 0.1s ease-out"}

        switch(item) {
          case "Good":
            style.color = "green";
            break;
          case "Neutral":
            style.color = "black";
            break;
          case "Bad":
            style.color = "red";
            break;
          default:
            style.color = "black"; // Optional fallback style
        }

         return <div style={style} key={index}>{item}</div>; // Return the div with the style
      })}

    </div>
    </>
  )
}

//Displaying barchart
const Bars = ({pos, neut, neg}) => {

  const posH = `${pos}%`
  const neutH = `${neut}%`
  const negH = `${neg}%`

  console.log(posH)

  return(
    <>
      <h1>Barchart // Good: green, Neutral: grey, Bad: red</h1>
      <div style={{ 
          width: "420px", 
          height: "200px", 
          backgroundColor: "lightgrey", 
          border: "1px solid black", 
          display: "flex", 
          flexDirection: "row", 
          justifyContent: "space-between", 
          alignItems: "flex-end" 
      }}>
        <div style={{width:"130px", backgroundColor:"green", height:posH, transition:"all 1s ease-out"}}></div>
        <div style={{width:"130px", backgroundColor:"grey", height:neutH, transition:"all 1s ease-out" }}></div>
        <div style={{width:"130px", backgroundColor:"red", height:negH, transition:"all 1s ease-out"}}></div>
      </div>
    </>
  )
}

//Main body
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [history, setHistory] = useState([])

  const statPack = {
    sum: good + neutral + bad,
    avg: (good - bad) / (good + neutral + bad),
    pos: (good / (good + bad + neutral)) * 100,
    neut: (neutral / (good + bad + neutral)) * 100,
    neg: 100 - ((good / (good + bad + neutral)) * 100 + (neutral / (good + bad + neutral)) * 100)
  };

  const statePack = {
    addGood: () => setGood(good + 1),
    addNeutral: () => setNeutral(neutral + 1),
    addBad: () => setBad(bad + 1),
    addHistory: (his) => setHistory(history.concat(his))
  }


  return (
    <div>
      <Feedback statePack={statePack}/>
      <Statistics goodCounter={good} neutralCounter={neutral} badCounter={bad} statPack={statPack}/>
      <History history={history}/>
      <Bars pos={Math.floor(statPack.pos)} neut={Math.floor(statPack.neut)} neg={Math.floor(statPack.neg)}/>
    </div>
  )
}

export default App