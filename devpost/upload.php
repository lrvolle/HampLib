<!DOCTYPE html>

<html lang="en">
<head></head>
<body>
<?php
	// if(isset($_GET['datafile'])) {
		// $file = $_GET['datafile'];

		ini_set("max_execution_time", 240);

		$path = "C:\Users\garre\Documents\Coding\HampHack\\";
		// $file = $_GET['filename'];
		// $jsonfile = 'data.json';


		include_once('server.php');

	    $obj = new server();

	    $obj->set_database('hamphack');
	    $obj->set_table('harold_f_johnson_lib_collections');

	    // connect to database
	    $obj->connect();

		
		include_once('files.php');
		$files = new file_list();

		$files->populate_files();

		// $result = NULL;

		include('jsonifying.php');
		$json_obj = new jsonify();

		for($i = 0; $i < $files->size(); $i++) {
			$json_obj->set_filename($files->file($i));

			$json_obj->set_json();

			// $file = $files->file($i);
			echo '<p>'.$files->file($i).'  ';
			$result = $obj->insert_library_data($json_obj->get_json());
			sleep(1);
			echo $result.'</p>';
		}

	    // $obj->close();
	// } else {
	// }
?>
</body>
</html>