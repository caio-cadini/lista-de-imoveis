import { useState, useEffect } from 'react'
import ImovelTable from '../../components/ImovelTable'
import ImovelForm from '../../components/ImovelForm'
import Header from '../../components/Header'
import type { Row, RowForm } from '../../utils/Types/Row'


function Imoveis() {
  const [formOpen, setFormOpen] = useState(false) //Abertura do pop-up do formulário
  const [rowToEdit, setRowToEdit] = useState<number | null>(null)  //index da linha da tabela à ser editada por handleEditRow
  const [rows, setRows] = useState<Row[]>([]) //Dados dos imóveis
  const [loading, setLoading] = useState(true) 

  //Load inicial
  useEffect(() => {
    async function loadImoveis() {
      try {
        const response = await fetch("http://localhost:8000/properties/")
        const data = await response.json()
        console.log(data)
        setRows(data)
      } catch (err) {
        console.error('Erro ao carregar imóveis', err)
      } finally {
        setLoading(false)
      }
    }
    loadImoveis()
  }, [])

  //Setando imóvel à ser editado
  const getEditRowData = (idx: number) => {
    setRowToEdit(idx)
    setFormOpen(true)
  }

  //Requisição DELETE + Alteração no componente tabela
  const handleDeleteRow = async (targetIndex: number, apiId: number) => {
    try {
      const response = await fetch(`http://localhost:8000/properties/${apiId}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error("Erro ao deletar imóvel")
      }
      setRows(rows.filter((_, idx) => idx !== targetIndex))
    } catch (err) {
      console.log("Erro ao deletar imóvel", err)
    }
  }

  //Requisição POST + Alteração no componente tabela
  const handleCreateForm = async (formRow: RowForm) => {
    try {
      const response = await fetch("http://localhost:8000/properties/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formRow)
      })
      if (!response.ok) {
        throw new Error("Erro ao criar imóvel")
      }
      const created: Row = await response.json()
      console.log(created)
      setRows((prev) => [...prev, created])
    } catch (err) {
      console.log("Erro ao criar imóvel", err)
    }
  }

  //Requisição PUT + Alteração no componente tabela
  const handleEditForm = async (formRow: RowForm, id: number) => {
    try {
      const response = await fetch(`http://localhost:8000/properties/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formRow)
      })
      if (!response.ok) {
        throw new Error("Erro ao editar imóvel")
      }
      const edited: Row = await response.json()
      console.log(edited)
      setRows(rows.map((currRow, idx) => {
        if (idx !== rowToEdit) return currRow;

        return edited
      }))
    } catch (err) {
      console.error("Erro ao editar imóvel", err)
    }
  }


  if (loading) return (
    <p>Carregando...</p>
  )
  return (
    <div className="flex flex-col justify-center min-h-screen min-w-screen bg-[var(--body-background-color)]">
      <Header/>
      <main className="flex flex-col w-full mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div>
          <ImovelTable rows={rows} deleteRow={handleDeleteRow} getEditRow={getEditRowData} />
        </div>
        <button className="self-center w-auto rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 mt-7" onClick={() => setFormOpen(true)}>Add</button>
        {formOpen && (
          <ImovelForm
            closeForm={() => {
              setFormOpen(false)
              setRowToEdit(null)
            }}
            onCreate={handleCreateForm}
            onEdit={handleEditForm}
            defaultValue={rowToEdit !== null ? rows[rowToEdit] : undefined} //Define valores nos campos do fomulário de acordo com getEditRow
          />)}
      </main>

    </div>
  )
}

export default Imoveis
