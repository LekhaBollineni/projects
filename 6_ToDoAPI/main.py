from fastapi import FastAPI

api = FastAPI()

all_todos = {
    {'todo_id':1, 'todo_name':'First Todo', 'todo_description':'This is a first todo item'},
    {'todo_id':2, 'todo_name':'Second Todo', 'todo_description':'This is a second todo item'},
    {'todo_id':3, 'todo_name':'Third Todo', 'todo_description':'This is a third todo item'},
    {'todo_id':4, 'todo_name':'Fourth Todo', 'todo_description':'This is a fourth todo item'},
    {'todo_id':5, 'todo_name':'Fifth Todo', 'todo_description':'This is a fifth todo item'},
    {'todo_id':6, 'todo_name':'Sixth Todo', 'todo_description':'This is a sixth todo item'}
}

# api.get("/")
# def index():
#     return {"message": "Hello, World!"}

@api.get('/todos/{todo_id}')
def get_todo(todo_id: int):
    for todo in all_todos:
        if todo['todo_id'] == todo_id:
            return todo
    return {'message': 'Todo not found'}

@api.get('/todos')
def get_all_todos(first_n=None):
    if first_n and first_n > 0:
        return all_todos[:first_n]
    return all_todos