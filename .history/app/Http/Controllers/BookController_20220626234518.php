<?php

namespace App\Http\Controllers;

use App\Repositories\Book\BookRepository;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public $bookRepository;
    public function __construct(BookRepository $book)
    {

    }
    public function getAllBooks(Request $request){

    }
}
