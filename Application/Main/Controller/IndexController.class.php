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
    public function indexContent()
    {
        $pic            = M("pic");
        $result["pics"] = $pic->where("status=1")->order("position asc")->limit(0, 12)->select();

        $video            = M("video");
        $result["videos"] = $video->where("status=1")->order("position asc")->limit(0, 9)->select();

// 1轮播2热点3普通4推荐
        $article              = M("article");
        $hotArticle           = M("article")->where("status=1")->order("position asc")->limit(0, 10)->select();
        $result["hotArticle"] = $hotArticle;
// 热点文章
        $recommandArticle           = M("article")->where("status=1")->order("position asc")->limit(10, 13)->select();
        $result["recommandArticle"] = $recommandArticle;
        // 轮播文章

        echo json_encode($result);
    }
    public function slideArticle()
    {
        $sliderArticle = M("pic")->where("status=1")->order("position asc")->limit(0, 3)->select();
        echo json_encode($sliderArticle);
    }
}
