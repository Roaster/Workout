import os
import sqlite3
from flask import Flask, render_template, request, redirect, Response, jsonify
from work import add_workout_to_db
from settings import DATABASE_PATH
import json
import logging
from work import Workout, WorkSet
from datetime import datetime

DEPLOY_DB = DATABASE_PATH

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO,format="%(asctime)s - [%(levelname)s]- %(name)s.py - %(funcName)s() - %(message)s")

def get_db_connection():
    """Get a sqlite3 db connection

    Returns:
        conn : Connection object to SQL table
    """
    conn = sqlite3.connect(DEPLOY_DB)
    return conn

def create_app(test_config=None):
    """
    Creates flask application
    """
    logger.info("Started")
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, DEPLOY_DB),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    @app.route('/', methods= ['GET', 'POST'])
    def home():
        conn = get_db_connection()
        if request.method == 'GET':
            workouts = conn.execute("SELECT * FROM workout ORDER BY date DESC").fetchall()
            try:
                current_workout = workouts[0][1]
                if current_workout == "OHP":
                    next_workout = "Deadlift"
                elif current_workout == "Deadlift":
                    next_workout = "Bench"
                elif current_workout == "Bench":
                    next_workout = "Squat"
                else:
                    next_workout = "OHP"
            except:
                next_workout = "Null"
                logger.info("Unable to determine next workout.")
        elif request.method == 'POST':
            for item in request.form:
                conn.execute(f"UPDATE workout SET notes='{request.form[item]}' WHERE id ={item}")
                conn.commit()
            workouts = conn.execute("SELECT * FROM workout ORDER BY date DESC").fetchall()
        workout_names = conn.execute("SELECT workout FROM workouts ORDER BY workout ASC").fetchall()
        conn.close()

        # Convert all the workouts into a Dictionary format by DATE
        workouts_json = {}
        workouts_json2={}
      
        workoutX = Workout()
        date_key = {}
        # better logic would be nice for this
        for workout in workouts:
            # print(workout)
            work_set = WorkSet(workout_id=workout[0], workout=workout[1], set_num=workout[2], reps=workout[3], weight=workout[4], notes=workout[5], date=workout[9])
            
            workoutX.add_set(work_set)
            workout_date = workout[7]

            if workouts_json2.get(workout_date) == None:
                workouts_json2[workout_date] = {}

            if workouts_json2[workout_date].get(work_set.workout) == None:
                workouts_json2[workout_date][work_set.workout] = []

            if date_key.get(workout_date) == None:
                date_key[workout_date] =workout[9]

            try:
                workouts_json[workout_date].append(workout)
                workouts_json2[workout_date][work_set.workout].append(work_set)
            except:
                workouts_json[workout_date] = [workout]
                workouts_json2[workout_date][work_set.workout]= [work_set]
        return render_template("home.html", nextWorkout=next_workout, workouts=workouts, workoutsJson=workouts_json, workoutsJson2=workouts_json2,workoutx=workoutX, date_key=date_key, workout_names=workout_names)
    
    # This is the form page
    @app.route("/add_workout", methods=['GET', 'POST'])
    def add_workout():
        if request.method == 'POST':
            conn = get_db_connection()

            # add_workout_to_db(conn)
            print("skipping add for now. ")
            conn.close()
            return redirect("/")
        else:
            conn = get_db_connection()
            workout_names = conn.execute("SELECT workout FROM workouts").fetchall()
            workouts = conn.execute('SELECT DISTINCT workout FROM workout ORDER BY workout ASC').fetchall()
            conn.close()
            return render_template('add_workout.html', workouts=workouts, workout_names=workout_names)
    
    # I do not think that this is being used.
    @app.route("/get_workout", methods=['GET'])
    def get_workout():
        conn = get_db_connection()
        workouts = conn.execute("SELECT * FROM workout ORDER BY date DESC").fetchall()
        conn.close()
        return render_template("home.html", workouts=workouts)
    
    @app.route("/settings")
    def settings():
        conn = get_db_connection()
        workouts = conn.execute("SELECT workout FROM workouts").fetchall()
        return render_template("settings.html", workouts=workouts)
    
    @app.route("/workout")
    def workout():
        return render_template("workout.html")
    
    @app.route("/stats")
    def stats():
        conn = get_db_connection()
        bench = conn.execute("SELECT COUNT(DISTINCT date) FROM workout WHERE workout = 'Bench'").fetchone()[0]
        squat = conn.execute("SELECT COUNT(DISTINCT date) FROM workout WHERE workout = 'Squat'").fetchone()[0]
        deadlift = conn.execute("SELECT COUNT(DISTINCT date) FROM workout WHERE workout = 'Deadlift'").fetchone()[0]
        ohp = conn.execute("SELECT COUNT(DISTINCT date) FROM workout WHERE workout = 'OHP'").fetchone()[0]

        bench_max = conn.execute("select max(weight) FROM workout WHERE workout = 'Bench'").fetchone()[0]
        squat_max = conn.execute("select max(weight) FROM workout WHERE workout = 'Squat'").fetchone()[0]
        deadlift_max = conn.execute("select max(weight) FROM workout WHERE workout = 'Deadlift'").fetchone()[0]
        ohp_max = conn.execute("select max(weight) FROM workout WHERE workout = 'OHP'").fetchone()[0]

        total = int(bench_max if bench_max != None else 0)+int(squat_max if squat_max != None else 0)+int(deadlift_max if deadlift_max != None else 0)+int(ohp_max if ohp_max != None else 0)
        conn.close()
        return render_template("stats.html", bench=bench, squat=squat, deadlift=deadlift, ohp=ohp, benchMax=bench_max, squatMax=squat_max, deadliftMax=deadlift_max, ohpMax=ohp_max, total=total)

    

    ###################### API ######################
    @app.route("/get_all_workouts2")
    def get_all_workouts2():
        conn = get_db_connection()
        workouts = conn.execute("SELECT * from workout").fetchall()
        conn.close()
        return workouts
    
    @app.route("/delete_by_id/<id>", methods=['POST', 'GET'])
    def delete_by_id(id: int):
        if request.method == "POST" or request.method == "GET":
            conn = get_db_connection()
            conn.execute("DELETE FROM workout WHERE id = ?", (id,))
            logger.info(f"Executed: DELETE FROM workout WHERE id={id}")
            conn.commit()
            conn.close()
            return "Success!", 200
        
    @app.route("/workout/add", methods=['POST'])
    def workout_add():
        workout = request.json['workout']
        conn = get_db_connection()
        workouts = conn.execute(f"SELECT * FROM workouts WHERE workout='{workout}'").fetchall()
        if workouts == []:
            conn.execute('INSERT INTO workouts (workout) values (?)', (workout,))
            conn.commit()
            conn.close()
            return "Success!", 200
        else: 
            return "Workout already added!", 200
        
    @app.route("/workout/remove", methods=["POST"])
    def workout_remove():
        workout = request.json['workout']
        conn = get_db_connection()
        workouts = conn.execute(f"SELECT * FROM workouts WHERE workout='{workout}'").fetchall()
        if workouts != []:
            conn.execute(f'DELETE FROM workouts WHERE workout=?', (workout,))
            conn.commit()
            conn.close()
            return "Success!", 200
        else: 
            return "Workout does not exist!", 200
    
    @app.route("/delete/nuke/all", methods=["POST"])
    def delete_nuke_all():
        conn = get_db_connection()
        conn.execute("DELETE FROM workout")
        logger.info(f"Executed: DELETE FROM workout")
        conn.commit()
        conn.close()
        return "Success", 200
    
    @app.route("/delete/<date>", methods=["POST", "GET"])
    def delete_route(date: str):
        '''
        Delete rows based on date column.
        '''
        conn = get_db_connection()
        conn.execute("DELETE FROM workout WHERE date = ?", (date,))
        logger.info(f"Executed: DELETE FROM workout WHERE date={date}")
        conn.commit()
        conn.close()
        return redirect("/")
    
    @app.route("/update", methods=["POST", "GET"])
    def update():
        """Updates a set at {id} with {weight} and {reps} in request.form.

        Returns:
            _type_: _description_
        """
        json_data = json.loads(request.get_data().decode("utf-8"))
        if request.method == "POST":
            conn = get_db_connection()
            new_weight = json_data["weight"]
            new_reps = json_data["reps"]
            set_id = json_data["id"]
            if json_data.get("set"):
                set_num = json_data["set"]
            else:
                set_num = -1
            conn.execute(f"UPDATE workout SET weight='{new_weight}', reps='{new_reps}', setNum='{set_num}' WHERE id = {set_id}")
            logger.info(f"Executed: UPDATE workout SET weight='{new_weight}', reps='{new_reps}', setNum='{set_num}' WHERE id = {set_id}")
            conn.commit()
            conn.close()
            return "Success", 200
        return render_template("home.html")
    
    @app.route("/_update_name", methods=["POST"])
    def update_name():
        old_name=""
        new_name=""
        conn = get_db_connection()
        conn.execute(f"UPDATE workout SET workout='{new_name}' WHERE workout='{old_name}'")
        conn.commit()
        conn.close()
        return "Success", 200
    
    @app.route("/api/workouts/get_all_workouts")
    def get_all_workouts():
        conn = get_db_connection()
        workouts = conn.execute(f"SELECT workout FROM workouts").fetchall()
        conn.close()
        return workouts

    @app.route("/api/workout/add_workout", methods=["POST"])    
    def api_add_workout():
        """Adds a workout to the database via "+ Workout" Button

        Returns:
            dictionary, int: {"message":<message>}, HTTP status
        """
        print(request.json)
        if request.json.get("set"):
            set = request.json["set"]
        else:
            set = "1"

        if request.json.get("date"):
            date = request.json["date"]
            date = datetime.strptime(date, "%Y-%m-%d").date()
            date_string = date.strftime("%A %B %d %Y")
        else:
            date = datetime.now().strftime("%Y-%m-%d")
            date_string = datetime.now().strftime("%A %B %d %Y")
        
        workout = request.json["workout"]
        weight = request.json["weight"]
        reps = request.json["reps"]
        conn = get_db_connection()
        curs = conn.cursor()
        curs.execute('INSERT INTO workout (workout, setNum, reps, notes, date, max, weight, datestring) VALUES (?,?,?,?,?,?,?,?)',(workout, set, reps, "", date, 0, weight, date_string))
       
        last_row_id = curs.lastrowid
        conn.commit()
        curs.close()
        conn.close()   
        return jsonify({"id":last_row_id})
    
    return app

   