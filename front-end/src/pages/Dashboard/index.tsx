import { IContact, IProps } from "@/interface/contact/contactInterface"
import api from "@/service/api"
import { GetServerSideProps, NextPage } from "next"
import { Button, Center, Link, List, ListItem } from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"
import ModalForm from "@/components/modalForm"
import nookies, { destroyCookie } from "nookies"


const Dashboard: NextPage<IProps> = ({ contacts }) => {
  
  const router = useRouter()
  
  const logOut = () => {
    destroyCookie(null, "m6.token")
    destroyCookie(null, "m6.user")

    router.push("/Login")
  }
 
  return (
    <>
      <Button onClick={logOut}>Sair</Button>
      <ModalForm />
      <Center>
        <List>
          {
            contacts.map((contact, index) => {
              return (
                <ListItem key={index}>
                    <Link as={NextLink} href={`/Dashboard/${contact.id}`}>
                      {contact.name}
                    </Link>
                </ListItem>
              )
            })
          }
        </List>
      </Center>
    </>
  )
}

//SSR - Server Side Render (Pré renderização lado servidor)
const id: string = "7454b1a0-a83a-4261-ac3a-2516a99c4261"

export const getServerSideProps: GetServerSideProps<IProps> = async (ctx) => {
  
  const cookies = nookies.get(ctx)
  
  if (!cookies["m6.token"]) {
    return {
      redirect: {
        destination: "/Login",
        permanent: false
      }
    }
  }
  
  const response = await api.get(`/contacts/users/${id}`)
  const contacts: IContact[] = response.data

  return {props: {contacts}}
}

export default Dashboard

//CSR = Client Server Rendering