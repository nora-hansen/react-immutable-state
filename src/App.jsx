import { useState } from "react"
import {initialWorkouts, generateWorkout} from "./Workouts.js"
import "./App.css"

// Funciton which creates a new array where the items have the done property as true
const getDoneWorkouts = workouts => workouts.filter(workout => workout.done)

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts)
  const [showDone, setShowDone] = useState(false) // Bool if only done workouts should be rendered or not

  // Add new workout...
  const addNewWorkout = () => {
    /*
    const newWorkout = generateWorkout()
    const newWorkoutList = [...workouts, newWorkout]  // Spreac old array in first, with the new one last
    setWorkouts(newWorkoutList)
    */
   setWorkouts([...workouts, generateWorkout()])
  }

  const deleteWorkout = (workout) => {
    /*
    const newWorkoutList = workouts.filter(
      theWorkout => theWorkout !== workout  // Filters where workout is not equal to the current workout
    )
    setWorkouts(newWorkoutList)
    */
   setWorkouts(workouts.filter(currentWorkout => currentWorkout !== workout))
  }

  const completeWorkout = (workout) => {
    const updatedWorkoutList = workouts.map(
      // If current workout is equal to workout, toggle the done property
      theWorkout => theWorkout === workout ? { ...theWorkout, done: !theWorkout.done} : theWorkout
    )
    setWorkouts(updatedWorkoutList)
  }

  const regenerateWorkout = (workout) => {
    const newWorkout = generateWorkout()
    const updatedWorkoutList = workouts.map(
      theWorkout => theWorkout === workout ? newWorkout : theWorkout
    )
    setWorkouts(updatedWorkoutList)
  }

  // Filtered workouts, initially just all of them
  let filteredWorkouts = [...workouts]

  // If showDone is true, filtered workouts are equal to the filtered list
  if (showDone) filteredWorkouts = getDoneWorkouts(filteredWorkouts)

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      {/* Set showDone to the opposite of its current value */}
      <button onClick={() => setShowDone(!showDone)}>Show Done Only</button> 
      <ul>
        {filteredWorkouts.map((workout, index) => (
          <li key={index}>
            <p>
              {workout.sets}x sets of <strong>{workout.reps}x{workout.exercise}</strong> with {workout.rest} seconds rest
            </p>
            {!workout.done &&
              <button onClick={e=>completeWorkout(workout)}>Done</button>}
            {workout.done &&
              <p>✅</p>}
            <button onClick={e=>deleteWorkout(workout)}>Delete</button>
            <button onClick={e=>regenerateWorkout(workout)}>Regenerate</button>
          </li>
        ))}
      </ul>

    </div>
  )
}

export default App
