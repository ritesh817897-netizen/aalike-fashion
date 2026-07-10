import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import Cart from "@/models/Cart";

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

// GET: cart dikhana
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const userId = getUserId(req);
    if (!userId) {
      return NextResponse.json({ error: "Login zaroori hai" }, { status: 401 });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = { items: [] };
    }

    return NextResponse.json({ cart });
  } catch (error) {
    return NextResponse.json({ error: "Cart laane mein error" }, { status: 500 });
  }
}

// POST: cart mein product add karna
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const userId = getUserId(req);
    if (!userId) {
      return NextResponse.json({ error: "Login zaroori hai" }, { status: 401 });
    }

    const { productId, name, price, image, quantity } = await req.json();

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Naya cart banao agar pehle se nahi hai
      cart = new Cart({
        userId,
        items: [{ productId, name, price, image, quantity: quantity || 1 }],
      });
    } else {
      // Check karo product already cart mein hai kya
      const existingItem = cart.items.find(
        (item: any) => item.productId === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity || 1;
      } else {
        cart.items.push({ productId, name, price, image, quantity: quantity || 1 });
      }
    }

    await cart.save();
    return NextResponse.json({ message: "Cart mein add ho gaya", cart });
  } catch (error) {
    return NextResponse.json({ error: "Cart mein add karne mein error" }, { status: 500 });
  }
}

// PUT: quantity update karna
export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    const userId = getUserId(req);
    if (!userId) {
      return NextResponse.json({ error: "Login zaroori hai" }, { status: 401 });
    }

    const { productId, quantity } = await req.json();

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return NextResponse.json({ error: "Cart nahi mila" }, { status: 404 });
    }

    const item = cart.items.find((item: any) => item.productId === productId);
    if (item) {
      item.quantity = quantity;
    }

    await cart.save();
    return NextResponse.json({ message: "Quantity update ho gayi", cart });
  } catch (error) {
    return NextResponse.json({ error: "Update karne mein error" }, { status: 500 });
  }
}

// DELETE: product cart se hatana
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const userId = getUserId(req);
    if (!userId) {
      return NextResponse.json({ error: "Login zaroori hai" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return NextResponse.json({ error: "Cart nahi mila" }, { status: 404 });
    }

    cart.items = cart.items.filter((item: any) => item.productId !== productId);

    await cart.save();
    return NextResponse.json({ message: "Product hata diya", cart });
  } catch (error) {
    return NextResponse.json({ error: "Remove karne mein error" }, { status: 500 });
  }
}