import { NextRequest } from "next/server";
import { handleAdminRequest } from "./[...action]/route";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  return handleAdminRequest(req);
}

