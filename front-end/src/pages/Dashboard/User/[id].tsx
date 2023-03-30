import { IContact, IContactUpdate, IProps } from "@/interface/contact/contactInterface"
import api from "@/service/api"
import { GetServerSideProps, NextPage } from "next"
import { Button, Center, Link, List, ListItem } from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"
import ModalForm from "@/components/modalForm"
import nookies, { destroyCookie } from "nookies"
import { useState } from "react"
import { useContact } from "@/context/contactContext"
import { DeleteIcon } from "@chakra-ui/icons"


const Dashboard: NextPage<IProps> = ({ contacts }) => {
  
  const router = useRouter()
  const { setContactId } = useContact()

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
                    <Link
                    onClick={() => setContactId((contact.id!))}
                    as={NextLink}
                    href={`/Dashboard/User/Contact/${contact.id}`}
                    >
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

export const getServerSideProps: GetServerSideProps<IProps> = async (ctx) => {

  const id = ctx.params!.id
  const cookies = nookies.get(ctx)
  // console.log(cookies)
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

  // const updateContactAnswer = await api.patch(`/contacts/${id}`)
  // const contact: IContactUpdate = updateContactAnswer.data  

  return {props: {contacts}}
}

export default Dashboard

//CSR = Client Server Rendering