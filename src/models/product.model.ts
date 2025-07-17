import { Column, DataType, Model, Table, } from "sequelize-typescript";

@Table({
    tableName: 'products',
    timestamps: true, // This automatically manages 'createdAt' and 'updatedAt'
})
export class Product extends Model {

    @Column(
        {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }
)
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        
    })
    name!: string;

    @Column({
        type: DataType.TEXT, // Use TEXT for potentially long descriptions
        allowNull: true, // Description is optional
    })
    description?: string; // Use '?' for optional properties

    @Column({
        type: DataType.DECIMAL(10, 2), // Recommended for currency: 10 total digits, 2 after decimal
        allowNull: false,
    })
    price!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0, // A good default for stock
    })
    stockQuantity!: number;

    @Column({
        type: DataType.STRING, // URL to the image
        allowNull: true,
    })
    imageUrl?: string;

    @Column({
        type: DataType.STRING, // E.g., "Electronics", "Books", "Clothing"
        allowNull: true, // Or false if every product must have a category string
    })
    category?: string;

     @Column(DataType.DATE)
    createdAt!: Date;

    @Column(DataType.DATE)
    updatedAt!: Date;

   
}