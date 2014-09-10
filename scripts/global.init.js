;
$.g(function(){
	
	var config = {
			validate : true,
			stateAlarm : true
		};
		
	$.validate.init();
	
	//===================== global initialize ====================
	$logo.on('click', function () {
		location.href = '/';
		return false;
	});
	
	$contents.on('click', '#top', function(){
		location.href = "#";
		contentsScrollTop();
		return false;
	});
	//============================================================
	
	
	//========================== menu ============================
	var url = '/temp/json/menu.json';
	
	$.ajax({
        url : url,
        dataType : 'json'
    }).done(function (r) {
        $gnb.navi({lnb : $lnb, page:$page, data : r.menu});
    });
    
    $gnb.on('click', 'a', navigationHandler);
    $lnb.on('click', 'a', navigationHandler);
    
    function navigationHandler () {
    	
    	var $this = $(this);
    	
    	if($this.hasClass('on')) return false;

		if($lnb.has($this).length){
			$this.parent().addClass('on').siblings().removeClass('on');
			contentsScrollTop();	
		}
    }
	//============================================================
	
	//======================== functions =========================
	function contentsScrollTop() {
		$contents.find('.content-area').scrollTop(0);
	}
	//============================================================
});
