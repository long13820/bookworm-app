<?php


namespace App\Repositories\Book;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


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
            ->distinct('book.id')
            ->paginate($paginateValue);
        return $allbooks;
    }
    public function OnSaleBooks(){
        $b = DB::table('books')->join('discounts','books.id','=','discounts.book_id')
        ->join('authors','books.author_id','=','authors.id')
        ->select('books.id','books.book_cover_photo','books.book_title','books.book_price','authors.author_name','discounts.discount_price',
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
