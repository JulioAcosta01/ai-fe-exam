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
import Article from "./MediaTable/Article";
import Company from "./MediaTable/Company";
import User from "./MediaTable/User";

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
    <div className="flex-initial h-full overflow-auto px-4 py-6 bg-white border shadow rounded-md">
      <div className="flex flex-col overflow-auto">
        {/* TITLE */}
        <div className="text-2xl font-semibold">Welcome to Walbro Writer Dashboard</div>

        {/* SUB TITLE */}
        <div className="text-sm text-gray-500 mt-1">Date as of Oct 9, 2021 10:00pm</div>

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
              ARTICLES
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
              COMPANY
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
              USER
            </div>
          </div>
        </div>
        <div className="flex">
          {/* CONTENT */}
          <div className="">
            <div className={`${tab === 0 ? "inline" : "hidden"} `}>
              <Article />
            </div>
            <div className={`${tab === 1 ? "inline" : "hidden"} `}>
              <Company />
            </div>
            <div className={`${tab === 2 ? "inline" : "hidden"} `}>
              <User />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
