import { NextResponse } from "next/server";
import { getAutoReview, setAutoReview } from "@/lib/autoReview";

export async function POST() {
  const nextState = !getAutoReview();
  setAutoReview(nextState);
  return NextResponse.json({ enabled: nextState });
}
