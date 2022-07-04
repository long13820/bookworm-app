<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function createBookReview(Request $request){
        $message = [
            'title.required'=>'Please fill in the title field',
            ''
        ]
    }
}
