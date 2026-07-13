import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import Order from "@/models/Order";

function getUserId(req: NextRequest): string | null {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;

  const token = authHeader.replace("Bearer ", "");
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    return decoded.id;
  } catch {
    return null;
  }
}

function getUserRole(req: NextRequest): string | null {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;

  const token = authHeader.replace("Bearer ", "");
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    return decoded.role;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const userId = getUserId(req);
    if (!userId) {
      return NextResponse.json({ error: "Login zaroori hai" }, { status: 401 });
    }

    const { items, totalAmount, address, paymentMethod } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart khaali hai" }, { status: 400 });
    }

    const orderId = "AF" + Date.now();

    const order = new Order({
      user: userId,
      items,
      totalAmount,
      address,
      paymentMethod: paymentMethod || "COD",
      orderId,
      orderStatus: "Pending",
      statusHistory: [{ status: "Pending", date: new Date() }],
    });

    await order.save();

    return NextResponse.json({ message: "Order successfully place ho gaya", order });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Order place karne mein error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const userId = getUserId(req);
    if (!userId) {
      return NextResponse.json({ error: "Login zaroori hai" }, { status: 401 });
    }

    const role = getUserRole(req);
    const isAdmin = role === "admin";
    const url = new URL(req.url);
    const wantsAll = url.searchParams.get("all") === "true";

    const query = isAdmin && wantsAll ? {} : { user: userId };

    const orders = await Order.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ orders });
  } catch (error) {
    return NextResponse.json({ error: "Orders laane mein error" }, { status: 500 });
  }
}