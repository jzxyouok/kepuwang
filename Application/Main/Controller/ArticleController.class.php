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
        $condition           = array();
        $condition["status"] = 1;
       
        if (I("get.maintype") != "") {
            $condition["maintype"] = I("get.maintype");
            // echo json_encode($condition);
        }

        $page           = I("get.page");
        $result         = array();
        $result["num"]  = M("article")->where($condition)->count();
         // echo json_encode($condition);
        $result["data"] = M("article")->where($condition)->order("publishTime desc")->limit(($page - 1) * 18, $page * 18)->select();
        
         // echo M("article")->getLastSql();
          echo json_encode($result);
    }

    public function articleDetail()
    {
        $id     = I("get.id");
        $result = array();

        $db                          = M("article");
        $result["detail"]            = $db->where("id=" . $id)->find();
        $result["relative"]          = array();
        $result["detail"]["content"] = htmlspecialchars_decode(html_entity_decode($result["detail"]["content"]));
        echo json_encode($result);

    }
}
