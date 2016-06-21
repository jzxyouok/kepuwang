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
        $indexPic       = $pic->where("status=1 and type=2")->limit(0, 12)->select();
        $commonPic      = $pic->where("status=1 and type=3")->limit(0, 12)->select();
        $result["pics"] = array_merge($indexPic, $commonPic);

        $video            = M("video");
        $indexVideo       = $video->where("status=1 and type=2")->limit(0, 9)->select();
        $commonVideo      = $video->where("status=1 and type=3")->limit(0, 9)->select();
        $result["videos"] = array_merge($indexVideo, $commonVideo);
// 1轮播2热点3普通4推荐
        $article              = M("article");
        $hotArticle           = M("article")->where("status=1 and type=2")->limit(0, 10);
        $result["hotArticle"] = $hotArticle;
// 热点文章
        $recommandArticle           = M("article")->where("status=1 and type=4")->limit(0, 13);
        $result["recommandArticle"] = $recommandArticle;

        // 轮播文章
        $sliderArticle           = M("article")->where("status=1 and type=1")->limit(0, 3);
        $result["sliderArticle"] = $sliderArticle;

        echo json_encode($result);
    }
    public function slideArticle()
    {
        $article = M("article");

        // 轮播文章
        $sliderArticle = $article->where("status=1 and type=1")->limit(0, 3)->select();
        echo json_encode($sliderArticle);
    }
}
