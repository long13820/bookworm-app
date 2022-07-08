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

    public function scopeSelectFinalPrice($query)
    {
        return $query->selectRaw('CASE WHEN (discounts.discount_price isnull) THEN books.book_price ELSE discounts.discount_price end  as final_price')
            ->leftJoin('discounts', function ($join) {
                $join->on('books.id', '=', 'discounts.book_id')
                    ->where(function($query){
                        $query->where(function($query){
                            $query->whereDate('discount_start_date', '<=', now())
                                         ->whereDate('discount_end_date','>=',now());
                         })
                         ->orWhere(function ($query) {
                          $query->whereDate('discount_start_date', '<=', now())
                                 ->WhereNull('discount_end_date');
                         });
                    });
            });
    }
}
