<?php
namespace Main\Controller;

use Think\Controller;

class DocumentaryController extends Controller
{
    public function allDocumentary()
    {
        $page = I("get.page");

        $status    = I("get.status");
        $condition = array(
            status => 1,
        );
        if ($status != "") {
            $condition["status"] = $status;
        }

        $result["num"]  = M("documentary")->where($condition)->count();
        $result["data"] = M("documentary")->where($condition)->limit(($page - 1) * 15, $page * 15)->select();
        for ($i = 0; $i < count($result["data"]); $i++) {
            $result["data"][$i]["sets"] = M("sets")->where("documentaryId = " . $result["data"][$i]["id"])->select();

        }

        echo json_encode($result);
    }
}
