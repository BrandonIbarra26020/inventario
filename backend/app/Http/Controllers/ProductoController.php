<?php


namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use App\Interfaces\ProductoInterface;
use Exception;

// sirve como plantilla para otros controladores
abstract class BaseController extends Controller {
    // Método abstracto responder
    abstract protected function responder($data, $mensaje = "Operación exitosa");
}

// herencia de BaseController
class ProductoController extends BaseController implements ProductoInterface
{
    // Atributo privado para el modelo Producto
    private $producto;

    // Constructor
    public function __construct() {
        $this->producto = new Producto();
    }

    // Implementación del método responder
    protected function responder($data, $mensaje = "Operación exitosa") {
        return response()->json([
            'mensaje' => $mensaje,
            'data' => $data
        ]);
    }

    // Método listar productos
    public function productos() {
        return $this->responder($this->producto->all());
    }

    // Método crear producto 
    public function store(Request $request) {
        try {
            if (!$request->nombre || !$request->stock) {
                throw new Exception("Nombre y stock son obligatorios");
            }

            $producto = new Producto();
            $producto->nombre = $request->nombre;
            $producto->stock = $request->stock;
            $producto->precio = $request->precio ?? 0;
            $producto->categoria = $request->categoria ?? "General";
            $producto->save();

            return $this->responder($producto, "Producto creado correctamente");
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    // Método actualizar stock
    public function actualizarStock(Request $request, $id) {
        try {
            $producto = Producto::findOrFail($id);
            $producto->stock = $request->stock;
            $producto->save();

            return $this->responder(true, "Stock actualizado correctamente");
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    // Método eliminar producto
    public function eliminar($id) {
        try {
            $producto = Producto::findOrFail($id);
            $producto->delete();

            return $this->responder(true, "Producto eliminado correctamente");
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}