import { CartProvider } from "@/components/reusable/CartContext";
import { CartModalProvider } from "@/components/reusable/CartModalContext";

export default function RootLayout({
  children,
}: Readonly<{   
  children: React.ReactNode;
}>) {
    return (
          <CartProvider>
            <CartModalProvider>
                <div 
                    className={``}
                >
                    {children}
                </div>
            </CartModalProvider>
          </CartProvider>
    );
}
