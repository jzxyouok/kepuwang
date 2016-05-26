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
        $db = M("pic");
        if (I("get.type")) {
            $where["type"] = I("get.type");
        }
        $where["status"] = 1;
        $result          = $db->order("type,publishTime desc")->limit(0, 10)->where($where)->getField('id,title,content,type,thumbnail');
        echo json_encode($result);
    }
    public function uploadPic()
    {
        $config = array(
            'maxSize'  => 3145728,
            'rootPath' => './Uploads/',
            'savePath' => '',
            'saveName' => array('uniqid', ''),
            'exts'     => array('jpg', 'gif', 'png', 'jpeg'),
            'autoSub'  => true,
            'subName'  => array('date', 'Ymd'),
        );
        $upload = new \Think\Upload($config); // 实例化上传类
        $info   = $upload->upload();
        if (!$info) {
// 上传错误提示错误信息
            $this->error($upload->getError());
        } else {
// 上传成功
            // $this->success('上传成功！');
            foreach ($info as $file) {
                $saveData = array(
                    usedName    => $file['name'],
                    path        => $file['savepath'] . $file['savename'],
                    title       => I("post.title"),
                    description => I("post.description"),
                    type        => I("post.type"),
                    mainType    => I("post.mainType"),
                    publishTime => time(),
                );
                M("pic")->add($saveData);
                echo I("post.title");
                // $this->redirect("/index.php?c=pic&a=allPic");

            }
        }

    }

}
