<?php
namespace Home\Controller;

use Think\Controller;

class VideoController extends Controller
{
    public function newVideo()
    {
        $newVideo = array(
            title       => I("post.title"),
            thumbnail   => I("post.thumbnail_url"),
            type        => I("post.type"),
            "abstract"  => I("post.abstract"),
            videoCode   => I("post.videoCode"),
            mainType    => I("post.mainType"),
            publishTime => time(),
        );

        $db = M("video");

        $id = $db->add($newVideo);
        echo $id;

    }

    // public function indexVideo()
    // {
    //     $indexVideoCondition = array(
    //         type     => 1,
    //         status   => 1,
    //         mainType => 1,
    //     );
    //     $indexVideo = M("Video")->where($indexVideoCondition)->order("publishTime DESC")->limit(0, 6);
    //     echo json_encode($indexVideo);
    // }
    public function allVideo()
    {
        $page      = I("get.page") || 1;
        $condition = array(
            type   => I("get.type"),
            status => I("get.status"),
        );

        $result["pageNum"]  = M("Video")->where($condition)->count();
        $result["allVideo"] = M("Video")->where($condition)->order("publishTime DESC")->limit(($page - 1) * 10, $page * 10)->select();
        // echo (M("Video")->getLastSql());
        echo json_encode($result);
    }

}
