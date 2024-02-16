export type UserRegister = {
    nome: string,
    email: string,
    senha: string,
    id_posicao: number,
    id_sexo: number,
    data_nasc: Date,
    foto: string | undefined
}

export type User = {
    id: number,
    nome: string,
    senha: string,
    email: string,
    data_nasc: Date,
    foto: string | undefined
    id_posicao: number,
    id_sexo: number,
}
