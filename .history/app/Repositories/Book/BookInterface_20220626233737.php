<?php

namespace App\Repositories\Book;


interface BookInterface{
    public function getAllBooks();
    public function getOnSaleBooks();
    public function getRecommendedBooks();

}
