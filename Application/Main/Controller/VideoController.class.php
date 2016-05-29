<?php
namespace Main\Controller;

use Think\Controller;

class VideoController extends Controller
{

    public function allVideo()
    {
        $page     = I("get.page");
        $maintype = I("get.maintype");

        $where = array(
            type   => 3,
            status => 1,
        );
        if ($maintype != "") {
            $where["mainType"] = $maintype;
        }
        $db = M("video");
        if (I("get.type")) {
            $where["type"] = I(" get.type");
        }
        $result         = array();
        $result["num"]  = $db->where($where)->count();
        $result["data"] = $db->order("publishTime desc")->limit(($page - 1) * 18, $page * 18)->where($where)->select(); //getField('id,title,abstract,thumbnail');
        echo json_encode($result);
    }
    public function videoDetail()
    {

        $id = I("get.id");

        $db        = M("video");
        $picDetail = $db->where("id = " . $id)->getField("id,mainType,thumbnail,title,abstract,content,type,videoCode", true);
        echo json_encode($picDetail[$id]);

    }

}
