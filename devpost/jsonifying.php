<?php  

class jsonify {

	var $filename;
	var $json;

	public function set_filename($fname) {
		$this->filename = $fname;
	}

	public function set_json() {
		$file = file_get_contents($this->filename);

		$this->json = json_decode($file);
	}

	public function get_json() {
		return $this->json;
	}

}


?>