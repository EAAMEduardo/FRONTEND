import { createContext, useContext, useEffect, useState   } from "react";
import {register, singIn, google, update, verifyTokenRequest, logout, deleteAccount, deleteFav, getOwner} from "../api/auth"
import Cookie from "js-cookie"
import {createListingRequest, getListingsRequest, deleteRequest, updateListingRequest} from "../api/listing"




const AuthContext = createContext()


const useAuth = () => {
    const context = useContext(AuthContext)

    if(!context) {
        throw Error("Thres no context to use")
    }
    return context
}


const AuthProvider = ({children}) => {

    const [user, setUser] = useState()
    const [success, setSuccess] = useState(false)
    const [fails, setFails] = useState([])
    const [ listings, setListings] = useState([])
    const [isAuth, setIsAuth] = useState(false)


    console.log(Cookie.get())

    
   
   
    
   


    const singup = async (user) => {
       try {
          const result = await register(user)
          console.log(result.data)
          setSuccess(true)
          setUser(result.data)
          setIsAuth(true)
          setTimeout(() => {
            setSuccess(false)
          }, 4000);
        
        
       } catch (error) {
         console.log(error)
         setFails(error.response.data)

         setTimeout(() => {
            setFails([])
         }, 4000);
       }
    }

    const login = async (user) => {
       try {
        const result = await singIn(user)
        console.log(result)
        setIsAuth(true)
        setUser(result.data)
        Cookie.set("token", result.data.keyToken)
       } catch (error) {
        console.log(error)
       setFails(error.response.data)
        setTimeout(() => {
            setFails([])
        }, 4000);
       }
    }


    const googleIn = async (user) => {
        try {
            const result = await google(user)
            console.log(result)
            setUser(result.data)
            Cookie.set("token", result.data.keyToken)
            setIsAuth(true)
        } catch (error) {
            console.log(error)
            setFails(error.response.data)
        }
    }

    const updateProfile = async (id, user) => {
       try {
        const result = await update(id, user)
        console.log(result)
        setIsAuth(true)
        setUser(result.data)
       } catch (error) {
         console.log(error)
         setFails(error.response.data)
       }
    }

    const singOut = async () => {
        await logout()    
        Cookie.remove("token");
        setUser(null);
        setIsAuth(false);
    }


    const revomeAccount = async (id) => {
       try {
         const result =  await deleteAccount(id)
         console.log(result)
         setIsAuth(false)
         setUser()
         Cookie.remove("token")
       } catch (error) {
        console.log(error)
        setFails(error.response.data)
       }
    }

    const createListing = async (data) => {
        try {
            const result = await createListingRequest(data)
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

    const getListings = async (id) => {
        try {
            const result = await getListingsRequest(id)
            console.log(result.data)
            setListings(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteListing = async (id) => {
        try {
            const result = await deleteRequest(id)
            console.log(result)
        } catch (error) {
           console.log(error)
        }
    }

    const updateListing = async (id, data) => {
        try {
            const result = await updateListingRequest(id, data)
            console.log(result)
        } catch (error) {
            setFails(error.response.data)
            console.log(error)
        }
    }


    const removeFav = async (id, listing) => {
        try {
            const result = await deleteFav(id, listing)
            console.log(result)
            setUser(result.data)
        } catch (error) {
            setFails(error.response.data)
            console.log(error.response)
        }
    }


    useEffect(() => {
         
        const checkToken = async () => {
            const cookies = Cookie.get()
          
            if(!cookies.token) {
                setUser(null)
                setIsAuth(false)
            }


            try {
                const res = await verifyTokenRequest(cookies.token)
                console.log(res)
                if(!res.data) return setIsAuth(false)

                setUser(res.data)
                setIsAuth(true)
            } catch (error) {
                console.log(error)
                setIsAuth(false)
            }
        }

        checkToken()
    }, [])



    return(
        <AuthContext.Provider value={{
            user,
            singup,
            success,
            fails,
            isAuth,
            login,
            googleIn,
            updateProfile,
            singOut,
            revomeAccount,
            createListing,
            getListings,
            setFails,
            listings,
            deleteListing,
            updateListing,
            setUser,
            removeFav
        }}>
            {children}
        </AuthContext.Provider>
    )
}


export {
    AuthContext,
    useAuth,
    AuthProvider
}