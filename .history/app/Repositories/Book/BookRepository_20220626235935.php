<?php


namespace App\Repositories\Book;

use App\Models\Book;
use Illuminate\Http\Request ;

class BookRepository{
    public function getAllBooks(Request  $request){
        $paginateValue = $request->query("paginate");
        $filterArray = $request->query('filter');
        $sortArray = $request->query("sort");
//        FILTER

        if(isset($filterArray) ){
            if (is_array($filterArray) || is_object($filterArray)) {
                $filterKey1 = array();
                $filterValue1 = array();
//            $filterKey2 = array();
                $filterValue2 = array();
                foreach ($filterArray as $key => $value) {
                    if ($key != 'avg_rating') {
                        $filterKey1[] = $key;
                        $filterValue1[] = $value;
                    } else {
//                    $filterKey2[] = $key;
                        $filterValue2[] = $value;
                    }
                }
            }
            $allbooks =  DB::table('book')
                ->join('author', 'author.id', '=', 'book.author_id')
                ->join('category', 'category.id', '=', 'book.category_id')
                ->leftJoin('review', 'review.book_id', '=', 'book.id')
                ->leftJoin('discount', 'discount.book_id', '=', 'book.id')
                -> join ('book_avg_rating','book_avg_rating.id','=', 'book.id' )
                ->where(function ($query) use ($filterKey1, $filterValue1) {
                    foreach ($filterKey1 as $index => $value) {
                        $query->where($value, '=', $filterValue1[$index]);
                    }
                })
                ->where(function ($query) use ($filterKey1, $filterValue1) {
                    foreach ($filterKey1 as $index => $value) {
                        $query->where($value, '=', $filterValue1[$index]);
                    }
                })
                ->where('book_avg_rating.avg_rating', '>=', array($filterValue2))

                ->select('book.id',
                    'book.book_title',
                    'book.book_price',
                    'book.book_cover_photo',
                    'category.category_name',
                    'author.author_name',
                    'book_avg_rating.avg_rating')
                ->selectRaw('(CASE WHEN EXISTS (select discount.book_id from discount where book.id=book_id)
                              THEN (select discount_price from discount where book_id=book.id)
                              ELSE book.book_price END) as final_price')
                ->distinct('book.id')
                ->paginate($paginateValue);
        }else{
            $allbooks =  DB::table('book')
                ->join('author', 'author.id', '=', 'book.author_id')
                ->join('category', 'category.id', '=', 'book.category_id')
                ->leftJoin('review', 'review.book_id', '=', 'book.id')
                ->leftJoin('discount', 'discount.book_id', '=', 'book.id')
                -> join ('book_avg_rating','book_avg_rating.id','=', 'book.id' )


//                ->where('book_avg_rating.avg_rating', '>=', array($filterValue2))

                ->select('book.id',
                    'book.book_title',
                    'book.book_price',
                    'book.book_cover_photo',
                    'category.category_name',
                    'author.author_name',
                    'book_avg_rating.avg_rating')
                ->selectRaw('(CASE WHEN EXISTS (select discount.book_id from discount where book.id=book_id)
                              THEN (select discount_price from discount where book_id=book.id)
                              ELSE book.book_price END) as final_price')
                ->distinct('book.id')
                ->paginate($paginateValue);
        }

////        SORT
//        foreach ($sortArray as $key => $value) {
//            $sortKey = $key;
//            $sortValue = $value;
//        }
//        if($sortValue = )
//        $allbooks =  DB::table('book')
//            ->join('author', 'author.id', '=', 'book.author_id')
//            ->join('category', 'category.id', '=', 'book.category_id')
//            ->leftJoin('review', 'review.book_id', '=', 'book.id')
//            ->leftJoin('discount', 'discount.book_id', '=', 'book.id')
//            -> join ('book_avg_rating','book_avg_rating.id','=', 'book.id' )
//            ->where(function ($query) use ($filterKey1, $filterValue1) {
//                foreach ($filterKey1 as $index => $value) {
//                    $query->where($value, '=', $filterValue1[$index]);
//                }
//            })
//            ->where(function ($query) use ($filterKey1, $filterValue1) {
//                foreach ($filterKey1 as $index => $value) {
//                    $query->where($value, '=', $filterValue1[$index]);
//                }
//            })
//            ->where('book_avg_rating.avg_rating', '>=', array($filterValue2))
//
//            ->select('book.id',
//                'book.book_title',
//                'book.book_price',
//                'book.book_cover_photo',
//                'category.category_name',
//                'author.author_name',
//                'book_avg_rating.avg_rating')
//            ->selectRaw('(CASE WHEN EXISTS (select discount.book_id from discount where book.id=book_id)
//                              THEN (select discount_price from discount where book_id=book.id)
//                              ELSE book.book_price END) as final_price')
//            ->distinct('book.id')
//            ->paginate($paginateValue);

        return $allbooks;

    }
}
