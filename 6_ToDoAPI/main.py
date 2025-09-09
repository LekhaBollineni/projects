from fastapi import FastAPI
from typing import List, Optional
from enum import IntEnum
from pydantic import BaseModel, Field

api = FastAPI()

class Priority(IntEnum):
    LOW = 3
    MEDIUM = 2
    HIGH = 1

class TodoBase(BaseModel):
    todo_name: str = Field(..., min_length = 3, max_length = 512, description="Name of the todo item")
    todo_description: str = Field(..., description="Description of the todo item")
    priority : Priority = Field(default=Priority.LOW, description="Priority of the todo item")

class TodoCreate(TodoBase):
    pass

class Todo(TodoBase):
    todo_id: int = Field(..., gt=0, description="ID of the todo item")

class TodoUpdate(BaseModel):
    todo_name: Optional[str] = Field(None, min_length = 3, max_length = 512, description="Name of the todo item")
    todo_description: Optional[str] = Field(None, description="Description of the todo item")
    priority : Optional[Priority] = Field(None, description="Priority of the todo item")
    




all_todos = [
    {'todo_id':1, 'todo_name':'First Todo', 'todo_description':'This is a first todo item'},
    {'todo_id':2, 'todo_name':'Second Todo', 'todo_description':'This is a second todo item'},
    {'todo_id':3, 'todo_name':'Third Todo', 'todo_description':'This is a third todo item'},
    {'todo_id':4, 'todo_name':'Fourth Todo', 'todo_description':'This is a fourth todo item'},
    {'todo_id':5, 'todo_name':'Fifth Todo', 'todo_description':'This is a fifth todo item'},
    {'todo_id':6, 'todo_name':'Sixth Todo', 'todo_description':'This is a sixth todo item'}
]

@api.get("/")
def index():
    return(" Go to /todos to see all todos ........ Go to /todos/{todo_id} to see a specific todo ............ Go to /docs for interactive API documentation")

@api.get('/todos/{todo_id}')
def get_todo(todo_id: int):
    for todo in all_todos:
        if todo['todo_id'] == todo_id:
            return todo
    return {'message': 'Todo not found'}

@api.get('/todos')
def get_all_todos(first_n: int = None):
    if first_n and first_n > 0:
        return all_todos[:first_n]
    return all_todos

