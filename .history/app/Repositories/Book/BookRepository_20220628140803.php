<?php


namespace App\Repositories\Book;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class BookRepository{
    public function getOnSaleBooks(){
        $b = DB::table('book')->join('discount','book.id','=','discount.book_id')
        ->join('authors','book.author_id','=','authors.id')
        ->select('book.id','book.book_cover_photo','books.book_title','books.book_price','authors.author_name','discounts.discount_price',
        DB::raw('books.book_price - discounts.discount_price as sub_price'),
        // DB::raw('CASE WHEN (discounts.discount_price isnull) THEN books.book_price ELSE books.book_price - discounts.discount_price end as sub_price'),
        DB::raw('CASE WHEN (discounts.discount_price isnull) THEN books.book_price ELSE discounts.discount_price end  as final_price'))
        ->where(function($query) {
            $query->whereDate('discount_start_date','<=', now()->toDateString())
                  ->whereDate('discount_end_date','>=', now()->toDateString());
        })
        ->orWhere(function($query){
            $query->whereDate('discount_start_date','<=', now()->toDateString())
                  ->whereNull('discounts.discount_end_date');
        })
        ->orderByDesc('sub_price')
        ->limit(10)
        ->get();

    return response()->json($b);

    }
}
