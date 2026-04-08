import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminHash = process.env.ADMIN_PASSWORD_HASH;

  return NextResponse.json({
    emailPresent: !!adminEmail,
    emailValue: adminEmail ?? "missing",
    hashPresent: !!adminHash,
    hashPrefix: adminHash?.substring(0, 7) ?? "missing",
    hashLength: adminHash?.length ?? 0,
  });
}

export async function POST(request: Request) {
  const { password } = await request.json();
  const adminHash = process.env.ADMIN_PASSWORD_HASH ?? "";

  const result = await bcrypt.compare(password, adminHash);

  return NextResponse.json({
    match: result,
    hashPrefix: adminHash.substring(0, 7),
    hashLength: adminHash.length,
  });
}
