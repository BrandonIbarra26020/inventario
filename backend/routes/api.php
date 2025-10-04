<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/login', [UserController::class, 'login']);
Route::post('/register', [UserController::class, 'register']);


Route::middleware('auth:sanctum')->group(function () {
    // Rutas para obtener los productos
    Route::post('/productos', [ProductoController::class, 'productos']);

    // Ruta para crear un nuevo producto
    Route::post('/productos/crear', [ProductoController::class, 'store']);

    // Ruta para eliminar un producto
    Route::delete('/productos/eliminar/{id}', [ProductoController::class, 'eliminar']);

    // Ruta para actualizar el stock de un producto
    Route::put('/productos/actualizar-stock/{id}', [ProductoController::class, 'actualizarStock']);

});