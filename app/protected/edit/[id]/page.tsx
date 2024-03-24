'use client'
import Form from "@/components/Form";
import axios from "axios";
import { useParams } from "next/navigation";

export default function CreateNote() {
  const params = useParams<{ id: string; }>();

  const handlerEdit = async (title: string, content: string) => {
    await axios.patch(`${process.env.NEXT_PUBLIC_URL_BASE}/note/${params.id}`, {
      title,
      content
    });
  }

  return(
    <div className="max-w-md w-full">
        <h2 className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center my-16">
          Edit note
        </h2>
        <Form
          id={params.id || ''}
          onSubmit={handlerEdit}
        />
    </div>
  );
}
