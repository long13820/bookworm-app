<?php

namespace App\Http\Controllers;

use App\Repositories\Book\BookRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BookController extends Controller
{
    public $bookRepository;
    public function __construct(BookRepository $bookRepository)
    {
        $this->bookRepository = $bookRepository;
    }
    public function getAllBooks(Request $request){
        $allBooks = $this->bookRepository->getAllBooks($request);
        return $allBooks;
    }

    public function OnSaleBooks(){
        $onSaleBooks = $this->bookRepository->OnSaleBooks();
        return $onSaleBooks;
    }

    // //Danh sách 10 sách khuyến mãi nhiều nhất
    // function OnSaleBook(){
    //     $b = DB::table('books')->join('discounts','books.id','=','discounts.book_id')
    //         ->join('authors','books.author_id','=','authors.id')
    //         ->select('books.id','books.book_cover_photo','books.book_title','books.book_price','authors.author_name','discounts.discount_price',
    //         DB::raw('books.book_price - discounts.discount_price as sub_price'),
    //         // DB::raw('CASE WHEN (discounts.discount_price isnull) THEN books.book_price ELSE books.book_price - discounts.discount_price end as sub_price'),
    //         DB::raw('CASE WHEN (discounts.discount_price isnull) THEN books.book_price ELSE discounts.discount_price end  as final_price'))
    //         ->where(function($query) {
    //             $query->whereDate('discount_start_date','<=', now()->toDateString())
    //                   ->whereDate('discount_end_date','>=', now()->toDateString());
    //         })
    //         ->orWhere(function($query){
    //             $query->whereDate('discount_start_date','<=', now()->toDateString())
    //                   ->whereNull('discounts.discount_end_date');
    //         })
    //         ->orderByDesc('sub_price')
    //         ->limit(10)
    //         ->get();

    //     return response()->json($b);
    // }


}
