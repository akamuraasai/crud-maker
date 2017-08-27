import { database } from "../database/firebase";

export const inserir = (model, dados) => (
    {
        type: 'SUBMETIDO',
        payload: database
            .ref(model)
            .push()
            .set({...dados})
    }
);

export const alterar = (model, id, dados) => (
    {
        type: 'SUBMETIDO',
        payload: database
            .ref(`${model}/${id}`)
            .set({ ...dados })
    }
);

export const remover = (model, id) => (
    {
        type: 'SUBMETIDO',
        payload: database
            .ref(`${model}/${id}`)
            .remove()
    }
);

export const novo = item => ({ type: 'ALTERADO', payload: { id: '' } });
export const carregar = item => ({ type: 'ALTERADO', payload: item });