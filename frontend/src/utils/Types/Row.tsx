export type Row = {
    id: number
    title: string
    address: string
    status: string
}

export type RowForm = Omit<Row, "id">