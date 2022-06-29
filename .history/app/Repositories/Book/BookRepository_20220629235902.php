<?php


namespace App\Repositories\Book;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class BookRepository{

    //Danh sách 10 sách khuyến mãi nhiều nhất

    public function getOnSaleBooks(){

        $books = DB::table(books)->join('discounts')
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
