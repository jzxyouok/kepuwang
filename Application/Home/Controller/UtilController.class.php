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
        $result["data"] = $db->where($condition)->order("position asc,publishTime desc")->limit(($page - 1) * 10, $page * 10)->select();
        echo json_encode($result);

    }

}
