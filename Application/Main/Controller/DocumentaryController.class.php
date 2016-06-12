<?php
namespace Main\Controller;

use Think\Controller;

class DocumentaryController extends Controller
{
	public function allDocumentary(){
		$page = I("get.page");

		$status = I("get.status");
		$condition = array(
			status=>1
			);
		if($status !=""){
			$condition["status"]= $status;
		}
		 
		$result["num"] = M("documentary")->where($condition)->count();
		$result["data"] = M("documentary")->where($condition)->limit(($page-1)*15,$page*15)->select();
		   //   $len=count($result["data"]); 

     //         while($len){
     //         	$index = $len;
     //        $result["data"][--$index]["sets"] =  htmlspecialchars_decode(html_entity_decode($result["data"][--$index]["sets"]));
					// $len--;
     //         }
		echo json_encode($result);
	}
}