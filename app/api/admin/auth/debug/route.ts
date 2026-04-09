import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET() {
  return NextResponse.json({
    admin1Email: process.env.ADMIN_EMAIL ?? "missing",
    admin1HashPrefix: process.env.ADMIN_PASSWORD_HASH?.substring(0, 7) ?? "missing",
    admin1HashLength: process.env.ADMIN_PASSWORD_HASH?.length ?? 0,
    admin2Email: process.env.ADMIN_EMAIL_2 ?? "missing",
    admin2HashPrefix: process.env.ADMIN_PASSWORD_HASH_2?.substring(0, 7) ?? "missing",
    admin2HashLength: process.env.ADMIN_PASSWORD_HASH_2?.length ?? 0,
  });
}

export async function POST(request: Request) {
  const { password, admin } = await request.json();
  const hash = admin === 2 
    ? process.env.ADMIN_PASSWORD_HASH_2 ?? ""
    : process.env.ADMIN_PASSWORD_HASH ?? "";
  
  const result = await bcrypt.compare(password, hash);
  
  return NextResponse.json({
    admin,
    match: result,
    hashPrefix: hash.substring(0, 7),
    hashLength: hash.length,
  });
}
