<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request){

        $user = User::where('email', $request->email)-> first();

        if(!$user || !Hash::check($request->password, $user->password,[])){
            return response()->json(
                [
                    'message'=>"Email or Password is wrong!!!"
                ],
                404
            );
        }

        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json(
            [
                'access_token' => $token,
                'type_token' =>'Bearer'
            ],
            404
        );
    }

    public function register()
}
