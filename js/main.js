//Logout redirect to index.html
document.getElementById('logout').onclick = function() {
    location.href = "index.html";
};


$(document).ready(function() {

    //Mobile Nav --------------------------------------------------------------------
    $("#burger").click(function() {
        $("#nav").slideToggle(500);
    });


    //Generate Profile Cards --------------------------------------------------------
    var card = '';
    for (var i = 0; i < members.length; i++) {
        var mem = members[i];
        //Card --------------------------------------
        card +=
            "<div class='card "+ mem.sex +"'>" +
	            //Profile Image
	            "<div class='profilePic'>" +
	            	"<img src='" + mem.myPhoto + "'>" +
	            "</div>" +
	            //Details Box
	            "<div class='memberData'>" +
		            "<span  class='name'>" + mem.name + " " + mem.surname + "</span><br>" +
		            "<b>Age:</b> " + mem.age + "<br>" +
		            "<b>Coding:</b> " + mem.code + "<br>" +
		            "<b>Hobbies:</b> " + mem.hobbies +
	            "</div>" +
	            //Like Button
	            "<div class='like'>" +
		            "<div class='likeToggle'>+</div>" +
		            "<div class='num'>" + mem.likes + "</div>" +
	            "</div>" +
	            "<div class='chat'>" +
	            	"<i class='far fa-comments'></i>" +
	            "</div>" +	
            "</div>";
    }

    //Output on page
    $("#memOut").html(card);

    //TOGGLE LIKE -----------------------------------
    $('.like').on('click', function() {
        //get like container and value of .num
        var likeContainer = $(this).find(".num");
        var likeValue = likeContainer.text();

        //if LIKE = like +1 
        if ($(this).find('.likeToggle').text() == "+") {
            likeValue++;
            likeContainer.text(likeValue);
            $(this).find('.likeToggle').text("-").css("background-image", "url(./img/heartFull.png)");
        }
        //if DISLIKE = like -1
        else if ($(this).find('.likeToggle').text() == "-") {
            likeValue--;
            likeContainer.text(likeValue);
            $(this).find('.likeToggle').text("+").css("background-image", "url(./img/heartEmpty.png)");
        }
    });

    //CHAT ---------------------------------------------------------------------------
    //Chat Hover
    $(".fa-comments").hover(
        function() {
            $(this).addClass("active");
        },
        function() {
            $(this).removeClass("active");
        }
    );
    //Chat Window-----------------------------
    $('.fa-comments').on('click', function() {
    		//Get current card Content
            var cardContent = $(this).closest(".card");
            var memName = cardContent.find(".memberData .name").text();
            var memPic = cardContent.find(".profilePic").find('img').attr('src');

            //Generate Chat Window Content
            var chat=" ";

            chat += 
            "<div class='chathead'>" +
            	"<img src='" + memPic + "'>" +
            	memName +
            	"<i class='fas fa-caret-square-down'></i><i class='fas fa-times'></i>" +
            "</div>" +
            "<div class='chatText'></div>" +
            "<input class='textInput' type='text'>" + 
            "<i class='fab fa-telegram-plane'></i>";

            //open chat
            $("#chatWindow").show().animate({bottom: '0px'}).html(chat);

            //close chat
            $('.fa-times').on('click', function(){
            	$('#chatWindow').hide();
            });

            //minimize-maximize
            function mini() {
			    $(this).closest('#chatWindow').animate({bottom: "-260px"}, 450);
			    $('.fa-caret-square-down').removeClass('fa-caret-square-down').addClass('fa-caret-square-up');
			    $(this).one("click", max);
			}

			function max() {
			    $(this).closest('#chatWindow').animate({bottom: "0px"}, 450);
			    $('.fa-caret-square-up').removeClass('fa-caret-square-up').addClass('fa-caret-square-down');
			    $(this).one("click", mini);
			}
			$(".chathead").one("click", mini);

			//Post Text--------------------------------------
            var date = new Date();
            var h = date.getHours();
            var m = date.getMinutes();

            //On icon click
            $('.fa-telegram-plane').on('click', function () {
                $('.chatText').append("<p>You @" + h + ":" + m + "</p> <span>" + $('.textInput').val() + "</span><br>");
                //reset input field
                $('.textInput').val('');
                //Autoscroll to bottom
                $(".chatText").animate({ scrollTop: $(".chatText").prop("scrollHeight") }, 1000);
            });
            //On Enter
			$('.textInput').on('keydown',function post(e) {
			    if(e.keyCode == 13) {
			        $('.fa-telegram-plane').click();
			    }
			});
   
        });

    // Sort based on likes ----------------------------------------------------------
    $('#sort').on('click', function() {
        var sorted = $(".card").sort(function(a, b) {
            return Number($(a).find(".num").text()) < Number($(b).find(".num").text());
        });
        //detach cards and append again to container
        sorted.detach().hide().fadeIn(450).appendTo('#memOut');
    });

    //Filter based on sex ------------------------------------------------------------
    //male
    $('#male').change(function() {
        if ($('#male').is(":checked")) {
            $('.male').show(400);
        } else {
            $('.male').hide(400);
        }
    });
    //female
    $('#female').change(function() {
        if ($('#female').is(":checked")) {
            $('.female').show(400);
        } else {
            $('.female').hide(400);
        }
    });




});