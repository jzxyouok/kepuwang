<?php
namespace Home\Controller;

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
        $page = I("get.page") || 1;
        $db   = M("pic");
        if (I("get.type")) {
            $where["type"] = I(" get.type");
        }
        $where["status"] = 1;
        $result          = $db->order("type,publishTime desc")->limit(0, 10)->where($where)->getField('id,title,content,type,thumbnail');
        echo json_encode($result);
    }

}
