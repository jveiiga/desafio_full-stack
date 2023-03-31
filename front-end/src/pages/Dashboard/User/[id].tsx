import { IContact, IProps } from "@/interface/contact/contactInterface"
import api from "@/service/api"
import { GetServerSideProps, NextPage } from "next"
import { Box, Button, Center, Flex, Link, List, ListItem } from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"
import ModalForm from "@/components/modalForm"
import nookies, { destroyCookie, parseCookies } from "nookies"
import { useContact } from "@/context/contactContext"
import ModalUpdateUserForm from "@/components/modalUpdateUserForm"


const Dashboard: NextPage<IProps> = ({ contacts }) => {
  
  const { setContactId } = useContact()
  
  const router = useRouter()

  const cookie = parseCookies()
  const name = cookie["m6.user"]

  const logOut = () => {

    destroyCookie(null, "m6.token")
    destroyCookie(null, "m6.user")

    router.push("/Login")
  }
 
  return (
    <>
      <Flex
        mt={10}
        justifyContent="space-around"
      >
        <Flex
          justifyContent="center"
          alignItems={"center"}
        >
          <Box
             fontSize="2xl"
          >
            {name}
          </Box>
          <ModalUpdateUserForm/>
        </Flex>
        <Button onClick={logOut}>Sair</Button>
      </Flex>

      <Center
        mt={20}
        minH={"100vh"}
        fontSize="2xl"
        alignItems={"flex-start"}
      >
        <List>
        <ModalForm />
          {
            contacts.map((contact, index) => {
              return (
                <ListItem key={index}>
                  <Flex
                    alignItems={"flex-start"}
                    >
                    <Link
                    borderRadius={12}
                    border={"1px"}
                    borderColor="blue.300"
                    p={2}
                    pe={20}
                    ps={20}
                    mb={10}
                    width="100%"
                    textAlign={"center"}
                    textDecoration={"none"}
                    onClick={() => setContactId((contact.id!))}
                    as={NextLink}
                    href={`/Dashboard/User/Contact/${contact.id}`}
                    >
                      {contact.name}
                    </Link>
                  </Flex>
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