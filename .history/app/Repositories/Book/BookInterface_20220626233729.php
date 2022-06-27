<?php

namespace App\Repositories

interface BookInterface{
    public function getAllBooks();
    public function getOnSaleBooks();
    public function getRecommendedBooks();

}
