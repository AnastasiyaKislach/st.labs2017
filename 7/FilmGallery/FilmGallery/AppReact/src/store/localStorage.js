export const loadStore = () => {
    try {
        const serializedStore = localStorage.getItem('state');
        if (serializedStore === null) {
            return undefined;
        }
        return JSON.parse(serializedStore);
    } catch (err) {
        return undefined;
    }
};


export const saveState = (state) => {
    try {
        const serializedStore = JSON.stringify(state);
        localStorage.setItem('state', serializedStore);
    } catch (err) {
        console.log(err);
    }
}