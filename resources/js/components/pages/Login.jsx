import { useState } from "react";
import { json, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { loadUser, login } from "../../api/auth";

export default function Login() {
    const [email, setEmail] = useState("admin@example.com");
    const [password, setPassword] = useState("password");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: async () => {
            navigate("/dashboard");
        },
    });
    async function handleSubmit() {
        try {
            setIsLoading(true);
            mutation.mutate({
                email,
                password,
            });
            setIsLoading(false);
        } catch ({ response }) {
            console.log(response);
            // alert("Error: " + response?.data?.message);
            setIsLoading(false);
        }
    }
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        onSubmit={(e) => (handleSubmit(), e.preventDefault())}
                        className="space-y-6"
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email here"
                                    className="pl-2 shadow border text-sm rounded-lg outline-none focus:ring-2 hover:focus:ring-indigo-600 w-full p-2.5 placeholder-gray-400"
                                />
                                {/* <input
                  type="text"
                  id="first_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hidden:outline focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John"
                  required
                /> */}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Password here"
                                    type="password"
                                    className="pl-2 shadow border text-sm rounded-lg outline-none focus:ring-2 hover:focus:ring-indigo-600 w-full p-2.5 placeholder-gray-400"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className={`${
                                    isLoading ||
                                    !email.length ||
                                    !password.length
                                        ? "!bg-gray-400"
                                        : ""
                                } flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                                disabled={
                                    isLoading ||
                                    !email.length ||
                                    !password.length
                                }
                            >
                                {isLoading ? (
                                    <span>loading ...</span>
                                ) : (
                                    <span>Sign in</span>
                                )}
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{" "}
                        <Link
                            to={"/register"}
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                            Click for Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
