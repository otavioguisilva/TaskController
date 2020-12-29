import { createContext } from 'react';

const StoreContext = createContext({
    token: null,
    setToken: (Token) => {},
});

export default StoreContext;