import { AuthProviderData } from "@/interface/context"
import { IProviderProps } from "@/interface/provider"
import { IUserLogin } from "@/interface/user/userInterface"
import { createContext, useContext } from "react"
import api from "@/service/api"
import { setCookie } from "nookies"
import { Box, useToast } from "@chakra-ui/react"
import { useRouter } from "next/router"

const AuthContext = createContext<AuthProviderData> ({} as AuthProviderData)

const AuthProvider = ({ children }: IProviderProps) => {

    const toast = useToast()
    const router = useRouter()

    const login = (userData: IUserLogin) => {

        api.post(`/login`, userData)
        .then((response) => {
           
            setCookie(null, "m6.token", response.data.tokenUser,
            {
                maxAge:1440 * 60, path: "/"
            })
            setCookie(null, "m6.id", response.data.id,
            {
                maxAge:1440 * 60, path: "/"
            })
            setCookie(null, "m6.user", response.data.name,
            {
                maxAge:1440 * 60, path: "/"
            })
            toast({
                title: "sucess",
                variant: "solid",
                position: "bottom-right",
                isClosable: true,
                render: () => (
                    <Box
                        color={"gray.50"}
                        p={3}
                        bg={"green.600"}
                        fontWeight={"bold"}
                        borderRadius={"md"}
                    >
                        Login realizado com sucesso
                    </Box>
                )
            })
            console.log()
            router.push(`/Dashboard/User/${response.data.id}`)
        })
        .catch((error) => {
            console.error(error)
            toast({
                title: "error",
                variant: "solid",
                position: "bottom-right",
                isClosable: true,
                render: () => (
                    <Box
                        color={"gray.50"}
                        p={3}
                        bg={"red.600"}
                        fontWeight={"bold"}
                        borderRadius={"md"}
                    >
                        Não foi possível realizar o login
                    </Box>
                )
            })
        })
    }
    return (
        <AuthContext.Provider value={{ login }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider

export const useAuth = () => useContext(AuthContext)
