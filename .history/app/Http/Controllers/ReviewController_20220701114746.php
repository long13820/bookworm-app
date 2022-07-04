<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    public function createBookReview(Request $request){
        $message = [
            'title.required'=>'Please fill in the title field',
            'details.required'=>'Please fill in the detail field',
            'rating.required'=>'Please select the rating star',
        ];
        $validate = Validator::make($request->all(), [
            'review_title' => ['required', 'string', 'min:8', 'max:120'],
            'review_details' => ['string'],
            'rating_star' => ['require'],
        ], $message);

        if($validate->fails()){
            return response()->json(
                [
                    'message' => $validate->errors(),
                ],
                404
            );
        }

        $date = Carbon::now();
        Review::create([
            'book_id'=>$request->id,
            'review_title' => $request ->review_title,
            'review_details'=> 
        ]);
    }
}
