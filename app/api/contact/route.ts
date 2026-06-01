import { NextResponse } from 'next/server';
import { addInquiry, type Vorhaben } from '@/lib/inquiry-store';

const VORHABEN_VALUES: Vorhaben[] = ['Umbau', 'Anbau', 'Neubau', 'Sanierung', 'Sonstiges'];

export async function POST(request: Request) {
  try {
    const body = await request.json() as {
      vorhaben?: string;
      name?: string;
      email?: string;
      phone?: string;
      message?: string;
    };

    const { vorhaben, name, email, phone = '', message } = body;

    /* ── Validierung ── */
    if (!vorhaben || !VORHABEN_VALUES.includes(vorhaben as Vorhaben)) {
      return NextResponse.json({ error: 'Ungültiges Vorhaben.' }, { status: 400 });
    }
    if (!name?.trim()) {
      return NextResponse.json({ error: 'Name fehlt.' }, { status: 400 });
    }
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Ungültige E-Mail-Adresse.' }, { status: 400 });
    }
    if (!message?.trim()) {
      return NextResponse.json({ error: 'Nachricht fehlt.' }, { status: 400 });
    }

    await addInquiry({
      vorhaben: vorhaben as Vorhaben,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      message: message.trim(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[contact]', err);
    return NextResponse.json({ error: 'Interner Fehler.' }, { status: 500 });
  }
}
