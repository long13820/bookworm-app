<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
       //Lấy ra danh sách tên loại
       function getCategory()
       {
           $category = DB::table('categories')
               ->select('categories.id', 'categories.category_name')
               ->get();
           return response()->json($category);
       }

       //Lấy danh sách tác giả
       function getAuthor()
       {
           $author = DB::table('authors')
               ->select('authors.id', 'authors.author_name')
               ->get();
           return response()->json($author);
       }
}
