import { hashSync } from "bcryptjs";
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { IContact } from "../interface/contact/contactInterface";
import { Contact } from "./contact.entity";

@Entity("users")
    class User {
        @PrimaryGeneratedColumn("uuid")
        id: string;

        @Column({ type: "varchar" })
        name: string;

        @Column({ type: "varchar", unique: true })
        email: string;

        @Column({ type: "varchar" })
        password: string;

        @Column({ type: "varchar", unique: true })
        phone: string;

        @CreateDateColumn({ type: "date" })
        createdAt: Date | string;

        @BeforeInsert()
        @BeforeUpdate()
        hashPassword() {
            this.password = hashSync(this.password, 10)
        }

        @OneToMany(() => Contact, (contact) => contact.user, { nullable: true })
        contacts: IContact[]
    }

export { User }