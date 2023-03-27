import {
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalContent,
    ModalHeader,
    useDisclosure,
    ModalOverlay,
    ModalBody,
    FormHelperText,
    FormErrorMessage,
    ModalFooter,
    Button,
    CloseButton,
} from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import { useForm } from "react-hook-form"
import { IContacCreate } from "@/interface/contact/contactInterface"
import { yupResolver } from "@hookform/resolvers/yup"
import schemaContact from "@/schema/contact/schemaContact"
import { useState } from "react"



const ModalForm = () => {

    const { onOpen, isOpen, onClose } = useDisclosure()
    const [inputName, setInputNome] = useState("")
    const [inputEmail, setInputEmail] = useState("")
    const [inputPhone, setInputPhone] = useState("")

    const nameError = inputName === ""
    const emailError = inputEmail === ""
    const phoneError = inputPhone === ""

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IContacCreate>({
        resolver: yupResolver(schemaContact)
    })

    const onFormSubmit = (formData: IContacCreate) => {
        console.log(formData)
    }
    return (
        <>
            <AddIcon onClick={onOpen} />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />

                <ModalContent>
                    <ModalHeader>Novo Contato</ModalHeader>
                    <ModalBody>
                        <CloseButton 
                            onClick={onClose}
                        />
                        <FormControl isRequired isInvalid={nameError}>
                            <FormLabel>Nome</FormLabel>
                            <Input
                                required type="text"
                                {...register("name")}
                                focusBorderColor="blue.300"
                                onChange={(event) => setInputNome(event.target.value)}
                            />
                            {!emailError ? (
                                <FormHelperText>
                                    Digite seu nome
                                </FormHelperText>
                            ) :
                                (
                                    <FormErrorMessage>
                                        {errors.name?.message}
                                    </FormErrorMessage>
                                )
                            }
                        </FormControl>

                        <FormControl isRequired isInvalid={emailError}>
                            <FormLabel>Email</FormLabel>
                            <Input
                                required type="email"
                                {...register("email")}
                                focusBorderColor="blue.300"
                                onChange={(event) => setInputEmail(event.target.value)}
                            />
                            {!emailError ? (
                                <FormHelperText>
                                    Digite seu email
                                </FormHelperText>
                            ) :
                                (
                                    <FormErrorMessage>
                                        {errors.email?.message}
                                    </FormErrorMessage>
                                )
                            }
                        </FormControl>


                        <FormControl isRequired isInvalid={phoneError}>
                            <FormLabel>Telefone</FormLabel>
                            <Input
                                required type="text"
                                {...register("phone")}
                                focusBorderColor="blue.300"
                                onChange={(event) => setInputPhone(event.target.value)}
                            />
                            {!emailError ? (
                                <FormHelperText>
                                    Digite seu Telefone
                                </FormHelperText>
                            ) :
                                (
                                    <FormErrorMessage>
                                        {errors.phone?.message}
                                    </FormErrorMessage>
                                )
                            }
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            size="lg"
                            type="submit"
                            variant={"default"}
                            _hover={{
                                bg: 'blue.700',
                            }}
                            onClick={handleSubmit(onFormSubmit)}
                        >
                            Cadastrar novo contato
                        </Button>
                    </ModalFooter>

                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalForm