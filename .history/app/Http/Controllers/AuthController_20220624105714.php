<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

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

    public function register(Request $request){
        $messages = [
            'email.email'=>"Error email",
            'email.required'=>"Please enter your email!",
            'password.required'=>"Please fill in the password field",
        ];

        $validate = Validator::make($request->all(),[
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['require']
        ], $messages);
    }
}
