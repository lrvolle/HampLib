<!DOCTYPE html>

<html lang="en">
    <head>
        <script type="text/javascript" src="//cdn.jsdelivr.net/jquery/1/jquery.min.js"></script>


		<link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/bootstrap/3/css/bootstrap.css" />

		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	    <meta charset="utf-8">
	    <meta http-equiv="content-type" content="text/html; charset=utf-8" />

    </head>

    <body>
        <div class="container">
            <form role="form" id="searchForm">
                <div class="form-group col-sm-12 col-md-6" >
                	<div class="row">
	                	<h3>Search By:</h3>
	                    <input type="radio" name="search"
	                        <?php if(isset($search) && $search=="title") echo "checked=\"checked\"";?>  value="title" />
	                    <label for="search">Title</label>

	                    <input type="radio" name="search" 
	                        <?php if(isset($search) && $search=="author") echo "checked=\"checked\"";?> value="author" />
	                    <label for="search">Author</label>
					</div>
					<div class="row">
		                <input id="searchbox" type="text" placeholder="Search"/>
		                <input type="submit" id="form-submit" class="button" value="Search"/>
	                </div>
                </div>
            </form>
        </div>
    </body>
    <script type="text/javascript">
    	$("#searchForm").submit(function(e) {
		    var searching = $('input[name=search]:checked').val();

		    if(searching) {

				$.ajax({
			    type: "POST",
			    url: "library_inventory_"+searching+".php",
			    data: searching+"="+$('#searchbox').val(),
			    success : function(text){
			        console.log('form submitted: ' + text);
			    }
			});

		    } else {
		    	alert("Please select a radio button");
		    }
		}
    </script>
</html>