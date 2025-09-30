import React, { useState } from "react"
import type {Row, RowForm} from "../utils/Types/Row"

type ImovelFormProp = {
    closeForm: () => void
    onCreate: (newRow: RowForm) => void
    onEdit: (editRow: RowForm, id: number) => void
    defaultValue?: Row
}

function ImovelForm({closeForm, onCreate, onEdit, defaultValue} : ImovelFormProp) {
    const [errors, setErrors] = useState("")
    const [formState, setFormState] = useState<RowForm>(
        defaultValue || {
        title: "",
        address: "",
        status: "active"
    })

    //Checando se algum campo está vazio
    const checkForm = () => {
        if(formState.title && formState.address && formState.status){
            setErrors("")
            return true;
        } else {
            setErrors("Necessário preencher todos os campos")
            return false
        }
    }

    //Alterações no formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        }
        )
    }


    // POST ou PUT sobre o imóvel
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()      
        if(!checkForm()) return;
        if (defaultValue?.id != null){
            await onEdit(formState, defaultValue.id)
        } else {
            await onCreate(formState)
        }
        closeForm()
    }

    return(
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" 
            onClick={(e) => {
                if (e.target === e.currentTarget) {closeForm()}}}>
                <div className="w-full max-w-md md:max-w-lg rounded-2xl bg-white p-6 shadow-xl">
                    <form className="space-y-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="title" className="text-sm font-medium text-gray-400">Title</label>
                            <input name="title" className="border-1 border-grey-300 rounded-sm" value={formState.title} onChange={handleChange}/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="address" className="text-sm font-medium text-gray-400">Address</label>
                            <input name="address" className="border-1 border-grey-300 rounded-sm" value={formState.address} onChange={handleChange}/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="status" className="text-sm font-medium text-gray-400">Status</label>
                            <select name="status" className="border-1 border-grey-300 rounded-sm" value={formState.status} onChange={handleChange}>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                        {errors && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{errors}</div>}
                        <button className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700" type="submit" onClick={handleSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default ImovelForm