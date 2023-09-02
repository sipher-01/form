import { useForm } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup";

const Form = () => {
    const Submit = (data) => {
        console.log(data);
    };
    
    const schema = yup.object().shape({
        fullName: yup.string().required("Your Full Name is Required"),
        age: yup.number().min(18).required("age is Required"),
        email: yup.string().email().required("Email is Required"),
        password: yup.string().min(4).max(20).required("Password is empty"),
        confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null])
        .required(),
    });
    
    const { register, handleSubmit , formState:{errors}} = useForm({
      resolver : yupResolver(schema),
    });
  return (
    <div>
      <form onSubmit={handleSubmit(Submit)}>
        <input type="text" placeholder="Name" {...register("fullName")} />
        <p>{errors.fullName?.message}</p>
        <input type="number" placeholder="Age" {...register("age")} />
        <p>{errors.age?.message}</p>
        <input type="email" placeholder="Email" {...register("email")} />
        <p>{errors.email?.message}</p>
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <p>{errors.password?.message}</p>
        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Form;
