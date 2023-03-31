import { UserProviderData } from "@/interface/context";
import { IProviderProps } from "@/interface/provider";
import { IUserRegister, IUserUpdate } from "@/interface/user/userInterface";
import api from "@/service/api";
import { Box, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { createContext, useContext } from "react";


const RegisterContext = createContext<UserProviderData> ({} as UserProviderData)

const RegisterProvider = ({ children }: IProviderProps) => {

    const toast = useToast()
    const router = useRouter()

    const registerUser = (userData: IUserRegister) => {

        api.post(`/users`, userData)
        .then((response) => {
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
                        Usuário criado com sucesso
                    </Box>
                )
            })
            router.push("/Login")
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
                        Não foi possível se registrar
                    </Box>
                )
            })
        })
    }

    const updateUser = (userData: IUserUpdate) => {

        const cookie = parseCookies()
        const id = cookie["m6.id"]
        const token = cookie["m6.token"]

        api.defaults.headers.authorization = `Bearer ${token}`

        api.patch(`/users/${id}`, userData)
            .then((response) => {
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
                            Dados atualizados com sucesso
                        </Box>
                    )
                })
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
                            Não foi possível atualizar os dados
                        </Box>
                    )
                })
            })
    }

    const deleteUser = () => {

        const cookie = parseCookies()
        const id = cookie["m6.id"]
        const token = cookie["m6.token"]

        api.defaults.headers.authorization = `Bearer ${token}`

        api.delete(`/users/${id}`)
        .then((response) => (response))
        router.push("/Login")
        .catch((error) => {
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
                        Problemas ao deletar seu usuário
                    </Box>
                )
            })
        })

    }

    return (
        <RegisterContext.Provider value={{
            registerUser,
            updateUser,
            deleteUser,
        }}>
            { children }
        </RegisterContext.Provider>
    )
}

export default RegisterProvider

export const useUser = () => useContext(RegisterContext)