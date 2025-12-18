import { NextResponse } from "next/server";

export async function GET() {
  const subscriptions = [
    {
      spaceId: "espaco-001",
      hasNewPublication: true,
      advertiser: {
        name: "João Martins",
        image: "https://i.pravatar.cc/150?img=12",
      },
    },
    {
      spaceId: "espaco-002",
      hasNewPublication: false,
      advertiser: {
        name: "Mariana Costa",
        image: "https://i.pravatar.cc/150?img=32",
      },
    },
    {
      spaceId: "espaco-002",
      hasNewPublication: false,
      advertiser: {
        name: "Mariana Costa",
        image: "",
      },
    },
    {
      spaceId: "espaco-003",
      hasNewPublication: true,
      advertiser: {
        name: "Carlos Henrique",
        image: null, // 🔥 proposital → testa fallback do avatar
      },
    },
    {
      spaceId: "espaco-004",
      hasNewPublication: false,
      advertiser: {
        name: "Imobiliária Prime",
        image: "https://i.pravatar.cc/150?img=48",
      },
    },
  ];

  return NextResponse.json(subscriptions);
}

