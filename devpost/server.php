<?php

class server {
    var $hostname;
    var $username;
    var $password;
    var $database;
    var $table;
    var $link;

    public function insert_library_data($json) {
        $keys = ['doc_number', 'title', 'author', 'pub_year', 'primary_call_no_desc', 'primary_call_no_id', 'collection_desc'];

        $doc_number_key = 'doc_number';
        $title_key = 'title';
        $author_key = 'author';
        $pub_year_key = 'pub_year';
        $primary_desc_key = 'primary_call_no_desc';
        $primary_id_key = 'primary_call_no_id';
        $collection_desc_key = 'collection_desc';

        $query = "
        INSERT INTO $this->table ($doc_number_key, $title_key, $author_key,
                         $pub_year_key, $primary_desc_key, $primary_id_key, 
                         $collection_desc_key) VALUES ";

        $first = 1;
        $last_doc_num = 0;
        for($j = 0; $j < count($json->data); $j++) {
            $number = $json->data[$j]->$doc_number_key;
            if($last_doc_num == $number) {
                continue;        
            } 
            $checkquery = "SELECT * FROM $this->table WHERE doc_number=$number";
            if($result = mysqli_query($this->link, $checkquery)) {
                $num_rows = mysqli_num_rows($result);
                if($num_rows > 0) {
                    echo $number .' exists..';
                    continue;
                }
            }

            // if($this->exists($this->link, $json->data[$j]->$doc_number_key)) {
            //     continue;
            // }
            if($first == 0) {
                $query .= ", (";
            } else {
                $query .= '( ';
                $first = 0;
            }
            for($k = 0; $k < count($keys); $k++) {
                $key = $keys[$k];
                if($key == $author_key) {
                    if ($json->data[$j]->$key == '') {
                        $query .= 'NULL';
                    } else {
                        $query .= "\"".$json->data[$j]->$key . "\"";
                    }
                } else if ($k != 0 || $k != 3) {
                    $query .= "\"" . $json->data[$j]->$key . "\"";
                } else {
                    $query .= $json->data[$j]->$key;
                }
                if($k < 6) {
                    $query .= ', ';
                }
            }
            $query .= ')';
            $last_doc_num = $json->data[$j]->$doc_number_key;
        }

        // echo '<p>'.$query.'</p><br>';

        mysqli_query($this->link, $query) or die(mysqli_error($this->link));
        return "success";
    }

    public function display_title($title) {
        $doc_number_key = 'doc_number';
        $title_key = 'title';
        $author_key = 'author';
        $pub_year_key = 'pub_year';
        $primary_desc_key = 'primary_call_no_desc';
        $primary_id_key = 'primary_call_no_id';
        $collection_desc_key = 'collection_desc';

        $query = "SELECT * FROM $this->table WHERE title=".$title;
        
        $row_count = 0;
        $r = mysqli_query($this->link, $query)

        
        if( $r !== false && mysqli_num_rows($r) > 0) {
            echo'
            <div class="row">
                <div class="col-md-1">doc_number</div>
                <div class="col-md-2">title</div>
                <div class="col-md-1">uthor</div>
                <div class="col-md-1">pub_year</div>
                <div class="col-md-1">primary_desc</div>
                <div class="col-md-1">primary_id</div>
                <div class="col-md-1">collection_desc</div>
            </div>'  

             while( $a = mysqli_fetch_assoc($r)) {

                $doc_number = stripslashes($a[$doc_number_key]);
                $title = stripslashes($a[$title_key]);
                $author = stripslashes($a[$author_key]);
                $pub_year = stripslashes($a[$pub_year_key]);
                $primary_desc = stripslashes($a[$primary_desc_key]);
                $primary_id = stripslashes($a[$primary_id_key]);
                $collection_desc = stripslashes($a[$collection_desc_key]);
                echo"
                <div class="row">
                    <div class="col-md-1">$doc_number</div>
                    <div class="col-md-2">$title</div>
                    <div class="col-md-2">$author</div>
                    <div class="col-md-1">$pub_year</div>
                    <div class="col-md-2">$primary_desc</div>
                    <div class="col-md-2">$primary_id</div>
                    <div class="col-md-2">$collection_desc</div>

                </div>"
        }
    }

    public function exists($link, $number) {
        $query = "SELECT * FROM $this->table WHERE doc_number=".$number;
        // echo $query."<br>";

        // $exists_ = false;
        // $result;
        $row_count = 0;

        if($result = mysqli_query($link, $query)) {
            $row_count = mysqli_num_rows($result);
        } 

        return $row_count > 0;
        // return $exists_;
    }

    public function connect() {
        // populate hostname, username, password
        $this->get_authentication_details();

        // attempt to connect to sql
        // on failure, output error message
        $this->link = mysqli_connect($this->hostname, $this->username, $this->password) or
            die("Could not connect. " . mysqli_error($this->link));

        // attempt to connect to database
        // on failure, output error message
        mysqli_select_db($this->link, $this->database) or
            die("Could not select database " . $this->database . ". " . mysqli_error($this->link));
    }

    public function close() {
        mysqli_close($this->link);
    }

    public function set_database($db) {
        $this->database = $db;
    }

    public function set_table($tbl) {
        $this->table = $tbl;
    }

    private function get_authentication_details() {
        $string = file_get_contents("server-authentication.json");
        $json = json_decode($string);

        $this->hostname = $json->hostname;
        $this->username = $json->username;
        $this->password = $json->password;
    }
}

?>