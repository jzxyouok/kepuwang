<?php
namespace Home\Controller;

use Think\Controller;

class ArticleController extends Controller
{

    public function IndexArticle()
    {

        $condition = array(
            type   => I("get.type") || 2,
            status => I("get.status") || 1,
        );

        $result["allArticle"] = M("article")->where($condition)->order("publishTime DESC")->limit(0, 6)->select();
        echo json_encode($result);
    }

}
