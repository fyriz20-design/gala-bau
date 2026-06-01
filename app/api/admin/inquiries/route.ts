import { NextResponse } from 'next/server';
import {
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
  bulkDeleteInquiries,
  type InquiryStatus,
} from '@/lib/inquiry-store';

function isAuthorized(req: Request): boolean {
  return req.headers.get('x-admin-key') === process.env.ADMIN_PASSWORD;
}

/* ── GET /api/admin/inquiries ── alle Anfragen ── */
export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }
  const inquiries = await getInquiries();
  return NextResponse.json(inquiries);
}

/* ── PATCH /api/admin/inquiries ── Status ändern ── */
export async function PATCH(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }
  try {
    const body = await request.json() as { id?: string; status?: InquiryStatus };
    const { id, status } = body;
    if (!id || !status) {
      return NextResponse.json({ error: 'id und status erforderlich.' }, { status: 400 });
    }
    const inquiries = await updateInquiryStatus(id, status);
    return NextResponse.json({ success: true, inquiries });
  } catch (err) {
    console.error('[inquiries PATCH]', err);
    return NextResponse.json({ error: 'Statusaktualisierung fehlgeschlagen.' }, { status: 500 });
  }
}

/* ── DELETE /api/admin/inquiries ── Einzeln oder Bulk ── */
export async function DELETE(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }
  try {
    const body = await request.json().catch(() => null) as { ids?: string[] } | null;

    if (body?.ids && Array.isArray(body.ids) && body.ids.length > 0) {
      const inquiries = await bulkDeleteInquiries(body.ids);
      return NextResponse.json({ success: true, deleted: body.ids.length, inquiries });
    }

    const id = new URL(request.url).searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Keine ID angegeben.' }, { status: 400 });
    }
    const inquiries = await deleteInquiry(id);
    return NextResponse.json({ success: true, inquiries });
  } catch (err) {
    console.error('[inquiries DELETE]', err);
    return NextResponse.json({ error: 'Löschen fehlgeschlagen.' }, { status: 500 });
  }
}
