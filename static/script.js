BASEURL = "http://192.168.1.71:5000/";
/**
 * Adds a workout set to the SQL table.
 * @param {string} workout name of workout.
 * @param {string} setNum set number of workout.
 * @param {string} reps amount of reps performed in the set.
 * @param {string} weight amount of weight performed in set.
 * @param {string} date the date when the set was performed. Use -1 for today.
 * @returns 
 */
async function postWorkout(workout, setNum, reps, weight, date){
    message = await fetch(BASEURL+"api/workout/add_workout", {
        method:"POST",
        headers:{"Content-Type":"application/json",},
        body: JSON.stringify({"workout":workout, "set":setNum, "reps":reps, "weight":weight, "date":date})
    });
    if (await message.ok){
        return true;
    }
}

// ############### Home Page ###################
//Event Handlers for Edit set buttons
editSetButtons = document.getElementsByName("editSetBtn");
for (i=0;i<editSetButtons.length;i++){
    editSetButtons[i].addEventListener("click",editSetDynamically);
}
//Event Handler for Submit workout button
document.getElementById("main_submit_btn").addEventListener('click', addDynamicWorkout);
/**
 * Add a new workout to the SQL database for the current day
 * @returns 
 */
async function addDynamicWorkout(){
    workout = document.getElementById("dynamic_workout_input_"+this.id).value;
    reps = document.getElementById("dynamic_reps_"+this.id).value;
    weight = document.getElementById("dynamic_weight_"+this.id).value;
    if (reps.value == "" || weight.value =="" || workout.value == ""){
        alert("Please ensure all fields are entered.");
        return;
    }
    if(await postWorkout(workout, "1", reps, weight, "-1")){
        location.reload();
    }
}
// Event Handlers for addDynamicSet
submitSetButtons = document.getElementsByName("submit_set");
for (i = 0; i < submitSetButtons.length; i++){
    submitSetButtons[i].addEventListener('click', addDynamicSet);
}
/**
 * Add a new workout set to the database and append to the page
 */
async function addDynamicSet(){
    workout = this.getAttribute("exercise");
    date = this.getAttribute("date");
    setNum = document.getElementById("addSet"+this.id).value;
    reps = document.getElementById("addReps"+this.id).value;
    weight = document.getElementById("addWeight"+this.id).value;
    newSet = createDynamicSet(setNum, reps, weight);
    if(await postWorkout(workout, setNum, reps, weight, date)){
        document.getElementById("addDynamicSet"+this.id).before(newSet);
        document.getElementById("addSet"+this.id).value = parseInt(setNum) + parseInt(1);
    }
}

document.getElementById("addNewWorkoutToExisting").addEventListener("click", addNewWorkoutToExisting);
/**
 * Add a new exercise to an existing workout
 */
async function addNewWorkoutToExisting(){
    console.log(this.id);
    date = this.getAttribute("date");
    workout = document.getElementById("dynamic_workout_input_"+date).value;
    reps = document.getElementById("dynamic_reps_"+date).value;
    weight = document.getElementById("dynamic_weight_"+date).value;
    if(await postWorkout(workout, "1", reps, weight, date)){
        location.reload();
    }
}
/**
 * Dynamically creates the HTML elements for a set that can be appended to the DOM
 * @param {string} setNumber the set number of this set in the workout
 * @param {string} reps the amount of reps performed for this set
 * @param {string} weight the weight performed for this set
 * @returns a HTML div element with all the set information
 */
function createDynamicSet(setNumber, reps, weight){
    setLabel = document.createElement("label");
    setLabel.innerHTML = "Set " + setNumber;
    setInformation = document.createElement("label");
    setInformation.innerHTML = reps + " Reps x " + weight + " lbs. = " + parseInt(reps)*parseInt(weight) + " Work";
    setDiv = document.createElement("div");
    setDiv.setAttribute("class", "flexColumn");
    setDiv.append(setLabel);
    setDiv.append(setInformation);
    
    setFunctionsDiv = document.createElement("div");
    setFunctionsDiv.setAttribute("class", "flexColumn");
    deleteBtn = document.createElement("button");
    deleteBtn.type="button";
    deleteBtn.innerHTML = "&#10006;";
    deleteBtn.setAttribute("class", "delete_btn");
    editBtn = document.createElement("button");
    editBtn.type="button";
    editBtn.innerHTML = "&#9998;";
    editBtn.setAttribute("class", "edit_btn");
    setFunctionsDiv.append(deleteBtn);
    setFunctionsDiv.append(editBtn);

    masterDiv = document.createElement("div");
    masterDiv.setAttribute("class", "testSetDiv border");
    masterDiv.append(setDiv);
    masterDiv.append(setFunctionsDiv);

    return masterDiv;
}
/** 
* Toggles the visibility the edit set input.
*/
function editSetDynamically(){
    toggleVisibilityById("editSetForm-"+this.id);
    toggleVisibilityById("setItem-"+this.id);
}
/** 
* Toggles visibilty of an element based on id.
* @param {string} id - The id of the element to toggle visibility.
*/
function toggleVisibilityById(id) {
    item = document.getElementById(id);
    if (item.getAttribute("visibility") == "hidden") {
        item.removeAttribute("visibility");
    } else {
        item.setAttribute("visibility", "hidden");
    }
}


/**
 * Delete set from workouts SQL table by database row id.
 */
function deleteSet(id) {
    if (id == null) {
        console.error("Invalid ID: ID is null or undefined");
        alert("Invalid ID: Cannot delete the set.");
        return;
    }
    xhr = new XMLHttpRequest();

    xhr.onload = function (message) {
        document.getElementById("testSet_"+id).remove();
    };

    xhr.onerror = function () {
        alert("An error occurred while trying to delete the set. Please try again.");
    };

    xhr.open("POST", BASEURL + "delete_by_id/" + id);
    xhr.send();
}
