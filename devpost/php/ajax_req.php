<?php 
	
	$data = '';

	if(isset($_POST['title'])) {
		$data = $_POST['title'];
	}
	else if(isset($_POST['author'])) {
		$data = $_POST['author'];
	}

	include_once('server.php');

    $obj = new server();

    $obj->set_database('hamphack');
    $obj->set_table('harold_f_johnson_lib_collections');

    // connect to database
    $obj->connect();


    


?>