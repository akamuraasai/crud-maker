import { database } from "../database/firebase";

export const insert = (model, data) => (
    {
        type: 'SUBMITTED',
        payload: database
            .ref(model)
            .push()
            .set({...data})
    }
);

export const update = (model, id, data) => (
    {
        type: 'SUBMITTED',
        payload: database
            .ref(`${model}/${id}`)
            .set({ ...data })
    }
);

export const remove = (model, id) => (
    {
        type: 'SUBMITTED',
        payload: database
            .ref(`${model}/${id}`)
            .remove()
    }
);

export const add = item => ({ type: 'CHANGED', payload: { id: '' } });
export const load = item => ({ type: 'CHANGED', payload: item });
export const dismiss = () => ({ type: 'CHANGED', payload: {} });