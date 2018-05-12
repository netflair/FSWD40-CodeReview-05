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

    //Chat Hover
    $(".fa-comments").hover(
        function() {
            $(this).addClass("active");
        },
        function() {
            $(this).removeClass("active");
        }
    );

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
            $('.male').show().fadeIn(450);
        } else {
            $('.male').hide().fadeOut(450);
        }
    });
    //female
    $('#female').change(function() {
        if ($('#female').is(":checked")) {
            $('.female').show().fadeIn(450);
        } else {
            $('.female').hide().fadeOut(450);
        }
    });




});