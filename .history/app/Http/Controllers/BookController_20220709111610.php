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
    // public function getAllBooks(Request $request){
    //     $allBooks = $this->bookRepository->getAllBooks($request);
    //     return $allBooks;
    // }

    public function getOnSaleBooks(){
        $onSaleBooks = $this->bookRepository->getOnSaleBooks();
        return $onSaleBooks;
    }

    public function getRecommendedBooks(){
        $recommendedBooks = $this->bookRepository->getRecommendedBooks();
        return $recommendedBooks;
    }

    public function getPopularBooks(){
        $popularBooks = $this->bookRepository->getPopularBooks();
        return $popularBooks;
    }

    public function getAllCategories(){
        $allCategories = $this->bookRepository->getAllCategories();
        return $allCategories;
    }

    public function getAllAuthors(){
        $allCategories = $this->bookRepository->getAllAuthors();
        return $allCategories;
    }

    public function getAllBooks(Request $request){
        $books = $this->bookRepository->getAllBooks($request);
        return $books;
    }

    public function getBookById($id){
        $allBooks = $this->bookRepository->getBookById($id);
        return $allBooks;
    }
    public function countStart($id)
    {
        $b = DB::table('books')
            ->join('reviews', 'books.id', '=', 'reviews.book_id')
            ->select(
                'books.id',
                'reviews.rating_start',
                DB::raw('count(cast(reviews.rating_start as int)) as sl')

            )
            ->where('books.id', $id)
            ->groupBy('books.id', 'reviews.rating_start')
            ->get();
        return response()->json($b);
    }
}
