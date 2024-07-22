import {
    ChatBubbleLeftEllipsisIcon,
    CloudIcon,
    DocumentTextIcon,
    PencilIcon,
    StarIcon,
    UserPlusIcon,
} from "@heroicons/react/24/solid";
import { useRouteError } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getArticles } from "../../api/articles";
import { useState } from "react";

export default function Media() {
    const [tab, setTab] = useState(0);
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
    /* -------------------------------------------------------------------------- */
    /*                              LOAD ARTICLE HERE                             */
    /* -------------------------------------------------------------------------- */
    const {
        status,
        data: articles,
        error,
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
        <div className="flex-initial h-full overflow-hidden px-4 py-6 bg-white border shadow rounded-md">
            <div className="flex flex-col">
                {/* TITLE */}
                <div className="text-2xl font-semibold">
                    Welcome to Walbro Writer Dashboard
                </div>

                {/* SUB TITLE */}
                <div className="text-sm text-gray-500 mt-1">
                    Date as of Oct 9, 2021 10:00pm
                </div>

                <div className="mt-3">
                    <button className="bg-blue-500 uppercase px-3 py-1.5 border-none rounded-md shadow text-white text-sm font-semibold hover:bg-blue-400">
                        EXPORT
                    </button>
                </div>

                <div className="mt-3">
                    {/* TAB */}
                    <div className="flex space-x-3">
                        <div
                            className={`
                    ${
                        tab === 0
                            ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                            : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                    } inline-block p-2 rounded-t-lg border-b-2 font-semibold`}
                            onClick={() => setTab(0)}
                        >
                            TODAY
                        </div>
                        <div
                            className={`
                    ${
                        tab === 1
                            ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                            : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                    } inline-block p-2 rounded-t-lg border-b-2 font-semibold`}
                            onClick={() => setTab(1)}
                        >
                            ADVANCE
                        </div>
                        <div
                            className={`
                    ${
                        tab === 2
                            ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                            : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                    } inline-block p-2 rounded-t-lg border-b-2 font-semibold`}
                            onClick={() => setTab(2)}
                        >
                            LAST DAYS
                        </div>
                    </div>
                </div>
                <div className="mt-3 flex">
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
                                        <div className="inline-flex space-x-2">
                                            <PencilIcon className="h-5 w-5 text-green-500" />
                                            <CloudIcon className="h-5 w-5 text-blue-500" />
                                        </div>
                                    </td>
                                    <td className="px-3 py-2 text-xs">
                                        {article.date}
                                    </td>
                                    <td className="px-3 py-2 text-xs">
                                        {article.created_at}
                                    </td>
                                    <td className="px-3 py-2 text-xs ">
                                        <input
                                            type="checkbox"
                                            checked={
                                                article.status === "For Edit" ||
                                                article.status === "Published"
                                            }
                                            onClick={(e) => e.preventDefault()}
                                            readOnly
                                            className="w-4 h-4  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                    </td>
                                    <td className="px-3 py-2 text-xs ">
                                        <input
                                            type="checkbox"
                                            checked={
                                                article.status === "Published"
                                            }
                                            readOnly
                                            onClick={(e) => e.preventDefault()}
                                            className="w-4 h-4  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                    </td>
                                    <td className="px-3 py-2 text-xs">
                                        {article.created_at}
                                    </td>
                                    <td className="px-3 py-2 text-xs">
                                        <span className="underline text-blue-500">
                                            {article.title}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2 text-xs">
                                        {article?.writer?.firstname +
                                            " " +
                                            article?.writer?.lastname}
                                    </td>
                                    <td className="px-3 py-2 text-xs">
                                        {article?.writer?.firstname +
                                            " " +
                                            article?.writer?.lastname}
                                    </td>
                                    <td className="px-3 py-2 text-xs">
                                        {article?.editor?.firstname +
                                            " " +
                                            article?.editor?.lastname}
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
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-3 py-2 text-xs ">
                                    <div className="inline-flex space-x-2">
                                        <PencilIcon className="h-5 w-5 text-green-500" />
                                        <CloudIcon className="h-5 w-5 text-blue-500" />
                                    </div>
                                </td>
                                <td className="px-3 py-2 text-xs">
                                    Oct 12, 2021
                                </td>
                                <td className="px-3 py-2 text-xs">
                                    Oct 12, 2021 2:42pm
                                </td>
                                <td className="px-3 py-2 text-xs ">
                                    <input
                                        id="default-checkbox"
                                        type="checkbox"
                                        value=""
                                        className="w-4 h-4  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                </td>
                                <td className="px-3 py-2 text-xs">
                                    <input
                                        id="default-checkbox"
                                        type="checkbox"
                                        value=""
                                        className="w-4 h-4  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                </td>
                                <td className="px-3 py-2 text-xs">Customers</td>
                                <td className="px-3 py-2 text-xs">
                                    <span className="underline text-blue-500">
                                        Lorem ipsum dolor, sit amet consectetur
                                        adipisicing elit. Perferendis,
                                        assumenda!
                                    </span>
                                </td>
                                <td className="px-3 py-2 text-xs">
                                    Lorem, ipsum.
                                </td>
                                <td className="px-3 py-2 text-xs">
                                    Lorem, ipsum dolor.
                                </td>
                                <td className="px-3 py-2 text-xs">
                                    Lorem, ipsum dolor.
                                </td>
                                <td className="px-3 py-2">
                                    <div className="flex space-x-1.5">
                                        <StarIcon className="h-5 w-5 text-yellow-500" />
                                        <StarIcon className="h-5 w-5 text-yellow-500" />
                                        <StarIcon className="h-5 w-5 text-yellow-500" />
                                        <StarIcon className="h-5 w-5 text-yellow-500" />
                                        <StarIcon className="h-5 w-5 text-yellow-500" />
                                    </div>
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-3 py-2 text-xs ">
                                    <div className="inline-flex space-x-2">
                                        <PencilIcon className="h-5 w-5 text-green-500" />
                                        <CloudIcon className="h-5 w-5 text-blue-500" />
                                    </div>
                                </td>
                                <td className="px-3 py-2 text-xs">
                                    Oct 12, 2021
                                </td>
                                <td className="px-3 py-2 text-xs">
                                    Oct 12, 2021 2:42pm
                                </td>
                                <td className="px-3 py-2 text-xs ">
                                    <input
                                        id="default-checkbox"
                                        type="checkbox"
                                        value=""
                                        className="w-4 h-4  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                </td>
                                <td className="px-3 py-2 text-xs">
                                    <input
                                        id="default-checkbox"
                                        type="checkbox"
                                        value=""
                                        className="w-4 h-4  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                </td>
                                <td className="px-3 py-2 text-xs">Customers</td>
                                <td className="px-3 py-2 text-xs">
                                    <span className="underline text-blue-500">
                                        Lorem ipsum dolor, sit amet consectetur
                                        adipisicing elit. Perferendis,
                                        assumenda!
                                    </span>
                                </td>
                                <td className="px-3 py-2 text-xs">
                                    Lorem, ipsum.
                                </td>
                                <td className="px-3 py-2 text-xs">
                                    Lorem, ipsum dolor.
                                </td>
                                <td className="px-3 py-2 text-xs">
                                    Lorem, ipsum dolor.
                                </td>
                                <td className="px-3 py-2">
                                    <div className="flex space-x-1.5">
                                        <StarIcon className="h-5 w-5 text-yellow-500" />
                                        <StarIcon className="h-5 w-5 text-yellow-500" />
                                        <StarIcon className="h-5 w-5 text-yellow-500" />
                                        <StarIcon className="h-5 w-5 text-yellow-500" />
                                        <StarIcon className="h-5 w-5 text-yellow-500" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
