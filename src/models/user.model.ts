import mongoose, { Document, Schema } from 'mongoose';

// Define the User interface
export interface IUser extends Document {
    username: string;
    email: string;
    // password: string;
    createdAt: Date;
    updatedAt: Date;
}

// Create the User schema
const userSchema: Schema<IUser> = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        // password: {
        //     type: String,
        //     required: true,
        // },
    },
    {
        timestamps: true, // Automatically create createdAt and updatedAt fields
    }
);

// Create the User model
const User = mongoose.model<IUser>('User', userSchema);
export default User