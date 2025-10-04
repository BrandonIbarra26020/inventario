import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Registrar usuario",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
    
        {children}
     
    </div>
  );
}
