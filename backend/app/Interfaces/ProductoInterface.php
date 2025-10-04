<?php

namespace App\Interfaces;

use Illuminate\Http\Request;

interface ProductoInterface
{
    public function productos();
    public function store(Request $request);
    public function actualizarStock(Request $request, $id);
    public function eliminar($id);
}