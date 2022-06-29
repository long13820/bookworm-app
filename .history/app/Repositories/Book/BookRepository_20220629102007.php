<?php


namespace App\Repositories\Book;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class BookRepository{

    //Danh sách 10 sách khuyến mãi nhiều nhất

    public function getOnSaleBooks(){

        $b = DB::table('book')->join('discount','book.id','=','discount.book_id')
        ->join('authors','book.author_id','=','authors.id')
        ->select('book.id','book.book_cover_photo','book.book_title','book.book_price','authors.author_name','discount.discount_price',
        DB::raw('book.book_price - discount.discount_price as sub_price'),
        // DB::raw('CASE WHEN (discounts.discount_price isnull) THEN books.book_price ELSE books.book_price - discounts.discount_price end as sub_price'),
        DB::raw('CASE WHEN (discount.discount_price isnull) THEN book.book_price ELSE discount.discount_price end  as final_price'))
        ->where(function($query) {
            $query->whereDate('discount_start_date','<=', now()->toDateString())
                  ->whereDate('discount_end_date','>=', now()->toDateString());
        })
        ->orWhere(function($query){
            $query->whereDate('discount_start_date','<=', now()->toDateString())
                  ->whereNull('discount.discount_end_date');
        })
        ->orderByDesc('sub_price')
        ->limit(10)
        ->get();

        return response()->json($b);
    }

     //Danh sách 8 cuốn Recommended
    public function getRecommendedBooks(){
        return Book::join('authors', 'authors.id', '=', 'book.author_id')
            ->select('book.id',
                    'book.book_title',
                    'book.book_price',
                    'book.book_cover_photo',
                    'authors.author_name')

            ->selectRaw('(CASE WHEN EXISTS (select book_id from discount where book.id= book_id)
                            THEN (select discount_price from discount where book_id = book.id)
                            ELSE book.book_price END) as final_price')

            ->join('review','review.book_id', '=', 'book.id')
            ->withAvg('review','rating_start')
            ->distinct()
            ->orderBy('review_avg_rating_start','desc')
            ->orderBy('final_price','asc')
            ->limit(8)
            ->get();
    }
}
