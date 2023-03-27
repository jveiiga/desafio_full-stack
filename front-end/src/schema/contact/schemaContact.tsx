import * as yup from "yup"


const schemaContact = yup.object().shape({
    name: yup.string().required("Nome é obrigatório"),
    email: yup.string().email(),
    phone: yup.string().required("Telefone é obrigatório")
})

export default schemaContact