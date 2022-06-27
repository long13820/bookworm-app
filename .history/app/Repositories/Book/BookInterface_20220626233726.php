<?php

namespace App\Reposi

interface BookInterface{
    public function getAllBooks();
    public function getOnSaleBooks();
    public function getRecommendedBooks();

}
