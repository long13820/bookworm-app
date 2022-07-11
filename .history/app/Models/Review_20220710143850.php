<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Review extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'reviews';
    protected $fillable = ['book_id','review_title','review_details','rating_star','review_date'];

    function book(){
        return $this->belongsTo(Book::class);
    }

    public function scopeAverageStar($query){
        return $query->select(DB::raw('avg(CAST (rating_star AS FLOAT)) as avg_rating'));
    }
    
    public function scopeCountComment($query){
        return $query->select(DB::raw('count(reviews.book_id) as total_review'));
    }
}
