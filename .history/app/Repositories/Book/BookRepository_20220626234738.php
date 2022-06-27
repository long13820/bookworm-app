<?php


namespace App\Repositories\Book;

use App\Models\Book;

class BookRepository{
    public function getAllBooks(){
        return Book::leftjoin('author',)
    }
}
