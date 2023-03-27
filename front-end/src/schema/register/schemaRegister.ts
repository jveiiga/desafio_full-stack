import * as yup from "yup"


const schemaRegister = yup.object().shape({
    name: yup.string().required("Nome é obrigatório"),
	email: yup.string().email().required("Email é obrigatório"),
	password: yup.string().required("Senha é obrigatório"), 
	phone: yup.string().required("Telefone é obrigatório"),
})

export default schemaRegister