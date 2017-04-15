<?php

class file_list {
	var $files;
	var $size;

	public function populate_files() {
		$this->files = [
			// files
		];

		$this->size = count($this->files);
	}

	public function file($index) {
		return $this->files[$index];
	}

	public function size() {
		return $this->size;
	}
}

?>