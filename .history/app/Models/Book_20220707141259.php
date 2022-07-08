<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Kirschbaum\PowerJoins\PowerJoins;

class Book extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'books';


    function category(){
        return $this->belongsTo(Category::class);
    }

    function author(){
        return $this->belongsTo(Author::class);
    }

    function discount(){
        return $this->hasOne(Discount::class);
    }

    function review(){
        return $this->hasMany(Review::class);
    }

    public function scopeSelectAverageStar($query){
        return $query->addSelect([
            'star'=>Review::averageStar()
                ->whereColumn('book_id','books.id')
        ]);
    }
}
