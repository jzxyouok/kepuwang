<?php
namespace Home\Controller;

use Think\Controller;

class IndexController extends Controller
{
    public function index()
    {
        $this->display();
    }
    public function allUser()
    {
        // $params["status"] = I('get.status');
        if (I('get.status') != "") {
            $params["status"] = array('like', "%" . I('get.status') . "%");
        }
        if (I('get.name') != "") {
            $params["name"] = array('like', "%" . I('get.name') . "%");
        }
        if (I('get.email') != "") {
            $params["email"] = array('like', "%" . I('get.email') . "%");
        }
        $db = M("user");
        // echo json_encode($params);
        $result["totalNum"]  = $db->count();
        $result["activeNum"] = $db->where("status=1")->count();
        $result["allUser"]   = $db->limit(10)->where($params)->order('id')->getField('id,name,registerTime,email,status');
        echo json_encode($result);
    }
    public function register()
    {
        $db                       = M("user");
        $userData["name"]         = "会开花的树";
        $userData["registerTime"] = time() * 1000;
        $userData["email"]        = "2242009032@qq.com";

        $db->add($userData);

    }
}
