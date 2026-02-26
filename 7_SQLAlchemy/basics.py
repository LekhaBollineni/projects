import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text, Table, Column, Integer, String, MetaData

load_dotenv()
DB_URL = os.getenv("DB_URL")
engine = create_engine(DB_URL, echo=True)

meta = MetaData()


with engine.connect() as conn:
    conn.execute(text("CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)"))
    conn.commit()

from sqlalchemy.orm import Session

session = Session(engine)

# Insert sample data
id_counter = 1

session.execute(text("INSERT INTO test (id, name, age) VALUES (:id, :name, :age)"), [{"id": id_counter, "name": "Alice", "age": 30}, {"id": id_counter + 1, "name": "Bob", "age": 25}])

session.commit()
