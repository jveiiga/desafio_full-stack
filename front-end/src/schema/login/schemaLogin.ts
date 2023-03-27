import * as yup from "yup"


const formSchema = yup.object().shape({
    email: yup.string().email().required("E-mail obrigatório"),
    password: yup.string().required("Senha obrigatório")
})

export default formSchema