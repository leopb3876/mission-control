import { NextRequest, NextResponse } from "next/server";
import { execSync } from "child_process";

export async function POST(request: NextRequest) {
  try {
    const { skill } = await request.json();
    
    if (!skill) {
      return NextResponse.json({ error: "Skill name required" }, { status: 400 });
    }

    // Run openclaw skills install
    const command = `openclaw skills install ${skill}`;
    execSync(command, { encoding: "utf-8" });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Skill installation error:", error);
    return NextResponse.json({ error: "Failed to install skill" }, { status: 500 });
  }
}
