// ################ Add Workout Page #####################
// Everything below may be deleted soon.
// Add a set to the first set in the workout form on add_workout
function addInput() {
    form = document.getElementById('setsDiv');

    newInput = document.createElement('input');
    newWeightInput = document.createElement('input');

    repCount = document.getElementById('count').getAttribute("value");
    document.getElementById('count').setAttribute('value', parseInt(repCount) + 1);

    newInput.type = 'text';
    newInput.name = 'reps' + repCount;
    newInput.id = 'reps' + repCount;
    newInput.required = 'true';
    newInput.placeholder = 'Set ' + repCount + ' reps';

    newWeightInput.type = 'text';
    newWeightInput.name = 'weight' + repCount;
    newWeightInput.id = 'weight' + repCount;
    newWeightInput.required = 'true';
    newWeightInput.placeholder = 'Set ' + repCount + ' weight';

    test = document.createElement("label");
    test.textContent = "Reps";
    test.id = "repsLabel" + repCount;
    test.setAttribute("for", "reps" + repCount);

    form.appendChild(test);
    form.appendChild(document.createTextNode(" "));
    form.appendChild(newInput);
    form.appendChild(newWeightInput);
    newLineBreak = document.createElement("br");
    newLineBreak.id = "br" + repCount;
    form.append(newLineBreak);
    newInput.focus();
    return;
}

// Removes a set from the 1st workout form on add_workout.
function removeInput() {
    repCount = document.getElementById('count').getAttribute("value");
    if (repCount - 2 == 0) {
        return;
    } else {
        inputRemove = document.getElementById('reps' + String(repCount - 1));
        weightRemove = document.getElementById('weight' + String(repCount - 1));
        lineBreakRemove = document.getElementById('br' + String(repCount - 1));
        reps = document.getElementById('repsLabel' + String(repCount - 1));

        countElement = document.getElementById('count');
        countElement.setAttribute("value", repCount - 1);
        console.log(repCount);
        console.log('removeInput() triggered.');
        inputRemove.remove();
        weightRemove.remove();
        lineBreakRemove.remove();
        reps.remove();
    }
}

// Adds a new exercise div to Add Workout page
// Need to work on and add better logic
function addExercise() {
    exerciseForm = document.getElementById("setsDiv");
    exerciseCount = exerciseForm.getAttribute("count");

    exerciseForm.setAttribute("count", String(parseInt(exerciseCount) + 1));
    exerciseCount = exerciseForm.getAttribute("count");
    notesLabel = document.getElementById("notesLabel");

    // Weight input
    newWeightInput = document.createElement("input");
    newWeightInput.placeholder = "Set 1 Reps";
    newWeightInput.name = "reps " + exerciseCount;
    // Reps input
    newRepInput = document.createElement("input");
    newRepInput.placeholder = "Set 1 Weight";
    newRepInput.name = 'weight' + exerciseCount;
    // Add (+) sets button
    newAddSetButton = document.createElement("button");
    newAddSetButton.type = "button";
    newAddSetButton.textContent = "+";
    newAddSetButton.id = "setsDiv" + exerciseCount;
    newAddSetButton.setAttribute("onclick", "addSetForm(this.id)");
    // Remove (-) sets button
    newRemoveSetButton = document.createElement("button");
    newRemoveSetButton.type = "button";
    newRemoveSetButton.textContent = "-";
    newRemoveSetButton.id = "setsDiv" + exerciseCount;
    newRemoveSetButton.setAttribute("onclick", "removeLastSetFromForm(this.id)");
    // Select workout element
    newSelectElement = document.createElement("select");
    newSelectElement.name = "workout " + exerciseCount;
    exerciseOptions = document.getElementById("select_main").getElementsByTagName("option");

    for (var i = 0; i < exerciseOptions.length; i++){
        newOptionWorkoutElement = document.createElement("option");
        newOptionWorkoutElement.text = exerciseOptions[i].text;
        newSelectElement.append(newOptionWorkoutElement);
    }

    // A div to hold everything in
    newDiv = document.createElement("div");
    newDiv.id = "setsDiv" + exerciseCount;
    newDiv.setAttribute("class", "setsDiv border");
    newDiv.setAttribute("count", 1);
    // Then we build into the div
    newDiv.append("Exercise" + exerciseCount);
    newDiv.append(newAddSetButton);
    newDiv.append(newRemoveSetButton);
    newDiv.append(document.createElement("br"));
    newDiv.append(newSelectElement);
    newDiv.append(document.createElement("br"));
    newDiv.append(newWeightInput);
    newDiv.append(newRepInput);

    // newInput.id = exerciseCount;
    newOptionWorkoutElement.id = exerciseCount;
    notesLabel.before(newDiv);

}

/** Add a set to the set div based on the div ID
 * The set form includes an input for weight and reps
 * @param {*} setDivId: this is the ID of the div of which to add the set to
 * 
 */
function addSetForm(setDivId) {
    console.log(setDivId);
    setDiv = document.getElementById(setDivId);
    setCount = parseInt(setDiv.getAttribute("count")) + 1;
    setDiv.setAttribute("count", setCount);
    setCount = setCount.toString();

    newSetDiv = document.createElement("div");
    newSetDiv.id = setDivId + "test" + setCount;

    newRepsInput = document.createElement("input");
    newRepsInput.id = setDivId + "reps" + setCount;
    newRepsInput.name = setDivId + "reps" + setCount;
    newRepsInput.placeholder = "Set " + setCount + " Reps";

    newWeightInput = document.createElement("input");
    newWeightInput.id = setDivId + "weight" + setCount;
    newWeightInput.name = setDivId + "weight" + setCount;
    newWeightInput.placeholder = "Set " + setCount + " Weight";

    newSetDiv.appendChild(newRepsInput);
    newSetDiv.appendChild(newWeightInput);
    setDiv.appendChild(newSetDiv);
    newRepsInput.focus();
}
/** Remove a set from the set div based on the div ID
 * 
 * @param {*} setDivId: this is the ID of the div of which to remove the set from
 */
function removeLastSetFromForm(setDivId) {
    setDiv = document.getElementById(setDivId);
    setCount = parseInt(setDiv.getAttribute("count"));
    if (setCount == 1) {} else {
        document.getElementById(setDivId + "test" + setCount).remove();
        setCount = setCount - 1;
        setDiv.setAttribute("count", setCount);
    }
}


// ################ Workouts Table ######################
/** 
 * Removes a workout to the workouts table via POST command
 */
function removeWorkout(){
    workoutToRemove = document.getElementById("removeWorkoutSettings").value;
    if(workoutToRemove == ""){
        alert("Please enter a workout!");
    } else {
        jsonData = {"workout":workoutToRemove};
        _postJSONData(jsonData, "workout/remove");
    }
}
/**
 * Adds a workout exercise to the workouts table. These are the different workout options.
 */
function addWorkout(){
    workoutToAdd = document.getElementById("addWorkoutSettings").value;
    if(workoutToAdd == ""){
        alert("Please enter a workout!");
    } else {
        jsonData = {"workout":workoutToAdd};
        _postJSONData(jsonData, "workout/add");
    }
}


// Need to REALLY clean below this
/**
 * Sends a post request with the workout set data for a specific workout.This is the primary function 
 * @param {string} workout_element_id 
 * @param {string} weight_element_id 
 * @param {string} reps_element_id 
 * @param {string} sets_element_id 
 * @param {string} date 
 * @returns 
 */
async function submitDynamicSet2(workout_element_id, weight_element_id, reps_element_id, sets_element_id, date){
    workout = document.getElementById(workout_element_id);
    weight = document.getElementById(weight_element_id);
    reps = document.getElementById(reps_element_id);
    if (sets_element_id == "1"){
        set = "1";
    } else {
        set = document.getElementById(sets_element_id).value;
    }
    if (workout.value == "" || weight.value == "" || reps.value ==""){
        alert("Missing values!");
        return;
    }
    
    message = await fetch(BASEURL+"api/workout/add_workout", {
        method:"POST",
        headers:{"Content-Type":"application/json",},
        body: JSON.stringify({"workout":workout.value, "reps":reps.value, "weight":weight.value, "set":set, "date":date})
    });

    if(await message.ok){
        jsonReponse = await message.json();
        _addExerciseToDOM(workout_element_id, reps_element_id, weight_element_id, "test12_"+date, jsonReponse.id, date);
    }
}

/**
 * Appends a new Exercise-Set div to the specific workout on the homepage
 * @param {string} exercise exercise element id to gather the exericse from
 * @param {string} reps reps element id to gather the rep count from
 * @param {string} weight weight element id to gather the weight amount from
 * @param {string} newSetDivElementId element id of the dynamic set div to append the new set before
 * @returns 
 */
function _addExerciseToDOM(exerciseElementId, reps, weight, newSetDivElementId, rowId, date){
    repsValue = document.getElementById(reps).value;
    weightValue = document.getElementById(weight).value;
    if (repsValue == "" || weightValue == ""){
        alert("Please ensure all fields are inputted.");
        return;
    }
    // Create the set information label 
    setInfoLabel = document.createElement("label");
    setInfoLabel.innerHTML = "Set 1 <br>" + document.getElementById(reps).value + " Reps x " + document.getElementById(weight).value + " lbs. " + "= " + document.getElementById(reps).value*document.getElementById(weight).value + " Work";
    // Create the fieldset and legend for the exercise
    newFieldSet = document.createElement("fieldset");
    newLegend = document.createElement("legend");
    newLegend.innerHTML = document.getElementById(exerciseElementId).value;
    newFieldSet.append(newLegend);
    // Create the Div to put everything into
    newSetDiv = document.createElement("div");
    newSetDiv.setAttribute("class", "testSetDiv border");
    newSetDiv.id = "testSet_"+rowId;
    newSetDiv.append(setInfoLabel);
    // Create the Div to hold delete/edit exericise buttons
    setOperatorDiv = document.createElement("div");
    setOperatorDiv.setAttribute("class", "flexColumn");
    // Create the Delete button
    deleteBtn = document.createElement("button");
    deleteBtn.type="button";
    deleteBtn.innerHTML = "&#10006;";
    deleteBtn.setAttribute("class", "delete_btn");
    deleteBtn.setAttribute("onclick", "deleteSet('" + rowId+"')");
    // Create the Edit Button 
    editBtn = document.createElement("button");
    editBtn.type="button";
    editBtn.innerHTML = "&#9998;";
    editBtn.setAttribute("class", "edit_btn");
    setOperatorDiv.append(deleteBtn);
    setOperatorDiv.append(editBtn);
    newSetDiv.append(setOperatorDiv);
    // Create the + Set Button
    addDynamicSetBtn = document.createElement("button");
    addDynamicSetBtn.type = "button";
    addDynamicSetBtn.innerHTML = "+";
    addDynamicSetBtn.setAttribute("class", "add_set_btn");
    // Create the add set Div
    addSetDiv = _createAddSetDiv(document.getElementById(exerciseElementId).value, date);
    addSetDiv.id = "addDynamicSet"+document.getElementById(exerciseElementId).value +"_"+date;
    newDynamicSetDiv = document.getElementById(newSetDivElementId);
    newFieldSet.append(newSetDiv);
    newFieldSet.append(addSetDiv);
    newFieldSet.append(addDynamicSetBtn);
    newDynamicSetDiv.before(newFieldSet);
}

//This creates a hidden div to add a set dynamically from the home page after dynamically adding an exercise
function _createAddSetDiv(exercise, date){
    masterDiv = document.createElement("div");
    masterDiv.setAttribute("class", "testSetDiv border");
    exerciseInput = document.createElement("input");
    exerciseInput.setAttribute("visibility", "hidden");
    exerciseInput.value = exercise;
    exerciseInput.id = "dynamicExerciseName";
    addSetDiv = document.createElement("div");
    addSetDiv.append(exerciseInput);
    // Create the set input and label
    addSetDiv.setAttribute("class", "flexColumn");
    addSetLabel = document.createElement("label");
    addSetLabel.innerHTML = "Set";
    addSetInput = document.createElement("input");
    addSetInput.id = "addSetDynamicSet";
    addSetInput.setAttribute("type", "number");
    addSetInput.setAttribute("min","1");
    addSetInput.setAttribute("value","1" );
    addSetDiv.append(addSetLabel);
    addSetDiv.append(addSetInput);
    // Create the Weight input and label
    addWeightLabel = document.createElement("label");
    addWeightLabel.innerHTML = "Weight";
    addWeightInput = document.createElement("input");
    addWeightInput.id = "addSetDynamicWeight";
    addWeightInput.setAttribute("type","number");
    addWeightInput.setAttribute("value","1");
    addWeightInput.setAttribute("min","0");
    addSetDiv.append(addWeightLabel);
    addSetDiv.append(addWeightInput);
    // Create the Reps input and label
    dynamicSetInputDiv = document.createElement("div");
    dynamicSetInputDiv.setAttribute("class", "flexColumn");
    addRepsDynamicSetLabel = document.createElement("label");
    addRepsDynamicSetLabel.innerHTML="Reps";
    addRepsDynamicSetInput = document.createElement("input");
    addRepsDynamicSetInput.id = "addSetDynamicReps";
    addRepsDynamicSetInput.setAttribute("type","number");
    addRepsDynamicSetInput.setAttribute("value","1");
    addRepsDynamicSetInput.setAttribute("min","1");
    operatorsDiv = document.createElement("div");
    operatorsDiv.setAttribute("class", "flexColumn");
    addBtn = document.createElement("button");
    addBtn.innerHTML = "&#10004";
    addBtn.setAttribute("onclick", "submitDynamicSetMain('dynamicExerciseName', 'addSetDynamicWeight', 'addSetDynamicReps', 'addSetDynamicSet','" +date+"')");
    // Implement submit button logic
    operatorsDiv.append(addBtn);
    
    addSetDiv.append(addRepsDynamicSetLabel);
    addSetDiv.append(addRepsDynamicSetInput);
    masterDiv.append(addSetDiv);
    masterDiv.append(operatorsDiv);
    
    return masterDiv;
}
/** Sends a post request to the specified endpoint
 * It will provide an alert with the response message
 * @param {string} jsonData: JSON formatted data to send
 * @param {string} endpoint: endpoint to send the JSON data to. i.e. workout/add
 */
function _postJSONData(jsonData, endpoint){
    jsonData = JSON.stringify(jsonData);
    newRequest = new XMLHttpRequest();
    newRequest.onload = function (Responsex) {
        if (newRequest.status == 200){
            alert(Responsex.originalTarget.responseText);
            location.reload();
        } else {
            alert("Unable to send!");
        }
    };
    newRequest.open("POST", BASEURL + endpoint);
    newRequest.setRequestHeader("Content-Type", "application/json");
    newRequest.send(jsonData);
}

/**
 * Parses the workout form, converts to JSON then POST to BASEURL + "/add_workout"
 */
function submitWorkout(data) {
    jsonWorkoutData = _parseForm();
    jsonWorkoutData = JSON.stringify(jsonWorkoutData);
    newRequest = new XMLHttpRequest();
    newRequest.onload = function () {
        if (newRequest.status == 200){
            location.replace(BASEURL);
        } else {
            alert("Unable to send!");
        }
        console.log(newRequest.status);
    };
    newRequest.open("POST", BASEURL + "add_workout");
    newRequest.setRequestHeader("Content-Type", "application/json");
    newRequest.send(jsonWorkoutData);
}

function _parseForm(form_id){
    myForm = new FormData(document.getElementById("workoutForm"));
    jsonWorkoutData = {};
    currentWorkout = null;
    reps = null;
    weight = null;
    
    for (const item of myForm.entries()) {
        // each item in myForm is a tuple like the following:
        // ("date", 12-25-2025), ("workout", "Squat"), ("reps", 10), ("weight", 25)
        keyword = item[0];
        if (keyword.includes("workout")) {
            workoutName = item[1];
            if (currentWorkout == null) {
                jsonWorkoutData[workoutName] = [];
                currentWorkout = workoutName;
            } else {
                jsonWorkoutData[workoutName] = [];
                currentWorkout = workoutName;
                reps = null;
                weight = null;
            }

        } else if (keyword.includes("reps")) {
            reps = item[1];

        } else if (keyword.includes("weight")) {
            console.log("pushing");
            weight = item[1];
            jsonWorkoutData[currentWorkout].push({
                "reps": reps,
                "weight": weight
            });
            reps = null;
            weight = null;
        } else if (keyword.includes("date")) {
            jsonWorkoutData.date = item[1];
        }
    }

    if (reps != null & weight != null) {
        jsonWorkoutData[currentWorkout].push({
            "reps": reps,
            "weight": weight
        });
    }

    return jsonWorkoutData;
}