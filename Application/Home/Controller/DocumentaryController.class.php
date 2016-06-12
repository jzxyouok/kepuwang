<?php
namespace Home\Controller;

use Think\Controller;

class DocumentaryController extends Controller
{
	public function newdocumentary(){
		$id = I("post.id");
		$newDoc = array(
			title       =>I("post.title"),
			maincontent =>I("post.mainContent"),
			thumbnail=>I("post.thumbnail_url"),
			"abstract"     =>I("post.abstract"),
			sets        =>I("post.sets"),
			);
		if(I("post.id") != "")
		M("documentary")->where("id=".$id)->save($newDoc);
		else
		$id = M("documentary")->add($newDoc);
	echo $id;
	}
	public function  documentaryDetail(){
		$id = I("get.id");
		$result = M("documentary")->where("id=".$id)->find();
        $result['sets'] = htmlspecialchars_decode(html_entity_decode($result['sets']));
        $result['maincontent'] = htmlspecialchars_decode(html_entity_decode($result['maincontent']));

		echo json_encode($result);

	}
}
