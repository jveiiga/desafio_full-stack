import {
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Flex,
  Link,
} from "@chakra-ui/react"
import { IContact } from "@/interface/contact/contactInterface"
import ModalUpdateForm from "./modalUpdateContactForm"
import { DeleteIcon } from "@chakra-ui/icons"
import { useContact } from "@/context/contactContext"
import NextLink from "next/link"
import { parseCookies } from "nookies"


const ContactCard = ({ name,email,phone } : IContact) => {

  const { deleteContact } = useContact()

    const cookie = parseCookies()
    const id = cookie["m6.id"]

    return (
      <>
        <Center 
        p={10}
        minH={"100vh"}
        flexDirection={"column"}
        >
        <Link
          m={5}
          as={NextLink}
          href={`/Dashboard/User/${id}`}
          ml={370}
          border={"1px"}
          borderRadius={10}
          borderColor="blue.300"
          p={2}
          _hover={{
            bg: 'blue.700',
        }}
        >
          Voltar
        </Link>
          <Flex
            maxW={"445px"}
            w={"full"}
            height={332}
            bg={useColorModeValue("white", "gray.900")}
            boxShadow={"2xl"}
            rounded={"md"}
            p={6}
            overflow={"hidden"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            >
            <Flex
              width={"80%"}
              fontSize={"2xl"}
              color={"blue.300"}
              justifyContent={"space-between"}
              mb={10}
            >
              <ModalUpdateForm />
              <DeleteIcon
                onClick={() => deleteContact()}
                ml={4}
                cursor={"pointer"}
              />
            </Flex>
            <Stack>
              <Text
                color={"blue.300"}
                textTransform={"uppercase"}
                fontWeight={800}
                fontSize={"sm"}
                letterSpacing={1.1}>
                Nome: {name}
              </Text>
              <Heading
                color={useColorModeValue("gray.700", "white")}
                fontSize={"2xl"}
                fontFamily={"body"}>
                Email: {email}
              </Heading>
              <Heading
                color={useColorModeValue("gray.700", "white")}
                fontSize={"2xl"}
                fontFamily={"body"}>
                Telefone: {phone}
              </Heading>
            </Stack>
          </Flex>
        </Center>
      </>
    )
}

export default ContactCard