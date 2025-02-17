# Workout Tracker

This is a very basic application with the purpose of tracking workouts. It was created with the program 5/3/1 in mind, but will be able to track other workouts as it is a very simple and dynamic system.
To begin adding workouts, make sure that you add your desired exercises via the Settings page.

## To Setup
```powershell
python -m venv venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python db.py
```
## To start, run the following commands:
```powershell
.\.venv\Scripts\Activate.ps1
flask --app home run --debug --host 0.0.0.0
```

## Tasks in the Pipeline (Order of priority-ish):
- Update page with changes dynamically without page refresh
- Create a workout title name
- Separate css and js by pages
- Nicer UI
- Graphs
- Calendar to show heatmap of days worked out
- Consider user system
- Clean up project folder setup
- Add workout program tracking i.e Week 3 Day 2 of 5/3/1 cycle
- Add 5/3/1 Calculator and other exercises
- Will need to handle pagination for workouts at some point
- Move delete X to top right of each workout
- Deploy to docker container
- Add setting to update workout name


## Changelog
- Fixed Stats Page - Currently counts every row. Should only count a workout per day - fixed 2/2/25
- Fix DB to track minor workouts too (idea is to store workout by lowercase or maybe a different system to add workouts then choose from pre-added.)
- Get a better base page system for Flask 2/3/25
- Deploy Workout table to track only workouts and use that to select from 2/6/25
- Add settings page
- Remove workout from form
- Dynamically add workouts and set from home page 2/9
- Allow edits to be made to set names 2/9