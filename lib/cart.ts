// Simple browser-based cart (localStorage). Works without login.
// Cart data is saved per-device/per-browser, not per-user in the database.

export interface CartItem {
  productId: string;
  name: string;
  price: number;       // actual price to charge (discountPrice if present, else price)
  image: string;
  size?: string;
  qty: number;
}

const CART_KEY = 'aalike_cart';
const CART_EVENT = 'aalike-cart-updated';

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  // Let other components (e.g. header cart badge) know the cart changed
  window.dispatchEvent(new Event(CART_EVENT));
}

export function addToCart(item: Omit<CartItem, 'qty'>, qty: number = 1) {
  const cart = getCart();
  const existing = cart.find(
    (c) => c.productId === item.productId && c.size === item.size
  );

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ ...item, qty });
  }

  saveCart(cart);
}

export function updateQty(productId: string, size: string | undefined, qty: number) {
  let cart = getCart();

  if (qty <= 0) {
    cart = cart.filter((c) => !(c.productId === productId && c.size === size));
  } else {
    cart = cart.map((c) =>
      c.productId === productId && c.size === size ? { ...c, qty } : c
    );
  }

  saveCart(cart);
}

export function removeFromCart(productId: string, size: string | undefined) {
  const cart = getCart().filter(
    (c) => !(c.productId === productId && c.size === size)
  );
  saveCart(cart);
}

export function clearCart() {
  saveCart([]);
}

export function getCartCount(): number {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

export function getCartTotal(): number {
  return getCart().reduce((sum, item) => sum + item.price * item.qty, 0);
}

// Call this in a useEffect to keep a component's cart count in sync
export function onCartChange(callback: () => void): () => void {
  window.addEventListener(CART_EVENT, callback);
  window.addEventListener('storage', callback); // sync across tabs
  return () => {
    window.removeEventListener(CART_EVENT, callback);
    window.removeEventListener('storage', callback);
  };
}