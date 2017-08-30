<?php
	
   	header('Content-Type:application/json; charset=utf-8');
   	
   	$data = [];
   	
   	$page = $_GET['page'];
   	
   	$data['title'] = '这是返回的title'.$page;
   	
   	$data['content'] = '这是返回的content'.$page;
   	
   	sleep(1);
   	
	echo json_encode($data,0);
?>