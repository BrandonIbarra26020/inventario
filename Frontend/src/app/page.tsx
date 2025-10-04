import { TablaProductos } from "@/components/Productos/Productos";
import { ToastContainer } from "react-toastify";


export default function Home() {

  const handleLogout = () => {
  
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        

        <TablaProductos />
        <ToastContainer />
      </div>
    </div>
  );
}