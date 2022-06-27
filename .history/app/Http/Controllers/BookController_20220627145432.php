<?php

namespace App\Http\Controllers;

use App\Repositories\Book\BookRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BookController extends Controller
{
    // public $bookRepository;
    // public function __construct(BookRepository $bookRepository)
    // {
    //     $this->bookRepository = $bookRepository;
    // }
    // public function getAllBooks(Request $request){
    //     $allBooks = $this->bookRepository->getAllBooks($request);
    //     return $allBooks;
    // }

    // public function OnSaleBooks(){
    //     $onSaleBooks = $this->bookRepository->OnSaleBooks();
    //     return $onSaleBooks;
    // }

    //Danh sách 10 sách khuyến mãi nhiều nhất
    function OnSaleBooks(){
        return Book::join('discount', 'discount.book_id', '=', 'book.id' )
        -> join('author', 'author.id', '=', 'book.author_id')
        ->selectRaw('book.id,
        book.book_title,
        book.book_price,
        book.book_cover_photo,
        author.author_name,
        discount.discount_price,
        book.book_price - discount.discount_price as sub_price')
        ->orderBy('sub_price', 'desc')
        ->limit(10)
        ->get();
    }

    //Danh sách 8 cuốn Recommended
    function RecommendedBook(){
        $book = DB::table('books')
        ->join('reviews', 'books.id','=','reviews.book_id')
        ->join('authors', 'books.author_id','=','authors.id')
        ->leftJoin('discounts','books.id','=','discounts.book_id')
        ->select('books.id','books.book_cover_photo','books.book_title','authors.author_name','books.book_price',
        DB::raw('sum(cast(reviews.rating_start as integer))/count(*) as avg_rating'),
        DB::raw('CASE WHEN (discounts.discount_price isnull) THEN books.book_price ELSE discounts.discount_price end  as final_price'))
        ->where(function($query) {
            $query->whereDate('discount_start_date','<=', now()->toDateString())
                  ->whereDate('discount_end_date','>=', now()->toDateString());
        })
        ->orWhere(function($query){
            $query->whereDate('discount_start_date','<=', now()->toDateString())
                  ->whereNull('discounts.discount_end_date');
        })
        ->groupBy('final_price')
        ->groupBy('books.id')
        ->groupBy('authors.author_name')
        ->orderByDesc('avg_rating')
        ->orderBy('final_price')
        ->limit(8)
        ->get();
        return response()->json($book);
    }

       //Danh sách 8 cuốn popular
       function PopularBook(){
        $book =  DB::table('books')
        ->join('reviews', 'books.id','=','reviews.book_id')
        ->join('authors', 'books.author_id','=','authors.id')
        ->leftJoin('discounts','books.id','=','discounts.book_id')
        ->select('books.id','books.book_cover_photo','books.book_title','authors.author_name','books.book_price',
        DB::raw('CASE WHEN (discounts.discount_price isnull) THEN books.book_price ELSE discounts.discount_price end  as final_price'),
        DB::raw('count(books.id) as num_review'))
        ->where(function($query) {
            $query->whereDate('discount_start_date','<=', now()->toDateString())
                  ->whereDate('discount_end_date','>=', now()->toDateString());
        })
        ->orWhere(function($query){
            $query->whereDate('discount_start_date','<=', now()->toDateString())
                  ->whereNull('discounts.discount_end_date');
        })
        ->groupBy('final_price')
        ->groupBy('books.id')
        ->groupBy('authors.author_name')
        ->orderByDesc('num_review')
        ->orderBy('final_price')
        ->limit(8)
        ->get();
        return response()->json($book);
    }

    //Lấy ID của tất cả các sách
    function getAllID(){
        $b= DB::table('books')
        ->select('books.id')
        ->get();
        return response()->json($b);
    }
}
