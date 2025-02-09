import datetime

class WorkSet:
    def __init__(self, workout_id:int, workout:str, set_num:int=1, reps:int=10, weight:int=135, notes:str="", date:str=""):
        self.workout_id:int = workout_id
        self.workout:str = workout
        self.set_num:int = set_num
        self.reps:int = reps
        self.weight:int = weight
        self.notes:str = notes
        self.date:str = date
    
    def print(self):
        """Print out info about the WorkSet in the following format
        Workout: {self.workout} - SetNum: {self.set_num} - Reps: {self.reps} - Weight: {self.weight} - Date: {self.date}
        """
        print(f"Workout: {self.workout} - SetNum: {self.set_num} - Reps: {self.reps} - Weight: {self.weight} - Date: {self.date}")

    
class Workout:
    def __init__(self,workout:str="Squat"):
        self.date = datetime.datetime.today()
        self.workout:str=workout
        self.id:str=f"{self.date}_{self.workout}"
        self.workouts:list=[]
        self.sets:int=0
        self.max:int=0
        

    def add_set(self, workout_set:WorkSet):
        """ Add a Set to the workout. Increment sets by 1

        Params: set is a Workset object.

        Args:
            set (workout_set): Workset Object.
        """
        if self.max < int(workout_set.weight) and self.workout == workout_set.workout:
            self.max = int(workout_set.weight)
        self.workouts.append(workout_set)
        self.sets += 1
    
    def print(self):
        '''
        Display info about the workout in the following format:
        {self.id} {self.workout} - Sets: {self.sets} - Max: {self.max}
        '''
        print(f"{self.id} {self.workout} - Sets: {self.sets} - Max: {self.max}")
        for set in self.workouts:
            set.print()
    
    def _set_workout(self, workout:str):
        """Sets the workout name and updates the workout id.

        Args:
            workout (str): The workout to be updated to.
        """
        self.workout = workout
        self.id = f"{self.date}_{self.workout}"
   
    





