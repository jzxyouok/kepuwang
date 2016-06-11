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
        $picDetail = $db->where("id = " . $id)->getField("id,title,content,type,likes,img_src,mainContent", true);
        $picDetail[$id]["maincontent"] = htmlspecialchars_decode(html_entity_decode($picDetail[$id]["maincontent"]));
         $picDetail[$id]["content"] = htmlspecialchars_decode(html_entity_decode($picDetail[$id]["content"]));
        echo json_encode($picDetail[$id]);

    }
    public function like(){
        $id = I("get.id");
        $liked = I("get.liked");
        $db = M("pic");
        if($liked == "true"){
              $db->where('id='.$id)->setDec('likes');
          }else{
            $db->where('id='.$id)->setInc('likes');
          }
      

    }

}
