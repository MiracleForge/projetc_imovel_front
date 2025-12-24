import { subscriptionsDTO } from "@/src/contracts/DTOs/user/views/subscriptions.dto";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const subscriptions: subscriptionsDTO[] = [
      {
        id: "espaco-001",

        hasNewPublication: true,
        studiosOwner: {
          name: "João Martins",
          image: "https://i.pravatar.cc/150?img=12",
        },
      },
      {
        id: "espaco-002",
        hasNewPublication: false,
        studiosOwner: {
          name: "Mariana Costa",
          image: "https://i.pravatar.cc/150?img=32",
        },
      },
      {
        id: "espaco-002",
        hasNewPublication: false,
        studiosOwner: {
          name: "Mariana Costa",
          image: "",
        },
      },
      {
        id: "espaco-003",
        hasNewPublication: true,
        studiosOwner: {
          name: "Carlos Henrique",
          image: null,
        },
      },
      {
        id: "espaco-004",
        hasNewPublication: false,
        studiosOwner: {
          name: "Imobiliária Prime",
          image: "https://i.pravatar.cc/150?img=48",
        },
      },
    ];

    return NextResponse.json({
      message: "Subscriptions fetched successfully",
      error: null,
      data: subscriptions,
    });
  } catch (err) {
    return NextResponse.json({
      message: "Failed to fetch subscriptions",
      error: err instanceof Error ? err.message : "Unknown error",
      data: null,
    }, { status: 500 });
  }
}

