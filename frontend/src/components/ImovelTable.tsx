import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs"
import type { Row } from "../utils/Types/Row";

type ImovelTableProp = {
    rows: Row[]
    deleteRow: (idx: number, apiId: number) => void
    getEditRow: (idx: number) => void
}


function ImovelTable({ rows, deleteRow, getEditRow }: ImovelTableProp) {
    return (
        <>
            <div className="w-full overflow-hidden rounded-lg shadow-lg">
                <table className="w-full table-auto">
                    <thead className="bg-[var(--table-header-color)] text-white">
                        <th className="pl-9 pr-4 py-3 text-left font-semibold w-1/12">ID</th>
                        <th className="px-4 py-3 text-center font-semibold w-4/12">Title</th>
                        <th className="px-4 py-3 text-center font-semibold w-5/12">Address</th>
                        <th className="pl-4  py-3 text-left font-semibold w-1/12">Status</th>
                        <th className="pl-4 pr-7 py-3 text-center font-semibold w-1/12">Actions</th>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {rows.map((row, idx) => {
                            return (<tr key={idx}>
                                <td className="pl-9 pr-4 py-3">{row.id}</td>
                                <td className="px-4 py-3">{row.title}</td>
                                <td className="px-4 py-3 break-words">{row.address}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${row.status === "active"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-gray-200 text-gray-700"
                                            }`}
                                    >
                                        {row.status}
                                    </span>
                                </td>
                                <td className="pl-4 pr-6 py-3">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => getEditRow(idx)}
                                            className="rounded-md p-2 hover:bg-gray-100"
                                            aria-label="Editar"
                                            title="Editar"
                                        >
                                            <BsFillPencilFill />
                                        </button>
                                        <button
                                            onClick={() => deleteRow(idx, row.id)}
                                            className="rounded-md p-2 hover:bg-red-50"
                                            aria-label="Excluir"
                                            title="Excluir"
                                        >
                                            <BsFillTrashFill className="text-red-600" />
                                        </button>
                                    </div>
                                </td>
                            </tr>);
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default ImovelTable