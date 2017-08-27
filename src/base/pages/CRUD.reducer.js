export default (state = {}, action) => {
    const reducer = {
        SUBMITTED: () => ({ ...state, item: {} }),
        CHANGED: () => ({ ...state, item: action.payload }),
        DEFAULT: () => state
    }

    return (reducer[action.type] || reducer['DEFAULT'])();
};