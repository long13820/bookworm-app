<?php

namespace App\Repositories\Book;
use App\Models\

interface BookInterface{
    public function getAllBooks();
    public function getOnSaleBooks();
    public function getRecommendedBooks();

}
