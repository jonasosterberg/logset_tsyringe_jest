import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({ name: 'User' })
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column()
    birthDay: string

    @Column()
    age: string

    @Column()
    email: string
} 