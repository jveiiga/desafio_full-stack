import { RegisterProviderData } from "@/interface/context";
import { IProviderProps } from "@/interface/provider";
import { IUserRegister } from "@/interface/user/userInterface";
import api from "@/service/api";
import { Box, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, useContext } from "react";


const RegisterContext = createContext<RegisterProviderData> ({} as RegisterProviderData)

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
                        Usuário criando com sucesso
                    </Box>
                )
            })
            router.push("/Dashboard")
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
                        Não foi possível 
                    </Box>
                )
            })
        })
    }
    return (
        <RegisterContext.Provider value={{ registerUser }}>
            { children }
        </RegisterContext.Provider>
    )
}

export default RegisterProvider

export const useRegister = () => useContext(RegisterContext)