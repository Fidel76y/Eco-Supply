import { createContext,useState } from "react";

const SupplyContext = createContext();

export const SupplyProvider =({children})=>{
    const [isReload,setIsReload]=useState(false);

    return(
        <SupplyContext.Provider value={{isReload,setIsReload}}>
            {children}
        </SupplyContext.Provider>
    )
}
export default SupplyContext;