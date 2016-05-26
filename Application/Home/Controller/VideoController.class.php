<?php
namespace Home\Controller;

use Think\Controller;

class VideoController extends Controller
{
    public function newVideo()
    {
        $newVideo = array(
            title       => I("post.title"),
            content     => I("post.content"),
            mainType    => I("post.mainType"),
            publishTime => time(),
        );
        $newVideo["video_src"] = getPic($newVideo["content"]); //使用函数 返回匹配地址 如果不为空则声称缩略图
        // echo $info . "INFO";
        // if (!$info == null) {
        //     echo "ssssss";
        //     $thumb = $info . 'thumb.png';
        //     $image = new \Think\Image(); //实例化图像处理，缩略图功能
        // $image->open($info); // 生成一个居中裁剪为240*160的缩略图
        // $unlink                = $image->thumb(240, 160, \Think\Image::IMAGE_THUMB_CENTER)->save($thumb);
        // $newVideo["thumbnail"] = $thumb;
        // } else {
        //     $thumb = '';
        // }

        // switch (I("post.mainType")) {
        //     case '1':
        // $db = M("Video");

        //         break;
        //     case '2':
        //         $db                  = M("pic");
        //         $newVideo["img_src"] = $info;
        //         break;
        //     case '3':
        //         $db                  = M("video");
        //         $newVideo["img_src"] = $info;
        //         break;

        //     default:
        //         $db = M("Video");
        //         break;
        // }
        $db = M("Video");
        $db->add($newVideo);
        echo json_encode($newVideo);

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
