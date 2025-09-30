from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

engine = create_engine("sqlite:///../data/banco_imovel.db")
Session = sessionmaker(bind=engine)
Base = declarative_base()

def get_session():
    db = Session()
    try:
        yield db
    finally:
        db.close()

