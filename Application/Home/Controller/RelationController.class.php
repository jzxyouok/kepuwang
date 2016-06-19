<?php
namespace Home\Controller;

use Think\Controller;

class RelationController extends Controller
{
    //添加相关
    public function addRelative()
    {
        $aid = I("get.aid");
        $rid = I("get.rid");

        $articleType = I("get.articleType");
        M("relation")->where("articleType=" . $articleType . " and  aid =" . $aid . " and rid=" . $rid)->delete();

        // 返回新添加的文章的标题和ID
        switch ($articleType) {

            case 1:
                $db = M("article");
                # code...
                break;
            case 2:
                $db = M("pic");
                # code...
                break;
            case 4:
                $db = M("video");
                # code...
                break;

            default:
                # code...
                break;
        }
        $result["title"] = $db->where("id=" . $rid)->getField("title");
// 有此文章的时候再添加关系
        if ($result["title"] != "") {
            M("relation")->add(array(
                aid         => $aid,
                rid         => $rid,
                articleType => $articleType,
            ));
            $result["id"] = $rid;
            echo json_encode($result);
        } else {
            echo "0";
        }

    }

    public function allRelative()
    {
        $articleType = I("get.articleType");
        $id          = I("get.id");
        switch ($articleType) {

            case 1:
                $db = M("article");
                # code...
                break;
            case 2:
                $db = M("pic");
                # code...
                break;
            case 4:
                $db = M("video");
            # code...

            default:
                # code...
                break;
        }

        $result      = array();
        $relativeIds = M("relation")->where("articleType=" . $articleType . " and aid=" . $id)->select();
        foreach ($relativeIds as $r) {
            $result[] = $db->where("id=" . $r["rid"])->find();
        }
        echo json_encode($result);
    }
    public function delRelative()
    {
        $aid = I("get.aid");
        $rid = I("get.rid");

        $articleType = I("get.articleType");
        M("relation")->where(array(
            aid         => $aid,
            rid         => $rid,
            articleType => $articleType,
        ))->delete();
        echo M("relation")->getLastSql();
    }

}
