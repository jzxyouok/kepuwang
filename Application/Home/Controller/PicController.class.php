<?php
namespace Home\Controller;

use Think\Controller;

class PicController extends Controller
{
    // 1:普通资源 2：放置于首页 3：轮播图片
    public function newPic()
    {
        $newPic = array(
 
            title       => I("post.title"),
            thumbnail   => I("post.thumbnail_url"),
            img_src => I("post.img_src"),
            type        => I("post.type"),
            "abstract"  => I("post.abstract"),
            mainType    => I("post.mainType"),
            mainContent    => I("post.mainContent"),
            publishTime => time(),
        );
// 此处缺少图片压缩
        $db = M("pic");
        $id = I("post.id");

        if ($id != "") {
            $db->where("id=" . $id)->save($newPic);
        } else {
            $id = $db->add($newPic);
        }

        echo $id;
    }

    public function otherPic()
    {
        $result = $db->order("type,publishTime desc")->limit(0, 10)->where("status=0")->getField('id,title,content,type,thumbnail');
        echo json_encode($result);
    }
    public function allPic()
    {

        $page = I("get.page") || 1;

        $condition = array();
        if (I("get.type") != "") {
            $condition["type"] = I("get.type");
        }
        if (I("get.status") != "") {
            $condition["status"] = I("get.status");
        }
        $result["pageNum"]    = M("pic")->where($condition)->count();
        $result["allArticle"] = M("pic")->where($condition)->order("publishTime DESC")->limit(($page - 1) * 10, $page * 10)->select();
        // echo (M("article")->getLastSql());
        echo json_encode($result);
    }
    public function picDetail()
    {

        $id = I("get.id");

        $db        = M("pic");
        $picDetail = $db->where("id = " . $id)->find();
          $picDetail["maincontent"] = htmlspecialchars_decode(html_entity_decode($picDetail["maincontent"]));
      
        echo json_encode($picDetail);

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
