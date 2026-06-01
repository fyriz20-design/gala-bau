import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'Keine Datei ausgewählt.' }, { status: 400 });
    }

    const blob = await put(`gala-bau/gallery/${file.name}`, file, {
      access: 'public',
    });

    return NextResponse.json(blob);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
