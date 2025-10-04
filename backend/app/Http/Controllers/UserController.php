<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\JsonResponse;


use Illuminate\Http\Request;

class UserController extends Controller
{

    public function login(Request $request): JsonResponse
    {
        // Excepción con try-catch
        try {
            $request->validate([
                'email' => 'required|string|email',
                'password' => 'required|string',
            ]);

            $user = User::where('email', $request->email)->first();

            if (! $user || ! Hash::check($request->password, $user->password)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized',
                ], 401);
            }

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Autenticado',
                'token' => $token,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Intente nuevamente más tarde',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function register(Request $request): JsonResponse
    {
        // Excepción con try-catch
        try {

            // Validar los datos de entrada
            $request->validate([
                'nombre' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8|confirmed',
            ]);

            // Crear el usuario
            $user = User::create([
                'nombre' => $request->nombre,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            // Retornar una respuesta JSON
            if ($user) {
                return response()->json(['success' => true], 201);
            } else {
                return response()->json(['success' => false], 201);
            }
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Intente nuevamente más tarde',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
