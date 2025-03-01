import sqlite3

# connection = sqlite3.connect('database.db')
connection = sqlite3.connect('test_db.db')

def recreate():
    '''
    Recreate the SQL table based on the SQL table name supplied
    '''
    with open('workout_workouts.sql') as f:
        connection.executescript(f.read())

def database_info():
    '''
    Shows information about the database. Like DESCRIBE SQL Keyword
    '''
    cursor = connection.cursor()
    table_info = cursor.execute("select * from sqlite_master where type='table' and name = 'workouts'").fetchall()
    print(table_info)

# recreate()
# database_info()
connection.close()
