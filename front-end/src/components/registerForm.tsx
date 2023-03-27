import {
    Flex as Form,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    useColorModeValue,
  } from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import { IUserRegister } from '@/interface/user/userInterface'
import schemaRegister from '@/schema/register/schemaRegister'
import { useRegister } from '@/context/registerContext'


const RegisterForm = () => {

    const [showPassword, setShowPassword] = useState(false)
    const { registerUser } = useRegister() 
    console.log(registerUser)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IUserRegister> ({
        resolver: yupResolver(schemaRegister)
    })

    const onFormSubmit = (formData: IUserRegister) => {
      console.log(formData)
      registerUser(formData)
    }

    return (
      <Form
        minH={'80vh'}
        align={'center'}
        justify={'center'}
        as="form"
        bg={useColorModeValue('gray.50', 'gray.800')}
        onSubmit={handleSubmit(onFormSubmit)}
        >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Cadastre-se
            </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4} minW={"200px"}>

              <FormControl id="name" isRequired>
                <FormLabel>Nome</FormLabel>
                <Input required focusBorderColor="blue.300" type="text" {...register("name")}/>
              </FormControl>

              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input required focusBorderColor="blue.300" type="email" {...register("email")}/>
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Senha</FormLabel>
                <InputGroup>
                  <Input required focusBorderColor="blue.300" type={showPassword ? 'text' : 'password'} {...register("password")}/>
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl id="phone" isRequired>
                <FormLabel>Telefone</FormLabel>
                <Input required focusBorderColor="blue.300" type="phone" {...register("phone")}/>
              </FormControl>
              
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  type="submit"
                  variant={"default"}
                  _hover={{
                    bg: 'blue.700',
                  }}>
                  Entrar
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Form>
    );
  }

export default RegisterForm