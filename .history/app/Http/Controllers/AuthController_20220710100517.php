<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Contracts\Validation\Validator as ValidationValidator;
use Illuminate\Http\Request;
use Illuminate\support\Facades\Auth;
use Illuminate\support\Facades\Hash;
use Illuminate\support\Facades\Validator;

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
                'type_token' =>'Bearer',
                'data' => $user,
                'message' => 'Login successfully'
            ],
            200
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
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password'=> ['required', 'string', 'min:8'],
        ], $messages);


        if($validate -> fails()){
            return response()->json(
                [
                    'message' => $validate ->errors(),
                ],
                404
            );
        }

        User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email'=> $request->email,
            'password'=> bcrypt($request->password),
        ]);

        return response()->json(
            [
                'message'=>"Created account"
            ],
            201
        );

    }

    public function user(Request $request){
        return $request->user();
    }

    public function logout(Request $request){
        //Revoke all tokens
        auth()->user()->tokens()->delete();

        // $request->user()->currentAccessToken()->delete();
        // //Revoke token that used to authenticate the current request...
        // $request->user()->currentAccessToken()->delete();

        // //Revoke a specific token
        // $user->tokens()->where('id', $tokenId)->delete();

        return response()->json(
            [
                'message' => 'Logged out Successfully',
            ],
            200
        );
    }
}
