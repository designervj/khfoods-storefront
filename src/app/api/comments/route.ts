import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Simple local JSON database for comments
const dbPath = path.join(process.cwd(), "src/lib/data/comments.json");

// Ensure db exists
const initDb = () => {
  if (!fs.existsSync(dbPath)) {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    fs.writeFileSync(dbPath, JSON.stringify([]));
  }
};

const getComments = () => {
  initDb();
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data || "[]");
};

const saveComments = (comments: any[]) => {
  initDb();
  fs.writeFileSync(dbPath, JSON.stringify(comments, null, 2));
};

export async function GET(request: NextRequest) {
  try {
    const comments = getComments();
    const pageId = request.nextUrl.searchParams.get("pageId");
    if (pageId) {
      return NextResponse.json({ comments: comments.filter((c: any) => c.pageId === pageId) });
    }
    return NextResponse.json({ pages: comments });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch comments", error: String(error) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const comments = getComments();
    
    const newComment = {
      ...body,
      _id: Math.random().toString(36).substring(7) + Date.now().toString(36),
      createdAt: new Date().toISOString()
    };
    
    comments.push(newComment);
    saveComments(comments);
    
    return NextResponse.json({ comment: newComment, success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to create comment", error: String(error) }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const comments = getComments();
    
    const index = comments.findIndex((c: any) => c._id === body._id || c.id === body.id);
    if (index !== -1) {
      comments[index] = { ...comments[index], ...body };
      saveComments(comments);
      return NextResponse.json({ comment: comments[index], success: true });
    }
    
    return NextResponse.json({ message: "Comment not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to update comment", error: String(error) }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    let comments = getComments();
    comments = comments.filter((c: any) => c._id !== id && c.id !== id);
    saveComments(comments);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete comment", error: String(error) }, { status: 500 });
  }
}
