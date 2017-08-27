export default (state = {}, action) => {
    const reducers = {
        SUBMETIDO: () => ({ ...state, item: {} }),
        ALTERADO: () => ({ ...state, item: action.payload }),
        DEFAULT: () => state
    }

    return (reducers[action.type] || reducers['DEFAULT'])();
};