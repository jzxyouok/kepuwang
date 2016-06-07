<?php
namespace Main\Controller;

use Think\Controller;

class PicController extends Controller
{
    // 1:普通资源 2：放置于首页 3：轮播图片

    public function otherPic()
    {
        $result = $db->order("type,publishTime desc")->limit(0, 10)->where("status=0")->getField('id,title,content,type,thumbnail');
        echo json_encode($result);
    }
    public function allPic()
    {
        $page = I("get.page");

        $where = array(
            type   => 3,
            status => 1,
        );
        $db = M("pic");
        if (I("get.type")) {
            $where["type"] = I(" get.type");
        }
        $result         = array();
        $result["num"]  = $db->where($where)->count();
        $result["data"] = $db->order("publishTime desc")->limit(($page - 1) * 18, $page * 18)->where($where)->select(); //getField('id,title,abstract,thumbnail');
        echo json_encode($result);
    }
    public function picDetail()
    {

        $id = I("get.id");

        $db        = M("pic");
        $picDetail = $db->where("id = " . $id)->getField("id,mainType,thumbnail,title,abstract,content,type,like", true);
        echo json_encode($picDetail[$id]);

    }

}
