from pydantic import BaseModel

class ImovelCreate(BaseModel):
    title: str
    address: str
    status: str

class ImovelRead(BaseModel):
    id: int
    title: str
    address: str
    status: str

    model_config = {"from_attributes": True}

