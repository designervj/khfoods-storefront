import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_API_URL || "http://localhost:8000";

async function getParams(context: { params: Promise<{ slug?: string[] }> }) {
  return await context.params;
}

export async function GET(request: NextRequest, context: { params: Promise<{ slug?: string[] }> }) {
  const { slug: slugArr } = await getParams(context);
  const slug = slugArr?.join("/") || "";
  const searchParams = request.nextUrl.searchParams;
  const queryString = searchParams.toString();
  const url = `${BACKEND_URL}/${slug}${queryString ? `?${queryString}` : ""}`;
  const headers = new Headers();
  const tenantId = request.headers.get("x-tenant-db") || process.env.NEXT_PUBLIC_TENANT_DB;
  if (tenantId) headers.set("x-tenant-db", tenantId);
  try { const response = await fetch(url, { method: "GET", headers }); const data = await response.json(); return NextResponse.json(data, { status: response.status }); }
  catch (error) { return NextResponse.json({ message: "Proxy request failed", error: String(error) }, { status: 500 }); }
}

export async function POST(request: NextRequest, context: { params: Promise<{ slug?: string[] }> }) {
  const { slug: slugArr } = await getParams(context);
  const slug = slugArr?.join("/") || "";
  const body = await request.json();
  const url = `${BACKEND_URL}/${slug}`;
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  const tenantId = request.headers.get("x-tenant-db") || process.env.NEXT_PUBLIC_TENANT_DB;
  if (tenantId) headers.set("x-tenant-db", tenantId);
  try { const response = await fetch(url, { method: "POST", headers, body: JSON.stringify(body) }); const data = await response.json(); return NextResponse.json(data, { status: response.status }); }
  catch (error) { return NextResponse.json({ message: "Proxy request failed", error: String(error) }, { status: 500 }); }
}

export async function PUT(request: NextRequest, context: { params: Promise<{ slug?: string[] }> }) {
  const { slug: slugArr } = await getParams(context);
  const slug = slugArr?.join("/") || "";
  const body = await request.json();
  const url = `${BACKEND_URL}/${slug}`;
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  const tenantId = request.headers.get("x-tenant-db") || process.env.NEXT_PUBLIC_TENANT_DB;
  if (tenantId) headers.set("x-tenant-db", tenantId);
  try { const response = await fetch(url, { method: "PUT", headers, body: JSON.stringify(body) }); const data = await response.json(); return NextResponse.json(data, { status: response.status }); }
  catch (error) { return NextResponse.json({ message: "Proxy request failed", error: String(error) }, { status: 500 }); }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ slug?: string[] }> }) {
  const { slug: slugArr } = await getParams(context);
  const slug = slugArr?.join("/") || "";
  const url = `${BACKEND_URL}/${slug}`;
  const headers = new Headers();
  const tenantId = request.headers.get("x-tenant-db") || process.env.NEXT_PUBLIC_TENANT_DB;
  if (tenantId) headers.set("x-tenant-db", tenantId);
  try { const response = await fetch(url, { method: "DELETE", headers }); const data = await response.json(); return NextResponse.json(data, { status: response.status }); }
  catch (error) { return NextResponse.json({ message: "Proxy request failed", error: String(error) }, { status: 500 }); }
}
