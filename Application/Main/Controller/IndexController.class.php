<?php
namespace Main\Controller;

use Think\Controller;

class IndexController extends Controller
{
    public function index()
    {
        $this->display();
    }
    // public function indexSource(){
    //     // 文章资源
    //     $result = array();
    //     $article = M("article");

    //     M("article")->where("status=1 and type=1")->order("publishTime DESC")->limit(0, 6)->select();
    //     $pic = M("pic");
    //     $
    // }
}
