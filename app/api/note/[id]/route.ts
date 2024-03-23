import { Note } from '@/app/interfaces/notes';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (_req: NextRequest, context: any) => {
  const supabase = createClient();
  const { id } = context.params;

  const existNote: boolean = await getNote(id);

  if(existNote)
    return NextResponse.json({ status: 404, error: 'note not found...' });

  const { data: note, error } = await supabase
  .from('notes')
  .select('*')
  .eq('id', id)
  .single();

  if(error) {
    return NextResponse.json({ status: 500, error: error?.message });
  }
  
  return NextResponse.json({ status: 200, data: note });
}

export const PATCH = async (req: NextRequest, context: any) => {
  const supabase = createClient();
  const { id } = context.params;
  const note: Note = await req.json();

  const existNote: boolean = await getNote(id);

  if(existNote)
    return NextResponse.json({ status: 404, error: 'note not found...' });

  const { data, error } = await supabase
  .from('notes')
  .update({ ...note })
  .eq('id', id)
  .select();  

  if(error) {
    return NextResponse.json({ status: 500, error: error?.message });
  }

  return NextResponse.json({ status: 200, data });
}
  
export const DELETE = async (_req: NextRequest, context: any) => {
  const supabase = createClient();
  const { id } = context.params;

  const existNote: boolean = await getNote(id);

  if(existNote)
    return NextResponse.json({ status: 404, error: 'note not found...' });

  const { error } = await supabase
  .from('notes')
  .delete()
  .eq('id', id);

  if(error) {
    return NextResponse.json({ status: 500, error: error?.message });
  }

  return NextResponse.json({ status: 200, data: { message: 'deleted note!!!' } });
}

const getNote = async (id: number): Promise<boolean> => {
  const supabase = createClient();

  const { data: existNote } = await supabase
  .from('notes')
  .select('*')
  .eq('id', id);

  if(existNote?.length) {
    return false
  }

  return true;
}
