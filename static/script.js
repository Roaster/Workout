BASEURL = "http://192.168.1.71:5000/";
console.log("running");

// Original add set button. This only works for the first set div
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

// Original remove set button. This only works for the first set div
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

// Toggles visibilty of an element based on id
function toggleVisibility(id) {
    console.log(id);
    item = document.getElementById(id);
    if (item.getAttribute("visibility") == "hidden") {
        console.log("working");
        item.removeAttribute("visibility");
    } else {
        item.setAttribute("visibility", "hidden");
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
    newRemoveSetButton.setAttribute("onclick", "removeSetForm(this.id)");
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
// This is for the notes and may need to be refactored and changed
function editExercise(testcaseId) {
    console.log("edit exercise", typeof (testcaseId));

    notesText = document.getElementById("notesText" + testcaseId);
    notesDiv = document.getElementById("notesDiv" + testcaseId);
    editButton = document.getElementById("editButton" + testcaseId);
    editForm = document.getElementById("editForm" + testcaseId);

    if (notesText.getAttribute("visibility") == "hidden") {
        notesText.removeAttribute("visibility");
        editForm.remove();
    } else {
        notesText.setAttribute("visibility", "hidden");

        newForm = document.createElement("form");
        newForm.id = "editForm" + testcaseId;
        newForm.method = "POST";

        editNotesInput = document.createElement("input");
        editNotesInput.id = "notesEditInput" + testcaseId;
        editNotesInput.value = testcaseId;
        editNotesInput.name = testcaseId;
        editNotesInput.value = notesText.textContent;

        newForm.append(editNotesInput);

        submitFormButton = document.createElement("button");
        submitFormButton.textContent = "Submit Changes";
        submitFormButton.type = "submit";

        linkElement = document.createElement("a");
        linkElement.action = "/error";
        linkElement.append(submitFormButton);
        newForm.append(linkElement);
        notesDiv.append(newForm);
    }
    console.log(testcaseId);
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
function removeSetForm(setDivId) {
    console.log(setDivId);
    setDiv = document.getElementById(setDivId);
    setCount = parseInt(setDiv.getAttribute("count"));
    if (setCount == 1) {} else {
        document.getElementById(setDivId + "test" + setCount).remove();
        setCount = setCount - 1;
        setDiv.setAttribute("count", setCount);
    }
}

/**
 * Delete set by database id.
 * 
 * Hits /delete_by_id/<id> endpoint. 
 * Turn this into a request
 */
function deleteSet(id) {
    if (id == null) {
        console.error("Invalid ID: ID is null or undefined");
        alert("Invalid ID: Cannot delete the set.");
        return;
    }
    xhr = new XMLHttpRequest();
    console.log(xhr.status);

    xhr.onload = function (message) {
        console.log(message.explicitOriginalTarget.status);
        document.getElementById("testSet_"+id).remove();
        // location.reload();
    };

    xhr.onerror = function () {
        console.error("Request failed");
        alert("An error occurred while trying to delete the set. Please try again.");
    };

    xhr.open("POST", BASEURL + "delete_by_id/" + id);
    xhr.send();

}

/**
 * Toggles the visibility of set input elements to allow for making updates
 */
function edit_set(id) {
    console.log(id);
    toggleVisibility("setItem-" + id);
    toggleVisibility("editSetForm-" + id);
    toggleVisibility("submitEditSet-" + id);
}

/**
 * Submits the edits made to the set.
 * @param {[type]} id The id of the database row to edit
 */
function submit_edit(id) {
    console.log(id);
    set = document.getElementById("editSetFormSet-"+id).value;
    reps = document.getElementById("editSetFormReps-" + id).value;
    weight = document.getElementById("editSetFormWeight-" + id).value;
    console.log(reps,weight,set);

    newRequest = new XMLHttpRequest();
    newRequest.onload = function () {
        console.log(newRequest.status);
        location.reload();
    };

    newRequest.open("POST", BASEURL + "update");
    newRequest.setRequestHeader("Content-Type", "application/json");
    body = {
        "id": id,
        "weight": weight,
        "reps": reps,
        "set": set
    };
    jsonData = JSON.stringify(body);
    newRequest.send(jsonData);
}
/** Removes a workout to the workouts table via POST command
 * 
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
/** Adds a workout to the workouts table via POST command
 * 
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

async function addDynamicSet(){
    document.getElementById("dynamic_workout");
    document.getElementById("dynamic_reps");
    document.getElementById("dynamic_weight");
}

async function submitDynamicSet(){
    workout = document.getElementById("dynamic_workout_input");
    weight = document.getElementById("dynamic_weight");
    reps = document.getElementById("dynamic_reps");
    console.log(workout.value, weight.value, reps.value);
    if (reps.value == "" || weight.value =="" || reps.value == ""){
        alert("Make sure all fields are populated!");
        return;
    }
    message = await fetch(BASEURL+"api/workout/add_workout", {
        method:"POST",
        headers:{"Content-Type":"application/json",},
        body: JSON.stringify({"workout":workout.value, "reps":reps.value, "weight":weight.value})
    });

    if(await message.ok){
        location.reload();
    }
}

/**
 * Adds a set to the database and DOM for specific workout  
 * @param {string} workout_element_id 
 * @param {string} weight_element_id 
 * @param {string} reps_element_id 
 * @param {string} sets_element_id 
 * @param {string} date 
 * @returns 
 */
async function submitDynamicSetMain(workout_element_id, weight_element_id, reps_element_id, sets_element_id, date){
    console.log(workout_element_id, weight_element_id, date);
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
    console.log(workout.value, weight.value, reps.value, set, date);
    
    message = await fetch(BASEURL+"api/workout/add_workout", {
        method:"POST",
        headers:{"Content-Type":"application/json",},
        body: JSON.stringify({"workout":workout.value, "reps":reps.value, "weight":weight.value, "set":set, "date":date})
    });

    if(await message.ok){
        console.log("running");
        
        x = await message.json();
        console.log(x.id);
        _addExerciseSetToDom(set, reps_element_id, weight_element_id, "addDynamicSet"+workout.value +"_"+date, x.id);
        setsElement = document.getElementById(sets_element_id);
        setsElement.value = parseInt(set) + 1;
    }
}
/**
 * Used by submitDynamicSetMain to append a dumby set to an exercise set on the DOM before the append button (at the end of the list)
 * @param {string} set Set number in workout
 * @param {string} reps Element ID for reps input 
 * @param {string} weight Element ID for weight input
 * @param {string} newSetDivElementId Element ID for element to append new set div before
 * @param {string} rowId 
 * @returns 
 */
function _addExerciseSetToDom(set, reps, weight, newSetDivElementId, rowId){
    newDiv = document.createElement("div");

    setInfoLabel = document.createElement("label");
    repsValue = document.getElementById(reps).value;
    weightValue = document.getElementById(weight).value;

    if (repsValue == "" || weightValue == ""){
        alert("Please ensure all fields are inputted.");
        return;
    }
    setInfoLabel.innerHTML = "Set " + set +" <br>" + document.getElementById(reps).value + " Reps x " + document.getElementById(weight).value + " lbs. " + "= " + document.getElementById(reps).value*document.getElementById(weight).value + " Work";
    
    newDiv.setAttribute("class", "testSetDiv border");
    newDiv.id = "testSet_"+rowId;
    newDiv.append(setInfoLabel);

    setOperatorDiv = document.createElement("div");
    setOperatorDiv.setAttribute("class", "flexColumn");

    deleteBtn = document.createElement("button");
    deleteBtn.type="button";
    deleteBtn.innerHTML = "&#10006;";
    deleteBtn.setAttribute("class", "delete_btn");
    deleteBtn.setAttribute("onclick", "deleteSet('" + rowId+"')");

    editBtn = document.createElement("button");
    editBtn.type="button";
    editBtn.innerHTML = "&#9998;";
    editBtn.setAttribute("class", "edit_btn");

    addDynamicSetBtn = document.createElement("button");
    addDynamicSetBtn.type = "button";
    addDynamicSetBtn.innerHTML = "+";

    setOperatorDiv.append(deleteBtn);
    setOperatorDiv.append(editBtn);
    newDiv.append(setOperatorDiv);


    newDynamicSetDiv = document.getElementById(newSetDivElementId);
    newDynamicSetDiv.before(newDiv);
}
/**
 * Sends a post request with the workout set data for a specific workout
 * @param {string} workout_element_id 
 * @param {string} weight_element_id 
 * @param {string} reps_element_id 
 * @param {string} sets_element_id 
 * @param {string} date 
 * @returns 
 */
async function submitDynamicSet2(workout_element_id, weight_element_id, reps_element_id, sets_element_id, date){
    console.log(workout_element_id, weight_element_id, date);
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
    console.log(workout.value, weight.value, reps.value, set, date);
    
    message = await fetch(BASEURL+"api/workout/add_workout", {
        method:"POST",
        headers:{"Content-Type":"application/json",},
        body: JSON.stringify({"workout":workout.value, "reps":reps.value, "weight":weight.value, "set":set, "date":date})
    });

    if(await message.ok){
        jsonReponse = await message.json();
        _addExerciseToDOM(workout_element_id, reps_element_id, weight_element_id, "test12_"+date, jsonReponse.id);
    }
}

/**
 * Appends a new exercise Set div to the specific workout on the homepage
 * @param {string} exercise exercise element id to gather the exericse from
 * @param {string} reps reps element id to gather the reps from
 * @param {string} weight weight element id to gather the weight from
 * @param {string} newSetDivElementId element id of the dynamic set div to append the new set before
 * @returns 
 */
function _addExerciseToDOM(exercise, reps, weight, newSetDivElementId, rowId){
    newDiv = document.createElement("div");
    setInfoLabel = document.createElement("label");
    repsValue = document.getElementById(reps).value;
    weightValue = document.getElementById(weight).value;

    if (repsValue == "" || weightValue == ""){
        alert("Please ensure all fields are inputted.");
        return;
    }
    setInfoLabel.innerHTML = "Set 1 <br>" + document.getElementById(reps).value + " Reps x " + document.getElementById(weight).value + " lbs. " + "= " + document.getElementById(reps).value*document.getElementById(weight).value + " Work";


    newFieldSet = document.createElement("fieldset");
    newLegend = document.createElement("legend");

    newLegend.innerHTML = document.getElementById(exercise).value;
    newFieldSet.append(newLegend);
    
    newDiv.setAttribute("class", "testSetDiv border");
    newDiv.id = "testSet_"+rowId;
    newDiv.append(setInfoLabel);

    setOperatorDiv = document.createElement("div");
    setOperatorDiv.setAttribute("class", "flexColumn");

    deleteBtn = document.createElement("button");
    deleteBtn.type="button";
    deleteBtn.innerHTML = "&#10006;";
    deleteBtn.setAttribute("class", "delete_btn");
    deleteBtn.setAttribute("onclick", "deleteSet('" + rowId+"')");

    editBtn = document.createElement("button");
    editBtn.type="button";
    editBtn.innerHTML = "&#9998;";
    editBtn.setAttribute("class", "edit_btn");

    addDynamicSetBtn = document.createElement("button");
    addDynamicSetBtn.type = "button";
    addDynamicSetBtn.innerHTML = "+";
    addDynamicSetBtn.setAttribute("class", "add_set_btn");

    setOperatorDiv.append(deleteBtn);
    setOperatorDiv.append(editBtn);
    newDiv.append(setOperatorDiv);


    newDynamicSetDiv = document.getElementById(newSetDivElementId);
    newFieldSet.append(newDiv);
    newFieldSet.append(addDynamicSetBtn);
    newDynamicSetDiv.before(newFieldSet);
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
/** Parses the main workout form and returns it in JSON format
 * Helper function for submitWorkout
 * @param {string} form_id form element id
 * @returns 
 * jsonWorkoutData which looks like:
 * {12-25-2025 : 
 *      {"Squat":
 *          {"reps":"5", 
 *          "weight":"135"
 *          }
 *      }
 * }
 * 
 */
function _parseForm(form_id){
    myForm = new FormData(document.getElementById("workoutForm"));
    jsonWorkoutData = {};
    currentWorkout = null;
    reps = null;
    weight = null;
    
    for (const item of myForm.entries()) {
        // each item in myForm has data in tuple format
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
