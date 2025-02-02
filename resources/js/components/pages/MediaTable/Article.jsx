import {
  CloudIcon,
  ExclamationCircleIcon,
  PencilIcon,
  PlusIcon,
  StarIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createArticles, deleteArticles, getArticles, updateArticles } from "../../../api/articles";
import { useState } from "react";
import { Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { getUsers } from "../../../api/users";
import { getCompany } from "../../../api/company";

export default function Article() {
  const TableHeaders = [
    {
      width: 0,
      header: "Actions",
    },
    {
      width: 100,
      header: "Media Data",
    },
    {
      width: 160,
      header: "Created Date & Time",
    },
    {
      width: 100,
      header: "For Editing",
    },
    {
      width: 0,
      header: "Published",
    },
    {
      width: 0,
      header: "Category",
    },
    {
      width: 0,
      header: "Title",
    },
    {
      width: 0,
      header: "Researcher",
    },
    {
      width: 0,
      header: "Writer",
    },
    {
      width: 0,
      header: "Editor",
    },
    {
      width: 0,
      header: "Rating",
    },
  ];

  const [loading, setLoading] = useState(false);

  let [insertDialog, setInsertDialog] = useState(false);
  let [updateDialog, setUpdateDialog] = useState(false);
  let [deleteDialog, setDeleteDialog] = useState(false);

  const initialState = {
    image: "",
    title: "",
    link: "",
    date: "",
    content: "",
    status: "Draft",
    writer_id: "",
    editor_id: "",
    company_id: "",
  };
  const [formData, setFormData] = useState({ ...initialState });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const CREATE_ARTICLE = useMutation({
    mutationFn: createArticles,
    onSuccess: async () => {
      alert("Add Article Successfully!");
      articleRefetch();
      setInsertDialog(false);
      setFormData({ ...initialState });
    },
    onError: async () => {
      alert("Error, Please complete to fill-up the all field!");
    },
  });

  const UPDATE_ARTICLE = useMutation({
    mutationFn: updateArticles,
    onSuccess: async () => {
      alert("Update Article Successfully!");
      articleRefetch();
      setUpdateDialog(false);
      setFormData({ ...initialState });
    },
    onError: async () => {
      alert("Error, Please complete to fill-up the all field!");
    },
  });
  const DELETE_ARTICLE = useMutation({
    mutationFn: deleteArticles,
    onSuccess: async () => {
      alert("Delete Article Successfully!");
      articleRefetch();
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

  // CREATE ARTICLE
  const handleSubmit = async e => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      CREATE_ARTICLE.mutate(formData);
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
      image: field.image,
      title: field.title,
      link: field.link,
      date: field.date,
      content: field.content,
      status: field.status,
      writer_id: field.writer_id,
      editor_id: field.editor_id,
      company_id: field.company_id,
    });
    setUpdateDialog(true);
  };

  // UPDATE ARTICLE
  const handleUpdate = async e => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      // setLoading(true);
      UPDATE_ARTICLE.mutate(formData);
      // setLoading(false);
    } catch ({ response }) {
      console.log(response);
      // alert("Error: " + response?.data?.message);
      // setIsLoading(false);
    }
  };
  const handleDelete = async e => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      // setLoading(true);
      DELETE_ARTICLE.mutate(formData);
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
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const {
    status: companyStatus,
    data: companiesData,
    error: companyError,
  } = useQuery({
    queryKey: ["companies"],
    queryFn: getCompany,
  });

  const {
    status,
    data: articles,
    error,
    refetch: articleRefetch,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
  });

  if (status === "pending") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <div className="flex flex-col overflow-auto">
        <div className="shrink-0 px-2 py-4 flex justify-between items-center">
          <span className="font-bold text-lg">ARTICLE PAGE</span>
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
              {articles?.data.map((article, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-3 py-2 text-xs ">
                    <div className="inline-flex ">
                      <button
                        className="p-1 hover:bg-black/10 rounded-full"
                        onClick={() => toggleEdit(article)}
                      >
                        <PencilIcon className="size-4 text-green-500 " />
                      </button>
                      <button className="p-1 hover:bg-black/10 rounded-full">
                        <CloudIcon className="size-4 text-blue-500" />
                      </button>
                      <button
                        onClick={() => ((formData.id = article.id), setDeleteDialog(true))}
                        className="p-1 hover:bg-black/10 rounded-full"
                      >
                        <TrashIcon className="size-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-xs">{article.date}</td>
                  <td className="px-3 py-2 text-xs">{article.created_at}</td>
                  <td className="px-3 py-2 text-xs ">
                    <input
                      type="checkbox"
                      checked={article.status === "For Edit" || article.status === "Published"}
                      onClick={e => e.preventDefault()}
                      readOnly
                      className="w-4 h-4  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </td>
                  <td className="px-3 py-2 text-xs ">
                    <input
                      type="checkbox"
                      checked={article.status === "Published"}
                      readOnly
                      onClick={e => e.preventDefault()}
                      className="w-4 h-4  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </td>
                  <td className="px-3 py-2 text-xs">{article.created_at}</td>
                  <td className="px-3 py-2 text-xs">
                    <span className="underline text-blue-500">{article.title}</span>
                  </td>
                  <td className="px-3 py-2 text-xs">
                    {article?.writer?.firstname + " " + article?.writer?.lastname}
                  </td>
                  <td className="px-3 py-2 text-xs">
                    {article?.writer?.firstname + " " + article?.writer?.lastname}
                  </td>
                  <td className="px-3 py-2 text-xs">
                    {article?.editor?.firstname + " " + article?.editor?.lastname}
                  </td>
                  <td className="px-3 py-2 text-xs">
                    <div className="flex space-x-1.5">
                      <StarIcon className="h-5 w-5 text-yellow-500" />
                      <StarIcon className="h-5 w-5 text-yellow-500" />
                      <StarIcon className="h-5 w-5 text-yellow-500" />
                      <StarIcon className="h-5 w-5 text-slate-300" />
                      <StarIcon className="h-5 w-5 text-slate-300" />
                    </div>
                  </td>
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
                Add Article
              </DialogTitle>
              {/* <Description>This will permanently deactivate your account</Description> */}
              <div className="">
                <form
                  className="w-full max-w-lg p-5"
                  onSubmit={handleSubmit}
                >
                  <div className="h-[500px] overflow-x-auto flex flex-wrap h-100 p-5">
                    <div className="w-full px-3 mb-6">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="image"
                      >
                        Image
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="image"
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="Image URL"
                      />
                    </div>
                    <div className="w-full px-3 mb-6">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="title"
                      >
                        Title
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="title"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Title"
                      />
                    </div>
                    <div className="w-full px-3 mb-6">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="link"
                      >
                        Link
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="link"
                        type="text"
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                        placeholder="Link"
                      />
                    </div>
                    <div className="w-full px-3 mb-6">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="date"
                      >
                        Date
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="date"
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        placeholder="Date (YYYY-MM-DD)"
                      />
                    </div>
                    <div className="w-full px-3 mb-6">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="content"
                      >
                        Content
                      </label>
                      <textarea
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="Content"
                      />
                    </div>
                    <div className="w-full px-3 mb-6">
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
                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>
                      </select>
                    </div>
                    <div className="w-full px-3 mb-6">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="writer_id"
                      >
                        Writer
                      </label>
                      <select
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="writer_id"
                        name="writer_id"
                        value={formData.writer_id}
                        onChange={handleChange}
                      >
                        <option value="">Select Writer</option>
                        {usersData?.map(user => (
                          <option
                            key={user.id}
                            value={user.id}
                          >
                            {user.firstname + " " + user.lastname}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-full px-3 mb-6">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="editor_id"
                      >
                        Editor
                      </label>
                      <select
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="editor_id"
                        name="editor_id"
                        value={formData.editor_id}
                        onChange={handleChange}
                      >
                        <option value="">Select Editor</option>
                        {usersData?.map(user => (
                          <option
                            key={user.id}
                            value={user.id}
                          >
                            {user.firstname + " " + user.lastname}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-full px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="comapany_id"
                      >
                        Company
                      </label>
                      <select
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="company_id"
                        name="company_id"
                        value={formData.company_id}
                        onChange={handleChange}
                      >
                        <option value="">Select Company</option>
                        {companiesData?.map(company => (
                          <option
                            key={company.id}
                            value={company.id}
                          >
                            {company.name}
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
          onClose={() => setUpdateDialog(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 z-10 flex w-screen items-center justify-center ">
            <DialogPanel className="max-w-lg space-y-4 border-none shadow bg-white rounded-md">
              <DialogTitle className="font-bold text-xl bg-[#00695c] px-4 py-5 text-white rounded-t-md">
                Update Article
              </DialogTitle>
              {/* <Description>This will permanently deactivate your account</Description> */}
              <div className="">
                <form
                  className="w-full max-w-lg p-5"
                  onSubmit={handleUpdate}
                >
                  <div className="h-[500px] overflow-x-auto flex flex-wrap h-100 p-5">
                    <div className="w-full px-3 mb-6">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="image"
                      >
                        Image
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="image"
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="Image URL"
                      />
                    </div>
                    <div className="w-full px-3 mb-6">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="title"
                      >
                        Title
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="title"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Title"
                      />
                    </div>
                    <div className="w-full px-3 mb-6">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="link"
                      >
                        Link
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="link"
                        type="text"
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                        placeholder="Link"
                      />
                    </div>
                    <div className="w-full px-3 mb-6">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="date"
                      >
                        Date
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="date"
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        placeholder="Date (YYYY-MM-DD)"
                      />
                    </div>
                    <div className="w-full px-3 mb-6">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="content"
                      >
                        Content
                      </label>
                      <textarea
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="Content"
                      />
                    </div>
                    <div className="w-full px-3 mb-6">
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
                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>
                      </select>
                    </div>
                    <div className="w-full px-3 mb-6">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="writer_id"
                      >
                        Writer
                      </label>
                      <select
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="writer_id"
                        name="writer_id"
                        value={formData.writer_id}
                        onChange={handleChange}
                      >
                        <option value="">Select Writer</option>
                        {usersData?.map(user => (
                          <option
                            key={user.id}
                            value={user.id}
                          >
                            {user.firstname + " " + user.lastname}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-full px-3 mb-6">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="editor_id"
                      >
                        Editor
                      </label>
                      <select
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="editor_id"
                        name="editor_id"
                        value={formData.editor_id}
                        onChange={handleChange}
                      >
                        <option value="">Select Editor</option>
                        {usersData?.map(user => (
                          <option
                            key={user.id}
                            value={user.id}
                          >
                            {user.firstname + " " + user.lastname}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-full px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="comapany_id"
                      >
                        Company
                      </label>
                      <select
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="company_id"
                        name="company_id"
                        value={formData.company_id}
                        onChange={handleChange}
                      >
                        <option value="">Select Company</option>
                        {companiesData?.map(company => (
                          <option
                            key={company.id}
                            value={company.id}
                          >
                            {company.name}
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
                Delete Article
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
                        Are you sure you want to delete the selected article?
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
