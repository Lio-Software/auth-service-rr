import { Column, DataType, Model, Table } from "sequelize-typescript";

export interface UserAttributes {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    uuid: string;
}

@Table({
    tableName: "users",
    modelName: "User",
    timestamps: true,
})

export default class UserModel extends Model implements UserAttributes {
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        autoIncrement: true,
        unique: true,
    })
    declare id: number;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    declare firstName: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    declare lastName: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
        unique: true,
    })
    declare email: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    declare password: string;

    @Column({
        allowNull: true,
        defaultValue: DataType.UUIDV4,
        type: DataType.UUIDV4,
        unique: true,
    })
    declare uuid: string;
}
