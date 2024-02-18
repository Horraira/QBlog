import { useForm } from "react-hook-form";
import { Form, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import { useContext } from "react";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInUser } = useContext(AuthContext);

    const onSubmit = (data) => {
        signInUser(data);
    }
    return (
        <div className="bg-base-200 py-16">
            <div className="mb-6">
                <h1 className="text-5xl text-center font-bold">LogIn!</h1>
            </div>
            <div className="hero">
                <Form onSubmit={handleSubmit(onSubmit)} className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username <span className="text-red-400">*</span> </span>
                            </label>
                            <input
                                type="text"
                                {...register("username", {
                                    required: "**Username is Required",
                                    minLength: { value: 3, message: "**Username must be at least 3 characters" },
                                    maxLength: { value: 15, message: "**Username must be at most 15 characters" },
                                    pattern: { value: /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/, message: "**Invalid Username" }
                                })}
                                placeholder="Enter Username"
                                className="input input-bordered"
                            />
                            {errors.username && <p className="text-red-700 mt-2">{errors.username?.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password <span className="text-red-400">*</span> </span>
                            </label>
                            <input
                                type="password"
                                {...register("password",
                                    {
                                        required: "**Password is Required",
                                        minLength: { value: 6, message: "**Password must be at least 6 characters" }
                                    }
                                )}
                                placeholder="Enter your password"
                                className="input input-bordered"
                            />
                            {errors.password && <p className="text-red-700 mt-2">{errors.password?.message}</p>}
                        </div>
                        <div className="form-control mt-3">
                            <button className="btn btn-primary">LogIn</button>
                        </div>
                        <div>
                            <label className="label text-center">
                                <p className="label-text-alt">Not Resigtered? &nbsp;
                                    <Link to="/signup" className="label-text-alt link link-hover text-primary">
                                        Goto Registration
                                    </Link></p>
                            </label>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Login;

