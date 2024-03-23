import { Note } from '@/app/interfaces/notes';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async () => {
  const supabase = createClient();

  const { data: notes, error } = await supabase
  .from('notes')
  .select('*');

  if(error) {
    return NextResponse.json({ status: 400, error: error?.message });
  }

  return NextResponse.json({ status: 200, data: notes });
}

export const POST = async (req: NextRequest) => {
  const supabase = createClient();

  const note: Note = await req.json();

  const { data, error } = await supabase
  .from('notes')
  .insert([{
    title: note.title,
    content: note.content,
    user_id: 'e22c306d-f8a8-4557-9e7a-367942fe92dc'
  }])
  .select();

  if(error) {
    return NextResponse.json({ status: 400, error: error?.message });
  }

  return NextResponse.json({ status: 200, data });
}

export const PATCH = async (req: NextRequest) => {
  const supabase = createClient();

  const note: Note = await req.json();

  const existNote = await getNote(note.id);

  if(existNote) {
    return NextResponse.json({ status: 200, error: 'note not found...' });
  }

  const { data, error } = await supabase
  .from('notes')
  .update({ ...note })
  .eq('id', note.id)
  .select();  

  if(error) {
    return NextResponse.json({ status: 200, error: error?.message });
  }

  return NextResponse.json({ status: 200, data });
}

export const DELETE = async (req: NextRequest) => {
  const supabase = createClient();

  const { id }: Note = await req.json();

  const existNote = await getNote(id);

  if(existNote) {
    return NextResponse.json({ status: 400, error: 'note not found...' });
  }

  const { error } = await supabase
  .from('notes')
  .delete()
  .eq('id', id)

  if(error) {
    return NextResponse.json({ status: 400, error: error?.message });
  }

  return NextResponse.json({ status: 200, data: { message: 'deleted note!!!' } });
}

const getNote = async (id: number): Promise<boolean> => {
  const supabase = createClient();

  const { data: note } = await supabase
  .from('notes')
  .select('*')
  .eq('id', id);

  if(!note) false

  return true
}
