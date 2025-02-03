# Workout Tracker

This is a very basic application with the purpose of tracking workouts. It was created with the program 5/3/1 in mind, but will be able to track other workouts as it is a very simple and dynamic system.


## To Setup
```powershell
python -m venv venv
.\.venv\Scripts\Activate.ps1
pip install requirements
python db.py
```
## To start, run the following commands:
```powershell
.\.venv\Scripts\Activate.ps1
flask --app home run --debug --host 0.0.0.0
```

## Tasks in the Pipeline:
- Get a better base page system for Flask
- Deploy Workout table to track only workouts and use that to select from
- Allow edits to be made to set names
- Nicer UI
- Graphs
- Calendar to show heatmap of days worked out
- Consider user system
- Clean up folder system

## Changelog
- Fixed Stats Page - Currently counts every row. Should only count a workout per day - fixed 2/2/25
- Fix DB to track minor workouts too (idea is to store workout by lowercase or maybe a different system to add workouts then choose from pre-added.)
    