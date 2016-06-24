<?php
namespace Home\Controller;

use Think\Controller;

class UtilController extends Controller
{
    public function getAll()
    {
        $articleType = I("get.articleType");
        $mainType    = I("get.mainType");
        $page        = I("get.page");
        $name        = I("get.name");

        $condition = array(
            status => I("get.status"),

        );
        if ($mainType != "0") {
            $condition["mainType"] = $mainType;
        }
        if ($name != "") {
            $condition["title"] = array("like", "%" . $name . "%");
        }

        $db             = getDb($articleType);
        $result["num"]  = $db->where($condition)->count();
        $result["data"] = $db->where($condition)->order("position asc,priority desc,publishTime desc")->limit(($page - 1) * 10, 10)->select();
        // echo $db->getLastSql();
        echo json_encode($result);

    }
    public function changePriority()
    {
        $articleType = I("post.articleType");
        $update      = array(
            id       => I("post.id"),
            priority => I("post.priority"),
        );
        $db = getDb($articleType);
        $db->save($update);
        echo $db->getLastSql();
        // public function changePosition(){
        //     $articleType = I("get.articleType");
        //     $id = I("get.id");
        //     $db = getDb($articleType);
    }

}
