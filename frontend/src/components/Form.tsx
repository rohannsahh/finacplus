import { useState } from "react"
import { toast } from "react-toastify";
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";


const Form = () => {
    interface Form {
        name?: string;
        age?: string;
        dob?: string;
        password?: string;
        gender?: string;
        about?: string;
    }
    const [password,Showpassword]= useState(false);
    const [errors, setErrors] = useState<Form>({});
    const [formData , SetformData] = useState({
        name:"",
        age:"",
        dob:"",
        password:"",
        gender:"",
        about:"",
    });

    const validate=()=>{

        const newErrors: Form = {};

        if (!formData.name.trim() || formData.name.length < 2) {
            newErrors.name = "Name must be at least 2 characters long.";
        }

        const age = Number(formData.age);
        if(!formData.age){
            newErrors.age ="Age is required"
        }
        if (isNaN(age) || age < 0 || age > 120 ) {
            newErrors.age = "Age must be a number between 0 and 120.";
        }

        if (!formData.dob) {
            newErrors.dob = "Date of birth is required.";
        } else {
            const dobDate = new Date(formData.dob);
            const today = new Date();
            const minDate = new Date();
            minDate.setFullYear(today.getFullYear() - 120); 
    
            if (dobDate > today) {
                newErrors.dob = "Date of birth cannot be in the future.";
            } else if (dobDate < minDate) {
                newErrors.dob = "Date of birth must be within the last 120 years.";
            }else{ const dobYear = dobDate.getFullYear();
const calculatedAge = today.getFullYear() - dobYear;
if (calculatedAge !== age) {
    newErrors.dob = "Age and Date of Birth do not match.";
}}
        }
       


        if (
            formData.password.length < 10 ||
            !/\d/.test(formData.password) || 
            !/[A-Za-z]/.test(formData.password) 
        ) {
            newErrors.password = "Password must be at least 10 characters long, containing letters and numbers.";
        }

        if (!formData.gender) {
            newErrors.gender = "Please select a gender.";
        }

        if (formData.about.length > 5000) {
            newErrors.about = "About section must be within 5000 characters.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
}


    const handleChange=(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>{
        SetformData({...formData,[e.target.id]:e.target.value})
    }

    const API_URL = import.meta.env.VITE_API_URL;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await fetch(`${API_URL}/api/user`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });
    
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Registration failed");
                }
    
                toast.success("Registration Successful");
                SetformData({
                    name: "",
                    age: "",
                    dob: "",
                    password: "",
                    gender: "",
                    about: "",
                });
    
                setErrors({});
            } catch (error) {
                toast.error((error as Error).message || "An error occurred. Please try again.");
            }
        }
    };
    


  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] bg-slate-100 p-2">
              <h1 className=" text-2xl m-3 font-bold text-yellow-600">Register </h1>

      <form className="p-3 border border-[#D1D5DB] max-w-xl w-full rounded-xl items-center  flex flex-col bg-white shadow-sm" onSubmit={handleSubmit}>

        <div className="w-full max-w-lg  flex flex-col">
        <div className="flex flex-col m-2">
            <label htmlFor="name" className="m-1 text-base ">Enter name</label>
            <input type="text" placeholder="Enter your name" id="name" className="rounded-lg border text-base border-[#D1D5DB] bg-gray-50 p-3 py-2"
            value={formData.name}
            onChange={handleChange}
            required>
            </input>
            {errors.name && <p className="text-red-500 text-base m-1">{errors.name}</p>}

        </div>
        <div className="flex flex-col m-2">
            <label htmlFor="age" className="m-1 text-base">Enter Age</label>
            <input type="number" placeholder="Enter your Age" id="age" className="rounded-lg border text-base border-[#D1D5DB] bg-gray-50 p-3 py-2"
             value={formData.age}
             onChange={handleChange}
             required></input>
             {errors.age && <p className="text-red-500 text-base mx-1">{errors.age}</p>}

        </div>
        <div className="flex flex-col m-2">
            <label htmlFor="dob" className="m-1 text-base">Enter DOB</label>
            <input type="date" placeholder="Enter your DOB" id="dob" className="rounded-lg border text-base text-gray-500 border-[#D1D5DB] bg-gray-50 p-3 py-2"
             value={formData.dob}
             onChange={handleChange}
             required
             max={new Date().toISOString().split("T")[0]}
             ></input>
            {errors.dob && <p className="text-red-500 text-base mx-1">{errors.dob}</p>}

        </div>
        <div className="flex flex-col m-2">
            <label htmlFor="password" className="m-1 text-base">Enter Password</label>
            <div className="relative w-full rounded-lg border-[#D1D5DB] border text-base bg-gray-50">

            <input type={password? "text":"password" }
            placeholder="Enter Password" id="password" className=" p-3 w-full py-2 text-base"
             value={formData.password}
             onChange={handleChange}
             required></input>
  <button 
            type="button" 
            onClick={() => Showpassword(!password)} 
            className="absolute inset-y-0 right-3 flex items-center">
            {password ? <IoEyeOff size={20} /> : <IoEye size={20} />}
        </button> 
        </div>          
         {errors.password && <p className="text-red-500 text-base mx-1">{errors.password}</p>}

        </div>
        <div className="flex flex-col m-2">
            <label htmlFor="gender" className="m-1 text-base">Gender</label>
            <select id="gender" className="rounded-lg border border-[#D1D5DB] bg-gray-50 p-3 py-2 text-base" value={formData.gender}  onChange={handleChange} required>
                <option value='' disabled hidden >Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Others</option>

            </select>
            {errors.gender && <p className="text-red-500 text-base mx-1">{errors.gender}</p>}

        </div>
        <div className="flex flex-col m-2">
            <label htmlFor="about" className="m-1 text-base">About</label>
            <textarea  placeholder=" About (max 5000 characters)" id="about" className="rounded-lg border text-base border-[#D1D5DB] bg-gray-50 py-2 p-3 h-20" maxLength={5000}
             value={formData.about} 
             onChange={handleChange}
required>
             </textarea>
                        {errors.about && <p className="text-red-500 text-base mx-1">{errors.about}</p>}

        </div>
        <div className="flex flex-colitems-center justify-center  mt-5 m-2">
            <button  id="button" type="submit" className="rounded-lg border hover:bg-yellow-500 p-3 py-2 w-full bg-[#F4B942]" >Register</button>

        </div>
        </div>
      </form>
    </div>
  )
}


export default Form;
