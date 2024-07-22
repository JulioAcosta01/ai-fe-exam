import { CloudIcon, PencilIcon, StarIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import { getArticles } from "../../../api/articles";

export default function User() {
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
  );
}
