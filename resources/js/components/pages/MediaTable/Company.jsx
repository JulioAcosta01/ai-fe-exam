import {
  CloudIcon,
  ExclamationCircleIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createCompany, deleteCompany, getCompany, updateCompany } from "../../../api/company";
import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

export default function Company() {
  const TableHeaders = [
    {
      width: 0,
      header: "Actions",
    },
    {
      width: 0,
      header: "Logo",
    },
    {
      width: 0,
      header: "Name",
    },
    {
      width: 0,
      header: "Status",
    },
  ];

  const [loading, setLoading] = useState(false);

  let [insertDialog, setInsertDialog] = useState(false);
  let [updateDialog, setUpdateDialog] = useState(false);
  let [deleteDialog, setDeleteDialog] = useState(false);

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

  const CREATE_COMPANY = useMutation({
    mutationFn: createCompany,
    onSuccess: async () => {
      alert("Add Company Successfully!");
      companyRefetch();
      setInsertDialog(false);
      setFormData({ ...initialState });
    },
    onError: async () => {
      alert("Error, Please complete to fill-up the all field!");
    },
  });

  const UPDATE_COMPANY = useMutation({
    mutationFn: updateCompany,
    onSuccess: async () => {
      alert("Update Company Successfully!");
      companyRefetch();
      setUpdateDialog(false);
      setFormData({ ...initialState });
    },
    onError: async () => {
      alert("Error, Please complete to fill-up the all field!");
    },
  });
  const DELETE_COMPANY = useMutation({
    mutationFn: deleteCompany,
    onSuccess: async () => {
      alert("Delete Company Successfully!");
      companyRefetch();
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

  // CREATE COMPANY
  const handleSubmit = async e => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      CREATE_COMPANY.mutate(formData);
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
      logo: field.logo,
      name: field.name,
      status: field.status,
    });
    setUpdateDialog(true);
  };

  // UPDATE COMPANY
  const handleUpdate = async e => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      // setLoading(true);
      UPDATE_COMPANY.mutate(formData);
      // setLoading(false);
    } catch ({ response }) {
      console.log(response);
      // alert("Error: " + response?.data?.message);
      // setIsLoading(false);
    }
  };
  // DELETE COMPANY
  const handleDelete = async e => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      // setLoading(true);
      DELETE_COMPANY.mutate(formData);
      // setLoading(false);
    } catch ({ response }) {
      console.log(response);
      // alert("Error: " + response?.data?.message);
      // setIsLoading(false);
    }
  };

  const {
    status: companyStatus,
    data: companiesData,
    error: companyError,
    refetch: companyRefetch,
  } = useQuery({
    queryKey: ["companies"],
    queryFn: getCompany,
  });

  if (companyStatus === "pending") {
    return <span>Loading...</span>;
  }

  if (companyStatus === "error") {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <div className="flex flex-col overflow-auto">
        <div className="shrink-0 px-2 py-4 flex justify-between items-center">
          <span className="font-bold text-lg">COMPANY PAGE</span>
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
              {companiesData?.map((company, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-3 py-2 text-xs ">
                    <div className="inline-flex ">
                      <button
                        className="p-1 hover:bg-black/10 rounded-full"
                        onClick={() => toggleEdit(company)}
                      >
                        <PencilIcon className="size-4 text-green-500 " />
                      </button>
                      <button className="p-1 hover:bg-black/10 rounded-full">
                        <CloudIcon className="size-4 text-blue-500" />
                      </button>
                      <button
                        onClick={() => ((formData.id = company.id), setDeleteDialog(true))}
                        className="p-1 hover:bg-black/10 rounded-full"
                      >
                        <TrashIcon className="size-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-xs">{company.logo}</td>
                  <td className="px-3 py-2 text-xs">{company.name}</td>
                  <td className="px-3 py-2 text-xs">{company.status}</td>
                  {/* <td className="px-3 py-2 text-xs">
                    <span className="underline text-blue-500">{company.title}</span>
                  </td> */}
                  {/* <td className="px-3 py-2 text-xs">
                    {company?.writer?.firstname + " " + company?.writer?.lastname}
                  </td> */}
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
                Add Company
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
                        htmlFor="logo"
                      >
                        Logo
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="logo"
                        type="text"
                        name="logo"
                        value={formData.logo}
                        onChange={handleChange}
                        placeholder="Logo URL"
                      />
                    </div>
                    <div className="w-full px-3 mb-2">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="name"
                      >
                        Name
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                      />
                    </div>
                    <div className="w-full px-3 mb-2">
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
          onClose={() => setInsertDialog(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 z-10 flex w-screen items-center justify-center ">
            <DialogPanel className="max-w-lg space-y-4 border-none shadow bg-white rounded-md">
              <DialogTitle className="font-bold text-xl bg-[#00695c] px-4 py-5 text-white rounded-t-md">
                Add Update
              </DialogTitle>
              {/* <Description>This will permanently deactivate your account</Description> */}
              <div className="">
                <form
                  className="w-full max-w-lg px-8 p-5"
                  onSubmit={handleUpdate}
                >
                  <div className="overflow-x-auto flex flex-wrap h-100">
                    <div className="w-full px-3 mb-2">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="logo"
                      >
                        Logo
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="logo"
                        type="text"
                        name="logo"
                        value={formData.logo}
                        onChange={handleChange}
                        placeholder="Logo URL"
                      />
                    </div>
                    <div className="w-full px-3 mb-2">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="name"
                      >
                        Name
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                      />
                    </div>
                    <div className="w-full px-3 mb-2">
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
                          {loading ? "Loading ..." : "Update"}
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
                Delete Company
              </DialogTitle>
              {/* <Description>This will permanently deactivate your account</Description> */}
              <div className="">
                <form
                  className="w-full max-w-lg p-5"
                  onSubmit={handleDelete}
                >
                  <div className="flex flex-wrap h-100 px-5">
                    <div className="flex flex-row space-x-4 justify-center items-center">
                      <ExclamationCircleIcon className="size-10 text-red-700" />
                      <span className="font-semibold text-l text-red-700">
                        Are you sure you want to delete the selected company?
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
