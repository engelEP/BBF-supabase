import { INote } from "@/app/interfaces/notes";

export interface ITable {
    data: INote[],
    onDelete(id: number): void
}
