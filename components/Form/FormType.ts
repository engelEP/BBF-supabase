export interface IForm {
    id?: string
    onSubmit(title: string, content: string): void
}