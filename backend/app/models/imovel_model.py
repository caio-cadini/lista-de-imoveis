from ..db.session import Base
from sqlalchemy import Column, String, Integer
class Imovel(Base):
    __tablename__ = 'imoveis'

    id = Column('id', Integer, primary_key=True, autoincrement=True)
    title = Column('title', String)
    address = Column('address', String)
    status = Column('status', String) #Controle de valores realizado em routers/properties_router.py

    def __init__(self, title, address, status):
        self.title = title
        self.address = address
        self.status = status