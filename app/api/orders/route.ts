import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import Order from "@/models/Order";

// Helper: token se userId nikalna
function getUserId(req: NextRequest): string | null {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;

  const token = authHeader.replace("Bearer ", "");
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    return decoded.userId;
  } catch {
    return null;
  }
}

// POST: naya order banana
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
    });

    await order.save();

    return NextResponse.json({ message: "Order successfully place ho gaya", order });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Order place karne mein error" }, { status: 500 });
  }
}

// GET: customer ke saare orders dikhana
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const userId = getUserId(req);
    if (!userId) {
      return NextResponse.json({ error: "Login zaroori hai" }, { status: 401 });
    }

    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    return NextResponse.json({ orders });
  } catch (error) {
    return NextResponse.json({ error: "Orders laane mein error" }, { status: 500 });
  }
}