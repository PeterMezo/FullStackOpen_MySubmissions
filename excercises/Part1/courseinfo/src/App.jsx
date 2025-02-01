const Header = (props) => {
  return(
    <>
    <h1>{props.course.name}</h1>
    </>
  )
}

const Part = (props) => {
  return (
  <>
  <p>{props.course} {props.courseExcercises}</p>
  </>
  )
}

const Content = (props) => {
  return(
    <>
    <Part course={props.parts[0].name} courseExcercises={props.parts[0].exercises}/>
    <Part course={props.parts[1].name} courseExcercises={props.parts[1].exercises}/>
    <Part course={props.parts[2].name} courseExcercises={props.parts[2].exercises}/>
    </>
  )
}

const Total = (props) => {
  let acc = 0
  props.parts.forEach(el => acc += el.exercises)
  console.log(acc)
  const total = acc
  return (
    <>
    <p>Number of exercises {total}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App