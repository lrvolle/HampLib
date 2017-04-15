<!DOCTYPE html>

<html lang="en">
    <head>
        <script type="text/javascript" src="//cdn.jsdelivr.net/jquery/1/jquery.min.js"></script>
        <style>
            .error {color: #FF0000;}
        </style>
    </head>

    <body style="display:block; width:100%;">
        <div style="display:block; width:50%; padding:25px; margin:auto;">
            <p><span class="error">* required field.</span></p>
            <form action="upload.php" method="POST" >
                <div>
                    <input type="radio" name="inputfile"
                        <?php if(isset($inputfile) && $inputfile=="collections1.csv") echo "checked=\"checked\"";?> 
                        value="collections1.csv" />
                    <label for="inputfile">collections1.csv</label>
                    <input type="radio" name="inputfile" 
                        <?php if(isset($inputfile) && $inputfile=="collections2.csv") echo "checked=\"checked\"";?> 
                        value="collections2.csv" />
                    <label for="inputfile">collections2.csv</label>
                    <span class="error">* input file is required</span>

                </div>

                <input type="submit" class="button" value="Load" />
            </form>
            <div>
                <h3>Output:</h3>
            </div>
        </div>
    </body>
    <script type="text/javascript">
        $(function () {
            $('form').on('submit', function (e) {

                e.preventDefault();

                var selected = $('input[name=inputfile]:checked').val();

                if(selected) { 

                    // console.log(selected);

                    $.ajax({
                        type: 'GET',
                        url: $(this).attr('action'),
                        data: { filename: selected },
                        success: function () {
                          console.log('form was submitted');
                        },
                        timeout: 7000
                    }).done(function(msg) {
                        console.log('ajax request completed; result: ' + msg);
                    });
                } else {
                    console.log("nothing selected");
                }
            });
        });
    </script>
</html>