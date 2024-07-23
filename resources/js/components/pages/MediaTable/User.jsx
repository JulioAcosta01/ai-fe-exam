import {
  CloudIcon,
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createUsers, deleteUsers, getUsers, updateUsers } from "../../../api/users";
import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

export default function User() {
  const TableHeaders = [
    {
      width: 0,
      header: "Actions",
    },
    {
      width: 0,
      header: "Firstname",
    },
    {
      width: 0,
      header: "Lastname",
    },
    {
      width: 0,
      header: "Type",
    },
    {
      width: 0,
      header: "Status",
    },
    {
      width: 0,
      header: "Email",
    },
  ];

  const [loading, setLoading] = useState(false);

  let [insertDialog, setInsertDialog] = useState(false);
  let [updateDialog, setUpdateDialog] = useState(false);
  let [deleteDialog, setDeleteDialog] = useState(false);
  let [isShowPassword, setIsShowPassword] = useState(false);
  let [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState(false);

  const initialState = {
    logo: "",
    name: "",
    status: "",
    status: "Draft",
  };
  const [formData, setFormData] = useState({ ...initialState });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const CREATE_USER = useMutation({
    mutationFn: createUsers,
    onSuccess: async () => {
      alert("Add User Successfully!");
      usersRefetch();
      setInsertDialog(false);
      setFormData({ ...initialState });
    },
    onError: async () => {
      alert("Error, Please complete to fill-up the all field!");
    },
  });

  const UPDATE_USER = useMutation({
    mutationFn: updateUsers,
    onSuccess: async () => {
      alert("Update User Successfully!");
      usersRefetch();
      setUpdateDialog(false);
      setFormData({ ...initialState });
    },
    onError: async () => {
      alert("Error, Please complete to fill-up the all field!");
    },
  });
  const DELETE_USER = useMutation({
    mutationFn: deleteUsers,
    onSuccess: async () => {
      alert("Delete User Successfully!");
      usersRefetch();
      setDeleteDialog(false);
      setFormData({ ...initialState });
    },
    onError: async () => {
      alert("Error, Please complete to fill-up the all field!");
    },
  });

  /* -------------------------------------------------------------------------- */
  /*                         CREATE, UPDATE, DELETE HERE                        */
  /* -------------------------------------------------------------------------- */

  // CREATE USER
  const handleSubmit = async e => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      CREATE_USER.mutate(formData);
      // setLoading(false);
    } catch ({ response }) {
      console.log(response);
      alert("Error: " + response?.data?.message);
      // setIsLoading(false);
    }
  };

  //click edit button
  const toggleEdit = field => {
    // Example: Updating the 'title' and 'status' fields in formData
    setFormData({
      // Spread the existing formData first
      // Update specific fields
      ...formData,
      id: field.id,
      firstname: field.firstname,
      lastname: field.lastname,
      type: field.type,
      status: field.status,
      email: field.email,
    });
    setUpdateDialog(true);
  };

  // UPDATE USER
  const handleUpdate = async e => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      // setLoading(true);
      UPDATE_USER.mutate(formData);
      // setLoading(false);
    } catch ({ response }) {
      console.log(response);
      // alert("Error: " + response?.data?.message);
      // setIsLoading(false);
    }
  };
  // DELETE USER
  const handleDelete = async e => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      // setLoading(true);
      DELETE_USER.mutate(formData);
      // setLoading(false);
    } catch ({ response }) {
      console.log(response);
      // alert("Error: " + response?.data?.message);
      // setIsLoading(false);
    }
  };

  const {
    status: userStatus,
    data: usersData,
    error: userError,
    refetch: usersRefetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (userStatus === "pending") {
    return <span>Loading...</span>;
  }

  if (userError === "error") {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <div className="flex flex-col overflow-auto">
        <div className="shrink-0 px-2 py-4 flex justify-between items-center">
          <span className="font-bold text-lg">USER PAGE</span>
          <button
            onClick={() => setInsertDialog(true)}
            className="inline-flex items-center bg-[#00695c] uppercase px-3 py-1.5 border-none rounded-md shadow text-white text-sm font-semibold hover:bg-[#00695c]/70"
          >
            <PlusIcon className="size-4 text-white mr-1" />
            Create
          </button>
        </div>
        <div className="flex-1">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {TableHeaders.map((col, key) => (
                  <th
                    key={key}
                    style={{ width: col.width || null }}
                    className="px-3 py-3"
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {usersData?.map((user, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-3 py-2 text-xs ">
                    <div className="inline-flex ">
                      <button
                        className="p-1 hover:bg-black/10 rounded-full"
                        onClick={() => toggleEdit(user)}
                      >
                        <PencilIcon className="size-4 text-green-500 " />
                      </button>
                      <button className="p-1 hover:bg-black/10 rounded-full">
                        <CloudIcon className="size-4 text-blue-500" />
                      </button>
                      <button
                        onClick={() => ((formData.id = user.id), setDeleteDialog(true))}
                        className="p-1 hover:bg-black/10 rounded-full"
                      >
                        <TrashIcon className="size-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-xs">{user.firstname}</td>
                  <td className="px-3 py-2 text-xs">{user.lastname}</td>
                  <td className="px-3 py-2 text-xs">{user.type}</td>
                  <td className="px-3 py-2 text-xs">{user.status}</td>
                  <td className="px-3 py-2 text-xs">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* /* -------------------------------------------------------------------------- */
        /*                                INSERT DIALOG                               */
        /* -------------------------------------------------------------------------- */}
        <Dialog
          open={insertDialog}
          onClose={() => setInsertDialog(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 z-10 flex w-screen items-center justify-center ">
            <DialogPanel className="max-w-lg space-y-4 border-none shadow bg-white rounded-md">
              <DialogTitle className="font-bold text-xl bg-[#00695c] px-4 py-5 text-white rounded-t-md">
                Add User
              </DialogTitle>
              {/* <Description>This will permanently deactivate your account</Description> */}
              <div className="">
                <form
                  className="w-full max-w-lg px-8 p-5"
                  onSubmit={handleSubmit}
                >
                  <div className="overflow-x-auto flex flex-wrap h-100">
                    <div className="w-full px-3 mb-2">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="firstname"
                      >
                        Firstname
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="firstname"
                        type="text"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        placeholder="Firstname"
                      />
                    </div>
                    <div className="w-full px-3 mb-2">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="lastname"
                      >
                        Lastname
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="lastname"
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        placeholder="Lastname"
                      />
                    </div>
                    <div className="w-full px-3 mb-4">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="Type"
                      >
                        Type
                      </label>
                      <select
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                      >
                        <option value="">Select Type</option>
                        {["Writer", "Editor"]?.map(item => (
                          <option
                            key={item}
                            value={item}
                          >
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-full px-3 mb-4">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="status"
                      >
                        Status
                      </label>
                      <select
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="">Select Status</option>
                        {["Inactive", "Active"]?.map(item => (
                          <option
                            key={item}
                            value={item}
                          >
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-full px-3 mb-2">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="email"
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                      />
                    </div>
                    <div className="w-full px-3 mb-2">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          className="flex-1 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          id="password"
                          type={isShowPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Password"
                        />
                        <button
                          type="button"
                          onClick={() => setIsShowPassword(!isShowPassword)}
                          className="text-blue-500 shrink-0 mb-3 p-1 hover:bg-gray-200 rounded-full"
                        >
                          {isShowPassword ? (
                            <EyeSlashIcon className="size-6 " />
                          ) : (
                            <EyeIcon className="size-6 " />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="w-full px-3 mb-2">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="confirm_password"
                      >
                        Password
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          className="flex-1 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          id="password_confirmation"
                          type={isShowPasswordConfirm ? "text" : "password"}
                          name="password_confirmation"
                          value={formData.password_confirmation}
                          onChange={handleChange}
                          placeholder="Confirm password"
                        />
                        <button
                          type="button"
                          onClick={() => setIsShowPasswordConfirm(!isShowPasswordConfirm)}
                          className="text-blue-500 shrink-0 mb-3 p-1 hover:bg-gray-200 rounded-full"
                        >
                          {isShowPasswordConfirm ? (
                            <EyeSlashIcon className="size-6 " />
                          ) : (
                            <EyeIcon className="size-6 " />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <div className="flex gap-4 justify-end">
                        <button onClick={() => setInsertDialog(false)}>Cancel</button>
                        <button
                          disabled={loading}
                          type="submit"
                          className={
                            (loading ? "bg-opacity-50" : "",
                            "bg-[#00695c] text-white px-3 py-1.5 border-none rounded-md")
                          }
                        >
                          {loading ? "Loading ..." : "Submit"}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </div>
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50"></div>
        </Dialog>

        {/* /* -------------------------------------------------------------------------- */
        /*                                UPDATE DIALOG                               */
        /* -------------------------------------------------------------------------- */}
        <Dialog
          open={updateDialog}
          onClose={() => setUpdateDialog(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 z-10 flex w-screen items-center justify-center ">
            <DialogPanel className="max-w-lg space-y-4 border-none shadow bg-white rounded-md">
              <DialogTitle className="font-bold text-xl bg-[#00695c] px-4 py-5 text-white rounded-t-md">
                Update User
              </DialogTitle>

              <div className="">
                <form
                  className="w-full max-w-lg px-8 p-5"
                  onSubmit={handleUpdate}
                >
                  <div className="overflow-x-auto flex flex-wrap h-100">
                    <div className="w-full px-3 mb-2">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="firstname"
                      >
                        Firstname
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="firstname"
                        type="text"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        placeholder="Firstname"
                      />
                    </div>
                    <div className="w-full px-3 mb-2">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="lastname"
                      >
                        Lastname
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="lastname"
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        placeholder="Lastname"
                      />
                    </div>
                    <div className="w-full px-3 mb-4">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="Type"
                      >
                        Type
                      </label>
                      <select
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                      >
                        <option value="">Select Type</option>
                        {["Writer", "Editor"]?.map(item => (
                          <option
                            key={item}
                            value={item}
                          >
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-full px-3 mb-4">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="status"
                      >
                        Status
                      </label>
                      <select
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="">Select Status</option>
                        {["Inactive", "Active"]?.map(item => (
                          <option
                            key={item}
                            value={item}
                          >
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-full px-3 mb-2">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="email"
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <div className="flex gap-4 justify-end">
                        <button onClick={() => setUpdateDialog(false)}>Cancel</button>
                        <button
                          disabled={loading}
                          type="submit"
                          className={
                            (loading ? "bg-opacity-50" : "",
                            "bg-[#00695c] text-white px-3 py-1.5 border-none rounded-md")
                          }
                        >
                          {loading ? "Loading ..." : "Submit"}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </div>
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50"></div>
        </Dialog>

        {/* /* -------------------------------------------------------------------------- */
        /*                                DELETE DIALOG                               */
        /* -------------------------------------------------------------------------- */}
        <Dialog
          open={deleteDialog}
          onClose={() => setDeleteDialog(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 z-10 flex w-screen items-center justify-center ">
            <DialogPanel className="max-w-lg space-y-4 border-none shadow bg-white rounded-md">
              <DialogTitle className="font-bold text-xl bg-[#00695c] px-4 py-5 text-white rounded-t-md">
                Delete User
              </DialogTitle>
              <div className="">
                <form
                  className="w-full max-w-lg p-5"
                  onSubmit={handleDelete}
                >
                  <div className="flex flex-wrap h-100 px-5">
                    <div className="flex flex-row space-x-4 justify-center items-center">
                      <ExclamationCircleIcon className="size-10 text-red-700" />
                      <span className="font-semibold text-l text-red-700">
                        Are you sure you want to delete the selected user?
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <div className="flex gap-4 justify-end">
                        <button onClick={() => setDeleteDialog(false)}>Cancel</button>
                        <button
                          disabled={loading}
                          type="submit"
                          className={
                            (loading ? "bg-opacity-50" : "",
                            "bg-red-500 text-white px-3 py-1.5 border-none rounded-md")
                          }
                        >
                          {loading ? "Loading ..." : "Delete"}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </div>
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50"></div>
        </Dialog>
      </div>
    </>
  );
}
