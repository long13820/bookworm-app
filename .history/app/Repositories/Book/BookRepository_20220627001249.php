<?php


namespace App\Repositories\Book;

use App\Models\Book;
use Illuminate\Http\Request;


class BookRepository{
    public function getAllBooks(Request $request){
        $paginateValue = $request->query("paginate");
        $allbooks = DB::table('book')

            ->join('author', 'author_id', '=', 'book.author_id')
            ->join('category', 'category.id', '=', 'book.category_id')
            ->leftJoin('review', 'review.book_id', '=', 'book.id')
            ->leftJoin('discount', 'discount.book_id', '=', 'book.id')
            ->join('book_avg_rating','book_avg_rating.id','=','book.id')

            ->select('book.id',
                'book.book_title',
                'book.book_price',
                'book.book_cover_photo',
                'category.category_name',
                'author.author_name',
                'book_avg_rating.avg_rating'
            )
            ->selectRaw('(CASE WHEN EXISTS (select discount.book_id from discount where book.id=book_id)
                        THEN (select discount_price from discount where book_id = book.id)
                        ELSE book.book_price END) as final_price')
            ->distinct(''
            )
            ->get();

    }
}
