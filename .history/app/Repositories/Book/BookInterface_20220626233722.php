<?php

namespace App\Re

interface BookInterface{
    public function getAllBooks();
    public function getOnSaleBooks();
    public function getRecommendedBooks();

}
