<?php
namespace Main\Controller;

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
    public function allArticle()
    {
        // $condition           = array();
        // $condition["status"] = 1;
        $query = " status = 1 and type=3";
        if (I("get.maintype") != "") {
            // $condition["maintype"] = I("get.maintype");
            $query = $query . " AND  mainType  = " . I("get.maintype");
        }

        $page          = I("get.page");
        $result        = array();
        $result["num"] = M("article")->where($query)->count();

        $result["data"] = M("article")->where($query)->order("publishTime desc")->limit(($page - 1) * 18, $page * 18)->select();

        echo json_encode($result);
    }

    public function articleDetail()
    {
        $id     = I("get.id");
        $result = array();

        $db               = M("article");
        $result["detail"] = $db->where("id=" . $id)->find();

        $result["detail"]["content"] = htmlspecialchars_decode(html_entity_decode($result["detail"]["content"]));
        $result["relative"]          = $db->order("publishTime desc")->limit(0, 10)->select();
        echo json_encode($result);

    }
}
