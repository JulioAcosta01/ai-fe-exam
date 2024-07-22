import {
  ChatBubbleLeftEllipsisIcon,
  DocumentTextIcon,
  PencilIcon,
  StarIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import axios from "../../plugins/axios";
import { useRouteError } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getArticles } from "../../api/articles";

// loadArticles();

export default function Dashboard() {
  const [tab, setTab] = useState(0);
  /* -------------------------------------------------------------------------- */
  /*                               TAB METHOD HERE                              */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                LOAD ARTICLES                               */
  /* -------------------------------------------------------------------------- */

  if (status === "pending") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="flex space-x-2 h-full">
      {/* /* -------------------------------------------------------------------------- */
      /*                               ARTICLE                                    */
      /* -------------------------------------------------------------------------- */}
      <div className="flex-initial w-[70%] h-full overflow-hidden px-2 py-3 bg-white border shadow rounded-md">
        <div className="flex flex-col px-3 py-3">
          {/* TITLE */}
          <div className="text-2xl font-semibold">Welcome to Walbro Writer Dashboard</div>

          {/* SUB TITLE */}
          <div className="text-sm text-gray-500 mt-1">Date as of Oct 9, 2021 10:00pm</div>

          <div className="mt-3">
            <button className="bg-green-500 uppercase px-3 py-1.5 border-none rounded-md shadow text-white text-sm font-semibold hover:bg-green-400">
              <a href="add-article">Create Article</a>
            </button>
          </div>
          <div className="mt-3">
            <button className="bg-green-500 uppercase px-3 py-1.5 border-none rounded-md shadow text-white text-sm font-semibold hover:bg-green-400">
              Create Article
            </button>
          </div>

          <div className="mt-3">
            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
              {/* TAB */}
              <div className="flex space-x-3">
                <div
                  className={`
                    ${
                      tab === 0
                        ? "text-blue-600  border-blue-600 dark:text-blue-500 dark:border-blue-500"
                        : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                    } inline-block p-2 rounded-t-lg  border-b-2`}
                  onClick={() => setTab(0)}
                >
                  TODAY
                </div>
                <div
                  className={`
                    ${
                      tab === 1
                        ? "text-blue-600  border-blue-600 dark:text-blue-500 dark:border-blue-500"
                        : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                    } inline-block p-2 rounded-t-lg  border-b-2`}
                  onClick={() => setTab(1)}
                >
                  ADVANCE
                </div>
                <div
                  className={`
                    ${
                      tab === 2
                        ? "text-blue-600  border-blue-600 dark:text-blue-500 dark:border-blue-500"
                        : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                    } inline-block p-2 rounded-t-lg  border-b-2`}
                  onClick={() => setTab(2)}
                >
                  LAST DAYS
                </div>
                <div
                  className={`
                    ${
                      tab === 3
                        ? "text-blue-600  border-blue-600 dark:text-blue-500 dark:border-blue-500"
                        : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                    } inline-block p-2 rounded-t-lg  border-b-2`}
                  onClick={() => setTab(3)}
                >
                  SENT BACK
                </div>
              </div>
              {/* CONTENT */}
              <div className="">
                <div className={`${tab === 0 ? "inline" : "hidden"} `}>display 1</div>
                <div className={`${tab === 1 ? "inline" : "hidden"} `}>display 2</div>
                <div className={`${tab === 2 ? "inline" : "hidden"} `}>display 3</div>
                <div className={`${tab === 3 ? "inline" : "hidden"} `}>display 4</div>
              </div>
              {/* <ul className="flex flex-wrap -mb-px">
                <li className="me-2">
                  <a
                    href="#"
                    className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  >
                    Profile
                  </a>
                </li>
                <li className="me-2">
                  <a
                    href="#"
                    className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                    aria-current="page"
                  >
                    Dashboard
                  </a>
                </li>
                <li className="me-2">
                  <a
                    href="#"
                    className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  >
                    Settings
                  </a>
                </li>
                <li className="me-2">
                  <a
                    href="#"
                    className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  >
                    Contacts
                  </a>
                </li>
                <li>
                  <a className="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">
                    Disabled
                  </a>
                </li>
              </ul> */}
            </div>
          </div>
          <div className="mt-3">
            <div className="flex flex-col">
              {/* Customers */}
              <div>
                {/* TITLE */}
                <div className="text-center px-2 py-2 bg-blue-700 text-white font-semibold ">
                  Customers
                </div>

                {/* CONTENT */}
                <div className="border-y border-gray-200">
                  <div className="flex space-x-3 px-2 py-5">
                    <div className="space-y-3 p-1 w-[40px]">
                      <div>
                        <PencilIcon className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <UserPlusIcon className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <DocumentTextIcon className="h-5 w-5 text-red-500" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold text-blue-500">Title here</span>
                      <div className="flex space-x-3 mt-2">
                        <StarIcon className="h-5 w-5 text-yellow-500" />
                        <StarIcon className="h-5 w-5 text-yellow-500" />
                        <StarIcon className="h-5 w-5 text-yellow-500" />
                        <StarIcon className="h-5 w-5 text-yellow-500" />
                        <StarIcon className="h-5 w-5 text-yellow-500" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Created on Oct 8, 2021 3:12pm</span>
                        <span className="text-sm text-gray-500">Created on Oct 8, 2021 3:12pm</span>
                        <span className="text-sm text-gray-500">Created on Oct 8, 2021 3:12pm</span>
                      </div>
                    </div>
                    <div className="shrink-0 content-center">
                      <ChatBubbleLeftEllipsisIcon className="h-5 w-5 text-blue-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Competitors */}
              <div>
                {/* TITLE */}
                <div className="text-center px-2 py-2 bg-blue-700 text-white font-semibold ">
                  Competitors
                </div>

                {/* CONTENT */}
                <div className="border-y border-gray-200">
                  <div className="flex space-x-3 px-2 py-5">
                    <div className="space-y-3 p-1 w-[40px]">
                      <div>
                        <PencilIcon className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <UserPlusIcon className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <DocumentTextIcon className="h-5 w-5 text-red-500" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold text-blue-500">Title here</span>
                      <div className="flex space-x-3 mt-2">
                        <StarIcon className="h-5 w-5 text-yellow-500" />
                        <StarIcon className="h-5 w-5 text-yellow-500" />
                        <StarIcon className="h-5 w-5 text-yellow-500" />
                        <StarIcon className="h-5 w-5 text-yellow-500" />
                        <StarIcon className="h-5 w-5 text-yellow-500" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Created on Oct 8, 2021 3:12pm</span>
                        <span className="text-sm text-gray-500">Created on Oct 8, 2021 3:12pm</span>
                        <span className="text-sm text-gray-500">Created on Oct 8, 2021 3:12pm</span>
                      </div>
                    </div>
                    <div className="shrink-0 content-center">
                      <ChatBubbleLeftEllipsisIcon className="h-5 w-5 text-blue-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Products */}
              <div>
                {/* TITLE */}
                <div className="text-center px-2 py-2 bg-blue-700 text-white font-semibold ">
                  Competitors
                </div>

                {/* CONTENT */}
                <div className="border-y border-gray-200">
                  <div className="flex space-x-3 px-2 py-5">
                    <div className="space-y-3 p-1 w-[40px]">
                      <div>
                        <PencilIcon className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <UserPlusIcon className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <DocumentTextIcon className="h-5 w-5 text-red-500" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold text-blue-500">Title here</span>
                      <div className="flex space-x-3 mt-2">
                        <StarIcon className="h-5 w-5 text-yellow-500" />
                        <StarIcon className="h-5 w-5 text-yellow-500" />
                        <StarIcon className="h-5 w-5 text-yellow-500" />
                        <StarIcon className="h-5 w-5 text-yellow-500" />
                        <StarIcon className="h-5 w-5 text-yellow-500" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Created on Oct 8, 2021 3:12pm</span>
                        <span className="text-sm text-gray-500">Created on Oct 8, 2021 3:12pm</span>
                        <span className="text-sm text-gray-500">Created on Oct 8, 2021 3:12pm</span>
                      </div>
                    </div>
                    <div className="shrink-0 content-center">
                      <ChatBubbleLeftEllipsisIcon className="h-5 w-5 text-blue-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shrink-0 w-auto space-y-3 flex flex-col">
        {/* /* -------------------------------------------------------------------------- */
        /*                               Writer Production                              */
        /* -------------------------------------------------------------------------- */}
        <div className="overflow-hidden px-2 py-3 bg-white border shadow rounded-md">
          <div className="flex flex-col px-3 py-3">
            {/* TITLE */}
            <div className="text-2xl font-semibold">Write Production</div>

            <div className="mt-3">
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3"
                      >
                        Assigned
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3"
                      >
                        Submitted
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td
                        scope="row"
                        className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Microsoft Surface Pro
                      </td>
                      <td className="px-6 py-4">White</td>
                      <td className="px-6 py-4">Laptop PC</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                      <td
                        scope="row"
                        className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Magic Mouse 2
                      </td>
                      <td className="px-6 py-4">Black</td>
                      <td className="px-6 py-4">Accessories</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* /* -------------------------------------------------------------------------- */
        /*                               ARTICLE PREVIEW                              */
        /* -------------------------------------------------------------------------- */}
        <div className="overflow-y-auto mt-3 px-2 py-3 bg-white border shadow rounded-md">
          <div className="flex flex-col px-3 py-3">
            {/* TITLE */}
            <div className="text-2xl font-semibold">ARTICLE PREVIEW</div>

            {/* Customers */}
            <div>
              {/* TITLE */}
              <div className="text-center px-2 py-2 bg-blue-700 text-white font-semibold ">
                Customers
              </div>

              {/* CONTENT */}
              <div className="border-y border-gray-200">
                <div className="flex space-x-3 px-2 py-5">
                  <div className="space-y-3 p-1 w-[40px]">
                    <div>
                      <PencilIcon className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <UserPlusIcon className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <DocumentTextIcon className="h-5 w-5 text-red-500" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-blue-500">Title here</span>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Created on Oct 8, 2021 3:12pm</span>
                      <span className="text-sm text-gray-500">Created on Oct 8, 2021 3:12pm</span>
                      <span className="text-sm text-gray-500">Created on Oct 8, 2021 3:12pm</span>
                    </div>
                  </div>
                  <div className="shrink-0 content-center">
                    <ChatBubbleLeftEllipsisIcon className="h-5 w-5 text-blue-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Competitors */}
            <div>
              {/* TITLE */}
              <div className="text-center px-2 py-2 bg-blue-700 text-white font-semibold ">
                Competitors
              </div>

              {/* CONTENT */}
              <div className="border-y border-gray-200">
                {/* <div className="flex space-x-3 px-2 py-5">
                  <div className="space-y-3 p-1 w-[40px]">
                    <div>
                      <PencilIcon className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <UserPlusIcon className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <DocumentTextIcon className="h-5 w-5 text-red-500" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-blue-500">Title here</span>
                    <div className="flex space-x-3 mt-2">
                      <StarIcon className="h-5 w-5 text-yellow-500" />
                      <StarIcon className="h-5 w-5 text-yellow-500" />
                      <StarIcon className="h-5 w-5 text-yellow-500" />
                      <StarIcon className="h-5 w-5 text-yellow-500" />
                      <StarIcon className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Created on Oct 8, 2021 3:12pm</span>
                      <span className="text-sm text-gray-500">Created on Oct 8, 2021 3:12pm</span>
                      <span className="text-sm text-gray-500">Created on Oct 8, 2021 3:12pm</span>
                    </div>
                  </div>
                  <div className="shrink-0 content-center">
                    <ChatBubbleLeftEllipsisIcon className="h-5 w-5 text-blue-500" />
                  </div>
                </div> */}
              </div>
            </div>

            {/* Products */}
            <div>
              {/* TITLE */}
              <div className="text-center px-2 py-2 bg-blue-700 text-white font-semibold ">
                Competitors
              </div>

              {/* CONTENT */}
              <div className="border-y border-gray-200">
                {/* <div className="flex space-x-3 px-2 py-5">
                  <div className="space-y-3 p-1 w-[40px]">
                    <div>
                      <PencilIcon className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <UserPlusIcon className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <DocumentTextIcon className="h-5 w-5 text-red-500" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-blue-500">Title here</span>
                    <div className="flex space-x-3 mt-2">
                      <StarIcon className="h-5 w-5 text-yellow-500" />
                      <StarIcon className="h-5 w-5 text-yellow-500" />
                      <StarIcon className="h-5 w-5 text-yellow-500" />
                      <StarIcon className="h-5 w-5 text-yellow-500" />
                      <StarIcon className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Created on Oct 8, 2021 3:12pm</span>
                      <span className="text-sm text-gray-500">Created on Oct 8, 2021 3:12pm</span>
                      <span className="text-sm text-gray-500">Created on Oct 8, 2021 3:12pm</span>
                    </div>
                  </div>
                  <div className="shrink-0 content-center">
                    <ChatBubbleLeftEllipsisIcon className="h-5 w-5 text-blue-500" />
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
