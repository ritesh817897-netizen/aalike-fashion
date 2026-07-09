import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ error: 'Product nahi mila' }, { status: 404 });
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error('Get product error:', error);
    return NextResponse.json({ error: 'Product load nahi ho paya' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const product = await Product.findByIdAndUpdate(id, body, { new: true });

    if (!product) {
      return NextResponse.json({ error: 'Product nahi mila' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product update ho gaya', product }, { status: 200 });
  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json({ error: 'Product update nahi ho paya' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json({ error: 'Product nahi mila' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product delete ho gaya' }, { status: 200 });
  } catch (error) {
    console.error('Delete product error:', error);
    return NextResponse.json({ error: 'Product delete nahi ho paya' }, { status: 500 });
  }
}