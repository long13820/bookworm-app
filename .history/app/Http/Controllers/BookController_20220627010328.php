<?php

namespace App\Http\Controllers;

use App\Repositories\Book\BookRepository;
use Illuminate\Http\Request;

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
    }
}
