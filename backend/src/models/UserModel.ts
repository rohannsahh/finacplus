import mongoose ,{Schema,Document}from 'mongoose'
import bcrypt from 'bcrypt';

export interface IUser extends Document{
    name: string;
    age:number;
    dob:Date;
    password:string;
    gender:"Male"|"Female"|"Others";
    about?:string;
}

const UserSchema:Schema = new Schema({
  name:{
    type:String,
    required:true,
    minlength:2,

  },
 
  age:{
    type: Number,
    required:true,
    min:0, 
    max:120,
  },
  dob:{
    type:Date,
    required:true,
  },
  password:{
    type:String ,
    required : true,
    minlength:10,
  },
  gender:{
    type:String,
    required:true,
    enum:["Male","Female", "Others"],
  },
  about:{
    type:String,
    maxlength:5000,
  }
})

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); 
    this.password = await bcrypt.hash(this.password as string, 10);
    next();
});

export default mongoose.model<IUser>("User",UserSchema);
