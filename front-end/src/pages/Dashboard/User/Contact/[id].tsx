import ContactCard from "@/components/contactCard"
import { IContact, IPropsCard, IPropsContact } from "@/interface/contact/contactInterface"
import api from "@/service/api"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { useRouter } from "next/router"


const Contact: NextPage<IPropsCard> = ({ contacts }) => {
 
    const router = useRouter()
  
    return (
        <>
            <ContactCard
            name={contacts.name}
            email={contacts.email}
            phone={contacts.phone}
            />
        </>
    )
}

export const getStaticPaths = async () => {
    return {
        paths: [
            {params: {id: "1"}},
            {params: {id: "2"}}
        ],
        fallback: "blocking"
    }
}

//SSG - Static Site Generation (Pré renderização lado cliente(browser))
export const getStaticProps: GetStaticProps<IPropsContact> = async (ctx) => {

    const id = ctx.params!.id
    const response = await api.get(`/contacts/users/${id}`)
    const contacts: IContact = response.data
    
    return { props: { contacts }}
}

export default Contact