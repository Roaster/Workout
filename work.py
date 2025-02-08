from flask import request
from datetime import datetime
from workout import Workout, WorkSet
import logging

logger = logging.getLogger(__name__)
def add_workout_to_db(conn): 
    """
    Adds every workout set from a workout to the SQL database
    The date is from request.json

    Args:
        conn : SQLITE3 Connection to mysql

    Returns:
        int : 1 - Success
    """
    workouts = request.json
    date = workouts['date']
    date_string = datetime.strptime(date, "%Y-%m-%d")
    date_string = date_string.strftime("%A %B %d %Y")
    my_workout = None
    print(my_workout)
    for workout in workouts:
        print(workouts[workout])
        if workout == "date":
            continue
        setCount = 1
        for set in workouts[workout]:
            if my_workout == None:
                my_workout = Workout(workout)
            new_set = WorkSet(1, workout, setCount, set['reps'], set['weight'], "", date_string)
            setCount += 1
            my_workout.add_set(new_set)
    
    for set in my_workout.workouts:
        logger.info(f"INSERTING: Workout {set.workout}, setNum {set.set_num}, reps {set.reps}, notes {set.notes}, date {date}, workout.max{my_workout.max}, set.weight{set.weight}, set.date{set.date}" )
        conn.execute('INSERT INTO workout (workout, setNum, reps, notes, date, max, weight, datestring) VALUES (?,?,?,?,?,?,?,?)',(set.workout, set.set_num, set.reps, set.notes, date, my_workout.max, set.weight, set.date))
        conn.commit()
        
    conn.close()
    return 1
   