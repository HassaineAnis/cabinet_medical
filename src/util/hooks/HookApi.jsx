import {  useEffect,useState } from "react";
 
 
 
 
export function useFetch(url) {
   
    

    const [data,setData] = useState({})
    const [isLoading,setLoading] = useState(true)
    const [erreur,setErreur] = useState(false)

    useEffect(()=>{
        if(!url) return
        setLoading(true)
        const fetchData = async()=>{
            try{
                const respense = await fetch(url)
                const data = await respense.json()
                setData(data)

            }
            catch(err){
                console.log(err)
                setErreur(true)

            }
            finally{
                setLoading(false)

            }

        }
        fetchData()
         
         
    },[url])
    
    return {isLoading,data,erreur}

}
 