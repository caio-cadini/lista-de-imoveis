from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from ..schemas.imovel_schema import ImovelCreate, ImovelRead
from ..db.session import get_session
from ..models.imovel_model import Imovel


router = APIRouter(
    prefix='/properties'
)

@router.get('/', response_model=list[ImovelRead])
def get_imoveis(db: Session = Depends(get_session)):
    return db.query(Imovel).all()

@router.get('/{id}', response_model=ImovelRead, status_code=status.HTTP_200_OK)
def get_imovel(id: int, db: Session = Depends(get_session)):
    imovel_get = db.query(Imovel).get(id)
    if not imovel_get:
        raise HTTPException(status_code=404, detail='Imóvel não encontrado')

@router.post('/', status_code=status.HTTP_201_CREATED, response_model=ImovelRead)
def post_imovel(item: ImovelCreate, db: Session = Depends(get_session)):
    imovel_post = Imovel(title=item.title, address=item.address, status=item.status)
    status_check = ['active', 'inactive']
    if item.status not in status_check:
        raise HTTPException(status_code=404, detail='Valor incorreto para status do imóvel (deve ser active ou inactive)')
    db.add(imovel_post)
    db.commit()
    db.refresh(imovel_post)
    return imovel_post

@router.put('/{id}', status_code=status.HTTP_200_OK)
def put_imovel(id: int, item: ImovelCreate, db: Session = Depends(get_session)):
    imovel_update = db.query(Imovel).get(id)
    status_check = ['active', 'inactive']
    if not imovel_update:
        raise HTTPException(status_code=404, detail='Imóvel não encontrado')
    elif item.status not in status_check:
        raise HTTPException(status_code=404, detail='Valor incorreto para status do imóvel (deve ser active ou inactive)')
    for key, att in item.model_dump().items():
        setattr(imovel_update, key, att)
    db.add(imovel_update)
    db.commit()
    db.refresh(imovel_update)
    return imovel_update

@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_imovel(id: int, db: Session = Depends(get_session)):
    imovel_delete = db.query(Imovel).get(id)
    if not imovel_delete:
        raise HTTPException(status_code=404, detail='Imóvel não encontrado')
    db.delete(imovel_delete)
    db.commit()