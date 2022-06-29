<?php


namespace App\Repositories\Book;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class BookRepository{

    protected $books;

    public function __construct(Book $books)
    {
        $this-> = $product;
    }

    //Danh sách 10 sách khuyến mãi nhiều nhất

    public function getOnSaleBooks(){

        $books = DB::table('books')->join('discounts','books.id','=','discounts.book_id')
            ->join('authors', 'books.author_id','=','authors.id')
            ->select(
                'books.id',
                'books.book_cover_photo',
                'books.book_title',
                'books.book_price',
                'authors.author_name',
                'discounts.discount_price',
                DB::raw('books.book_price - discounts.discount_price as sub_price'),
                DB::raw('CASE WHEN (discounts.discount_price isnull) THEN books.book_price ELSE discounts.discount_price end as final_price')
            )
            ->where(function($query){
                $query->whereDate('discount_start_date','<=', now()->toDateString())
                      ->whereDate('discount_end_date','>=', now()->toDateString());
            })
            ->orWhere(function($query){
                $query->whereDate('discount_start_date','<=', now()-> toDateString())
                      ->whereNull('discounts.discount_end_date');
            })
            ->orderBy('sub_price','desc')
            ->take(10)
            ->get();

        return $books;

    }

     //Danh sách 8 cuốn Recommended
    public function getRecommendedBooks(){
        $products = Book::leftJoin('discounts', 'books.id', '=', 'discounts.book_id')
        ->select('books.*')
        ->finalPrice()
        ->selectAverageStar()
        ->orderByRaw('rating DESC NULLS LAST')
        ->orderBy('final_price', 'asc')
        ->take(8)
        ->get()
        ;

        return $products;
    }


}
