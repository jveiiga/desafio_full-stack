import { ContactProviderData } from "@/interface/context"
import { IProviderProps } from "@/interface/provider"
import api from "@/service/api"
import { Box, useToast } from "@chakra-ui/react"
import { createContext, useContext, useState } from "react"
import { parseCookies } from "nookies"
import { IContacCreate, IContactUpdate } from "@/interface/contact/contactInterface"
import { useRouter } from "next/router"

const ContactContext = createContext<ContactProviderData> ({} as ContactProviderData)

const ContactProvider = ({ children }: IProviderProps) => {

    const toast = useToast()
    const router = useRouter()

    const [contactId, setContactId] = useState<number>(0)

    const registerContact = (contactData: IContacCreate) => {

        const refreshData = () => {
            router.replace(router.asPath);
          };

        const cookie = parseCookies()
        const token = cookie["m6.token"]

        api.defaults.headers.authorization = `Bearer ${token}`

        api.post(`/contacts`, contactData)
        .then((response) => {
            console.log(response.data)
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
                        Contato Criado com sucesso
                    </Box>
                )
            })
            refreshData()
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
                        Problemas ao criar um usuário
                    </Box>
                )
            })
        })
    }

    const updateContatc = (contactData: IContactUpdate) => {

        const refreshData = () => {
            router.replace(router.asPath);
          };

        const id = contactId

        const cookie = parseCookies()
        const token = cookie["m6.token"]
        const userId = cookie["m6.id"]

        api.defaults.headers.authorization = `Bearer ${token}`

        api.patch(`/contacts/${id}`, contactData)
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
                        Contato editado com sucesso
                    </Box>
                )
            })
            refreshData()
            router.push(`/Dashboard/User/${userId}`)
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
                        Problemas ao editar o contato
                    </Box>
                )
            })
        })
    }

    const deleteContact = () => {

        const id = contactId

        const cookie = parseCookies()
        const token = cookie["m6.token"]
        const idUser = cookie["m6.id"]

        api.defaults.headers.authorization = `Bearer ${token}`

        api.delete(`/contacts/${id}`)
        .then((response) => {
            router.push(`/Dashboard/User/${idUser}`)
        })
        .catch((error) => console.error(error))
    }   

    return (
        <ContactContext.Provider value={{
            registerContact,
            updateContatc,
            deleteContact,
            setContactId,
        }}>
            { children }
        </ContactContext.Provider>
    )
}

export default ContactProvider

export const useContact = () => useContext(ContactContext)