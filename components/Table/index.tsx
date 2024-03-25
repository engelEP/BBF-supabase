import Link from "next/link";
import { ITable } from "./TableType";
import Button from "@/components/Button";

export default function Table ({ data, onDelete }: ITable) {

  const renderData = () => {
    return data?.map((tr) => (
      <tr key={tr.id} className="bg-gray-100 border-b">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {tr.id}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {tr.title}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {tr.content}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap justify-between flex-1 flex">
          <Button
            colorButton="RED"
            text="Delete"
            typeButton="button"
            clicked={() => onDelete(tr.id)}
          />
          <Link
            className="max-w-24 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-green-500 text-white hover:bg-gray-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            href={`/protected/edit/${tr.id}`}
          >
            Edit
          </Link>
        </td>
      </tr>
    ));
  }

  return(
    <div className="flex flex-col">
      <div className="overflow-x-auto max-h-96 overflow-y-scroll sm:mx-0.5 lg:mx-0.5">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden relative">
              <table className="min-w-full">
                <thead className="bg-white border-b sticky top-0">
                  <tr>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      #
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Title
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Content
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {renderData()}
                </tbody>
              </table>
          </div>
        </div>
      </div>
    </div>
  );
}
