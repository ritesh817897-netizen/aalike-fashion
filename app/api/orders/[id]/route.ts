import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import Order from "@/models/Order";

function getUserFromToken(req: NextRequest): { id: string; role: string } | null {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;

  const token = authHeader.replace("Bearer ", "");
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    return { id: decoded.id, role: decoded.role };
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const user = getUserFromToken(req);
    if (!user) {
      return NextResponse.json({ error: "Login zaroori hai" }, { status: 401 });
    }

    const { id } = await params;
    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json({ error: "Order nahi mila" }, { status: 404 });
    }

    if (user.role !== "admin" && order.user.toString() !== user.id) {
      return NextResponse.json({ error: "Permission nahi hai" }, { status: 403 });
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Order laane mein error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const user = getUserFromToken(req);
    if (!user) {
      return NextResponse.json({ error: "Login zaroori hai" }, { status: 401 });
    }

    if (user.role !== "admin") {
      return NextResponse.json({ error: "Sirf admin hi status update kar sakta hai" }, { status: 403 });
    }

    const { id } = await params;
    const { orderStatus, courierName, trackingNumber } = await req.json();

    const order = await Order.findById(id);
    if (!order) {
      return NextResponse.json({ error: "Order nahi mila" }, { status: 404 });
    }

    if (orderStatus && orderStatus !== order.orderStatus) {
      order.orderStatus = orderStatus;
      order.statusHistory.push({ status: orderStatus, date: new Date() });
    }

    if (courierName !== undefined) order.courierName = courierName;
    if (trackingNumber !== undefined) order.trackingNumber = trackingNumber;

    await order.save();

    return NextResponse.json({ message: "Order update ho gaya", order });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Order update karne mein error" }, { status: 500 });
  }
}