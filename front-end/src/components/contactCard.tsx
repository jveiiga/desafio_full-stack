import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react"
import { IContact } from "@/interface/contact/contactInterface"
import ModalUpdateForm from "./modalUpdateForm"
import { DeleteIcon } from "@chakra-ui/icons"
import { useContact } from "@/context/contactContext"


const ContactCard = ({ name,email,phone } : IContact) => {

  const { deleteContact } = useContact()

    return (
      <Center p={10}>
        <ModalUpdateForm />
        <Box
          maxW={"445px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          rounded={"md"}
          p={6}
          overflow={"hidden"}>
          <Box
            h={"210px"}
            bg={"gray.100"}
            mt={-6}
            mx={-6}
            mb={6}
            pos={"relative"}>  
          </Box>
          <Stack>
            <Text
              color={"green.500"}
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
        </Box>
        <DeleteIcon
          onClick={() => deleteContact()}
          ml={4}
          cursor={"pointer"}
        />
      </Center>
    )
}

export default ContactCard