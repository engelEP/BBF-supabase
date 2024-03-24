import { INote } from '@/app/interfaces/notes';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async () => {
  const supabase = createClient();

  const { data: notes, error } = await supabase
  .from('notes')
  .select('*')
  .order('id', { ascending: true });

  if(error) {
    return NextResponse.error();
  }

  return NextResponse.json(notes);
}

export const POST = async (req: NextRequest) => {
  const supabase = createClient();
  const user_id = req.headers.get('user_id');
  const note: INote = await req.json();

  if(!user_id)
    return NextResponse.json({ status: 500, message: 'invalid user...' });

  if(!note.title && !note.content)
    return NextResponse.json({ status: 500, message: 'invalid note...' });

  const { data, error } = await supabase
  .from('notes')
  .insert([{
    title: note.title,
    content: note.content,
    user_id
  }])
  .select();

  if(error) {
    return NextResponse.json({ status: 500, error: error?.message });
  }

  return NextResponse.json(data);
}
