'use client'
import { useEffect, useState } from "react";
import Table from "@/components/Table";
import axios from "axios";
import Button from "../Button";
import Link from "next/link";

export default function Home () {
  const [ notes, setNotes ] = useState([]);

  const fetchNote = async () => {
    const { data, status } = await axios.get(`${process.env.NEXT_PUBLIC_URL_BASE}/notes`);

    if(status === 200)
      setNotes(data);
  }

  const handlerDelete = async (id: number) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_URL_BASE}/note/${id}`);
    fetchNote();
  }

  const handlerEdit = async (id: number) => {
    fetchNote();
  }

  useEffect(() => {
    fetchNote();
  }, [])

  return (
    <div className="w-full">
      <div className="flex justify-end">
        <Link
          className="my-8 max-w-24 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-500 text-white hover:bg-gray-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          href={'/protected/create'}
        >
          Add note
        </Link>
      </div>
      <Table
        data={notes}
        onDelete={handlerDelete}
        onEdit={handlerEdit}
      />
    </div>
  );
}