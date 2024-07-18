import mongoose,{Schema,Document} from 'mongoose';
import Users from './user';
interface TodoApp extends Document {
    id : string;
    title : string;
    description : string;
    status : 'pending' | 'completed';
    duedate ?: Date;
    priority ?: 'high' | 'medium' | 'low';
}
const TodoListSchema : Schema = new Schema({
    title : {type:String,required:true},
    description : {type:String,required:true,
        Users:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    },
    status : {type : String,enum:['pending','completed'],default:'pending'},
    dueDate: { type: Date }, 
    priority: { type: String, enum: ['high', 'medium', 'low'] },
})
const Todo = mongoose.model<TodoApp>('Todo',TodoListSchema);
export default Todo;