import { 
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { User } from "./user.entity";

@Entity("contacts")
    class Contact {
        @PrimaryGeneratedColumn("increment")
        id: number;

        @Column({ type: "varchar" })
        name: string;

        @Column({ type: "varchar", unique: true })
        email: string;

        @Column({ type: "varchar", unique: true })
        phone: string;

        @CreateDateColumn({ type: "date" })
        createdAt: Date | string;

        @ManyToOne(() => User, (users) => users.contacts, { eager: true })
        user: User
    }

export { Contact }