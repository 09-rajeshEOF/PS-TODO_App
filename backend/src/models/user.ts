import mongoose,{Schema,Document} from 'mongoose';

//for Type Saftey
interface User extends Document {
    id : string;
    username : string;
    email : string;
    password : string;

}

const userSchema: Schema = new Schema({
   username:{type : 'String',
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 50
   },
   email:{type:'String',
    required: true,
    unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
   },
   password:{type:'String',
    required: true,
    minlength: 8,
    maxlength: 15,
    validate : {
        validator:(value:string) => {
            const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            return passRegex.test(value);
        },
        message : 'Password must contain at least 8 characters, including uppercase, lowercase, numbers and special characters'
    },
    todoList : {
        type : mongoose.Types.ObjectId,
        ref : 'Todo'
    }
   }
})

const Users = mongoose.model<User>('User',userSchema);

export default Users;